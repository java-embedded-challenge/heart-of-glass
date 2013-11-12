/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var w = 1000, h = 550, lim = 30;

var heart_beat_recent_data = new Array();
var last_heart_beat = 80;
var upper_heart_beat_limit = 240;
var normal_heart_beat_limit = 180;
var below_normal_heart_beat_limit = 80;


function start() {
    setLimits();
    run();
    beatOn();
}


function run() {

    $.ajax({//ajax request to get new samples from the raspberry pi
        url: 'data.jsp',
        type: "GET",
        dataType: "json",
        success: function(data) {

            last_heart_beat = data[data.length - 1];
//alert(last_heart_beat);
            heart_beat_recent_data = data;

            $("#number").html(last_heart_beat);
            draw();
        }
    });


//    if (hg > normal_heart_beat_limit)
    //      logWarn('Too high ' + hg);

    setTimeout(run, 1000);//get new samples every second

}


function secureHeartBeat(b){//check heart beat valuest to avoid animation bug
    if(b<1)return 10;
    if(b>250)return 250;
    return b;
    
}
function beatOn() {
    
    //chenge the color of the heart according to the limits
    if (last_heart_beat < below_normal_heart_beat_limit) {
        $("#himage").attr("src", "images/heart.png");
    } else
    if (last_heart_beat < normal_heart_beat_limit) {
        $("#himage").attr("src", "images/heartg.png");
    } else
    {
        $("#himage").attr("src", "images/heartr.png");

    }

    $("#himage").fadeIn({duration: 50});//shows the heart
    // 60000 / last_heart_beat / 2= half time of a heartbeat for fadeif
    setTimeout(beatOff, 60000 / secureHeartBeat(last_heart_beat) / 2);
}

function beatOff() {
    $("#himage").fadeOut({duration: 50});//hides the heart
       // 60000 / last_heart_beat / 2= half time of a heartbeat for fadeOut
    setTimeout(beatOn, 60000 / secureHeartBeat(last_heart_beat) / 2);

}


function draw() {
//This is for drawing all the lines
    var drawingCanvas = document.getElementById("draw");
    if (drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
        var i = 0;

//draw background zones black green red
        context.beginPath();
        context.save();
        context.fillStyle = "#660900";
        context.fillRect(0, 0, w, h - (normal_heart_beat_limit * h / upper_heart_beat_limit));
        context.fill();

        context.restore();
        context.save();
        context.fillStyle = "#5b8b02";
        context.fillRect(0, h - (normal_heart_beat_limit * h / upper_heart_beat_limit), w, h - (below_normal_heart_beat_limit * h / upper_heart_beat_limit));
        context.fill();

        context.restore();

        context.save();
        context.fillStyle = "#0000";
        context.fillRect(0, h - (below_normal_heart_beat_limit * h / upper_heart_beat_limit), w, h);
        context.fill();





        context.restore();


//gradient for the line


        var gradient = context.createLinearGradient(0, h, 0, 0);
        gradient.addColorStop(0.0, "#b0b0b0");
        gradient.addColorStop(0.5, "#b0b0b0");
        gradient.addColorStop(0.5, "#90ff90");
        gradient.addColorStop(0.85, "#90ff90");
        gradient.addColorStop(0.85, "#ff9090");
        gradient.addColorStop(1.0, "#ff9090");

        context.strokeStyle = gradient;
        var length = heart_beat_recent_data.length,
                element = null;
        context.lineWidth = 5;
        //the line

        for (var i = 0; i < length; i++) {
            element = heart_beat_recent_data[i];
            var nx = i * (w / lim);
            var ny = h - element * h / upper_heart_beat_limit;
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

//this is to remove the first child of the log console
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


//this is to get age ranges 
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

//this is to set limits and values

function setLimits() {
    var age = window.location.hash.substring(1);//get the age
    if(parseInt(age)<1||age==''||age==undefined) age = 31;
    
    var targetRates = ageTargetRates[Math.floor((parseInt(age) + 4) / 5) * 5];
    below_normal_heart_beat_limit = targetRates[0];
    normal_heart_beat_limit = targetRates[1];
    upper_heart_beat_limit = targetRates[2];

    ;
}