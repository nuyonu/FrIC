'use strict';

const AWS = require('aws-sdk');
const { createCanvas } = require('canvas');

const { Client } = require('pg');

const s3 = new AWS.S3();

const ToRads = Math.PI / 180.0;

function generateFractalAsString(axiom, angle, rules, depth) {
	rules = rules.split(",").map(r => r.trim());
	
	let rulesMap = new Map();
	
	for (let index = 0; index < rules.length; ++index)
		rulesMap.set(
			rules[index].trimStart()[0], 
			rules[index].substring(rules[index].indexOf('->') + 2).trimStart()
		);
	
	let next = axiom;
	
	for (let count = 0; count < depth; ++count) {
		next = "";

		for (let index = 0; index < axiom.length; ++index)
			next += rulesMap.get(axiom[index]) || axiom[index];
		
		axiom = next;
	}
	
	return next;
}

function preprocessStringFractal(stringFractal) {
	let totalRuleChanges = 0;
	let openBrackets = 0;
	let maxOpenBrackets = 0;
	
	for (let index = 0, end = stringFractal.length; index < end; ++index) {
		const atom = stringFractal[index];
		
		if ((atom >= 'A' && atom <= 'Z') || (atom >= 'a' && atom <= 'z')) {
			++totalRuleChanges;
		}
		else if (atom == ']') {
			--openBrackets;
			++totalRuleChanges;
		}
		else if (atom == '[') {
			++openBrackets;
			maxOpenBrackets = Math.max(maxOpenBrackets, openBrackets);
		}
	}
	
	return [totalRuleChanges, maxOpenBrackets];
}

function generateLines(stringFractal, angleInDegrees, startAngleInDegrees, startLineLength, lengthFactor) {
	let minX = 0;
	let maxX = -0;
	let minY = 0;
	let maxY = -0;
	
	const [totalRuleChanges, maxOpenBrackets] = preprocessStringFractal(stringFractal);
	
	const coordsX = new Float32Array(totalRuleChanges);
	const coordsY = new Float32Array(totalRuleChanges);
	const coordsAction = new Int8Array(totalRuleChanges);
	
	const stackX = new Float32Array(maxOpenBrackets + 1);
	const stackY = new Float32Array(maxOpenBrackets + 1);
	const stackAngle = new Int32Array(maxOpenBrackets + 1);
	const stackLineLength = new Float32Array(maxOpenBrackets + 1);
	
	stackX[0] = 0;
	stackY[0] = 0;
	stackAngle[0] = 0;
	stackLineLength[0] = 0; //startLineLength;

	let coordsIndex = 0;
	
	coordsX[coordsIndex] = stackX[0];
	coordsY[coordsIndex] = stackY[0];
	coordsAction[coordsIndex] = 0;
	
	let top = 0;
	
	for (let index = 0, end = stringFractal.length; index < end; ++index) {
		const atom = stringFractal[index];
		
		if ((atom >= 'A' && atom <= 'Z') || (atom >= 'a' && atom <= 'z')) {
			const angle = (startAngleInDegrees + angleInDegrees * stackAngle[top]) * ToRads;
			const length = startLineLength * Math.pow(lengthFactor, stackLineLength[top]);

			stackX[top] += Math.cos(angle) * length;
			stackY[top] -= Math.sin(angle) * length;
		
			++coordsIndex;
			
			coordsX[coordsIndex] = stackX[top];
			coordsY[coordsIndex] = stackY[top];
			
			if (atom == atom.toUpperCase())
				coordsAction[coordsIndex] = 1;
			else
				coordsAction[coordsIndex] = 0;
			
			minX = Math.min(minX, stackX[top]);
			maxX = Math.max(maxX, stackX[top]);
			minY = Math.min(minY, stackY[top]);
			maxY = Math.max(maxY, stackY[top]);
		}
		else if (atom == "-") {
			--stackAngle[top];
		}
		else if (atom == "+") {
			++stackAngle[top];
		}
		else if (atom == "[") {
			++top;
			
			stackX[top] = stackX[top - 1];
			stackY[top] = stackY[top - 1];
			stackAngle[top] = stackAngle[top - 1];
			stackLineLength[top] = stackLineLength[top - 1];
		}
		else if (atom == "]") {
			--top;
			
			++coordsIndex;
			
			coordsX[coordsIndex] = stackX[top];
			coordsY[coordsIndex] = stackY[top];
			coordsAction[coordsIndex] = 0;
		}
		else if (atom == ">") {
			++stackLineLength[top];
		}
		else if (atom == "<") {
			--stackLineLength[top];
		}
	}
	
	return { bounds: [minX, maxX, minY, maxY], coordsX: coordsX, coordsY: coordsY, coordsAction: coordsAction };
}

function generateFractalAsCanvas(bounds, coordsX, coordsY, coordsAction, angle, format, lineColor, backColor, lineWidth, antialias) {
 	const [minX, maxX, minY, maxY] = bounds;
 	
	const MaxDimension = 1000;
	
	let canvasWidth = Math.round(maxX - minX);
	let canvasHeight = Math.round(maxY - minY);
	
	if (canvasWidth == 0 || canvasHeight == 0)
		return createCanvas(MaxDimension, MaxDimension);
	
	let horizontalRatio = 1.0;
	let verticalRatio = 1.0;
	
	if (canvasWidth > MaxDimension || canvasHeight > MaxDimension) {
		let oldHeight = canvasHeight;
		let oldWidth = canvasWidth;
		
		if (canvasWidth > canvasHeight) {
			canvasHeight = Math.round(MaxDimension * (canvasHeight / canvasWidth));
			canvasWidth = MaxDimension;
		}
		else {
			canvasWidth = Math.round(MaxDimension * (canvasWidth / canvasHeight));
			canvasHeight = MaxDimension;
		}
		
		horizontalRatio = canvasWidth / oldWidth;
		verticalRatio = canvasHeight / oldHeight;
	}
	
	const vectorFormat = ["svg", "pdf"].includes(format);
	
	let canvas = vectorFormat ? 
		createCanvas(canvasWidth, canvasHeight, format) :
		createCanvas(canvasWidth, canvasHeight);

	let context = canvas.getContext('2d', { alpha: false });
	
	context.patternQuality = 'best';
	context.quality = 'best';
	context.antialias = antialias ? 'default' : 'none';

	context.fillStyle = backColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if (vectorFormat)
		context.lineWidth = lineWidth;
	
	context.beginPath();
	context.strokeStyle = lineColor;
	
	for (let index = 0, end = coordsAction.length; index < end; ++index) {
		const x = Math.round((coordsX[index] - minX) * horizontalRatio);
		const y = Math.round((coordsY[index] - minY) * verticalRatio);

		if (coordsAction[index]) {
			context.lineTo(x, y);
		}
		else {
			context.stroke();
			context.beginPath();
			context.moveTo(x, y);
		}
	}

	context.closePath();
	context.stroke();

	return canvas;
}

async function uploadFractal(canvas, format) {
	const formatToContentType = { 
		"png" : "image/png",
		"jpeg" : "image/jpeg",
		"svg" : "application/svg",
		"pdf" : "application/pdf"
	};
	
	const acl = 'public-read';
	const bucket = 'fric-fractals';
	const key = 'test.' + format;
	const contentType = formatToContentType[format];
	const body = canvas.toBuffer(contentType);
	
	try {
		const params = {
	    	ACL: acl,
	        Bucket: bucket,
	        Key: key,
	        ContentType: contentType,
	        Body: body
	    };
	    
	    var putObjectPromise = await s3.upload(params).promise();
	    return putObjectPromise.Location;
	}
	catch (e) {
		console.log(e);
	}
    
    return "none";
}

async function getUser(token) {
	const client = new Client({
	    user: 'postgres',
	    host: 'fricserveramazon.cdeuzrn0zuzw.eu-central-1.rds.amazonaws.com',
	    database: 'fricserver',
	    password: '12345678',
	    port: 5432,
	    statement_timeout: 5000,
	    query_timeout: 5000
	});
	
	let query = 'SELECT "currentRequests", "maximumRequests" FROM public."user" WHERE token = $1';
	const values = [token];
	
	try {
		await client.connect();
	}
	catch (e) {
		return "Failed connecting to the database";
	} 
	
	const res = await client.query(query, values);
	
	if (!res)
		return "Invalid query";
	
	if (res.rowCount <= 0)
		return "Token is invalid";
	
	await client.end();

	const rows = res.rows[0];
	
	if (Number(rows.currentRequests) >= Number(rows.maximumRequests))
		return "Your current requests depaseted your maximum requests";
		
	return "Success";
}

exports.handler = async (event) => {
	const axiom = event.axiom;
	const angle = Number(event.angle);
	const rules = event.rules;
	const depth = Number(event.depth);
	const token = event.token;
	let format = event.format;
	let stringify = event.stringify;
	let lineColor = event.lineColor;
	let backColor = event.backColor;
	let lineWidth = Number(event.lineWidth);
	let antialias = event.antialias;
	let lengthFactor = Number(event.lengthFactor);
	let lineLength = Number(event.lineLength);
	
	const successAuthentification = await getUser(token);
	
	if (successAuthentification != "Success") {
		return {
			status: "fail",
			data: {
				authentification: successAuthentification
			}
		};
	}
	 
	if (!axiom || /^\s*$/.test(axiom)) {
		return {
			status: "fail",
			data: {
				depth: "The axiom is empty"
			}
		};
	}
	
	if (!rules || /^\s*$/.test(rules) || rules.count) {
		return {
			status: "fail",
			data: {
				depth: "The rules are empty"
			}
		};
	}
	
	if (isNaN(angle)) {
		return {
			status: "fail",
			data: {
				depth: "The angle parameter is invalid"
			}
		};
	}
	
	if (!Number.isSafeInteger(depth) || depth <= 0) {
		return {
			status: "fail",
			data: {
				depth: "The depth parameter must be a strictly positive integer value"
			}
		};
	}
	
	if (!format || /^\s*$/.test(format))
		format = "png";
	
	if (!["png", "jpeg", "svg", "pdf"].includes(format)) {
		return {
			status: "fail",
			data: {
				format: "The image format must be 'png', 'jpeg', 'svg' or 'pdf'"
			}
		};
	}
	
	if (!stringify)
		stringify = false;
	else {
		try {
			stringify = JSON.parse(stringify);
		}
		catch (e) {
			stringify = false;
		}
	}

	if (isNaN(lineWidth) || lineWidth <= 0)
		lineWidth = 1;

	if (!antialias)
		antialias = false;
	else {
		try {
			antialias = JSON.parse(antialias);
		}
		catch (e) {
			antialias = false;
		}
	}
	
	if (!lineColor)
		lineColor = 'black';
		
	if (!backColor)
		backColor = 'white';
		
	if (isNaN(lengthFactor) || lengthFactor <= 0)
		lengthFactor = 1.0;
		
	if (isNaN(lineLength) || lineLength <= 0)
		lineLength = 20;
	
	let stringGenerationStartTime = new Date();
	const stringFractal = generateFractalAsString(axiom, angle, rules, depth);
	let stringGenerationElapsedTime = (new Date() - stringGenerationStartTime);
	
	let linesGenerationStartTime = new Date();
	const linesData = generateLines(stringFractal, angle, 90, lineLength, lengthFactor);
	let linesGenerationElapsedTime = (new Date() - linesGenerationStartTime);
	
	let drawingStartTime = new Date();
	
	const canvasFractal = generateFractalAsCanvas(
		linesData.bounds, 
		linesData.coordsX, 
		linesData.coordsY, 
		linesData.coordsAction, 
		angle, 
		format,
		lineColor,
		backColor,
		lineWidth,
		antialias);
		
	let drawingElapsedTime = (new Date() - drawingStartTime);
	
	let uploadStartTime = new Date();
	const imageLink = await uploadFractal(canvasFractal, format);
	let uploadElapsedTime = (new Date() - uploadStartTime);
	
	const totalElapsedTime = 
		stringGenerationElapsedTime +
		linesGenerationElapsedTime +
		drawingElapsedTime +
		uploadElapsedTime;
	
	const response = {
		status: "success",
		data: {
			payload: {
				length: stringFractal.length,
				depth: depth,
				imageLink: imageLink
			},
			timings: {
				stringGenerationTime: stringGenerationElapsedTime + "ms",
				linesGenerationTime: linesGenerationElapsedTime + "ms",
				drawingTime: drawingElapsedTime + "ms",
				uploadingTime: uploadElapsedTime + "ms",
				totalTime: totalElapsedTime + "ms"
			}
		}
	};
	
	if (stringify)
		response.data.payload.result = stringFractal;
	
	return response;
};