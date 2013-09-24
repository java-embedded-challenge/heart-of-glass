/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var ldata=new Array();
var lnum=0;
var lw=999;
var hg=50;
var avg=50;
function run(){

            $.ajax({
url: 'index.jsp',
type: "GET",
dataType: "json",
success: function (data) {
      
ldata=new Array();

  $.each(data, function(i,item){
      ldata.push(item);
if(item>hg)hg=item;
if(item<lw)lw=item;
 lnum=item;

                         });
var sum=0;
for (var i = 0; i < ldata.length; i++) {
       sum=sum+ parseInt(ldata[i]);
            // Do something with element i.
}
 avg=sum;
if(ldata.length>0)avg=sum/ldata.length;

$("#number").html(lnum);
$("#avg").html( parseInt(avg));

draw();

$("#himage").fadeToggle('slow');
}
});
            setTimeout(run,1000);

}
var w=640,h=480,lim=30;


function draw(){

var drawingCanvas = document.getElementById('draw');
if(drawingCanvas.getContext) {
// Initaliase a 2-dimensional drawing context
var context = drawingCanvas.getContext('2d');
//Canvas commands go here
var i=0;


context.beginPath();
context.fillStyle="#F0F0F0";
context.fillRect(0,0,w,h);
context.fillStyle="#0a0a0a";
var length = ldata.length,
    element = null;
    context.moveTo(0, h/1);
    
for (var i = 0; i < length; i++) {
       element = ldata[i];
     context.lineTo(i*(w/lim),h/2+100-element);

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