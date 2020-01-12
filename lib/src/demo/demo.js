let demo = (function () {
    const html_presets = document.getElementById("selected");
    const html_format = document.getElementById("format");
    const html_axiom = document.getElementById("axiom");
    const html_angle = document.getElementById("angle");
    const html_rules = document.getElementById("rules");
    const html_depth = document.getElementById("depth");
    const html_lineColor = document.getElementById("lineColor");
    const html_backColor = document.getElementById("backColor");
    const html_lineWidth = document.getElementById("lineWidth");
    const html_lengthFactor = document.getElementById("lengthFactor");
    const html_lineLength = document.getElementById("lineLength");
    const html_antialias = document.getElementById("antialias");


    function createData() {
        return {
            "format": html_format.value,
            "axiom": html_axiom.value,
            "backColor": html_backColor.value,
            "angle": parseFloat(html_angle.value),
            "rules": html_rules.value.split(","),
            "depth": parseInt(html_depth.value),
            "lineColor": html_lineColor.value,
            "lineWidth": parseFloat(html_lineWidth.value),
            "lengthFactor": parseFloat(html_lengthFactor.value),
            "antialias": html_antialias.checked,
            "lineLength": parseFloat(html_lineLength.value)
        }
    }

    function show() {
        generate(createData());
        // alert("fractal generated")
    }

    function setPage(data) {
        // html_presets.value = 1;
        // html_format.value = data['format'];
        html_axiom.value = data['axiom'];
        html_angle.value = data['angle'];
        html_rules.value = data['rules'];
        html_depth.value = data['depth'];
        html_lineColor.value = data['lineColor'];
        html_backColor.value = data['backColor'];
        html_lineWidth.value = data['lineWidth'];
        html_lengthFactor.value = data['lengthFactor'];
        if (data.hasOwnProperty('lineLength'))
            html_lineLength.value = data['lineLength'];
        else html_lineLength.value = 1;
        if (data.hasOwnProperty('antialias'))
            html_antialias.value = data['antialias'];
        else
            html_antialias.value = false;
    }

    (function initializePage() {
        setPage(exemples['leaf']);
        generate(exemples['leaf']);
    })();


    async function generate(data) {
        let token = 's7kGlw8E99MKAss7Ep2ZYtblshOcon8omQVTc4l2yfg5H6LsTos1tVafvNTP8vF9cinBMCjozcuDgMTQ75CdTrezt4KKvGfp1v9RYepz6Nn2yxl3QgXc8bs8n0wEXNHv';
        const fric = Fric(token);
        let fractal = Fractal(data);
        fric.AddFractal(fractal);
        // try {
            await fric.makeRequest();
            let imageSrc = fric.GetResult(0).data.link;
            let format = fractal.GetFormat();
            if (format === 'png' || format === 'jpeg') {
                document.getElementById("container-result").innerHTML="        <img id=\"result\"> \n"
                let html_image = document.getElementById("result");
                console.log(html_image);
                html_image.src = imageSrc + "?" + new Date().getTime();
            } else if (format === "pdf") {
                window.open(imageSrc);
            } else {
                fetch(imageSrc, {
                    headers: {
                        "Content-Type": "image/svg+xml"
                    }
                }).then((response) => {
                    return response.text().then(function(text) {
                        document.getElementById("container-result").innerHTML=text;
                    });
                })
            }
        // } catch (e) {
        //     alert(e.message)
        // }


    }

    return {
        generate, setPage, show
    }
})();

function val() {
    d = document.getElementById("selected").value;
    demo.setPage(exemples[d]);

}