/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ldata = new Array();
var ldatalie = new Array();
var lnum = 0;
var lw = 999;
var hg = 0;
var maxhb=240;
var threshold = 180;
var lthreshold = 80;
var avg = 50;
var lie = false;

function start(){
setLimits();
    
                setTimeout(run,1000);

}


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

//            liedetect(ldata);

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
var w = 1000, h = 550, lim = 30;


function draw() {

    var drawingCanvas = document.getElementById('draw');
    if (drawingCanvas.getContext) {
// Initaliase a 2-dimensional drawing context
        var context = drawingCanvas.getContext('2d');
//Canvas commands go here
        var i = 0;


        context.beginPath();
        context.save();
        context.fillStyle = "#440000";
        context.fillRect(0, 0, w, h-(threshold *h/maxhb));
        context.fill();
    
    context.restore();
    context.save();
        context.fillStyle = "#004400";
        context.fillRect(0, h-(threshold*h/maxhb), w, h-(lthreshold*h/maxhb));
        context.fill();
    
    context.restore();
    
    context.save();
        context.fillStyle = "#444";
        context.fillRect(0, h-(lthreshold*h/maxhb), w, h);
        context.fill();
    




    context.restore();
    
        
        
        //context.strokeStyle = "#ffffff";
        
var gradient = context.createLinearGradient(0,h,0,0);
				gradient.addColorStop(0.0,"#b0b0b0");
				gradient.addColorStop(0.5,"#b0b0b0");
				gradient.addColorStop(0.5,"#90ff90");
				gradient.addColorStop(0.85,"#90ff90");
				gradient.addColorStop(0.85,"#ff9090");
				gradient.addColorStop(1.0,"#ff9090");
				
				context.strokeStyle = gradient;
        var length = ldata.length,
                element = null;
//        context.moveTo(0, h / 2);
  context.lineWidth = 5;
        for (var i = 0; i < length; i++) {
            element = ldata[i];
            var nx = i * (w / lim);
            var ny = h - element*h/maxhb;
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


var ageTargetRates = {
				20: [ 100, 170, 200],
				25: [ 95, 162, 190],
				30: [ 95, 162, 190],
				35: [ 93, 157, 185],
				40: [ 90, 153, 180],
				45: [ 88, 149, 175],
				50: [ 85, 145, 170],
				55: [ 83, 140, 165],
				60: [ 80, 136, 160],
				65: [ 78, 132, 155],
				70: [ 75, 128, 150]
			};
                        
                        
                        function setLimits() {
                                		    var age = window.location.hash.substring(1);
age=31;
				var targetRates = ageTargetRates[Math.floor((parseInt(age)+4)/5)*5];
                                lthreshold = targetRates[0];
                                threshold = targetRates[1];
                                maxhb = targetRates[2];
                                
                                ;
    		}