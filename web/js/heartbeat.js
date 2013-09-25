/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ldata = new Array();
var lnum = 80;
var maxhb = 240;
var threshold = 180;
var lthreshold = 80;
var w = 1000, h = 550, lim = 30;


function start() {
    setLimits();
    run();
    beatOn();
}


function run() {

    $.ajax({
        url: 'data.jsp',
        type: "GET",
        dataType: "json",
        success: function(data) {
            
            lnum = data[data.length - 1];

         ldata=data;

            $("#number").html(lnum);
            draw();
        }
    });


//    if (hg > threshold)
  //      logWarn('Too high ' + hg);
   
    setTimeout(run, 1000);

}

function beatOn() {
if(lnum<lthreshold){
    $("#himage").attr("src", "images/heart.png");
}else
if(lnum<threshold){
    $("#himage").attr("src", "images/heartg.png");
}else
{
    $("#himage").attr("src", "images/heartr.png");

}

    $("#himage").fadeIn({duration: 50});
    setTimeout(beatOff, 60000 / lnum / 2);
}

function beatOff() {
    $("#himage").fadeOut({duration: 50});
    setTimeout(beatOn, 60000 / lnum / 2);

}


function draw() {

    var drawingCanvas = document.getElementById('draw');
    if (drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
        var i = 0;


        context.beginPath();
        context.save();
        context.fillStyle = "#660900";
        context.fillRect(0, 0, w, h - (threshold * h / maxhb));
        context.fill();

        context.restore();
        context.save();
        context.fillStyle = "#5b8b02";
        context.fillRect(0, h - (threshold * h / maxhb), w, h - (lthreshold * h / maxhb));
        context.fill();

        context.restore();

        context.save();
        context.fillStyle = "#0000";
        context.fillRect(0, h - (lthreshold * h / maxhb), w, h);
        context.fill();





        context.restore();




        var gradient = context.createLinearGradient(0, h, 0, 0);
        gradient.addColorStop(0.0, "#b0b0b0");
        gradient.addColorStop(0.5, "#b0b0b0");
        gradient.addColorStop(0.5, "#90ff90");
        gradient.addColorStop(0.85, "#90ff90");
        gradient.addColorStop(0.85, "#ff9090");
        gradient.addColorStop(1.0, "#ff9090");

        context.strokeStyle = gradient;
        var length = ldata.length,
                element = null;
        context.lineWidth = 5;
        for (var i = 0; i < length; i++) {
            element = ldata[i];
            var nx = i * (w / lim);
            var ny = h - element * h / maxhb;
            context.lineTo(nx, ny);
        }

        context.stroke();

    }

}


function countChildElements(parent, child)
{
    try {
        var parent = document.getElementById(parent);
        var childCount = parent.getElementsByTagName(child).length;
        return childCount;
    } catch (e) {
        return 0;
    }
}

var c = 0;

function delFirst() {

    if (countChildElements("log", 'p') > 2) {
        document.getElementById("log").removeChild(document.getElementById("log").firstChild);
    }
}



function logWarn(s) {
//alert(s);
    delFirst();
    $("#log").append('<p class = "warn">' + s + '</p>');
}


function log(s) {
//alert(s);
    delFirst();
    $("#log").append('<p>' + s + '</p>');
}



var ageTargetRates = {
    20: [100, 170, 200],
    25: [95, 162, 190],
    30: [95, 162, 190],
    35: [93, 157, 185],
    40: [90, 153, 180],
    45: [88, 149, 175],
    50: [85, 145, 170],
    55: [83, 140, 165],
    60: [80, 136, 160],
    65: [78, 132, 155],
    70: [75, 128, 150]
};


function setLimits() {
    var age = window.location.hash.substring(1);
    age = 31;
    var targetRates = ageTargetRates[Math.floor((parseInt(age) + 4) / 5) * 5];
    lthreshold = targetRates[0];
    threshold = targetRates[1];
    maxhb = targetRates[2];

    ;
}