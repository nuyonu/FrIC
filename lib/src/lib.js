function Fric(keyInput) {
    let fractalsArray = [];
    let address;
    let key;
    let request = new Request(Constants().GetAddress);
    let results = [];
    if (isValid(keyInput)) {
        key = keyInput;
    }

    function AddFractal(fractal) {
        fractalsArray.push(fractal);
    }

    function AddFractals(fractals) {
        for (let i = 0; i < fractals.length; i++) {
            fractalsArray.push(fractals[i]);
        }
    }

    function isValid(key) {
        if (typeof key == "undefined") {
            return true;
        } else if (typeof key != "string")
            throw "Parameter key is not a valid parameter";
        else if (key.length !== 128)
            throw "The key is not valid";
        return true;
    }

    async function makeRequest(downloadAssets = false) {
        let resultTemp;
        for (let i = 0; i < fractalsArray.length; i++) {
            let request = new Request(`https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal${fractalsArray[i].GetQuery()}&token=${key}`);
            resultTemp = await fetch(request, {mode: 'cors'}).then(function (response) {
                return Promise.resolve(response.json());
            }).catch(function (error) {
                console.log('Request failed', error)
            });
            results.push(Result(resultTemp));
        }
        console.log(results.length);

    }

    function show() {
        for (let i = 0; i < results.length; i++)
            console.log(results[i].data.link);
    }

    function load(index, id) {
        if (typeof index !== "number")
            throw "index should be a positive integer";
        if (index < 0 || index > fractalsArray.length)
            throw  "Invalid index for list of fractals";
        let format = fractalsArray[index].format;
        switch (format) {
            case "pdf":
                console.log("Not implemented");
                break;
            case "jpeg":
                console.log("Not implemented");
                break;
            case "canvas":
                console.log("Not implemented");
                break;


        }
    }

    return {
        AddFractal, AddFractals, makeRequest, load, show
    }

}

function Constants() {
    /**
     * @return {string}
     */
    function GetAddress() {
        return "https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal"
    }

    function GetFormats() {
        return formats;
    }

    function isValidFormats(format) {
        return formats.indexOf(format) !== -1;
    }

    let formats = ["png", "jpeg", "svg", "pdf"];
    return {
        GetAddress, GetFormats, isValidFormats
    }
}

function Result(result) {
    let success;
    let data;
    let time;
    let why;
    success = result['status'] === 'success';
    if (!success) {
        why = result['data'];
    } else {
        data = Data(result['data']);
        time = Timings(result['data']);
    }

    function GetSuccess() {
        return success;
    }

    function GetData() {
        return data;
    }

    function GetTime() {
        return time;
    }

    function GetMessage() {
        return why;
    }

    return {
        success, data, time, why
    }
}

function Data(data) {
    let fractalString;
    let lengthStringFractal;
    let depth;
    let link;


    function construct(data) {
        let payload = data['payload'];
        if (payload.hasOwnProperty('result'))
            fractalString = payload['result'];
        else
            fractalString = '';
        lengthStringFractal = payload['length'];
        depth = payload['depth'];
        link = payload['imageLink'];
    }

    construct(data);

    return {
        fractalString, lengthStringFractal, depth, link
    }
}

function Timings() {
    let totalTime = 0;
    let uploadTime = 0;
    let drawingTime = 0;
    let linesGenerationTime = 0;
    let stringGenerationTime = 0;

    function constructor(time) {
        time = time['timings'];
        totalTime = time['stringGenerationTime'];
        uploadTime = time['linesGenerationTime'];
        drawingTime = time['drawingTime'];
        linesGenerationTime = time['uploadingTime'];
        stringGenerationTime = time['totalTime'];
    }

    /**
     * @return {number}
     */
    function GetTotalTime() {
        return totalTime;
    }

    /**
     * @return {number}
     */
    function GetUploadTime() {
        return uploadTime;
    }

    /**
     * @return {number}
     */
    function GetDrawingTime() {
        return drawingTime;
    }

    /**
     * @return {number}
     */
    function GetLinesGenerationTime() {
        return linesGenerationTime;
    }

    /**
     * @return {number}
     */
    function GetStringGenerationTime() {
        return stringGenerationTime;
    }

    return {}
}

function Fractal(data = '') {
    let axiom;
    let rules;
    let angle;
    let depth;
    let format;
    let optional;

    function constructor(data) {
        rules = new Array();
        let requiredParam = ['axiom', 'angle', 'rules', 'depth'];
        if (typeof data !== 'string') {
            if (data.hasOwnProperty('axiom'))
                SetAxiom(data['axiom']);
            if (data.hasOwnProperty('angle'))
                SetAngle(data['angle']);
            if (data.hasOwnProperty('rules')) {
                for (let i = 0; i < data['rules'].length; i++)
                    AddRule(data['rules'][i])
            }
            if (data.hasOwnProperty('depth'))
                SetDepth(data['depth']);
            OptionalParameters(data);
        }
    }

    constructor(data);

    /**
     * @return {number}
     */
    function GetDepth() {
        if (depth === undefined) {
            console.warn("The depth is not precised. Default depth will be used: 2");
            return 2;
        }
        return depth;
    }

    /**
     * @return {string}
     */
    function GetFormat() {
        if (format === undefined) {
            console.warn("No format precised. Default format will be used: png");
            return 'png';
        }
        return format;
    }

    /**
     * @return {number}
     */
    function GetAngle() {
        if (angle === undefined) {
            console.warn("No angle precised.Default angle will be used :45");
            return 45;
        }
        return angle;
    }

    function GetAxiom() {
        if (axiom === undefined) {
            throw "A fractal need to have a axiom";
        }
        return axiom;
    }

    function GetRules() {
        if (rules.length === 0) {
            throw "A fractal need to have at least a rule";
        }
        return rules;
    }


    function SetFormat(formatInput) {
        if (typeof formatInput != "string")
            throw "required parameter \"format\" need to be a string";
        if (Constants().isValidFormats(formatInput)) {
            format = formatInput;
            return this;
        } else
            throw "Error:Invalid format requested" +
            "\nInfo: Valid format are: " + Constants.Constants.formats.toString();
    }

    function SetDepth(depthInput) {
        if (typeof depthInput !== 'number')
            throw "Error: Depth need to be a positive integer";
        if (depthInput < 0)
            throw "Error: Depth need to be a positive integer";
        if (Number(depthInput) !== depthInput || depthInput % 1 !== 0)
            throw "Error: Depth need to be a positive integer";
        depth = depthInput;
        return this;
    }

    function SetAngle(angleInput) {
        if (typeof angleInput != "number")
            throw "required parameter \"angle\" need to be a number";
        angle = angleInput;
        return this;
    }

    function SetAxiom(axiomInput) {
        if (typeof axiomInput != "string")
            throw "required parameter \"axiom\" need to be a string";
        if (axiomInput.length === 0)
            throw "Error: axiom string is empty";
        axiom = axiomInput;
        return this;
    }

    function AddRule(ruleInput) {
        if (typeof ruleInput != "string")
            throw "required parameter \"rule\" need to be a string";
        if (ruleInput.length === 0)
            throw "Error: rule string is empty";
        rules.push(ruleInput);
        return this;
    }

    function Completed() {

    }

    function OptionalParameters(paramsInput) {
        optional = paramsInput;
        return this;
    }

    function validateOptional() {
        if (optional.hasOwnProperty('stringify'))
            if (typeof optional['stringify'] !== 'boolean')
                throw `stringify is a boolean value. You passed a ${typeof optional['stringify']}`
        if (optional.hasOwnProperty('lineColor'))
            if (typeof optional['lineColor'] !== 'string')
                throw `stringify is a string value. You passed a ${typeof optional['lineColor']}`
        if (optional.hasOwnProperty('backColor'))
            if (typeof optional['backColor'] !== 'string')
                throw `stringify is a string value. You passed a ${typeof optional['backColor']}`
        if (optional.hasOwnProperty('lineWidth'))
            if (typeof optional['lineWidth'] !== 'number')
                throw `stringify is a number value. You passed a ${typeof optional['lineWidth']}`
        if (optional.hasOwnProperty('antialias'))
            if (typeof optional['antialias'] !== 'boolean')
                throw `stringify is a boolean value. You passed a ${typeof optional['antialias']}`
        if (optional.hasOwnProperty('lengthFactor'))
            if (typeof optional['lengthFactor'] !== 'number')
                throw `stringify is a number value. You passed a ${typeof optional['lengthFactor']}`
        if (optional.hasOwnProperty('lineLength'))
            if (typeof optional['lengthFactor'] !== 'number')
                throw `stringify is a number value. You passed a ${typeof optional['lineLength']}`

    }

    /**
     * @return {string}
     */
    function GetOptional() {
        let queryOptional = '';
        const optionalParams = ['lineWidth', 'antialias', 'lengthFactor', 'lineLength'];
        for (let i = 0; i < optionalParams.length; i++) {
            if (optional.hasOwnProperty(optionalParams[i])) {
                queryOptional += `&${optionalParams[i]}=${optional[optionalParams[i]]}`;
            }
        }
        if (optionalParams.hasOwnProperty('backColor'))
            queryOptional += `&backColor=${encodeURIComponent(optionalParams['backColor'])}`;

        if (optionalParams.hasOwnProperty('lineColor'))
            queryOptional += `&lineColor=${encodeURIComponent(optionalParams['lineColor'])}`;
        if (optional.hasOwnProperty('stringify')) {
            queryOptional += `&stringify=${optional['stringify']}`;
        } else
            queryOptional += `&stringify=${false}`;
        return queryOptional;
    }

    /**
     * @return {string}
     */
    function GetQuery() {
        validateOptional();
        return `?axiom=${GetAxiom()}&angle=${GetAngle()}&rules=${encodeURIComponent(GetRules().join(','))}&depth=${GetDepth()}&format=${format}&${GetOptional()}`;
    }

    return {
        Completed, AddRule, SetAxiom, SetAngle, SetDepth, SetFormat, GetQuery, OptionalParameters
    }
}

function createFractal() {
    var fractal1 = Fractal();
    fractal1.SetFormat("pdf")
        .SetDepth(1)
        .SetAxiom("Y")
        .SetAngle(25.7)
        .AddRule('X -> X[-FFF][+FFF]FX')
        .AddRule('Y -> YFX[+Y][-Y]')
        .OptionalParameters(
            {
                "stringify": false,
                "lineColor": "red",
                "backColor": "black",
                "lineWidth": 0.25,
                "antialias": true,
                "lengthFactor": 1,
                "lineLength": 10
            }
        ).Completed();
    return fractal1;
}


let token = 's7kGlw8E99MKAss7Ep2ZYtblshOcon8omQVTc4l2yfg5H6LsTos1tVafvNTP8vF9cinBMCjozcuDgMTQ75CdTrezt4KKvGfp1v9RYepz6Nn2yxl3QgXc8bs8n0wEXNHv';

async function f() {

    var fractal1 = createFractal();
    var lib = Fric(token);
    lib.AddFractal(fractal1);
    lib.AddFractals([fractal1, fractal1]);
    await lib.makeRequest();
    lib.show();
}

f();