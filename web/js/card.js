var e=this,f=function(a,b){var c=a.split("."),d=e;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var g;c.length&&(g=c.shift());)c.length||void 0===b?d=d[g]?d[g]:d[g]={}:d[g]=b};Math.random();
var h=function(a,b,c){return a.call.apply(a.bind,arguments)},n=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},p=function(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?h:n;return p.apply(null,arguments)};
Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return p.apply(null,c)}return p(this,a)};var q=function(a,b){this.a=[];this.j=!1;this.t=!!a;this.f=b},r=[{className:"text-x-small",e:0},{className:"text-small",e:0},{className:"text-normal",e:0},{className:"text-large",e:0},{className:"text-x-large",e:14}],s=function(a,b){var c=new q(a,b);if("complete"==document.readyState)window.setTimeout(p(c.r,c),0);else{var d=function(){"complete"==document.readyState&&(document.removeEventListener("readystatechange",d,!1),c.r())};document.addEventListener("readystatechange",d,!1)}return c};
f("AutoSizer.init",s);var y=function(){var a=t.s;u(a);a.a.length?a.j?v(a):a.c||w(a):x(a)};q.prototype.r=function(){u(this);0!=this.a.length||this.t?w(this):x(this)};var w=function(a){a.d=document.getElementsByTagName("body")[0];a.c=z(a);a.c.style.fontFamily="Roboto";a.o=z(a);window.setTimeout(p(a.p,a),10)},u=function(a){var b=document.getElementsByClassName("text-auto-size");a.a=[];for(var c=0;c<b.length;c++){var d=b[c];a.a.push(d);d.style.visibility="hidden"}};
q.prototype.p=function(){this.c.clientWidth<this.o.clientWidth?(this.j=!0,this.d.removeChild(this.c),this.d.removeChild(this.o),v(this)):window.setTimeout(p(this.p,this),10)};
var v=function(a){for(var b=0;b<a.a.length;b++){var c=a.a[b],d=document.defaultView.getComputedStyle(c,null),g=parseInt(d.height,10),d=parseInt(d.width,10);c.style.height="auto";c.style.width="auto";for(var m="text-auto-size",l=1;l<r.length;l++){c.className=c.className.replace(m,r[l].className);if(c.scrollHeight>g+r[l].e||c.scrollWidth>d){c.className=c.className.replace(r[l].className,r[l-1].className);break}m=r[l].className}c.style.height="";c.style.width="";c.style.visibility=""}x(a)},z=function(a){var b=
document.createElement("DIV");a.d.appendChild(b);b.appendChild(document.createTextNode("Xx"));b.style.fontWeight="100";b.style.fontSize="30px";b.style.position="absolute";b.style.top="-100px";b.style.width="auto";b.style.margin="0";b.style.padding="0";return b},x=function(a){a.f?a.f():window.GLASS.autoSizingComplete()};Math.random();var A=Array.prototype,B=A.indexOf?function(a,b,c){return A.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if("string"==typeof a)return"string"==typeof b&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};var C=!!e.DOMTokenList,D=C?function(a){return a.classList}:function(a){a=a.className;return"string"==typeof a&&a.match(/\S+/g)||[]},E=C?function(a,b){return a.classList.contains(b)}:function(a,b){var c=D(a);return 0<=B(c,b)};var F=function(a,b){this.a=[];this.f=Boolean(a);this.d=b},G=function(a,b){var c=new F(a,b);if("complete"==document.readyState)window.setTimeout(p(c.c,c),0);else{var d=function(){"complete"==document.readyState&&(document.removeEventListener("readystatechange",d,!1),c.c())};document.addEventListener("readystatechange",d,!1)}return c};f("Paginator.init",G);
F.prototype.c=function(){H(this);if(this.f)if(1<this.a.length){var a=640*this.a.length;I(this,a)}else 1==this.a.length&&(a=this.a[0],E(a,"auto-paginate")?(a=J(a),640<a&&I(this,a)):I(this,640));else K(this)};
var H=function(a){var b=document.getElementsByTagName("article");a.a=[];for(var c=0;c<b.length;c++)a.a.push(b[c])},I=function(a,b){a.d?a.d(b,360):window.GLASS.setContentSize(b,360)},L=function(a){var b=document.documentElement;a=a.getBoundingClientRect();return{top:a.top+window.pageYOffset-b.clientTop,left:a.left+window.pageXOffset-b.clientLeft}},J=function(a){var b,c=document.createElement("DIV");c.textContent="&nbsp;";a.appendChild(c);b=document.documentElement;for(var d=c.offsetParent||b;d&&"HTML"!=
d.nodeName&&"static"===d.style.position;)d=d.offsetParent;b=d||b;var d={top:0,left:0},g=L(c);"HTML"!=b.nodeName&&(d=L(b));var m=window.getComputedStyle(c,null);b=g.top-d.top-parseFloat(m.getPropertyValue("margin-top"));d=g.left-d.left-parseFloat(m.getPropertyValue("margin-left"));40>=b&&(d-=640);a.removeChild(c);return d+640},K=function(a){for(var b=E(a.a[0],"cover-only")?-640:0,c=0;c<a.a.length;c++){var d=a.a[c];d.style.left="0px";var g=0,g=E(d,"auto-paginate")?J(d):640;d.style.left=b+"px";d.style.visibility=
"visible";b+=g}I(a,b)};var M={},N={},t={};N.m="text-x-small text-small text-normal text-large text-x-large";N.b=640;N.A=360;N.l="text-auto-size";N.B="cover-only";N.h="map-text-node";N.n="map-time-footer";t.L="p, h1, h2, h3, h4, td, li";t.i=0;t.C=200;t.R="https://www.googleapis.com/mirror/v1";t.N="h1,h2,h3,h4,h5,h6,img,li,ol,ul,article,aside,details,figure,figcaption,footer,header,nav,section,summary,time,blockquote,br,div,hr,p,span,b,big,center,em,i,u,s,small,strike,strong,style,sub,sup,table,tbody,td,tfoot,th,thead,tr";
t.O="head,title,audio,embed,object,source,video,frame,frameset,applet,script";var O={};
N.u=function(a){if(a.attachments)for(var b=0;b<a.attachments.length;++b){var c=a.attachments[b],d;if(0==c.contentType.indexOf("image/"))d=$("<img>"),t.g(c.id,d);else if(0==c.contentType.indexOf("video/")){var g=$("<source>");t.g(c.id,g);g.attr("type",c.contentType);d=$("<video>");d.append(g)}if(d){d.width(N.b).height(N.A);$("article").append(d).append($("<div>").addClass("photo-overlay"));$("article").addClass("photo");break}}};
N.v=function(a){a.attachments&&$("img",$(".card")).each(function(b,c){c=$(c);var d=c.attr("src");0==d.indexOf("attachment:")?(d=parseInt(d.substr(d.indexOf(":")+1),10),d<a.attachments.length&&t.g(a.attachments[d].id,c)):0==d.indexOf("cid:")&&t.g(d.substr(d.indexOf(":")+1),c)})};
N.q=function(a){$(".card").empty();a&&$(".card").css("left",0);a=O.content;if(a.html){var b=$("<div>").html(a.html);t.k(b,!0);var c=b.children();c.detach();c.appendTo(".card");b.remove();N.v(a)}else{var b=$("<article>"),c=$("<section>"),d=$("<p>");$(".card").append(b);for(var g=(a.text||"").split("\n"),m=0;m<g.length;++m){var l=g[m];l?d.append($("<div>").text(l)):d.append($("<div>").append($("<br>")))}N.u(a);if(a.creator&&a.creator.imageUrls&&0<a.creator.imageUrls.length){var k=$("<img>");k.attr("src",
a.creator.imageUrls[0]);b.append($("<figure>").append(k));k.load(function(){var a=k.parent();k.height(a.height());k.css("margin-left",(a.width()-k.width())/2);k.css("margin-right",(a.width()-k.width())/2);k.css("margin-top",(a.height()-k.height())/2);k.css("margin-bottom",(a.height()-k.height())/2)})}b.append(c);c.append(d);d.attr("class","text-auto-size");d.attr("id",N.h)}$(".text-auto-size").each(function(a,c){$(c).attr("data-text-autosize","true");$(c).keyup(function(){$(c).removeClass(N.m);$(c).addClass(N.l);
y()})});y();O.id||t.w();a=$("<footer>").attr("id",N.n).append($("<time>").text(O.footer));$("article").append(a)};N.D=function(){if(!O.id){var a=t.H;H(a);K(a)}};
N.K=function(a){var b=$("article",$(".card"));0<b.length&&$(b[0]).hasClass(N.B)&&(a+=N.b,b.each(function(a,b){var g=$(b).position().left;$(b).css("left",g+N.b)}));$(".card").width(a);a>N.b?$(".scroll").show():$(".scroll").hide();b=$(".card").position().left;N.b>=a+b&&(b=N.b-a,b=Math.floor(b/N.b)*N.b,$(".card").css("left",b),$(".rightscroll").hide());0==b&&$(".leftscroll").hide()};
N.Q=function(){var a=$(".card").position().left-N.b,a=Math.floor(a/N.b)*N.b;$(".card").css("left",a);N.b>=$(".card").width()+a&&$(".rightscroll").hide();$(".leftscroll").show()};N.scrollLeft=function(){var a=$(".card").position().left+N.b,a=Math.floor(a/N.b)*N.b;$(".card").css("left",a);0==a&&$(".leftscroll").hide();$(".rightscroll").show()};
t.g=function(a,b){O.accessToken&&gapi.auth&&(gapi.auth.setToken({access_token:O.accessToken}),gapi.client.request({path:"/mirror/v1/timeline/"+O.content.id+"/attachments/"+a}).execute(function(a){a&&a.contentUrl&&b.attr("src",t.P(a.contentUrl))}))};t.w=function(){$(t.L,$(".card")).attr("contenteditable","true");$("div",$(".card")).each(function(a,b){b=$(b);0!=$.trim(b.html()).indexOf("<")&&b.attr("contenteditable","true")});$("#"+N.h+" div").attr("contenteditable",null);M.M()};
t.k=function(a,b){b&&$(t.O,a).remove();a.children().each(function(a,b){b=$(b);t.k(b);b.is(t.N)||(b.children().unwrap(),b.remove())})};
t.I=function(){var a=$(".card").clone();$("#"+N.n,a).remove();$("*[contenteditable=true]",a).each(function(a,c){c=$(c);c.html()&&c.html(c.html().replace(/<div><br><\/div>/g,"<br/>"))});$("[data-text-autosize=true]",a).each(function(a,c){c=$(c);c.removeClass(N.m);c.addClass(N.l);c.attr("data-text-autosize",null);c.attr("style")||c.attr("style",null)});$("[contenteditable=true]",a).attr("contenteditable",null);return a.html()};
t.J=function(){var a="";$("#"+N.h+" > div").each(function(){a+=$("<p>").html($(this).html().replace(/<br>/g,"\n")).text()+"\n"});a&&(a=a.substr(0,a.length-1));return a};t.P=function(a){if(a&&O.accessToken){var b="access_token="+O.accessToken;return-1!=a.indexOf("?")?a+"&"+b:a+"?"+b}return a};
M.M=function(){$("[contenteditable=true]").bind("paste keyup blur input",function(){clearTimeout(t.i);O.content.html?O.content.html=t.I():O.content.text=t.J();window.parent.postMessage({event:"changed",id:O.id,content:O.content},"*")});$("[contenteditable=true]").blur(function(){t.i=setTimeout(N.q,t.C)});$("[contenteditable=true]").focus(function(){clearTimeout(t.i)})};
M.G=function(){window.addEventListener("message",function(a){a=a.data;"content"==a.event?(O=a,N.q(a.selected)):"unselect"==a.event?$(".card").removeClass("selected"):"select"==a.event&&$(".card").addClass("selected")},!1)};M.F=function(){$(".card").click(function(){$(this).hasClass("selected")||window.parent.postMessage({event:"clicked",id:O.id,content:O.content},"*")});$(".rightscroll").click(N.Q);$(".leftscroll").click(N.scrollLeft)};f("initAuth",function(){gapi.auth.init(function(){})});
$(document).ready(function(){t.H=G(!0,N.K);t.s=s(!0,N.D);M.G();M.F()});
