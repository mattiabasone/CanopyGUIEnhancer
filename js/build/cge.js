/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width")||t.canvas.width,n=this.height=i(t.canvas,"Height")||t.canvas.height;return e=this.width=t.canvas.width,n=this.height=t.canvas.height,this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipTitleTemplate:"<%= label%>",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= datasetLabel %>: <%= value %>",multiTooltipKeyBackground:"#fff",segmentColorDefault:["#A6CEE3","#1F78B4","#B2DF8A","#33A02C","#FB9A99","#E31A1C","#FDBF6F","#FF7F00","#CAB2D6","#6A3D9A","#B4B482","#B15928"],segmentHighlightColorDefaults:["#CEF6FF","#47A0DC","#DAFFB2","#5BC854","#FFC2C1","#FF4244","#FFE797","#FFA728","#F2DAFE","#9265C2","#DCDCAA","#D98150"],onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(t,i){var e=Array.prototype.slice.call(arguments,0);return e.unshift({}),a.apply(null,e)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){if(t%1!==0&&f(t)){var i=t.toString();if(i.indexOf("e-")<0)return i.split(".")[1].length;if(i.indexOf(".")<0)return parseInt(i.split("e-")[1]);var e=i.split(".")[1].split("e-");return e[0].length+parseInt(e[1])}return 0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,o){var a=2,h=Math.floor(i/(1.5*e)),l=a>=h,r=[];n(t,function(t){null==t||r.push(t)});var c=m(r),u=g(r);u===c&&(u+=.5,c>=.5&&!s?c-=.5:u+=.5);for(var d=Math.abs(u-c),p=y(d),f=Math.ceil(u/(1*Math.pow(10,p)))*Math.pow(10,p),v=s?0:Math.floor(c/(1*Math.pow(10,p)))*Math.pow(10,p),S=f-v,x=Math.pow(10,p),C=Math.round(S/x);(C>h||h>2*C)&&!l;)if(C>h)x*=2,C=Math.round(S/x),C%1!==0&&(l=!0);else if(o&&p>=0){if(x/2%1!==0)break;x/=2,C=Math.round(S/x)}else x/=2,C=Math.round(S/x);return l&&(C=a,x=S/C),{steps:C,stepValue:x,min:v,max:v+C*x}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),b=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return t&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin((1*t-i)*(2*Math.PI)/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=1*(.3*1.5)),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)):s*Math.pow(2,-10*(t-=1))*Math.sin((1*t-i)*(2*Math.PI)/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*(t*t*(((i*=1.525)+1)*t-i)):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-b.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*b.easeInBounce(2*t):.5*b.easeOutBounce(2*t-1)+.5}}),w=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=(s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),s.animationLoop=function(t,i,e,s,n,o){var a=0,h=b[e]||b.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=w(l):n.apply(o)};w(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),L=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},k=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},P(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){L(t.chart.canvas,e,i)})}),F=s.getMaximumWidth=function(t){var i=t.parentNode,e=parseInt(R(i,"padding-left"))+parseInt(R(i,"padding-right"));return i?i.clientWidth-e:0},A=s.getMaximumHeight=function(t){var i=t.parentNode,e=parseInt(R(i,"padding-bottom"))+parseInt(R(i,"padding-top"));return i?i.clientHeight-e:0},R=s.getStyle=function(t,i){return t.currentStyle?t.currentStyle[i]:document.defaultView.getComputedStyle(t,null).getPropertyValue(i)},T=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return e.animationService.cancelAnimation(this),this},resize:function(t){this.stop();var i=this.chart.canvas,e=F(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:A(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,T(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){if(t&&this.reflow(),this.options.animation&&!t){var i=new e.Animation;i.numSteps=this.options.animationSteps,i.easing=this.options.animationEasing,i.render=function(t,i){var e=s.easingEffects[i.easing],n=i.currentStep/i.numSteps,o=e(n);t.draw(o,n,i.currentStep)},i.onAnimationProgress=this.options.onAnimationProgress,i.onAnimationComplete=this.options.onAnimationComplete,e.animationService.addAnimation(this,i)}else this.draw(),this.options.onAnimationComplete.call(this);return this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),k(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(t){var i,e,n,o,a,l=[],r=[],d=[];return s.each(this.datasets,function(t){i=t.points||t.bars||t.segments,i[h]&&i[h].hasValue()&&l.push(i[h])}),s.each(l,function(t){r.push(t.x),d.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),a=m(d),n=g(d),o=m(r),e=g(r),{x:o>this.chart.width/2?o:e,y:(a+n)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:C(this.options.tooltipTitleTemplate,t[0]),chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle%(2*Math.PI),o=(2*Math.PI+this.startAngle)%(2*Math.PI),a=(2*Math.PI+this.endAngle)%(2*Math.PI)||360,h=o>a?a>=n||n>=o:n>=o&&a>=n,l=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return h&&l},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius<0?0:this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius<0?0:this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Animation=e.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.titleHeight=this.title?1.5*this.titleFontSize:0,this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+this.titleHeight,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleHeight/3:i+(1.5*this.fontSize*e+this.fontSize/2)+this.titleHeight},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels)+10:0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint,e=this.endPoint-this.startPoint;for(this.calculateYRange(e),this.buildYLabels(),this.calculateXLabelRotation();e>this.endPoint-this.startPoint;)e=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(e),this.buildYLabels(),t<this.yLabelWidth&&(this.endPoint=i,this.calculateXLabelRotation())},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth?e/2:this.yLabelWidth,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){var e=null,s=null;if(this.angleLineWidth>0&&(e=this.calculateCenterOffset(this.max),s=this.getPointPosition(i,e),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(s.x,s.y),t.stroke(),t.closePath()),this.backgroundColors&&this.backgroundColors.length==this.valuesCount){null==e&&(e=this.calculateCenterOffset(this.max)),null==s&&(s=this.getPointPosition(i,e));var o=this.getPointPosition(0===i?this.valuesCount-1:i-1,e),a=this.getPointPosition(i===this.valuesCount-1?0:i+1,e),h={x:(o.x+s.x)/2,y:(o.y+s.y)/2},l={x:(s.x+a.x)/2,y:(s.y+a.y)/2};t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(h.x,h.y),t.lineTo(s.x,s.y),t.lineTo(l.x,l.y),t.fillStyle=this.backgroundColors[i],t.fill(),t.closePath()}var r=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var c=this.labels.length,u=this.labels.length/2,d=u/2,p=d>i||i>c-d,f=i===d||i===c-d;0===i?t.textAlign="center":i===u?t.textAlign="center":u>i?t.textAlign="left":t.textAlign="right",f?t.textBaseline="middle":p?t.textBaseline="bottom":t.textBaseline="top",t.fillText(this.labels[i],r.x,r.y)}}}}}),e.animationService={frameDuration:17,animations:[],dropFrames:0,addAnimation:function(t,i){for(var e=0;e<this.animations.length;++e)if(this.animations[e].chartInstance===t)return void(this.animations[e].animationObject=i);this.animations.push({chartInstance:t,animationObject:i}),1==this.animations.length&&s.requestAnimFrame.call(window,this.digestWrapper)},cancelAnimation:function(t){var i=s.findNextWhere(this.animations,function(i){return i.chartInstance===t});i&&this.animations.splice(i,1)},digestWrapper:function(){e.animationService.startDigest.call(e.animationService)},startDigest:function(){var t=Date.now(),i=0;this.dropFrames>1&&(i=Math.floor(this.dropFrames),this.dropFrames-=i);for(var e=0;e<this.animations.length;e++)null===this.animations[e].animationObject.currentStep&&(this.animations[e].animationObject.currentStep=0),this.animations[e].animationObject.currentStep+=1+i,this.animations[e].animationObject.currentStep>this.animations[e].animationObject.numSteps&&(this.animations[e].animationObject.currentStep=this.animations[e].animationObject.numSteps),this.animations[e].animationObject.render(this.animations[e].chartInstance,this.animations[e].animationObject),this.animations[e].animationObject.currentStep==this.animations[e].animationObject.numSteps&&(this.animations[e].animationObject.onAnimationComplete.call(this.animations[e].chartInstance),this.animations.splice(e,1),e--);var n=Date.now(),o=n-t-this.frameDuration,a=o/this.frameDuration;a>1&&(this.dropFrames+=a),this.animations.length>0&&s.requestAnimFrame.call(window,this.digestWrapper)}},s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define("Chart",[],function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;
return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i,s){var n={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(n),e.each(i.data,function(e,s){n.bars.push(new this.BarClass({value:e,label:t.labels[s],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(i,e){i.color||(i.color="hsl("+360*e/t.length+", 100%, 50%)"),this.addData(i,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,e,s){var n=void 0!==e?e:this.segments.length;"undefined"==typeof t.color&&(t.color=i.defaults.global.segmentColorDefault[n%i.defaults.global.segmentColorDefault.length],t.highlight=i.defaults.global.segmentHighlightColorDefaults[n%i.defaults.global.segmentHighlightColorDefaults.length]),this.segments.splice(n,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),s||(this.reflow(),this.update())},calculateCircumference:function(t){return this.total>0?2*Math.PI*(t/this.total):0},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',offsetGridLines:!1};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({offsetGridLines:this.options.offsetGridLines,strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,offsetGridLines:this.options.offsetGridLines,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale&&(this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),this.options.datasetStroke&&s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this))}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backgroundColors:this.options.scaleBackgroundColors,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,this.options.datasetFill&&s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
/**
 * Utils
 */

/**
 * Like PHP preg_quote
 *
 * @param str
 * @returns {string}
 */
RegExp.quote = function(str) {
    return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
};

/**
 * From Byte to Mbit
 *
 * @returns {number}
 */
Number.prototype.byte2Mbit = function() {
    return ((this * 8) / 1000000);
};

/**
 *
 * @returns {*}
 */
Number.prototype.formatDataUsage = function() {
    var num;
    if (this >= 1000000000000) {
        num = Math.round(this / 1099511627776);
        num = num + 'TB';
    } else if (this >= 1000000000) {
        num = Math.round(this / 1073741824);
        num = num + 'GB';
    } else if (this >= 1000000) {
        num = Math.round(this / 1048576);
        num = num + 'MB';
    } else if (this >= 1000) {
        num = Math.round(this / 1024);
        num = num + 'kB';
    } else {
        num = Math.round(this) + 'B';
    }
    return num;
};

/**
 * Round 2 dec
 *
 * @returns Number
 */
Number.prototype.round2 = function() {
    return Math.round(this * 100) / 100;
};

/**
 * Trim blank char
 *
 * @returns {string}
 */
String.prototype.trimBlank = function() {
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * Is a MAC Address?
 *
 * @returns {boolean}
 */
String.prototype.isMAC = function() {
    var res = this.match(/^(([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2}))$/);
    if (res !== null) {
        return true;
    } else {
        return false;
    }
};

/**
 * Check if is a public IP
 *
 * @returns {boolean}
 */
String.prototype.isValidPubIP = function() {
    var match1 = this.match(/^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/);
    if (match1 != null) {
        var match2 = this.match(/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))/);
        if (match2 == null) {
            return true;
        }
    }
    return false;
};

/**
 * Leading zero for string
 *
 * @returns {string}
 */
Number.prototype.leadingZero = function() {
    return ('0'+this).slice(-2);
};

/**
 *
 * @returns {string}
 */
Date.prototype.leadingZero = function() {
    return ('0'+this).slice(-2);
};

/**
 * IndexOf with regex
 *
 * @param regex
 * @param startpos
 * @returns {Number}
 */
String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
};

/**
 * LastIndexOf with regex
 *
 * @param regex
 * @param startpos
 * @returns {number}
 */
String.prototype.regexLastIndexOf = function(regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) == "undefined") {
        startpos = this.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = this.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    while((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
};

/**
 * intval() like PHP
 *
 * @param number
 * @returns {*}
 */
function intval(number) {
    number = Number(number);
    if (!isNaN(number)) {
        return number;
    }
    return 0;
}

/**
 * JSONP Function
 *
 * @param url
 * @param callback
 */
function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

/**
 * Escape HTML
 *
 * @param str
 * @returns {string}
 */
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Load JS script Async
 * @param path
 */
function loadJS(path) {
    var newBlock = document.createElement("script");
    newBlock.src = path;
    newBlock.async = true;
    newBlock.type = "text/javascript";
    document.getElementsByTagName("body")[0].appendChild(newBlock);
}

/**
 * Load CSS Async
 * @param path
 */
function loadCSS(path) {
    var newBlock = document.createElement("link");
    newBlock.href = path;
    newBlock.rel = "stylesheet";
    newBlock.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(newBlock);
}


function highlightErrorsInText(searchText, text) {
    var returnText;
    var tmpRegExp = new RegExp("("+RegExp.quote(searchText)+")", 'gi');
    returnText = text.replace(tmpRegExp,"<span class='cge-bad-power-level'>$1</span>");
    return returnText;
}

/**
 * JS Extension
 */

/**
 * Empty element content
 */
Element.prototype.emptyElement = function() {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};
const PLATFORM_MIMO_OFDM = 'MIMO_OFDM';
const PLATFORM_SISO_OFDM = 'SISO_OFDM';
const PLATFORM_FSK = 'FSK';

/**
 * Canopy GUI Enhancer
 * @constructor
 */
var CanopyEnhancer = function() {
    this.browser =  'chrome';
    this.refreshTime = 0;
    this.tooltipMACNode = {};
    this.tooltipIPNode = {};

    /**
     * Default settings
     * @type {{cge_enabled: number, cge_custom_css: number, cge_ip_lookup: number, cge_mac_lookup: number, cge_ap_evaluation: number, cge_ap_throughput: number, cge_ap_data_vc: number, cge_rtt_type: string, cge_debug: number}}
     */
    this.settings = {
        cge_enabled: 1,
        cge_custom_css: 1,
        cge_ip_lookup: 1,
        cge_mac_lookup: 1,
        cge_ap_evaluation: 1,
        cge_ap_throughput: 1,
        cge_ap_data_vc: 1,
        cge_rtt_type: 'string',
        cge_debug : 0
    };

    this.intervalsTimeout = 0;
    this.currentCatIndex = -1;
    this.currentPageIndex = -1;
    this.currentRadioMAC = "000000000000";
    this.currentRadioModulation = PLATFORM_MIMO_OFDM;
    this.isMedusa = false;
    this.medusaObserver = null;

    /*
     * =Traffic
     */
    this.mainTrafficBlockID = null;
    this.inTrafficID = null;
    this.outTrafficID = null;
    this.inUcastPktsID = null;
    this.outUcastPktsID = null;
    this.inNUcastPktsID = null;
    this.outNUcastPktsID = null;
    this.realTimeTrafficChart = null;
    this.trafficData = {
        started: false,
        // InOctets
        prevInOctets: 0,
        inTraffic: 0,
        // OutOctets
        prevOutOctets: 0,
        outTraffic: 0,
        // InUcastPkts
        prevInUcastPkts: 0,
        inUcastPps: 0,
        // OutUcastPkts
        prevOutUcastPkts: 0,
        outUcastPps: 0,
        // InNUcastPkts
        prevInNUcastPkts: 0,
        inNUcastPps: 0,
        // OutNUcastPkts
        prevOutNUcastPkts: 0,
        outNUcastPps: 0,
    };

    /**
     * Ethernet interface error IDs
     *
     * @type {[String]}
     */
    this.ethernetErrorsFields = [
        'FecCb_ifmib_ifInErrors',
        'FecCb_ifmib_ifOutErrors',
        'FecCb_fec_crerrs',
        'FecCb_fec_rcvfifonobufs',
        'FecCb_fec_clserrs',
        'FecCb_fec_rlerrs',
        'FecCb_fec_unerrs',
        'FecCb_fec_cslerrs',
        'FecCb_fec_nocs',
        'FecCb_fec_lgerrs',
        'FecCb_fec_sherrs',
        'FecCb_fec_excdef'
    ];

    /**
     * Radio interface errors IDs
     *
     * @type {[String]}
     */
    this.radioErrorsFields = [
        'RfCb_ifmib_ifInDiscards',
        'RfCb_ifmib_ifInErrors',
        'RfCb_ifmib_ifInUnknownProtos',
        'RfCb_ifmib_ifOutDiscards',
        'RfCb_ifmib_ifOutErrors',
        'SoundingStats_ResponsesSuppressed',
        'SoundingStats_ErrorCount',
        'SoundingStats_VersionMismatch'
    ];

    /*
     * =AP_Evaluation
     */
    this.apEvaluationBlock = document.getElementById('APEval'); // #APEval
    this.APEvaluationObj = [];
    this.apSelectionMethod = "";
    this.currentEvaluatinEntry = -1;
    this.currentSessionStatus = "";
    this.currentlyScanning = "";

    /*
     * =AP SM Throughput
     */
    this.APThroughputSM = {};

    /*
     * =Sections
     */
    this.Sections = [];
    this.Sections[0] = {
        name: "Home",
        pages: {
            1: "General Status",
            5: "Event Log",
            6: "Network Interfaces",
            7: "Layer 2 Neighbors",
            10: "DFS Status"
        }
    };

    this.Sections[1] = {
        name: "Configuration"
    };

    this.Sections[2] = {
        name: "Statistics",
        pages: {
            7: "Ethernet",
            9: "Radio",
            11: "Data VC",
            12: "Throughput",
            15: "NAT Stats",
            16: "NAT DHCP",
            20: "ARP"
        }
    };

    this.Sections[3] = {
        name: "Tool",
        pages:{
            4: "AP Evaluation"
        }
    };

    this.Sections[5] = {
        name: "Logs",
        pages: {
            9: "NAT Table"
        }
    };

    this.Sections[6] = {
        name: "Accounts"
    };

    this.Sections[8] = {
        name: "PDA"
    };

    this.Sections[9] = {
        name: "Copyright"
    };

    this.APEvaluationFields = {
        MIMO_OFDM: [
            'Index',
            'Frequency',
            'Channel Bandwidth',
            'Cyclic Prefix',
            'ESN',
            'Region',
            'Beacon Receive Power',
            'Beacon Count',
            'FECEn',
            'Type',
            'Multipoint Avail',
            'Age',
            'Lockout',
            'RegFail',
            'Range',
            'MaxRange',
            'TxBER',
            'EBcast',
            'Session Count',
            'NoLUIDS',
            'OutOfRange',
            'AuthFail',
            'EncryptFail',
            'Rescan Req',
            'SMLimitReached',
            'NoVC\'s',
            'VCRsv/430smFail',
            'VCActFail',
            'AP Gain',
            'AP RcvT',
            'SectorID',
            'Color Code',
            'BeaconVersion',
            'SectorUserCount',
            'SyncSrc',
            'NumULSlots',
            'NumDLSlots',
            'NumULContSlots',
            'WhiteSched',
            'ICC',
            'Authentication',
            'SM PPPoE',
            'Frame Period'
        ],
        SISO_OFDM: [
            'Index',
            'Frequency',
            'Channel Bandwidth',
            'Cyclic Prefix',
            'ESN',
            'Region',
            'Beacon Receive Power Level',
            'Beacon Count',
            'FECEn',
            'Type',
            'Multipoint Avail',
            'Age',
            'Lockout',
            'RegFail',
            'Range',
            'MaxRange',
            'TxBER',
            'EBcast',
            'Session Count',
            'NoLUIDS',
            'OutOfRange',
            'AuthFail',
            'EncryptFail',
            'Rescan Req',
            'SMLimitReached',
            'NoVC\'s',
            'VCRsv/430smFail',
            'VCActFail',
            'AP Gain',
            'AP RcvT',
            'SectorID',
            'Color Code',
            'BeaconVersion',
            'SectorUserCount',
            'SyncSrc',
            'NumULSlots',
            'NumDLSlots',
            'NumULContSlots',
            'WhiteSched',
            'ICC',
            'Authentication',
            'SM PPPoE',
            'Frame Period'
        ],
        FSK: [
            'Index',
            'Frequency',
            'ESN',
            'Region',
            'Jitter',
            'Beacon Receive Power Level',
            'Beacon Count',
            'BRcvW',
            'FECEn',
            'Type',
            'Multipoint Avail',
            'Age',
            'Lockout',
            'RegFail',
            'Range',
            'MaxRange',
            'TxBER',
            'EBcast',
            'Session Count',
            'NoLUIDS',
            'OutOfRange',
            'AuthFail',
            'EncryptFail',
            'Rescan Req',
            'SMLimitReached',
            'NoVC\'s',
            'VCRsvFail',
            'VCActFail',
            'AP Gain',
            'AP RcvT:',
            'FrameNumber',
            'SectorID',
            'Color Code',
            'BeaconVersion',
            'SectorUserCount',
            'NumULHalfSlots',
            'NumDLHalfSlots',
            'NumULContSlots',
            'WhiteSched',
            'Authentication',
            'SM PPPoE',
            'Frame Period'
        ]
    };

    this.eventLogErrorStrings = [
        'FatalError()',
        'Watchdog Reset',
        'ADI Communication Failure',
        'ADI forced reset has been invoked!'
    ];

    this.soundingStatsFields = [
        'VC',
        'reference SF:',
        'soundingState',
        'soundingFault',
        'mumimoVetoCount',
        'channelDistortion',
        'nullingSNR',
        'cnResponseCountSM',
        'cnResponseCountAP',
        'missedTagCount'
    ];
};

/**
 * Initialize CanopyEnhancer
 */
CanopyEnhancer.prototype.initialize = function() {
    this.browser = (function(){
        let M = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (typeof M[1] === undefined) {
            return 'chrome';
        }
        return M[1].toLowerCase();
    })();

    this.getRadioMac();
    if (this.currentRadioMAC !== '000000000000') {

        this.loadSettings();

        if (this.debugMessages() === true) {
            console.log("Browser platform: "+this.browser);
        }

        let page = document.getElementById("page");
        let title = page.querySelector("h2");
        if (title !== null) {
            let titleString = title.textContent;
            let deviceType = null;
            let resDevType = titleString.match(/.*(?:GHz|MHz)(?:\sAdjustable\sPower)?\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);

            if (resDevType !== null) {
                deviceType = resDevType[1];
                this.currentRadioModulation = PLATFORM_FSK;
            } else {
                resDevType = titleString.match(/.*(?:GHz|MHz)\sSISO\sOFDM\s\-\s([a-zA-Z\-\s]+)\s\-\s([A-Fa-f0-9\-]{17})/);
                if (resDevType !== null) {
                    deviceType = resDevType[1];
                    this.currentRadioModulation = PLATFORM_SISO_OFDM;
                } else {
                    resDevType = titleString.match(/.*(?:GHz|MHz)\s(MU\-)?MIMO(?:\sOFDM)?\s\-\s([a-zA-Z\-\s]+)(?:\s\-\s|\n)([A-Fa-f0-9\-]{17})/);
                    if (resDevType) {
                        deviceType = resDevType[2];
                        if (resDevType[1]) {
                            this.isMedusa = true;
                        }
                    }
                }
            }

            if (deviceType !== null) {
                this.getDevType(deviceType);
            } else {
                this.currentRadioType = "SM";
            }
        } else {
            if (this.debugMessages() === true) {
                console.log("Title not found");
            }
        }

        if (this.debugMessages() === true) {
            console.log("Current radio Modulation: " + this.currentRadioModulation);
            console.log("Current radio Type: " + this.currentRadioType);
        }

        this.identifySection();
        this.getRefreshTime();

        // Site name in title
        let strongSiteName = document.createElement('strong');
        strongSiteName.className = 'cge-color-blue-cambium';
        strongSiteName.appendChild(document.createTextNode(this.getSiteNameTitle()+': '));

        document.querySelector('#page > h1').insertBefore(
            strongSiteName,
            document.querySelector('#page > h1').firstChild
        );

        if (this.debugMessages() === true) {
            console.log("CGE Enabled!");
            console.log("Current radio MAC " + this.currentRadioMAC);
            console.log("Current Section Category: " + this.getCurrentCatName()+" ("+this.currentCatIndex+")");
            console.log("Current Section Page: " + this.getCurrentPageName()+" ("+this.currentPageIndex+")");
        }

        this.enhancedCSS();
        this.homePageRender();
        this.realTimeTraffic();
        this.betterEvaluation();
        this.MacLookupPage();
        this.NATTable();
        this.APThroughput();
        this.dataVC();
        this.EventLog();
        this.sessionStatus();
        this.SetUpAJAX();
    }
};

CanopyEnhancer.prototype.getSiteNameTitle = function() {
    var title = document.getElementsByTagName('title')[0].textContent;
    var match = title.match(/(.*)\s\-\s(?:[a-zA-Z0-9\s]+)\[(?:.*)\]/);
    if (match) {
        return match[1];
    }
    return '';
};

/**
 * Get WebPage Auto Update setting
 */
CanopyEnhancer.prototype.getRefreshTime = function() {
    var bodyOnload = document.getElementsByTagName('body')[0].getAttribute('onload');
    var match = bodyOnload.match(/handleLoad\(([0-9]+)\,.*/);
    if (match[1]) {
        this.refreshTime = match[1];
        this.intervalsTimeout = (this.refreshTime * 1000) + 1;
    } else {
        this.refreshTime = 0;
    }
};

/**
 * Device type
 *
 * @param string
 */
CanopyEnhancer.prototype.getDevType = function(string) {
    if (string === "Subscriber Module") {
        this.currentRadioType = "SM";
    } else if (string === "Access Point") {
        this.currentRadioType = "AP";
    } else {
        this.currentRadioType = "BH";
    }
};

/**
 * SetUpAJAX
 */
CanopyEnhancer.prototype.SetUpAJAX = function() {

    if (this.refreshTime > 0) {
        let _this = this;

        window.SetUpAJAX = function () {
            var request = document.request;
            if (typeof request === 'undefined' || (request.readyState > 0 && request.readyState < 4)) {
                return;
            }
            var vars = [];
            var sections = getElementsByClassName(document, 'table', 'section');
            for (var j = 0; j < sections.length; j++) {
                if (!sections[j].style.display || sections[j].style.display !== "none") {
                    vars = vars.concat(getElementsByClassName(sections[j], 'span', 'var'));
                }
            }
            var params = location.search.substr(1);
            for (var i = 0; i < vars.length; i++) {
                params += '&' + vars[i].id + '=' + GetVarRefreshOption(vars[i].id);
            }
            params += '&' + RebootClass + '= ';
            request.open("POST", "query.cgi", true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(params);
            request.onreadystatechange = function () {
                var request = document.request;
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        if (request.responseXML) {

                            let vars = request.responseXML.getElementsByTagName('var');
                            for (let i = 0; i < vars.length; i++) {
                                let id = vars[i].getAttribute('id');
                                if (id !== RebootClass) {
                                    let htmlCode = '';
                                    if (vars[i].hasChildNodes())
                                        htmlCode = vars[i].firstChild.nodeValue;
                                    id = PerformRefreshOverride(id, htmlCode);
                                    if (id) {
                                        let parent = document.getElementById(id);
                                        if (parent) {
                                            parent.emptyElement();
                                            parent.insertAdjacentHTML('afterbegin', htmlCode);
                                            if (document.createEvent) {
                                                var event = document.createEvent("Event");
                                                event.initEvent("change", true, true);
                                                parent.dispatchEvent(event);
                                            } else if (document.createEventObject) {
                                                var evObj = document.createEventObject();
                                                parent.fireEvent("onclick", evObj);
                                            }
                                        }
                                    }
                                } else {
                                    let rebootBoxes = getElementsByClassName(document, 'span', RebootClass);
                                    for (let j = 0; j < rebootBoxes.length; j++) {
                                        if (vars[i].hasChildNodes() && vars[i].firstChild.nodeValue) {
                                            rebootBoxes[j].emptyElement();
                                            rebootBoxes[j].insertAdjacentHTML('afterbegin', vars[i].firstChild.nodeValue);
                                        } else {
                                            if (rebootBoxes[j].hasChildNodes()) {
                                                while (rebootBoxes[j].lastChild) {
                                                    rebootBoxes[j].removeChild(rebootBoxes[j].lastChild);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if (_this.isTrafficPage()) {
                                _this.updateTrafficData(
                                    request.responseXML.getElementById(_this.inTrafficID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outTrafficID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.inUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.inNUcastPktsID).firstChild.nodeValue,
                                    request.responseXML.getElementById(_this.outNUcastPktsID).firstChild.nodeValue,
                                );
                            }

                            _this.homePageRender();
                            _this.APThroughputCalc();
                            _this.dataVCCalc();
                            _this.sessionStatus();
                        }
                    } else if (request.status === 401) {
                        clearInterval(document.ajaxtimerid);
                        if (!document.rebootId)
                            window.location.reload();
                    }
                }
            };
        };

        clearInterval(document.ajaxtimerid);
        SetUpAJAX();
        document.ajaxtimerid = setInterval(SetUpAJAX, (this.refreshTime * 1000));
    }
};

/**
 * Get Radio MAC Address
 * @returns {boolean}
 */
CanopyEnhancer.prototype.getRadioMac = function() {
    let stylesheethref = document.getElementsByTagName('link')[0].getAttribute('href');
    let res = stylesheethref.match(/\_canopy\.css\?mac_esn\=([A-Fa-f0-9]{12})/);
    if (res !== null) {
        this.currentRadioMAC = res[1].toUpperCase();
    } else {
        this.currentRadioMAC = '000000000000';
    }
};

/**
 * Load settings
 */
CanopyEnhancer.prototype.loadSettings = function() {
    let _this = this;
    try {
        let settings = JSON.parse(document.CGESettings);
        for (let key in settings) {
            if (!settings.hasOwnProperty(key)) continue;
            _this.settings[key] = settings[key];
        }
    } catch(e) {
        console.error(e);
    }
};

/**
 * Debug enabled?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.debugMessages = function() {
    return (this.settings.cge_debug === 1);
};

/**
 * Add Custom CSS
 */
CanopyEnhancer.prototype.enhancedCSS = function() {
    if (this.settings.cge_custom_css === 1) {
        // Change submit buttons
        let allInputSubmit = document.querySelectorAll('input[type="submit"]');
        for (let i = 0;i < allInputSubmit.length;i++) {
            allInputSubmit[i].className = 'btn btn-sm btn-cambium';
        }
        if (document.getElementById('loginbutton')) {
            document.getElementById('loginbutton').className = 'btn btn-sm btn-default';
        }
    }
};

/**
 * Extract section and category
 */
CanopyEnhancer.prototype.identifySection = function() {
    let match = window.location.href.match(/catindex\=([0-9]+).*pageindex\=([0-9]+)/);
    if (match != null) {
        if (match[1] && match[2]) {
            this.currentCatIndex = Number(match[1]);
            this.currentPageIndex = Number(match[2]);
        } else {
            this.currentCatIndex = 0;
            this.currentPageIndex = 1;
        }
    } else {
        this.currentCatIndex = 0;
        this.currentPageIndex = 1;
    }
};

/**
 * Get current category name
 *
 * @returns {*}
 */
CanopyEnhancer.prototype.getCurrentCatName = function() {
    if (this.Sections[this.currentCatIndex]) {
        return this.Sections[this.currentCatIndex].name;
    } else {
        return "Unknown";
    }
};

/**
 * Get current page name
 *
 * @returns {*}
 */
CanopyEnhancer.prototype.getCurrentPageName = function() {
    if (this.Sections[this.currentCatIndex]) {
        if (this.Sections[this.currentCatIndex].pages !== undefined) {
            return this.Sections[this.currentCatIndex].pages[this.currentPageIndex];
        } else {
            return 0;
        }
    } else {
        return "Unknown";
    }
};

/**
 * CSS class based on signal power
 * @param signal
 * @returns {*}
 */
CanopyEnhancer.prototype.getSignalPowerClass = function(signal) {
    var cellClass;
    if (signal > -70) {
        cellClass = 'cge-good-power-level';
    } else if (signal <= -70 && signal > -80) {
        cellClass = 'cge-decent-power-level';
    } else {
        cellClass = 'cge-bad-power-level';
    }
    return cellClass;
};

/**
 * CSS class based on SNR
 * @param h
 * @param v
 * @returns {*}
 */
CanopyEnhancer.prototype.getSNRClass = function(v, h) {
    var cellClass;

    v = Number(v);
    h = Number(h);

    if (h > 0 && v > 0) {
        var sumratio = (v + h) / 2;
        if (sumratio > 24) {
            cellClass = 'cge-good-power-level';
        } else if (sumratio <= 24 && sumratio > 12) {
            cellClass = 'cge-decent-power-level';
        } else {
            cellClass = 'cge-bad-power-level';
        }
    } else {
        cellClass = 'cge-bad-power-level';
    }

    return cellClass;
};

/**
 * CSS class based on adaptRate value
 * @param adaptRate
 * @param modulation
 * @returns {String}
 */
CanopyEnhancer.prototype.getAdaptRateClass = function(adaptRate, modulation) {

    adaptRate = Number(adaptRate);

    switch (modulation) {
        case 'MIMO-A':
        case 'SISO':
            if (adaptRate === 1) {
                return 'cge-poorlink-text'
            }
            if (adaptRate === 2) {
                return 'cge-avglink-text';
            }
            if (adaptRate === 3) {
                return 'cge-betterlink-text';
            }
            if (adaptRate === 4) {
                return 'cge-bestlink-text';
            }
            break;
        case 'MIMO-B':
            if (adaptRate <= 2) {
                return 'cge-poorlink-text'
            }
            if (adaptRate <= 4) {
                return 'cge-avglink-text';
            }
            if (adaptRate <= 6) {
                return 'cge-betterlink-text';
            }
            if (adaptRate = 8) {
                return 'cge-bestlink-text';
            }
            break;
    }
    return '';
};

/* ======================================================================
 *  =Homepage
 * ======================================================================*/

/**
 * E' la homepage?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.ishomePage = function() {
    return (this.currentCatIndex === 0 && this.currentPageIndex === 1);
};

/**
 * Home render
 */
CanopyEnhancer.prototype.homePageRender = function () {

    if (this.ishomePage()) {

        var linkStatusBlock = null;
        if (document.getElementById("LinkStatus") !== null) {
            linkStatusBlock = document.getElementById("LinkStatus");
        } else {
            linkStatusBlock = document.getElementById("LinkStatusMain");
        }

        var linkStatus = linkStatusBlock.textContent;
        if (linkStatus !== '100Base-TX Full Duplex' && linkStatus !== '1000Base-T Full Duplex') {

            var spanEthWarn = document.createElement('span');
            spanEthWarn.className = 'cge-warning';
            spanEthWarn.appendChild(document.createTextNode(linkStatusBlock.textContent));

            linkStatusBlock.emptyElement();
            linkStatusBlock.appendChild(spanEthWarn);
        }

        var distanceBlock = document.getElementById('Distance');
        if (distanceBlock !== null) {
            var milesRegex = distanceBlock.textContent.match(/(([0-9]{1,2})\.([0-9]{0,3}))\smiles/);
            if (milesRegex !== null) {
                var km = parseFloat(milesRegex[1]) * 1.60934;
                distanceBlock.appendChild(document.createTextNode(' - ' + km.toFixed(3) + ' kilometres'));
            }
        }

        switch (this.currentRadioModulation) {
            case 'MIMO_OFDM':
                var span;
                var PowerLevelOFDM = document.getElementById('PowerLevelOFDM');
                if (PowerLevelOFDM !== null) {
                    var signal = PowerLevelOFDM.textContent;
                    signal = parseFloat(signal.replace(" dBm", ""));

                    PowerLevelOFDM.emptyElement();
                    span = document.createElement('span');
                    span.className = this.getSignalPowerClass(signal);
                    span.appendChild(document.createTextNode(signal + ' dBm'));
                    PowerLevelOFDM.appendChild(span);

                }

                var SignalToNoiseRatioSM = document.getElementById('SignalToNoiseRatioSM');
                if (SignalToNoiseRatioSM !== null) {
                    var CSSClass = "";
                    var SNRText = SignalToNoiseRatioSM.textContent;
                    var matchSNR = SNRText.match(/([\d]+)\sV\s\/\s([\d]+)\sH\sdB/);

                    if (matchSNR) {
                        CSSClass = this.getSNRClass(matchSNR[1], matchSNR[2]);
                    } else {
                        matchSNR = SNRText.match(/([\d]+)\sdB\sMIMO\-(?:[A-B])/);
                        if (matchSNR) {
                            CSSClass = this.getSNRClass(matchSNR[1], 0);
                        }
                    }

                    if (CSSClass !== "") {
                        SignalToNoiseRatioSM.emptyElement();
                        span = document.createElement('span');
                        span.className = CSSClass;
                        span.appendChild(document.createTextNode(SNRText));
                        SignalToNoiseRatioSM.appendChild(span);
                    }

                }

                var SessionRate = document.getElementById('SesRate');
                if (SessionRate) {
                    var match = SessionRate.textContent.match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/i);
                    if (match) {
                        SessionRate.emptyElement();
                        span = document.createElement('span');
                        span.className = this.getAdaptRateClass(match[1], match[2]);
                        span.appendChild(document.createTextNode(match[0]));
                        SessionRate.appendChild(span);
                    }
                }

                break;
        }

        // Move site info box
        var content = document.getElementById('SectionSiteInfoStats');
        var parent = content.parentNode;
        parent.insertBefore(content, document.getElementById('SectionDeviceInfo'));
    }
};

/* ======================================================================
 *  =RealTimeTraffic
 * ======================================================================*/

/**
 * Is the page Statistics -> Radio?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isEthernetStats = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 7);
};

/**
 * Is the page Statistics -> Radio?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isRadioStats = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 9);
};

/**
 * Is radio traffic page? statistics -> ethernet/radio
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isTrafficPage = function() {
    return ( this.isEthernetStats() || this.isRadioStats() );
};

/**
 * Display realtime traffic
 */
CanopyEnhancer.prototype.realTimeTraffic = function() {
    var _this = this;
    if (_this.isTrafficPage()) {
        var sectionTitle = this.Sections[this.currentCatIndex].pages[this.currentPageIndex];

        // TODO: refactor this section
        if (this.currentPageIndex === 7) {
            this.mainTrafficBlockID = document.getElementById('SectionEthernet');
            // Octets
            this.inTrafficID = 'FecCb_ifmib_ifInOctets';
            this.outTrafficID = 'FecCb_ifmib_ifOutOctets';
            // UcastPkts
            this.inUcastPktsID = 'FecCb_ifmib_ifInUcastPkts';
            this.outUcastPktsID = 'FecCb_ifmib_ifOutUcastPkts';
            // NUcastPkts
            this.inNUcastPktsID = 'FecCb_ifmib_ifInNUcastPkts';
            this.outNUcastPktsID = 'FecCb_ifmib_ifOutNUcastPkts';
        } else {
            this.mainTrafficBlockID = document.getElementById('SectionRFCBStat');
            // Octets
            this.inTrafficID = 'RfCb_ifmib_ifInOctets';
            this.outTrafficID = 'RfCb_ifmib_ifOutOctets';
            // UcastPkts
            this.inUcastPktsID = 'RfCb_ifmib_ifInUcastPkts';
            this.outUcastPktsID = 'RfCb_ifmib_ifOutUcastPkts';
            // NUcastPkts
            this.inNUcastPktsID = 'RfCb_ifmib_ifInNUcastPkts';
            this.outNUcastPktsID = 'RfCb_ifmib_ifOutNUcastPkts';
        }

        if ((this.refreshTime > 0)) {

            // Spawn graph block
            if (this.settings.cge_rtt_type === 'graph') {

                this.mainTrafficBlockID.insertAdjacentHTML(
                    'beforebegin',
                    '<div class="section" id="SectionRTGTraffic">' +
                    '<h2 class="sectiontitle"><span class="sectiontitletext">'+sectionTitle+' Real Time Traffic</span><span class="MenuBar" style="float: right;"><img class="MenuImg" src="_min.gif?mac_esn=' + this.currentRadioMAC.toLocaleLowerCase() + '" style="cursor: pointer; margin-right: 5px;"></span></h2>' +
                    '<div id="RTGWrapper"><canvas id="RTGChart" width="1280" height="270"></canvas><div id="RTGLegend"></div></div>' +
                    '</div>'
                );

                var date = new Date;

                var i = 4;
                var timeLabels = [];
                while (i >= 0) {
                    var tmpTime = new Date(date - ( (this.refreshTime * i) * 1000));
                    var timestring = tmpTime.getHours().leadingZero() + ':'+tmpTime.getMinutes().leadingZero()+':'+tmpTime.getSeconds().leadingZero();
                    timeLabels.push(timestring);
                    i--;
                }

                var trDataSetColors, scaleGridLineColor;
                switch (this.settings.cge_theme) {
                    case 'dark':
                        scaleGridLineColor = "rgba(200,200,200,.05)";
                        trDataSetColors = {
                            'trIn': {
                                fillColor: "rgba(138, 118, 170, 0.2)",
                                strokeColor: "rgba(138, 118, 170, 1)",
                                pointColor: "rgba(138, 118, 170, 0.2)",
                                pointHighlightStroke: "rgba(138, 118, 170, 1)"
                            },
                            'trOut': {
                                fillColor: "rgba(35, 216, 127, 0.2)",
                                strokeColor: "rgba(35, 216, 127, 1)",
                                pointColor: "rgba(35, 216, 127, 1)",
                                pointHighlightStroke: "rgba(35, 216, 127, 1)"
                            }
                        };
                        break;
                    default:
                        scaleGridLineColor = "rgba(0,0,0,.05)";
                        trDataSetColors = {
                            'trIn': {
                                fillColor: "rgba(88,88,88,0.2)",
                                strokeColor: "rgba(88,88,88,1)",
                                pointColor: "rgba(88,88,88,0.2)",
                                pointHighlightStroke: "rgba(88,88,88,1)"
                            },
                            'trOut': {
                                fillColor: "rgba(50,143,191,0.2)",
                                strokeColor: "rgba(50,143,191,1)",
                                pointColor: "rgba(50,143,191,1)",
                                pointHighlightStroke: "rgba(50,143,191,1)"
                            }
                        };
                        break;
                }

                let chartData = {
                    labels: timeLabels,
                    datasets: [
                        {
                            label: "Interface Traffic In",
                            fillColor: trDataSetColors.trIn.fillColor,
                            strokeColor: trDataSetColors.trIn.strokeColor,
                            pointColor: trDataSetColors.trIn.pointColor,
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: trDataSetColors.trIn.pointHighlightStroke,
                            data: [0, 0, 0, 0, 0]
                        },
                        {
                            label: "Interface Traffic Out",
                            fillColor: trDataSetColors.trOut.fillColor,
                            strokeColor: trDataSetColors.trOut.strokeColor,
                            pointColor: trDataSetColors.trOut.pointColor,
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: trDataSetColors.trOut.pointHighlightStroke,
                            data: [0, 0, 0, 0, 0]
                        }
                    ]
                };

                let chartOpt = {

                    animation: true,
                    animationSteps: 20,
                    scaleBeginAtZero: true,
                    responsive: true,

                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines : true,

                    //String - Colour of the grid lines
                    scaleGridLineColor : scaleGridLineColor,

                    //Number - Width of the grid lines
                    scaleGridLineWidth : 1,

                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,

                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines: true,

                    //Boolean - Whether the line is curved between points
                    bezierCurve : true,

                    //Number - Tension of the bezier curve between points
                    bezierCurveTension : 0.4,

                    //Boolean - Whether to show a dot for each point
                    pointDot : true,

                    //Number - Radius of each point dot in pixels
                    pointDotRadius : 4,

                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth : 1,

                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius : 20,

                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke : true,

                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth : 2,

                    //Boolean - Whether to fill the dataset with a colour
                    datasetFill : true,

                    //String - A legend template
                    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"cge-graph-legend-entry\" style=\"background-color:<%=datasets[i].strokeColor%>;\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%>: <span style=\"color:<%=datasets[i].strokeColor%>\"><span id=\"legend-<%=datasets[i].label.replace(/\\s/g, '')%>\">0.00</span> Mbps</span></li><%}%></ul>"

                };

                let ctx = document.getElementById("RTGChart").getContext("2d");
                this.realTimeTrafficChart = new Chart(ctx).Line(chartData, chartOpt);
                document.getElementById('RTGLegend').emptyElement();
                document.getElementById('RTGLegend').insertAdjacentHTML('afterbegin', this.realTimeTrafficChart.generateLegend())

            } else {

                let el = document.createElement("span");
                el.id = 'cge-CurrInTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-CurrInTraffic">0.00</span> Mbps)</span>');
                document.getElementById(this.inTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.inTrafficID).nextSibling
                );

                el = document.createElement("span");
                el.id = 'cge-CurrOutTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-CurrOutTraffic">0.00</span> Mbps)');
                document.getElementById(this.outTrafficID).parentNode.insertBefore(
                    el,
                    document.getElementById(this.outTrafficID).nextSibling
                );
            }

            // TODO: refactor
            let pktsBlocks = [
                this.inUcastPktsID,
                this.outUcastPktsID,
                this.inNUcastPktsID,
                this.outNUcastPktsID
            ];

            // PPs stats
            for (let i = 0; i < pktsBlocks.length; i++) {
                let el = document.createElement("span");
                el.id = 'cge-CurrInTraffic-wrap';
                el.className = 'cge-real-time-throughput cge-color-blue-cambium';
                el.insertAdjacentHTML('afterbegin', ' (<span id="cge-'+pktsBlocks[i]+'">0</span> pps)</span>');
                document.getElementById(pktsBlocks[i]).parentNode.insertBefore(
                    el,
                    document.getElementById(pktsBlocks[i]).nextSibling
                );
            }

        } else {
            this.mainTrafficBlockID.insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time throughput (Configuration => General)</div>'
            );
        }

        // Medusa sounding stats
        if (this.isMedusa === true && this.isRadioStats()) {
            this.renderSoundingStats();
        }

        // Error highlight
        this.highlightInterfaceErrors();
    }
};

/**
 * Value per second calculation
 * @param current
 * @param previous
 * @returns Number
 */
CanopyEnhancer.prototype.calcPerSeconds = function(current, previous) {
    return ((current - previous) / this.refreshTime);
};

/**
 * Updates traffic data from webpage
 */
CanopyEnhancer.prototype.updateTrafficData = function (
    currInOctets,
    currOutOctets,
    currInUcastPkts,
    currOutUcastPkts,
    currInNUcastPkts,
    currOutNUcastPkts
) {
    currInOctets = parseInt(currInOctets);
    currOutOctets = parseInt(currOutOctets);
    currInUcastPkts = parseInt(currInUcastPkts);
    currOutUcastPkts = parseInt(currOutUcastPkts);
    currInNUcastPkts = parseInt(currInNUcastPkts);
    currOutNUcastPkts = parseInt(currOutNUcastPkts);

    if (this.trafficData.started) {

        this.trafficData.inTraffic = this.calcPerSeconds(currInOctets, this.trafficData.prevInOctets).byte2Mbit().round2();
        this.trafficData.outTraffic = this.calcPerSeconds(currOutOctets, this.trafficData.prevOutOctets).byte2Mbit().round2();
        this.trafficData.inUcastPps = Math.round(this.calcPerSeconds(currInUcastPkts, this.trafficData.prevInUcastPkts));
        this.trafficData.outUcastPps = Math.round(this.calcPerSeconds(currOutUcastPkts, this.trafficData.prevOutUcastPkts));
        this.trafficData.inNUcastPps = Math.round(this.calcPerSeconds(currInNUcastPkts, this.trafficData.prevInNUcastPkts));
        this.trafficData.outNUcastPps = Math.round(this.calcPerSeconds(currOutNUcastPkts, this.trafficData.prevOutNUcastPkts));

        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.prevOutOctets = currOutOctets;
        this.trafficData.prevInUcastPkts = currInUcastPkts;
        this.trafficData.prevOutUcastPkts = currOutUcastPkts;
        this.trafficData.prevInNUcastPkts = currInNUcastPkts;
        this.trafficData.prevOutNUcastPkts = currOutNUcastPkts;

        /*
         * UPDATE GUI
         */
        if (this.settings.cge_rtt_type === 'graph') {
            let tmpTime = new Date();
            let timestring = tmpTime.getHours().leadingZero() + ':'+tmpTime.getMinutes().leadingZero()+':'+tmpTime.getSeconds().leadingZero();

            this.realTimeTrafficChart.addData(
                [this.trafficData.inTraffic, this.trafficData.outTraffic],
                timestring
            );
            this.realTimeTrafficChart.removeData();

            document.getElementById('legend-InterfaceTrafficIn').textContent = this.trafficData.inTraffic.toString();
            document.getElementById('legend-InterfaceTrafficOut').textContent = this.trafficData.outTraffic.toString();
        } else {
            document.getElementById('cge-CurrInTraffic').textContent = this.trafficData.inTraffic.toString();
            document.getElementById('cge-CurrOutTraffic').textContent = this.trafficData.outTraffic.toString();
        }

        document.getElementById('cge-'+this.inUcastPktsID).textContent = this.trafficData.inUcastPps.toString();
        document.getElementById('cge-'+this.outUcastPktsID).textContent = this.trafficData.outUcastPps.toString();
        document.getElementById('cge-'+this.inNUcastPktsID).textContent = this.trafficData.inNUcastPps.toString();
        document.getElementById('cge-'+this.outNUcastPktsID).textContent = this.trafficData.outNUcastPps.toString();

    } else {
        this.trafficData.prevInOctets = currInOctets;
        this.trafficData.inTraffic = 0;

        this.trafficData.prevOutOctets = currOutOctets;
        this.trafficData.outTraffic = 0;

        this.trafficData.prevInUcastPkts = currInUcastPkts;
        this.trafficData.inUcastPps = 0;

        this.trafficData.prevOutUcastPkts = currOutUcastPkts;
        this.trafficData.outUcastPps = 0;

        this.trafficData.prevInNUcastPkts = currInNUcastPkts;
        this.trafficData.inNUcastPps = 0;

        this.trafficData.prevOutNUcastPkts = currOutNUcastPkts;
        this.trafficData.outNUcastPps = 0;

        this.trafficData.started = true;
    }

    this.highlightInterfaceErrors();
};

/**
 * Interface error highlight
 */
CanopyEnhancer.prototype.highlightInterfaceErrors = function () {

    var errorClassName = "cge-error-text";
    var errorFields = [];

    if (this.isEthernetStats()) {
        errorFields = this.ethernetErrorsFields;
    } else if (this.isRadioStats()) {
        errorFields = this.radioErrorsFields;
    }

    if (errorFields.length > 0) {

        for (var i = 0; i < errorFields.length; i++) {

            var el = document.getElementById(errorFields[i]);
            if (!el) {
                continue;
            }

            var value = Number(el.textContent);
            if (value > 0) {
                // Add highlight to the counter
                el.parentNode.parentNode.parentNode.classList.add(errorClassName);
                el.parentNode.parentNode.parentNode.classList.add("bold");
            } else {
                // Remove error highlight if it was previously added
                el.parentNode.parentNode.parentNode.classList.remove(errorClassName);
                el.parentNode.parentNode.parentNode.classList.remove("bold");
            }
        }
    }

};

/* ======================================================================
 *  =SoundingStats
 * ======================================================================*/

/**
 * Replace commas with pipe
 *
 * @param text
 * @returns {*}
 */
CanopyEnhancer.prototype.replaceSoundingCommas = function(text) {
    for (var i = 0; i < this.soundingStatsFields.length; i++) {
        var regExpTmp = new RegExp(',\\s+'+RegExp.quote(this.soundingStatsFields[i]));
        text = text.replace(regExpTmp, "|"+this.soundingStatsFields[i]);
    }
    return text;
};

/**
 * Remove headers from rows
 * @param text
 * @returns {*}
 */
CanopyEnhancer.prototype.removeSoundingHeaders = function(text) {
    for (var i = 0; i < this.soundingStatsFields.length; i++) {
        text = text.replace(this.soundingStatsFields[i], "");
    }
    return text;
};

/**
 * Table rendering
 */
CanopyEnhancer.prototype.renderSoundingStats = function() {

    var _this = this;
    var soundingStatsBlock = document.getElementById('SectionSoundingStatistics');
    var soundingStatsLog = document.getElementById('SoundingStatsLog');
    var soundingStatsTable = document.querySelector('#SectionSoundingStatistics table.section');

    if (soundingStatsLog) {

        // create an observer instance
        this.medusaObserver = new MutationObserver(function (mutations) {
            if (mutations && mutations.length > 0) {

                var rawLog = soundingStatsLog.innerHTML;
                var tbodyImprovedTable = document.getElementById('cge-sounding-tbody');
                if (!tbodyImprovedTable) {
                    // Create the table
                    var soundingTable = '';
                    soundingTable += '<table class="table section">';
                    soundingTable += '<thead>';
                    soundingTable += '<tr>';
                    for (var i = 0; i < _this.soundingStatsFields.length; i++) {
                        soundingTable += '<td>' + _this.soundingStatsFields[i].replace(':', '') + '</td>';
                    }
                    soundingTable += '</thead>';
                    soundingTable += '</tr>';

                    soundingTable += '<tbody id="cge-sounding-tbody">';
                    soundingTable += '</tbody>';
                    soundingTable += '</table>';

                    // Insert the table before sounding sections begin
                    soundingStatsTable.insertAdjacentHTML('beforebegin', soundingTable);

                    // Get tbody element
                    tbodyImprovedTable = document.getElementById('cge-sounding-tbody');
                } else {
                    tbodyImprovedTable.emptyElement();
                }

                var splittedLog = rawLog.split("<br>");
                var soundingTbody = '';
                for (i = 0; i < splittedLog.length; i++) {
                    var row = _this.replaceSoundingCommas(splittedLog[i]);
                    row = _this.removeSoundingHeaders(row);
                    var splittedRow = row.split("|");
                    if (splittedRow.length > 1) {
                        soundingTable += '<tr>';
                        for (var k = 0; k < splittedRow.length; k++) {
                            var cellContent = splittedRow[k].trim();
                            cellContent = escapeHTML(cellContent);

                            switch (k) {
                                case 1:
                                    if (!cellContent.match(/^([0-9]{1,4})\s\(VALID\)$/)) {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                                case 2:
                                    if (cellContent !== '3 (TRACKING)') {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                                case 3:
                                    if (cellContent !== '0 (NONE)') {
                                        cellContent = '<span class="cge-avglink-text">'+cellContent+'</span>';
                                    }
                                    break;
                            }

                            soundingTbody += '<td>'+cellContent+'</td>';
                        }
                        soundingTbody += '</tr>';
                    }
                }

                tbodyImprovedTable.insertAdjacentHTML('afterbegin', soundingTbody);

            }
        });

        // configuration of the observer:
        var config = {
            attributes: true,
            childList: true,
            characterData: true
        };

        // pass in the target node, as well as the observer options
        this.medusaObserver.observe(soundingStatsLog, config);

        soundingStatsBlock.style.position = 'relative';
        soundingStatsBlock.style.overflow = 'hidden';

        soundingStatsTable.style.position = 'absolute';
        soundingStatsTable.style.left = '4000px';
    }
};

/* ======================================================================
 *  =APEvaluation
 * ======================================================================*/

/**
 * Get evaluation Data
 * @returns {boolean}
 */
CanopyEnhancer.prototype.extractAPEvaluationData = function() {
    var rawAPEval = this.apEvaluationBlock.innerHTML;
    var tmpAPEvalFields = this.APEvaluationFields[this.currentRadioModulation];

    var regex = /<br\s*[\/]?>/gi;
    rawAPEval = rawAPEval.replace(regex, " ");
    rawAPEval = rawAPEval.replace(/\&nbsp\;/gi, " ");
    var splittedEval = rawAPEval.split("*********************************************");

    splittedEval[0] = splittedEval[0].replace(/([\n]+)/g, " ");
    splittedEval[0] = splittedEval[0].replace(/([\s]+)/g, " ");

    var tmpFirstRowMatch = splittedEval[0].match(/AP Selection Method used\:(.*)\sCurrent entry index\:/);
    if (tmpFirstRowMatch) {
        this.apSelectionMethod = tmpFirstRowMatch[1];
    }
    tmpFirstRowMatch = splittedEval[0].match(/Current entry index\:\s([0-9]+)\sSession Status\:/);
    if (tmpFirstRowMatch) {
        this.currentEvaluatinEntry = tmpFirstRowMatch[1];
    }
    tmpFirstRowMatch = splittedEval[0].match(/Session Status\:\s([A-Z]+)\s\(/);
    if (tmpFirstRowMatch) {
        this.currentSessionStatus = tmpFirstRowMatch[1];
    }

    if (this.debugMessages() === true) {
        console.log("AP Selection Method: " + this.apSelectionMethod);
        console.log("Current eval entry: " + this.currentEvaluatinEntry);
        console.log("Session status: " + this.currentSessionStatus);
    }

    delete(splittedEval[0]);
    for (var i=1;i<splittedEval.length;i++) {
        var index = i - 1;
        var tmpStr = splittedEval[i];
        var tmpObj = {};
        var tmpMatch;
        var tmpRegexp;

        for(var k = 0;k < tmpAPEvalFields.length;k++) {
            var kplus = k+1;
            var pre_pattern = RegExp.quote(tmpAPEvalFields[k]);

            if (kplus < tmpAPEvalFields.length) {
                var post_pattern = RegExp.quote(tmpAPEvalFields[kplus]);

                // Fix for sw version < 14.1.1
                if (post_pattern === 'Beacon Receive Power' && this.currentRadioModulation === 'MIMO_OFDM') {
                    post_pattern += '(?:\\sLevel)?'
                }

                if (pre_pattern === 'RegFail') {
                    tmpRegexp = new RegExp(pre_pattern + " ([0-9]+).*" + post_pattern+"\:");
                } else if (pre_pattern === 'Beacon Receive Power' && this.currentRadioModulation === 'MIMO_OFDM') {
                    // Fix for sw version < 14.1.1
                    tmpRegexp = new RegExp(pre_pattern + "(?:\\sLevel)?\:(.*)" + post_pattern);
                } else {
                    tmpRegexp = new RegExp(pre_pattern + "\:(.*)" + post_pattern);
                }
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank();
                }
            } else {
                tmpRegexp = new RegExp(pre_pattern+"\:(.*)ms");
                tmpMatch = tmpStr.match(tmpRegexp);
                if (tmpMatch) {
                    tmpObj[pre_pattern] = tmpMatch[1].trimBlank()+' ms';
                }
                if ( (i+1 === splittedEval.length) && (this.currentSessionStatus === 'SCANNING')) {
                    tmpRegexp = new RegExp(pre_pattern+"\:(?:.*)?Currently Scanning:\\s(.*)");
                    tmpMatch = tmpStr.match(tmpRegexp);
                    if (tmpMatch) {
                        this.currentlyScanning = tmpMatch[1].trimBlank();
                    }
                }
            }
        }
        this.APEvaluationObj[index] = tmpObj;
    }

    return (this.APEvaluationObj.length > 0);
};

/**
 * Render AP Evaluation data in HTML
 */
CanopyEnhancer.prototype.renderBetterEvaluationTemplate = function() {

    var betterEvalBlock = document.getElementById('betterEvaluation');
    if (typeof(betterEvalBlock) === 'undefined' || betterEvalBlock == null) {
        betterEvalBlock = document.createElement("div");
        betterEvalBlock.id = 'betterEvaluation';
        betterEvalBlock.emptyElement();
        this.apEvaluationBlock.parentNode.insertBefore(betterEvalBlock, this.apEvaluationBlock.nextSibling);
    }

    var evaluationContent = '';
    evaluationContent += "<div class='betterEvaluationHead'> <b>AP Selection Method:</b> "+this.apSelectionMethod+' - ';
    evaluationContent += ' <b>Current evaluation entry:</b> <a href="#cge-ap-eval-entry-'+this.currentEvaluatinEntry+'">'+this.currentEvaluatinEntry+'</a> - ';
    evaluationContent += " <b>Session status:</b> "+this.currentSessionStatus;
    if (this.currentSessionStatus === 'SCANNING') {
        evaluationContent += " - <b>Currently Scanning:</b> "+this.currentlyScanning;
    }
    evaluationContent += "</div><hr /><br />";

    for(var i = 0;i<this.APEvaluationObj.length;i++) {
        var evalEntry = this.APEvaluationObj[i];
        var currIndex = Number(evalEntry['Index']);
        delete evalEntry['Index'];

        var insRow = true;
        var counter = 0;
        evaluationContent += '<div class="cge-ap-evaluation-entry-title">';
        evaluationContent += '<a name="cge-ap-eval-entry-'+currIndex+'"></a>Entry: ' + currIndex;
        if (currIndex == this.currentEvaluatinEntry) {
            evaluationContent += ' - Current AP';
        }
        evaluationContent += '</div>';
        evaluationContent += '<table class="table table-responsive table-striped table-condensed table-bordered cge-ap-evaluation-entry-table"><tbody>';
        for (var prop in evalEntry) {
            if(!evalEntry.hasOwnProperty(prop)) continue;
            counter++;
            if (insRow === true) {
                evaluationContent += '<tr>';
                insRow = false;
            }
            switch (prop) {
                case 'Beacon Receive Power':
                case 'Beacon Receive Power Level':
                    var tmpres = evalEntry[prop].match(/\-(([0-9]+)(\.([0-9]))?)/);
                    if (tmpres) {
                        var tmpsignal = parseFloat(tmpres[1]);
                        tmpsignal = -tmpsignal;
                        var cellClass = '';
                        if (tmpsignal > -70) {
                            cellClass = 'cge-good-power-level';
                        } else if (tmpsignal <= -70 && tmpsignal > -80) {
                            cellClass = 'cge-decent-power-level';
                        } else {
                            cellClass = 'cge-bad-power-level';
                        }
                        evaluationContent += '<td>'+prop+': <span class="'+cellClass+'">'+evalEntry[prop]+'</span></td>';
                    } else {
                        evaluationContent += '<td>'+prop+': '+evalEntry[prop]+'</td>';
                    }
                    break;
                case 'ESN':
                case 'Color Code':
                case 'SectorUserCount':
                    evaluationContent += '<td class="cge-highlight-eval-entry">'+prop+': '+evalEntry[prop]+'</td>';
                    break;
                default:
                    evaluationContent += '<td>'+prop+': '+evalEntry[prop]+'</td>';
                    break;
            }

            if (counter % 6 === 0) {
                evaluationContent += '</tr>';
                insRow = true;
            }
        }
        if (insRow === true) {
            evaluationContent += '</tr>';
        }

        evaluationContent += '</table></tbody>';
    }

    betterEvalBlock.emptyElement();
    betterEvalBlock.insertAdjacentHTML('afterbegin', evaluationContent);
    this.apEvaluationBlock.style.display = 'none';
};

/**
 * Initialize better evaluation
 */
CanopyEnhancer.prototype.betterEvaluation = function() {
    if (this.apEvaluationBlock !== null && this.settings.cge_ap_evaluation) {
        if (typeof this.APEvaluationFields[this.currentRadioModulation] !== 'undefined') {
            if (this.extractAPEvaluationData()) {
                if (this.refreshTime > 0) {
                    var _this = this;
                    _this.renderBetterEvaluationTemplate();
                    setInterval(function () {
                        _this.extractAPEvaluationData();
                        _this.renderBetterEvaluationTemplate();
                    }, this.intervalsTimeout);
                } else {
                    this.renderBetterEvaluationTemplate();
                }
            }
        }
    }
};

/* ======================================================================
 *  =MACLookUp
 * ======================================================================*/

/**
 * MAC Lookup API
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.MACLookUp = function(block) {
    var _this = this;
    var blockRect = block.getBoundingClientRect();
    var macaddress = block.textContent.trimBlank();
    block.classList.add('cge-highlight');

    if (macaddress.isMAC()) {
        jsonp('https://maclookup.info/api/jsonp/'+macaddress, function(response) {
            if (response.ok !== undefined) {
                var attrContent;
                if (_this.debugMessages() === true) {
                    console.log(response);
                }
                if (response.ok === true) {
                    attrContent = "Company: " + response.data.company + "\n\n";
                    attrContent += "MAC Prefix: " + response.data.prefix + "\n\n";
                    attrContent += "Address: " + response.data.address+ "\n\n";
                    attrContent += "Country Code: " + response.data.country_code

                } else {
                    attrContent = "Error, no result";
                }

                _this.tooltipMACNode.emptyElement();
                _this.tooltipMACNode.appendChild(document.createTextNode(attrContent));
                _this.tooltipMACNode.style.display = 'block';
                var tooltipRect = _this.tooltipMACNode.getBoundingClientRect();
                _this.tooltipMACNode.style.top = ( (blockRect.top + document.body.scrollTop) - (tooltipRect.height) - 5) + "px";
                _this.tooltipMACNode.style.left = ( (blockRect.left + (blockRect.width / 2)) - (tooltipRect.width / 2))+ "px";
            }
        });
    } else {
        _this.tooltipMACNode.style.display = 'none';
        block.classList.remove('cge-highlight');
    }
};

/**
 * Initialize listeners
 */
CanopyEnhancer.prototype.addMACLookUpListener = function(querySelector) {
    querySelector = typeof querySelector !== 'undefined' ? querySelector : 'body';
    var _this = this;

    document.querySelector(querySelector).addEventListener('mouseover', function(event) {
        _this.MACLookUp(event.target);
    });

    document.querySelector(querySelector).addEventListener('mouseout', function(event) {
        event.target.classList.remove('cge-highlight');
        _this.tooltipMACNode.style.display = 'none';
    });

    document.querySelector(querySelector).addEventListener('click', function(event) {
        _this.MACLookUp(event.target);
    });
};

/**
 * Tooltip
 * @constructor
 */
CanopyEnhancer.prototype.MACLookupTooltip = function() {
    // Tooltip
    this.tooltipMACNode = document.createElement('div');
    this.tooltipMACNode.id = 'cge-mac-lookup-tooltip';
    this.tooltipMACNode.className = 'cge-tooltip';
    document.getElementsByTagName("body")[0].appendChild(this.tooltipMACNode);
};

/**
 * ARP Page processing
 */
CanopyEnhancer.prototype.MacLookupPage = function() {
    if ((this.currentCatIndex === 2 &&
        (this.currentPageIndex === 20 || this.currentPageIndex === 5 || this.currentPageIndex === 21)) &&
        (this.settings.cge_mac_lookup === 1)) {
        this.MACLookupTooltip();
        this.addMACLookUpListener('#page');
    }
};

/* ======================================================================
 *  =NAT Table
 * ======================================================================*/

/**
 * IP Lookup
 *
 * @param block
 * @constructor
 */
CanopyEnhancer.prototype.IPLookUp = function(block) {
    var _this = this;
    var blockRect = block.getBoundingClientRect();
    var ip = block.textContent.trimBlank();
    block.classList.add('cge-highlight');
    if (ip.isValidPubIP()) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://ipinfo.io/' + ip+'/json', true);
        request.onload = function () {
            var attrContent;
            if (request.status >= 200 && request.status < 400) {

                // Success!
                var data = JSON.parse(request.responseText);
                if (_this.debugMessages() === true) {
                    console.log(data);
                }
                if (data.ip !== 'undefined') {
                    attrContent = "AS: " + data.org + "\n";
                    attrContent += "Country: " + data.country +"\n";
                    attrContent += "Region: " + data.region+ "\n";
                    attrContent += "City: " + data.city+ "\n";
                    attrContent += "Hostname: " + data.hostname;
                } else {
                    attrContent = "Error, no result";
                }
            } else {
                // Error
                attrContent = "Error, no result";
            }

            _this.tooltipIPNode.emptyElement();
            _this.tooltipIPNode.appendChild(document.createTextNode(attrContent));
            _this.tooltipIPNode.style.display = 'block';
            var tooltipRect = _this.tooltipIPNode.getBoundingClientRect();
            _this.tooltipIPNode.style.top = ( (blockRect.top + document.body.scrollTop) - (tooltipRect.height) - 5) + "px";
            _this.tooltipIPNode.style.left =  (blockRect.left + (blockRect.width / 2) - (tooltipRect.width / 2))+ "px";

        };
        request.onerror = function () {};
        request.send();
    } else {
        block.classList.remove('cge-highlight');
        _this.tooltipIPNode.style.display = 'none';
    }
};

/**
 * Initialize listeners
 */
CanopyEnhancer.prototype.addIPLookUpListener = function(querySelector) {
    querySelector = typeof querySelector !== 'undefined' ? querySelector : 'body';
    var _this = this;

    document.querySelector(querySelector).addEventListener('mouseover', function(event) {
        _this.IPLookUp(event.target);
    });

    document.querySelector(querySelector).addEventListener('mouseout', function(event) {
        event.target.classList.remove('cge-highlight');
        _this.tooltipIPNode.style.display = 'none';
    });

    document.querySelector(querySelector).addEventListener('click', function(event) {
        _this.IPLookUp(event.target);
    });
};

/**
 * NAT Table
 */
CanopyEnhancer.prototype.NATTable = function() {
    if (this.currentCatIndex === 5 && this.currentPageIndex === 9 && this.settings.cge_ip_lookup === 1) {

        // Tooltip
        this.tooltipIPNode = document.createElement('div');
        this.tooltipIPNode.id = 'cge-ip-lookup-tooltip';
        this.tooltipIPNode.className = 'cge-tooltip';
        document.getElementsByTagName("body")[0].appendChild(this.tooltipIPNode);

        // Listeners
        this.addIPLookUpListener('#page');
    }
};

/* ======================================================================
 *  =AP Throughput page
 * ======================================================================*/

/**
 * Is the throughput page
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isAPThroughputPage = function() {
    if (this.currentCatIndex === 2 && this.currentPageIndex === 12) {
        return true;
    }
    return (document.getElementById('SectionLUIDStats') !== null);
};

/**
 * AP Throughput check
 * @constructor
 */
CanopyEnhancer.prototype.APThroughput = function() {
    if (this.isAPThroughputPage() && this.settings.cge_ap_throughput === 1) {
        if (this.refreshTime === 0) {
            document.getElementById('SectionLUIDStats').insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time stats (Configuration => General)</div>'
            );
        } else {
            this.APThroughputCalc();
        }
    }
};

/**
 * AP Throughput calculation
 * @constructor
 */
CanopyEnhancer.prototype.APThroughputCalc = function() {
    if (this.isAPThroughputPage()) {
        let table = document.getElementById('LuidOLtable');
        let tbody = table.querySelector('tbody');
        let rows = tbody.querySelectorAll('tr');
        let totalInTraffic = 0;
        let totalOutTraffic = 0;
        if (rows.length > 0) {

            table.querySelector('thead tr:nth-child(1) th:nth-child(3)').setAttribute('colspan', 14);
            table.querySelector('thead tr:nth-child(2) th:nth-child(1)').setAttribute('colspan', 7);
            table.querySelector('thead tr:nth-child(2) th:nth-child(2)').setAttribute('colspan', 7);

            // Add new columns
            table.querySelector('thead tr:nth-child(3) th:nth-child(1)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(4)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(8)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );
            table.querySelector('thead tr:nth-child(3) th:nth-child(11)').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            for(var i = 0; i <  rows.length; i++) {
                var LUID = parseInt(rows[i].querySelector('td:nth-child(2)').textContent);
                if (LUID < 255) {
                    var InTraffic, OutTraffic, InPPS, OutPPS;
                    var currInOctets = intval(rows[i].querySelector('td:nth-child(3)').textContent);
                    var currOutOctets = intval(rows[i].querySelector('td:nth-child(8)').textContent);

                    var currInPackets = intval(rows[i].querySelector('td:nth-child(4)').textContent);
                    var currOutPackets = intval(rows[i].querySelector('td:nth-child(9)').textContent);

                    if (this.APThroughputSM[LUID] !== undefined) {
                        /*
                         * IN
                         */
                        // traffic
                        InTraffic = this.calcPerSeconds(currInOctets, this.APThroughputSM[LUID].prevInOctets);
                        this.APThroughputSM[LUID].prevInOctets = currInOctets;
                        // packets
                        InPPS = this.calcPerSeconds(currInPackets, this.APThroughputSM[LUID].prevInPackets);
                        InPPS = Math.round(InPPS);
                        this.APThroughputSM[LUID].prevInPackets = currInPackets;

                        /*
                         * OUT
                         */
                        // traffic
                        OutTraffic = this.calcPerSeconds(currOutOctets, this.APThroughputSM[LUID].prevOutOctets);
                        this.APThroughputSM[LUID].prevOutOctets = currOutOctets;
                        // packets
                        OutPPS = this.calcPerSeconds(currOutPackets, this.APThroughputSM[LUID].prevOutPackets);
                        OutPPS = Math.round(OutPPS);
                        this.APThroughputSM[LUID].prevOutPackets = currOutPackets;
                    } else {
                        this.APThroughputSM[LUID] = {
                            prevInOctets: currInOctets,
                            prevInPackets: currInPackets,
                            prevOutOctets: currOutOctets,
                            prevOutPackets: currOutPackets
                        };
                        InTraffic = 0;
                        OutTraffic = 0;
                        InPPS = 0;
                        OutPPS = 0;
                    }
                    totalInTraffic = totalInTraffic + InTraffic;
                    totalOutTraffic = totalOutTraffic + OutTraffic;

                    InTraffic = InTraffic.byte2Mbit().toFixed(2);
                    OutTraffic = OutTraffic.byte2Mbit().toFixed(2);

                    rows[i].querySelector('td:nth-child(3)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+InTraffic+'</td>');
                    rows[i].querySelector('td:nth-child(5)').insertAdjacentHTML('beforeend', "<br /><b class=\"cge-color-blue-cambium\">"+InPPS+" pps</b>");
                    rows[i].querySelector('td:nth-child(6)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevInOctets.formatDataUsage()+'</td>');

                    rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+OutTraffic+'</td>');
                    rows[i].querySelector('td:nth-child(12)').insertAdjacentHTML('beforeend', "<br /><b class=\"cge-color-blue-cambium\">"+OutPPS+" pps</b>");
                    rows[i].querySelector('td:nth-child(13)').insertAdjacentHTML('afterend', '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevOutOctets.formatDataUsage()+'</td>');

                } else {
                    rows[i].querySelector('td:nth-child(3)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(5)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(10)').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child(12)').insertAdjacentHTML('afterend', '<td></td>');
                }
            }
        }
    }
};

/* ======================================================================
 *  =DATA VC SECTION
 * ======================================================================*/

/**
 * Is the throughput page
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isDataVCPage = function() {
    return (this.currentCatIndex === 2 && this.currentPageIndex === 11);
};

/**
 * AP Throughput check
 * @constructor
 */
CanopyEnhancer.prototype.dataVC = function() {
    if (this.isDataVCPage() && this.settings.cge_ap_data_vc === 1) {
        if (this.refreshTime === 0) {
            document.getElementById('SectionDnlkStatsHW').insertAdjacentHTML(
                'beforebegin',
                '<div class="cge-error">Set Webpage Auto Update > 0 for real time stats (Configuration => General)</div>'
            );
        } else {
            this.dataVCCalc();
        }
    }
};

/**
 * AP Throughput calculation
 * @constructor
 */
CanopyEnhancer.prototype.dataVCCalc = function() {
    if (this.isDataVCPage() && this.settings.cge_ap_data_vc === 1) {
        let table = document.getElementById('datavctable');
        let tbody = table.querySelector('tbody');
        let rows = tbody.querySelectorAll('tr');
        let totalInTraffic = 0;
        let totalOutTraffic = 0;

        let isPre151 = (document.getElementById('datavctablefragmodulation') === null);

        let tableConfig;

        switch (this.currentRadioModulation) {
            case PLATFORM_FSK:
                tableConfig = {
                    header: {
                        colspanIn: "7",
                        colspanOut: "7",
                        inMbpsAfter: "1",
                        inDataUsageAfter: "4",
                        outMbpsAfter: "8",
                        outDataUsageAfter: "11"
                    },
                    low: {
                        currInOctets: "4",
                        currInUPackets: "5",
                        currInNuPackets: "6",
                        currOutOctets: "9",
                        currOutUPackets: "10",
                        currOutNuPackets: "11"
                    },
                    high: {
                        currInOctets: "3",
                        currInUPackets: "4",
                        currInNuPackets: "5",
                        currOutOctets: "8",
                        currOutUPackets: "9",
                        currOutNuPackets: "10"
                    }
                };
                break;
            default:
                if (isPre151) {
                    tableConfig = {
                        header: {
                            colspanIn: "11",
                            colspanOut: "7",
                            inMbpsAfter: "1",
                            inDataUsageAfter: "4",
                            outMbpsAfter: "12",
                            outDataUsageAfter: "15"
                        },
                        low: {
                            currInOctets: "4",
                            currInUPackets: "5",
                            currInNuPackets: "6",
                            currOutOctets: "13",
                            currOutUPackets: "14",
                            currOutNuPackets: "15"
                        },
                        high: {
                            currInOctets: "3",
                            currInUPackets: "4",
                            currInNuPackets: "5",
                            currOutOctets: "8",
                            currOutUPackets: "9",
                            currOutNuPackets: "10"
                        }
                    };
                } else {
                    tableConfig = {
                        header: {
                            colspanIn: "7",
                            colspanOut: "7",
                            inMbpsAfter: "1",
                            inDataUsageAfter: "4",
                            outMbpsAfter: "8",
                            outDataUsageAfter: "11"
                        },
                        low: {
                            currInOctets: "4",
                            currInUPackets: "5",
                            currInNuPackets: "6",
                            currOutOctets: "9",
                            currOutUPackets: "10",
                            currOutNuPackets: "11"
                        },
                        high: {
                            currInOctets: "3",
                            currInUPackets: "4",
                            currInNuPackets: "5",
                            currOutOctets: "8",
                            currOutUPackets: "9",
                            currOutNuPackets: "10"
                        }
                    };
                }
                break;
        }

        if (rows.length > 0) {

            table.querySelector('thead tr:nth-child(1) th:nth-child(4)').setAttribute(
                'colspan',
                tableConfig.header.colspanIn
            );
            table.querySelector('thead tr:nth-child(1) th:nth-child(5)').setAttribute(
                'colspan',
                tableConfig.header.colspanOut
            );

            // In Mbps
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.inMbpsAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );

            // In Data Usage
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.inDataUsageAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            // Out Mbps
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.outMbpsAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">traffic (Mbps)</th>'
            );

            // Out Data Usage
            table.querySelector('thead tr:nth-child(2) th:nth-child('+tableConfig.header.outDataUsageAfter+')').insertAdjacentHTML(
                'afterend',
                '<th class="table-sortable:numeric table-sortable" title="Click to sort">data usage</th>'
            );

            for(var i = 0; i <  rows.length; i++) {
                let LUID, VCType;
                if (rows[i].querySelector('td:nth-child(1)').textContent.length === 3) {
                    LUID = intval(rows[i].querySelector('td:nth-child(1)').textContent);
                    VCType = 'high';
                } else {
                    LUID = intval(rows[i].querySelector('td:nth-child(2)').textContent)
                    var htmlSMName = rows[i].querySelector('td:nth-child(1)').innerHTML;
                    htmlSMName = htmlSMName.replace(/\s\-\sLUID\:/, '<br />LUID:');
                    rows[i].querySelector('td:nth-child(1)').emptyElement();
                    rows[i].querySelector('td:nth-child(1)').insertAdjacentHTML('afterbegin', htmlSMName);
                    rows[i].querySelector('td:nth-child(1)').style.minWidth = '200px';
                    rows[i].querySelector('td:nth-child(1)').style.textAlign = 'left';
                    VCType = 'low';
                }

                if (LUID <= 255) {
                    let InTraffic, OutTraffic, InUPPS, InNuPPS, OutUPPS, OutNuPPS;
                    let currInOctets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').textContent);
                    let currOutOctets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').textContent);

                    let currInUPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInUPackets+')').textContent);
                    let currInNuPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').textContent);
                    let currOutUPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutUPackets+')').textContent);
                    let currOutNuPackets = intval(rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').textContent);

                    if (this.APThroughputSM[LUID] !== undefined) {
                        /*
                         * IN
                         */
                        // traffic
                        InTraffic = this.calcPerSeconds(currInOctets, this.APThroughputSM[LUID].prevInOctets);
                        this.APThroughputSM[LUID].prevInOctets = currInOctets;

                        // Unicast packets
                        InUPPS = this.calcPerSeconds(currInUPackets, this.APThroughputSM[LUID].prevInUPackets);
                        InUPPS = Math.round(InUPPS);
                        this.APThroughputSM[LUID].prevInUPackets = currInUPackets;
                        // Non Unicast packets
                        InNuPPS = this.calcPerSeconds(currInNuPackets, this.APThroughputSM[LUID].prevInNuPackets);
                        InNuPPS = Math.round(InNuPPS);
                        this.APThroughputSM[LUID].prevInNuPackets = currInNuPackets;

                        /*
                         * OUT
                         */
                        // traffic
                        OutTraffic = this.calcPerSeconds(currOutOctets, this.APThroughputSM[LUID].prevOutOctets);
                        this.APThroughputSM[LUID].prevOutOctets = currOutOctets;

                        // packets
                        OutUPPS = this.calcPerSeconds(currOutUPackets, this.APThroughputSM[LUID].prevOutUPackets);
                        OutUPPS = Math.round(OutUPPS);
                        this.APThroughputSM[LUID].prevOutUPackets = currOutUPackets;

                        // packets
                        OutNuPPS = this.calcPerSeconds(currOutNuPackets, this.APThroughputSM[LUID].prevOutNuPackets);
                        OutNuPPS = Math.round(OutNuPPS);
                        this.APThroughputSM[LUID].prevOutNuPackets = currOutNuPackets;

                    } else {
                        this.APThroughputSM[LUID] = {
                            prevInOctets: currInOctets,
                            prevInUPackets: currInUPackets,
                            prevInNuPackets: currInNuPackets,
                            prevOutOctets: currOutOctets,
                            prevOutUPackets: currOutUPackets,
                            prevOutNuPackets: currOutNuPackets
                        };
                        InTraffic = 0;
                        OutTraffic = 0;
                        InUPPS = 0;
                        InNuPPS = 0;
                        OutUPPS = 0;
                        OutNuPPS = 0;
                    }
                    totalInTraffic = totalInTraffic + InTraffic;
                    totalOutTraffic = totalOutTraffic + OutTraffic;

                    InTraffic = InTraffic.byte2Mbit().toFixed(2);
                    OutTraffic = OutTraffic.byte2Mbit().toFixed(2);

                    // Outbound
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevOutOctets.formatDataUsage()+'</td>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + OutNuPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutUPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + OutUPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+OutTraffic+'</td>'
                    );

                    // Inbound
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML(
                        'afterend',
                        '<td class="cge-highlight">'+this.APThroughputSM[LUID].prevInOctets.formatDataUsage()+'</td>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + InNuPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInUPackets+')').insertAdjacentHTML(
                        'beforeend',
                        '<br /><b class="cge-color-blue-cambium">' + InUPPS + ' pps</b>'
                    );
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').insertAdjacentHTML(
                        'afterend', '<td class="cge-highlight">'+InTraffic+'</td>'
                    );

                } else {
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutNuPackets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currOutOctets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInNuPackets+')').insertAdjacentHTML('afterend', '<td></td>');
                    rows[i].querySelector('td:nth-child('+tableConfig[VCType].currInOctets+')').insertAdjacentHTML('afterend', '<td></td>');
                }
            }
        }
    }
};

/* ======================================================================
 *  =EventLog
 * ======================================================================*/

CanopyEnhancer.prototype.EventLog = function() {
    if ( (this.currentCatIndex === 0 && this.currentPageIndex === 5  && (this.currentRadioModulation === 'MIMO_OFDM' || this.currentRadioModulation === 'FSK')) ||
        (this.currentCatIndex === 0 && this.currentPageIndex === 4  && this.currentRadioModulation === 'SISO_OFDM')) {
        let ContentBlock = document.getElementById('SysLoga');
        let ContentBlockHTML = ContentBlock.innerHTML;

        let checkSysStartup = ContentBlockHTML.match(/\*System Startup\*/igm);

        let logwrapper = document.createElement('div');
        logwrapper.id = 'cge-event-log-wrapper';

        let div, table, tbody, tr, td, rows;

        if (checkSysStartup) {

            let splittedLog = ContentBlockHTML.split("******System Startup******");

            div = document.createElement('div');
            div.className = 'cge-event-log-divider';
            table = document.createElement('table');
            table.className = 'table table-striped table-responsive table-condensed';
            tbody = document.createElement('tbody');

            for (let i = 0; i < splittedLog.length; i++) {

                rows = splittedLog[i].split("<br>");

                for (let k = 0; k < rows.length; k++) {
                    if (rows[k] !== "" && rows[k] !== " ") {
                        tr = document.createElement('tr');
                        td = document.createElement('td');

                        rows[k] = rows[k].replace('&lt;br /&gt;', "<br />");

                        this.eventLogErrorStrings.forEach(function(value, key){
                            rows[k] = highlightErrorsInText(value, rows[k]);
                        });

                        td.insertAdjacentHTML('afterbegin', rows[k]);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                }

                table.appendChild(tbody);
                div.appendChild(table);
                logwrapper.appendChild(div);

                if (i < splittedLog.length - 1) {
                    div = document.createElement('div');
                    div.className = 'cge-event-log-divider';
                    table = document.createElement('table');
                    table.className = 'table table-striped table-responsive table-condensed';
                    tbody = document.createElement('tbody');

                    var h4 = document.createElement('h4');
                    h4.className = 'cge-block-title';
                    h4.appendChild(document.createTextNode("******System Startup******"));
                    div.appendChild(h4);
                }
            }
        } else {
            if (ContentBlockHTML.length > 0) {

                div = document.createElement('div');
                div.className = 'cge-event-log-divider';
                table = document.createElement('table');
                table.className = 'table table-striped table-responsive table-condensed';
                tbody = document.createElement('tbody');

                rows = ContentBlockHTML.split("<br>");

                for (let k = 0; k < rows.length; k++) {
                    if (rows[k] !== "" && rows[k] !== " ") {
                        tr = document.createElement('tr');
                        td = document.createElement('td');

                        rows[k] = rows[k].replace('&lt;br /&gt;', "<br />");

                        this.eventLogErrorStrings.forEach(function(value, key){
                            rows[k] = highlightErrorsInText(value, rows[k]);
                        });

                        td.insertAdjacentHTML('afterbegin', rows[k]);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                }

                table.appendChild(tbody);
                div.appendChild(table);
                logwrapper.appendChild(div);
            }
        }
        ContentBlock.emptyElement();
        ContentBlock.appendChild(logwrapper);
    }
};


/* ======================================================================
 *  =SessionStatus
 * ======================================================================*/

/**
 * Is the session status page?
 * @returns {boolean}
 */
CanopyEnhancer.prototype.isSessionStatusPage = function() {
    return (this.currentCatIndex === 0 && this.currentPageIndex === 2);
};

/**
 * Session Status page
 */
CanopyEnhancer.prototype.sessionStatus = function() {
    if (this.isSessionStatusPage()) {
        var span, frag;
        var allModulationCells = document.querySelectorAll('#luidlisttable_3 tr td:nth-child(3)');
        for (var i = 0;i < allModulationCells.length;i++) {
            var matchAllModulations = allModulationCells[i].innerHTML.match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/igm);
            if (matchAllModulations) {

                frag = document.createDocumentFragment();

                for (var j = 0; j < matchAllModulations.length; j++) {
                    if (j > 0) {
                        frag.appendChild(document.createElement('br'));
                    }
                    var matchModulation = matchAllModulations[j].match(/VC\s{1,2}(?:[\d]{1,3})\sRate\s(?:\d)X\/(\d)X\s((?:MIMO|SISO)\-?(?:[A-B]))/i);
                    var adaptRate = intval(matchModulation[1]);

                    span = document.createElement('span');
                    span.className = this.getAdaptRateClass(adaptRate, matchModulation[2]);
                    span.appendChild(document.createTextNode(matchModulation[0]));
                    frag.appendChild(span);
                }

                allModulationCells[i].emptyElement();
                allModulationCells[i].appendChild(frag);
            }

        }
    }
};

if (typeof DataVCStatOnload === 'undefined') {
    function DataVCStatOnload(){}
}

var CGE = new CanopyEnhancer();
CGE.initialize();
