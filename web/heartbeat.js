/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ldata = new Array();
var ldatalie = new Array();
var lnum = 0;
var lw = 999;
var hg = 50;
var threshold = 60;
var avg = 50;
var lie = false;

function favg(ar) {

    var sum = 0;
    for (var i = 0; i < ar.length; i++) {
        sum = sum + parseInt(ar[i]);
        // Do something with element i.
    }
    var avg = sum;
    if (ar.length > 0) {
        avg = sum / ar.length;
    }
    return avg;
}


function standardeviation(ar) {
    var av = favg(ar);
    var sum = 0;
    for (var i = 0; i < ar.length; i++) {
        sum = sum + Math.pow((parseInt(ar[i]) - av), 2);
        // Do something with element i.
    }
    var sd = 0;
    if (ar.length > 0)
        sd = Math.sqrt(sum / ar.length);
    //alert(sum+" "+ar.length+' '+ sd);
    return sd;
}

//simple lie detector
function liedetect(ar) {
    var av = favg(ar);
    var sd = standardeviation(ar);

    for (var i = 0; i < ar.length; i++) {
        if (parseInt(ar[i])>60&&parseInt(ar[i])<100&&   Math.abs(parseInt(ar[i]) - avg) > sd * 2) {
            ldatalie[i] = true;
            //alert('lie at'+i);
            lie = true;
        }
        // Do something with element i.
    }
}
function reset() {
    ldata = new Array();
    ldatalie = new Array();
    lie = false;

}
function put(e) {
    ldata.push(e);
    ldatalie.push(false);

}
function run() {

    $.ajax({
        url: 'index.jsp',
        type: "GET",
        dataType: "json",
        success: function(data) {
            reset();

            $.each(data, function(i, item) {
                put(item);

                if (item > hg)
                    hg = item;
                if (item < lw)
                    lw = item;
                lnum = item;

            });

            avg = favg(ldata);

            $("#number").html(lnum);
            $("#avg").html(parseInt(avg));

            liedetect(ldata);

            draw();
//beat according to hr
//alert(1000.0/ (lnum/60.0) );
            $("#himage").fadeToggle({duration:1000.0/ (lnum/60.0)  });
        }
    });


    if (hg > threshold)
        logWarn('Too high ' + hg);
    if (lie == true)
        logWarn('Lie detected');
    setTimeout(run, 1000);

}
var w = 640, h = 360, lim = 30;


function draw() {

    var drawingCanvas = document.getElementById('draw');
    if (drawingCanvas.getContext) {
// Initaliase a 2-dimensional drawing context
        var context = drawingCanvas.getContext('2d');
//Canvas commands go here
        var i = 0;


        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "#ffffff";
        var length = ldata.length,
                element = null;
        context.moveTo(0, h / 1);

        for (var i = 0; i < length; i++) {
            element = ldata[i];
            var nx = i * (w / lim);
            var ny = h / 2 + 100 - element;
            context.lineTo(nx, ny);
//lie point
            if (ldatalie[i] == true)
                context.arc(nx, ny, 4, 0, 360, false);

            // Do something with element i.
        }

        context.stroke();
//context.fillStyle = "#fafafa";
//context.moveTo(0, h/2+100-avg);
//context.lineTo(w,h/2+100-avg);
//context.stroke();
//context.endPath();

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

log('Welcome');