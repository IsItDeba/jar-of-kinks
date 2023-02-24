
let values = ["no", "maybe", "yes", "YES"]
let params = new URLSearchParams(window.location.search);

function clickKink(e) {
    let kinkElement = $(e.currentTarget);
    updateJar(kinkElement, 1);
}

function updateJar(kinkElement, modifier=1, override=false) {
    // Get current kink value
    const kinkId = kinkElement.attr("id");
    let currentValue = params.get(kinkId);

    // Update if need be. If value is at the highest, reset to 0
    let newClassIndex = values.indexOf(currentValue) + modifier;
    if (newClassIndex >= values.length || currentValue == undefined) { newClassIndex = 0; }

    let newValue = values[newClassIndex];

    // Make sure to use !== for type checking. 0 == false & 0 !== false
    if (override !== false) {
        newValue = values[override];
    }

    params.set(kinkId, newValue);

    let valueElement = kinkElement.find(".value");
    valueElement.attr("class", `value ${newValue}`)

    updateUrl();
}

function updateUrl() {
    history.pushState(null, "", window.location.pathname + "?" + params.toString());
}

function reset() {
    $(".kink").each(function(e){
        updateJar($(this), 0, 0);  // Update the jar without modifying it
    });
}

function renderImage() {
    html2canvas(document.querySelector("main")).then(function (canvas) {
        $("#render").attr("src", canvas.toDataURL("image/png"))
    });
}

$(document).ready(function() {


    $(".kink").click(clickKink)
    $(".kink").each(function(e){
        updateJar($(this), 0);  // Update the jar without modifying it
    });
    $("#reset").click(reset);
    $("#share").click(renderImage)
});