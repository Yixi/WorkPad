/**
 Author: liuyixi
 this is lincence
*/
var workpad={version:"0.0.1",util:{},dom:{},commands:{},ui:{},views:{},log:{},data:{},EMPTY_FUNCTION:function(){},ELEMENT_NODE:1,TEXT_NODE:3,KEYS:{BACKSPACE_KEY:8,TAB_KEY:9,ENTER_KEY:13,ESCAPE_KEY:27,SPACE_KEY:32,END_KEY:35,HOME_KEY:36,LEFT_KEY:37,UP_KEY:38,RIGHT_KEY:39,DOWN_KEY:40,DELETE_KEY:46,A_KEY:65,C_KEY:67,X_KEY:88,V_KEY:86,Z_KEY:90}},Base=function(){};
Base.extend=function(a,d){var b=Base.prototype.extend;Base._prototyping=!0;var c=new this;b.call(c,a);c.base=function(){};delete Base._prototyping;var f=c.constructor,e=c.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==e)this._constructing=!0,f.apply(this,arguments),delete this._constructing;else if(null!=arguments[0])return(arguments[0].extend||b).call(arguments[0],c)};e.ancestor=this;e.extend=this.extend;e.forEach=this.forEach;e.implement=this.implement;e.prototype=
c;e.toString=this.toString;e.valueOf=function(c){return"object"==c?e:f.valueOf()};b.call(e,d);"function"==typeof e.init&&e.init();return e};
Base.prototype={extend:function(a,d){if(1<arguments.length){var b=this[a];if(b&&"function"==typeof d&&(!b.valueOf||b.valueOf()!=d.valueOf())&&/\bbase\b/.test(d)){var c=d.valueOf();d=function(){var a=this.base||Base.prototype.base;this.base=b;var f=c.apply(this,arguments);this.base=a;return f};d.valueOf=function(b){return"object"==b?d:c};d.toString=Base.toString}this[a]=d}else if(a){var f=Base.prototype.extend;!Base._prototyping&&"function"!=typeof this&&(f=this.extend||f);for(var e={toSource:null},
g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;j=g[h++];)a[j]!=e[j]&&f.call(this,j,a[j]);for(var j in a)e[j]||f.call(this,j,a[j])}return this}};
var Base=Base.extend({constructor:function(a){this.extend(a)}},{ancestor:Object,version:"1.1",forEach:function(a,d,b){for(var c in a)void 0===this.prototype[c]&&d.call(b,a[c],c,a)},implement:function(){for(var a=0;a<arguments.length;a++)if("function"==typeof arguments[a])arguments[a](this.prototype);else this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}}),hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}
function hex_hmac_md5(a,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(d)))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),8*a.length))}
function rstr_hmac_md5(a,d){var b=rstr2binl(a);16<b.length&&(b=binl_md5(b,8*a.length));for(var c=Array(16),f=Array(16),e=0;16>e;e++)c[e]=b[e]^909522486,f[e]=b[e]^1549556828;b=binl_md5(c.concat(rstr2binl(d)),512+8*d.length);return binl2rstr(binl_md5(f.concat(b),640))}function rstr2hex(a){try{hexcase}catch(d){hexcase=0}for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",f,e=0;e<a.length;e++)f=a.charCodeAt(e),c+=b.charAt(f>>>4&15)+b.charAt(f&15);return c}
function str2rstr_utf8(a){for(var d="",b=-1,c,f;++b<a.length;)c=a.charCodeAt(b),f=b+1<a.length?a.charCodeAt(b+1):0,55296<=c&&56319>=c&&(56320<=f&&57343>=f)&&(c=65536+((c&1023)<<10)+(f&1023),b++),127>=c?d+=String.fromCharCode(c):2047>=c?d+=String.fromCharCode(192|c>>>6&31,128|c&63):65535>=c?d+=String.fromCharCode(224|c>>>12&15,128|c>>>6&63,128|c&63):2097151>=c&&(d+=String.fromCharCode(240|c>>>18&7,128|c>>>12&63,128|c>>>6&63,128|c&63));return d}
function rstr2binl(a){for(var d=Array(a.length>>2),b=0;b<d.length;b++)d[b]=0;for(b=0;b<8*a.length;b+=8)d[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;return d}function binl2rstr(a){for(var d="",b=0;b<32*a.length;b+=8)d+=String.fromCharCode(a[b>>5]>>>b%32&255);return d}
function binl_md5(a,d){a[d>>5]|=128<<d%32;a[(d+64>>>9<<4)+14]=d;for(var b=1732584193,c=-271733879,f=-1732584194,e=271733878,g=0;g<a.length;g+=16)var h=b,j=c,k=f,l=e,b=md5_ff(b,c,f,e,a[g+0],7,-680876936),e=md5_ff(e,b,c,f,a[g+1],12,-389564586),f=md5_ff(f,e,b,c,a[g+2],17,606105819),c=md5_ff(c,f,e,b,a[g+3],22,-1044525330),b=md5_ff(b,c,f,e,a[g+4],7,-176418897),e=md5_ff(e,b,c,f,a[g+5],12,1200080426),f=md5_ff(f,e,b,c,a[g+6],17,-1473231341),c=md5_ff(c,f,e,b,a[g+7],22,-45705983),b=md5_ff(b,c,f,e,a[g+8],7,
1770035416),e=md5_ff(e,b,c,f,a[g+9],12,-1958414417),f=md5_ff(f,e,b,c,a[g+10],17,-42063),c=md5_ff(c,f,e,b,a[g+11],22,-1990404162),b=md5_ff(b,c,f,e,a[g+12],7,1804603682),e=md5_ff(e,b,c,f,a[g+13],12,-40341101),f=md5_ff(f,e,b,c,a[g+14],17,-1502002290),c=md5_ff(c,f,e,b,a[g+15],22,1236535329),b=md5_gg(b,c,f,e,a[g+1],5,-165796510),e=md5_gg(e,b,c,f,a[g+6],9,-1069501632),f=md5_gg(f,e,b,c,a[g+11],14,643717713),c=md5_gg(c,f,e,b,a[g+0],20,-373897302),b=md5_gg(b,c,f,e,a[g+5],5,-701558691),e=md5_gg(e,b,c,f,a[g+
10],9,38016083),f=md5_gg(f,e,b,c,a[g+15],14,-660478335),c=md5_gg(c,f,e,b,a[g+4],20,-405537848),b=md5_gg(b,c,f,e,a[g+9],5,568446438),e=md5_gg(e,b,c,f,a[g+14],9,-1019803690),f=md5_gg(f,e,b,c,a[g+3],14,-187363961),c=md5_gg(c,f,e,b,a[g+8],20,1163531501),b=md5_gg(b,c,f,e,a[g+13],5,-1444681467),e=md5_gg(e,b,c,f,a[g+2],9,-51403784),f=md5_gg(f,e,b,c,a[g+7],14,1735328473),c=md5_gg(c,f,e,b,a[g+12],20,-1926607734),b=md5_hh(b,c,f,e,a[g+5],4,-378558),e=md5_hh(e,b,c,f,a[g+8],11,-2022574463),f=md5_hh(f,e,b,c,a[g+
11],16,1839030562),c=md5_hh(c,f,e,b,a[g+14],23,-35309556),b=md5_hh(b,c,f,e,a[g+1],4,-1530992060),e=md5_hh(e,b,c,f,a[g+4],11,1272893353),f=md5_hh(f,e,b,c,a[g+7],16,-155497632),c=md5_hh(c,f,e,b,a[g+10],23,-1094730640),b=md5_hh(b,c,f,e,a[g+13],4,681279174),e=md5_hh(e,b,c,f,a[g+0],11,-358537222),f=md5_hh(f,e,b,c,a[g+3],16,-722521979),c=md5_hh(c,f,e,b,a[g+6],23,76029189),b=md5_hh(b,c,f,e,a[g+9],4,-640364487),e=md5_hh(e,b,c,f,a[g+12],11,-421815835),f=md5_hh(f,e,b,c,a[g+15],16,530742520),c=md5_hh(c,f,e,
b,a[g+2],23,-995338651),b=md5_ii(b,c,f,e,a[g+0],6,-198630844),e=md5_ii(e,b,c,f,a[g+7],10,1126891415),f=md5_ii(f,e,b,c,a[g+14],15,-1416354905),c=md5_ii(c,f,e,b,a[g+5],21,-57434055),b=md5_ii(b,c,f,e,a[g+12],6,1700485571),e=md5_ii(e,b,c,f,a[g+3],10,-1894986606),f=md5_ii(f,e,b,c,a[g+10],15,-1051523),c=md5_ii(c,f,e,b,a[g+1],21,-2054922799),b=md5_ii(b,c,f,e,a[g+8],6,1873313359),e=md5_ii(e,b,c,f,a[g+15],10,-30611744),f=md5_ii(f,e,b,c,a[g+6],15,-1560198380),c=md5_ii(c,f,e,b,a[g+13],21,1309151649),b=md5_ii(b,
c,f,e,a[g+4],6,-145523070),e=md5_ii(e,b,c,f,a[g+11],10,-1120210379),f=md5_ii(f,e,b,c,a[g+2],15,718787259),c=md5_ii(c,f,e,b,a[g+9],21,-343485551),b=safe_add(b,h),c=safe_add(c,j),f=safe_add(f,k),e=safe_add(e,l);return[b,c,f,e]}function md5_cmn(a,d,b,c,f,e){return safe_add(bit_rol(safe_add(safe_add(d,a),safe_add(c,e)),f),b)}function md5_ff(a,d,b,c,f,e,g){return md5_cmn(d&b|~d&c,a,d,f,e,g)}function md5_gg(a,d,b,c,f,e,g){return md5_cmn(d&c|b&~c,a,d,f,e,g)}
function md5_hh(a,d,b,c,f,e,g){return md5_cmn(d^b^c,a,d,f,e,g)}function md5_ii(a,d,b,c,f,e,g){return md5_cmn(b^(d|~c),a,d,f,e,g)}function safe_add(a,d){var b=(a&65535)+(d&65535);return(a>>16)+(d>>16)+(b>>16)<<16|b&65535}function bit_rol(a,d){return a<<d|a>>>32-d}
workpad.browser=function(){var a=navigator.userAgent,d=document.createElement("div"),b=-1!==a.indexOf("MSIE")&&-1===a.indexOf("Opera"),c=-1!==a.indexOf("Gecko")&&-1===a.indexOf("KHTML"),f=-1!==a.indexOf("AppleWebKit/");a.indexOf("Chrome/");a.indexOf("Opera/");var e={formatBlock:b,insertUnorderedList:b||f,insertOrderedList:b||f},g={insertHTML:c};return{USER_AGENT:a,supported:function(){var c=this.USER_AGENT.toLowerCase(),b="contentEditable"in d,a=document.execCommand&&document.queryCommandSupported&&
document.queryCommandState,f=document.querySelector&&document.querySelectorAll,c=this.isIos()&&5>+(/ipad|iphone|ipod/.test(c)&&c.match(/ os (\d+).+? like mac os x/)||[,0])[1]||this.isAndroid()&&4>+(c.match(/android (\d+)/)||[,0])[1]||-1!==c.indexOf("opera mobi")||-1!==c.indexOf("hpwos/");return b&&a&&f&&!c},isIos:function(){return/ipad|iphone|ipod/i.test(this.USER_AGENT)},isAndroid:function(){return-1!==this.USER_AGENT.indexOf("Android")},isTouchDevice:function(){return this.supportEvent("touchmove")},
supportEvent:function(c){var b;if(!(b="on"+c in d))d.setAttribute("on"+c,"return;"),b="function"===typeof d["on"+c];return b},supportsCommand:function(c,b){if(!e[b]){try{return c.queryCommandSupported(b)}catch(a){}try{return c.queryCommandEnabled(b)}catch(f){return!!g[b]}}return!1}}}();
(function(a){var d=["debug","info","warn","error"];a.util.debug=function(){var b=Array.prototype.slice.call(arguments),c=function(c,b,g){var h=d.indexOf(g),j=d.indexOf("debug");c=a.util.array(c).clone();c.unshift(console,b);return-1<h&&-1<j&&h>=j?console[g]?Function.prototype.bind.apply(console[g],c):Function.prototype.bind.apply(console.log,c):a.EMPTY_FUNCTION};return{error:c(b,"[WorkPad Error!!!]: ","error"),debug:c(b,"[WorkPad Debug]: ","debug"),info:c(b,"[WorkPad Info]: ","info"),warn:c(b,"[Workpad Warn!]: ",
"warn")}}})(workpad);
(function(){workpad.util.array=function(a){return{contains:function(d){if(a.indexOf)return-1!==a.indexOf(d);for(var b=0,c=a.length;b<c;b++)if(a[b]===d)return!0;return!1},without:function(d){d=workpad.util.array(d);for(var b=[],c=0,f=a.length;c<f;c++)d.contains(a[c])||b.push(a[c]);return b},get:function(){for(var d=0,b=a.length,c=[];d<b;d++)c.push(a[d]);return c},unique:function(){for(var d=[],b=0,c=a.length;b<c;b++)workpad.util.array(d).contains(a[b])||d.push(a[b]);return d},clone:function(){for(var d=
[],b=0,c=a.length;b<c;b++)d.push(a[b]);return d}}}})();(function(){var a=/^\s+/,d=/\s+$/;workpad.util.string=function(b){b=String(b);return{trim:function(){return b.replace(a,"").replace(d,"")},interpolate:function(c){for(var a in c)b=this.replace("#{"+a+"}").by(c[a]);return b},replace:function(c){return{by:function(a){return b.split(c).join(a)}}}}}})();
(function(){workpad.util.object=function(a){return{merge:function(d){for(var b in d)a[b]=d[b];return this},get:function(){return a},clone:function(){var d={},b;for(b in a)d[b]=a[b];return d},isArray:function(){return"[object Array]"===Object.prototype.toString.call(a)},safeJSON:function(){try{var d=JSON.parse(JSON.stringify(a))}catch(b){d={}}return d}}}})();
workpad.util.Events=Base.extend({on:function(a,d){this.events=this.events||{};this.events[a]=this.events[a]||[];this.events[a].push(d);return this},off:function(a,d){this.events=this.events||{};var b=0,c,f;if(a){c=this.events[a]||[];for(f=[];b<c.length;b++)c[b]!==d&&d&&f.push(c[b]);this.events[a]=f}else this.events={};return this},fire:function(a,d){this.events=this.events||{};for(var b=this.events[a]||[],c=0;c<b.length;c++)b[c].call(this,d);return this}});
workpad.data.predata=function(){var a=[{content:"Begin to edit your workpad",description:"",id:"00000000-0000-0000-0000-000000000000",expand:!0,children:[]}],d={content:"",description:"",id:"",expand:!0,children:[]};return{GET_EMPTY_DATA:function(){return JSON.parse(JSON.stringify(a))},GET_DEFAULT_JSON:function(){return JSON.parse(JSON.stringify(d))}}}();
workpad.data.check=function(a){return{isObject:function(){return"object"===typeof a&&"[object object]"===Object.prototype.toString.call(a).toLowerCase()&&!a.length}}};(function(a){var d=a.util;a.data.pretty=function(b){return{get:function(){if(d.object(b).isArray()){for(var c=[],f=b.length,e=0;e<f;e++)if(a.data.check(b[e]).isObject())try{var g=JSON.stringify(b[e]);"{}"!==g&&c.push(JSON.parse(g))}catch(h){}1>c.length&&(c=a.data.predata.GET_EMPTY_DATA());return c}return a.data.predata.GET_EMPTY_DATA()}}}})(workpad);
(function(a){var d=a.dom;d.addClass=function(b,c){var a=b.classList;if(a)return a.add(c);d.hasClass(b,c)||(b.className+=" "+c)};d.removeClass=function(b,c){var a=b.classList;if(a)return a.remove(c);b.className=b.className.replace(RegExp("(^|\\s+)"+c+"(\\s+|$)")," ")};d.hasClass=function(b,c){var a=b.classList;if(a)return a.contains(c);a=b.className;return 0<a.length&&(a==c||RegExp("(^|\\s)"+c+"(\\s|$)").test(a))}})(workpad);
(function(){var a={className:"class"};workpad.dom.setAttributes=function(d){return{on:function(b){for(var c in d)b.setAttribute(a[c]||c,d[c])}}};workpad.dom.getAttribute=function(a){return{from:function(b){return b.getAttribute(a)}}}})();
workpad.dom.style=function(a){var d=workpad.dom,b={"float":"styleFloat"in document.createElement("div").style?"styleFloat":"cssFloat"},c=/\-[a-z]/g,f=["-webkit-box-sizing","-moz-box-sizing","-ms-box-sizing","box-sizing"];return{setto:function(c){c=c.style;if("string"===typeof a)c.cssText+=";"+a;else{a=workpad.util.object(a).safeJSON();for(var b in a)"float"===b?(c.cssFloat=a[b],c.styleFloat=a[b]):c[b]=a[b]}},getfrom:function(f){if(f.nodeType===workpad.ELEMENT_NODE){var d=f.ownerDocument,h=a,j=b[a]||
a.replace(c,function(c){return c.charAt(1).toUpperCase()}),k=f.style,l=f.currentStyle,m=k[j];if(m)return m;if(l)try{return l[j]}catch(p){}var j=d.defaultView||d.parentWindow,d=("height"===h||"width"===h)&&"TEXTAREA"===f.nodeName,n;if(j.getComputedStyle)return d&&(n=k.overflow,k.overflow="hidden"),f=j.getComputedStyle(f,null).getPropertyValue(h),d&&(k.overflow=n||""),f}},getNumberFrom:function(c){var b=this.getfrom(c),b=b?b.replace("px",""):0,b=parseFloat(b);return isNaN(b)?(workpad.util.debug("can't return a number about "+
a+" from ",c).error(),0):b},copyfrom:function(c){var b=a,h;a:{h=0;for(var j=f.length;h<j;h++)if("border-box"===d.style(f[h]).getfrom(c)){h=f[h];break a}h=void 0}(h=h?parseInt(d.style("width").getfrom(c),10)<c.offsetWidth:!1)&&(b=workpad.util.array(b).without(f));var k="";h=b.length;for(var j=0,l;j<h;j++)l=b[j],k+=l+":"+d.style(l).getfrom(c)+";";return{to:function(c){d.style(k).setto(c);return{andTo:arguments.callee}}}}}};
(function(a){a.dom.offset=function(d){var b=a.dom;return{get:function(){var c=d&&d.ownerDocument,b={top:0,left:0},a;if(c)return a=c.documentElement,"undefined"!==typeof d.getBoundingClientRect&&(b=d.getBoundingClientRect()),c=null!=c&&c===c.window?c:9===c.nodeType&&c.defaultView,{top:b.top+c.pageYOffset-a.clientTop,left:b.left+c.pageXOffset-a.clientLeft,width:b.width,height:b.height}},set:function(c){var a,e,g,h=b.style("position").getfrom(d),j={};"static"===h&&(d.style.position="relative");g=b.offset(d).get();
e=b.style("top").getfrom(d);a=b.style("left").getfrom(d);("absolute"===h||"fixed"===h)&&-1<(e+a).indexOf("auto")?(a=b.offset(d).position(),e=a.top,a=a.left):(e=parseFloat(e)||0,a=parseFloat(a)||0);null!=c.top&&(j.top=c.top-g.top+e+"px");null!=c.left&&(j.left=c.left-g.left+a+"px");null!=c.width&&(j.width=c.width+"px");null!=c.height&&(j.height=c.height+"px");b.style(j).setto(d)},offsetParent:function(){for(var c=d.offsetParent||document.documentElement;c&&!(c.nodeName&&"html"===c.nodeName.toLowerCase())&&
"static"===b.style("position").getfrom(c);)c=c.offsetParent;return c||document.documentElement},position:function(){if(d){var c,a,e={top:0,left:0};"fixed"===b.style("position").getfrom(d)?a=d.getBoundingClientRect():(c=b.offset(d).offsetParent(),a=b.offset(d).get(),c.nodeName&&"html"===c.nodeName.toLowerCase()||(e=b.offset(c).get()),e.top+=b.style("borderTopWidth").getNumberFrom(c),e.left+=b.style("borderLeftWidth").getNumberFrom(c));return{top:a.top-e.top-b.style("marginTop").getNumberFrom(c),left:a.left-
e.left-b.style("marginLeft").getNumberFrom(c)}}}}}})(workpad);workpad.dom.getAsDom=function(){return function(a,d){d=d||document;var b;if("object"===typeof a&&a.nodeType)b=d.createElement("div"),b.appendChild(a);else{b=d;var c=b.createElement("div");c.style.display="none";b.body.appendChild(c);try{c.innerHTML=a}catch(f){}b.body.removeChild(c);b=c}b=b.childNodes;1==b.length&&(b=b[0]);return b}}();
workpad.dom.insert=function(a){return{after:function(d){d.parentNode.insertBefore(a,d.nextSibling)},before:function(d){d.parentNode.insertBefore(a,d)},into:function(d){d.appendChild(a)}}};
workpad.dom.observe=function(a,d,b){d="string"===typeof d?[d]:d;for(var c,f,e=0,g=d.length;e<g;e++)f=d[e],a.addEventListener?a.addEventListener(f,b,!1):(c=function(c){"target"in c||(c.target=c.srcElement);c.preventDefault=c.preventDefault||function(){this.returnValue=!1};c.stopPropagation=c.stopPropagation||function(){this.cancelBubble=!0};b.call(a,c)},a.attachEvent("on"+f,c));return{stop:function(){for(var f,e=0,g=d.length;e<g;e++)f=d[e],a.removeEventListener?a.removeEventListener(f,b,!1):a.detachEvent("on"+
f,c)}}};(function(a){a.dom.delegate=function(d,b,c,f){return a.dom.observe(d,c,function(c){for(var g=c.target,h=a.util.array(d.querySelectorAll(b));g&&g!==d;){if(h.contains(g)){f.call(g,c);break}g=g.parentNode}})}})(workpad);
workpad.dom.getParentElement=function(){function a(a,b){return!b||!b.length?!0:"string"===typeof b?a===b:workpad.util.array(b).contains(a)}return function(d,b,c,f){3==arguments.length&&"boolean"==typeof c&&(f=c,c=70);c=c||70;f&&(d=d.parentNode);if(b.className||b.classRegExp){var e;a:{e=d;for(var g=b.nodeName,h=b.className,j=b.classRegExp,k=c;k--&&e&&"BODY"!==e.nodeName;){var l;if(l=e.nodeType===workpad.ELEMENT_NODE)if(l=a(e.nodeName,g)){l=h;var m=j,m=m||l,m=(e.className||"").match(m)||[];l=!l?!!m.length:
m[m.length-1]===l}if(l)break a;e=e.parentNode}e=null}return e}a:{e=d;g=b.nodeName;for(h=c;h--&&e&&"BODY"!==e.nodeName;){if(a(e.nodeName,g))break a;e=e.parentNode}e=null}return e}}();
(function(a){var d,b;b=function(c){var b=c.selectionStart,a=c.selectionEnd;return{start:b,end:a,length:a-b,text:c.value.slice(b,a)}};d=function(c,b,a){0>b&&(b+=c.value.length);"undefined"==typeof a&&(a=b);0>a&&(a+=c.value.length);c.selectionStart=b;c.selectionEnd=a};a.dom.editAreaRange=Base.extend({constructor:function(c){this.element=c},getSelection:function(){return b(this.element)},setSelection:function(c,b){d(this.element,c,b)},setCursorLocation:function(c){d(this.element,c)},getLRchar:function(){var c=
b(this.element),a=this.element.value;return{left:a.slice(0,c.start),right:a.slice(c.start,a.length)}}})})(workpad);
(function(a){var d=document;a.dom.editArea=a.dom.editAreaRange.extend({constructor:function(b,c){var d=this;this.callback=b||a.EMPTY_FUNCTION;this.config=a.util.object({}).merge(c).get();this.editArea=this._createTextArea();this.base(this.getRealNode());setTimeout(function(){d.callback(d)},0)},insertInto:function(b){"string"===typeof b&&(b=d.getElementById(b));b.appendChild(this.editArea)},getEditArea:function(){return this.editArea},getRealNode:function(){return this.editArea.getElementsByTagName("textarea")[0]},
setContent:function(b){this.editArea.getElementsByTagName("textarea")[0].value=b;return this},getContent:function(){return this.editArea.getElementsByTagName("textarea")[0].value},empty:function(){this.editArea.getElementsByTagName("textarea")[0].value="";return this},handleContentChange:function(b){this.getRealNode().addEventListener("input",b,!1)},_createTextArea:function(){var b=d.createElement("div");textarea=d.createElement("textarea");b.className="workpad-editArea editor";b.appendChild(textarea);
return b}})})(workpad);workpad.Commands=Base.extend({constructor:function(a){this.editor=a;this.composer=a.composer;this.doc=this.composer.doc},support:function(a){return workpad.browser.supportsCommand(this.doc,a)},exec:function(a,d){var b=workpad.commands[a],c=workpad.util.array(arguments).get(),f=b&&b.exec,e=null;if(f)c.unshift(this.editor),e=f.apply(b,c);else try{e=this.doc.execCommand(a,!1,d)}catch(g){}return e}});workpad.commands.addItem={exec:function(a){a.fire("addItem:dispatcher")}};
workpad.commands.indentItem={exec:function(a){a.fire("indentItem:dispatcher")}};workpad.commands.outdentItem={exec:function(a){a.fire("outdentItem:dispatcher")}};
workpad.views.View=Base.extend({constructor:function(a,d,b){this.parent=a;this.element=d;this.config=b},focus:function(){if(this.element.ownerDocument.querySelector(":focus")!==this.element)try{this.element.focus()}catch(a){}},hide:function(){this.element.style.display="none"},show:function(){this.element.style.display=""},disable:function(){this.element.setAttribute("disabled","disabled")},enable:function(){this.element.removeAttribute("disabled")}});
(function(a){var d=a.dom;a.views.Composer=a.views.View.extend({name:"composer",constructor:function(b,c,a){this.base(b,c,a);this.wp=this.parent.wp;this._initEditArea()},getUseHoverEditAreaElement:function(){return this.getUseHoverEditArea().getEditArea()},getUseHoverEditArea:function(){return this.editAreaA.lastEdit?this.editAreaB:this.editAreaA},getCurrentUseEditAreaElement:function(){return this.getCurrentUseEditArea().getEditArea()},getCurrentUseEditArea:function(){return this.editAreaA.lastEdit?
this.editAreaA:this.editAreaB},setEditAreaWithItemIdForContent:function(a,c){var f=this.wp.getContentElementById(c);d.offset(a.getEditArea()).set(d.offset(f).get());a.getEditArea().style.display="";a.setContent(f.textContent);d.setAttributes({"data-id":c,"data-type":"content"}).on(a.getEditArea())},hideEditArea:function(a){d.offset(a.getEditArea()).set({top:0,left:0});a.getEditArea().style.display="none"},_initEditArea:function(){var a=this;this.editAreaA=new d.editArea(function(){a.editAreaB=new d.editArea(function(){a._insertEditAreas()})})},
_insertEditAreas:function(){this.editAreaElementA=this.editAreaA.getEditArea();this.editAreaElementB=this.editAreaB.getEditArea();var a=this.wp.element;d.insert(this.editAreaElementA).after(a);d.insert(this.editAreaElementB).after(a);this.editAreaA.lastEdit=!1;this.editAreaB.lastEdit=!0;this._create()},_create:function(){this.doc=document;this.element=this.wp;this.wp=this.parent.wp;this.commands=new a.Commands(this.parent);this.parent.commands=this.commands;this.observe();this.dispatcher()}})})(workpad);
(function(a){var d=a.dom,b=a.util,c=a.KEYS;a.views.Composer.prototype.observe=function(){var a=this,e=this.parent.element,g=this.editAreaA.getEditArea(),h=this.editAreaA.getRealNode(),j=this.editAreaB.getEditArea(),k=this.editAreaB.getRealNode();pasteEvents=["drop","paste"];b.debug(e,g,j).debug();g=function(b){var d=b.keyCode;d===c.ENTER_KEY?(b.preventDefault(),a.commands.exec("addItem")):d===c.TAB_KEY&&(b.preventDefault(),b.shiftKey?a.commands.exec("outdentItem"):a.commands.exec("indentItem"))};
d.observe(h,"keydown",g);d.observe(k,"keydown",g);d.observe(h,"focus",function(){a.editAreaA.lastEdit=!0;a.editAreaB.lastEdit=!1});d.observe(k,"focus",function(){a.editAreaA.lastEdit=!1;a.editAreaB.lastEdit=!0});a.editAreaA.handleContentChange(function(){a.commandExec("syncContent",a.editAreaA)});a.editAreaB.handleContentChange(function(){a.commandExec("syncContent",a.editAreaB)});d.delegate(e,".content","mouseover",function(c){c=d.getParentElement(c.target,{nodeName:"DIV",className:"item"});c=d.getAttribute("data-id").from(c);
a.setEditAreaWithItemIdForContent(a.getUseHoverEditArea(),c)})}})(workpad);
(function(a){var d=a.util;a.views.Composer.prototype.dispatcher=function(){var a=this.parent,c=this;a.on("addItem:dispatcher",function(){d.debug("Editor on Event:","indentItem:dispatcher").info();c.commandExec("addItem")});a.on("indentItem:dispatcher",function(){d.debug("Editor on Event:","indentItem:dispatcher").info();c.commandExec("indentItem")});a.on("outdentItem:dispatcher",function(){d.debug("Editor on Event:","outdentItem:dispatcher").info();c.commandExec("outdentItem")})}})(workpad);
(function(a){a.views.Composer.commandCenter={};a.views.Composer.prototype.commandExec=function(d,b){var c=a.views.Composer.commandCenter[d],f=a.util.array(arguments).get(),e=c&&c.exec;return e?(f.unshift(this.parent),e.apply(c,f)):!1}})(workpad);
workpad.views.Composer.commandCenter.addItem={exec:function(a){workpad.util.debug("Get Event:","additem:dispatcher").info();var d=workpad.dom,b=a.composer,c=b.getCurrentUseEditArea();a=a.wp;var f=c.getLRchar(),e=workpad.dom.getAttribute("data-id").from(c.getEditArea()),g=a.getElementByitemId(e),h=a.haveChildrenWithId(e),j=a.isExpandWithID(e),k=a.initNewBulletPointData(),l=k.id,k=d.getAsDom(a.buildHTMLBySingleData(k));b.hideEditArea(b.getUseHoverEditArea());h&&1>f.right.length&&j?workpad.util.debug("Add item case 1").info():
!h&&1>f.right.length?(workpad.util.debug("Add item case 2").info(),d.insert(k).after(g),a.setContentById(e,f.left),b.setEditAreaWithItemIdForContent(c,l)):(workpad.util.debug("Add item case 3").info(),d.insert(k).before(g),a.setContentById(e,f.right),a.setContentById(l,f.left),b.setEditAreaWithItemIdForContent(c,e),c.setCursorLocation(0))}};
workpad.views.Composer.commandCenter.syncContent={exec:function(a,d,b){d=workpad.dom;a=a.wp;var c=b.getEditArea(),f=d.getAttribute("data-id").from(c);"content"===d.getAttribute("data-type").from(c)&&a.setContentById(f,b.getContent())}};
workpad.views.Composer.commandCenter.indentItem={exec:function(a){workpad.util.debug("Get Event:","indentItem:dispatcher").info();var d=workpad.dom,b=a.composer,c=b.getCurrentUseEditArea(),f=a.wp;a=workpad.dom.getAttribute("data-id").from(c.getEditArea());var e=f.getElementByitemId(a);(f=f.getPrevElementItemByItemId(a))&&d.getAttribute("data-id").from(f);f&&(d.insert(e).into(f.querySelector(".children")),b.setEditAreaWithItemIdForContent(c,a))}};
workpad.views.Composer.commandCenter.outdentItem={exec:function(a){workpad.util.debug("Get Event:","outdentItem:dispatcher").info();var d=workpad.dom,b=a.composer,c=b.getCurrentUseEditArea(),f=a.wp;a=workpad.dom.getAttribute("data-id").from(c.getEditArea());var e=f.getElementByitemId(a);(f=f.getParentElementByitemId(a))&&d.getAttribute("data-id").from(f);f&&(d.insert(e).after(f),b.setEditAreaWithItemIdForContent(c,a))}}(function(a){var d=a.data,b=a.dom;a.views.Wp=a.views.View.extend({name:"workpad",
constructor:function(a,b,d){this.base(a,b,d);this._observe()},initContentByData:function(a){a=d.pretty(a).get();a=this.buildDomByDatas(a);this._setContent(a)},getElementByitemId:function(a){return this.element.querySelector(".item[data-id='"+a+"']")},getPrevElementItemByItemId:function(a){return this.getElementByitemId(a).previousElementSibling},getParentElementByitemId:function(a){return b.getParentElement(this.getElementByitemId(a),{nodeName:"DIV",className:"item"},!0)},getContentById:function(a){return this.getElementByitemId(a).querySelector(".content").innerHTML},
setContentById:function(a,b){this.getElementByitemId(a).querySelector(".content").innerHTML=b},haveChildrenWithId:function(c){c=this.getElementByitemId(c).querySelector(".children");return 1>a.util.string(c.innerHTML).trim().length?!1:!0},getContentElementById:function(a){return this.getElementByitemId(a).querySelector("div.content")},initNewBulletPointId:function(){for(var a=hex_md5(Date.parse(new Date).toString()+Math.random().toString()),b="",d=[8,12,16,20],g=0,h=a.length,j;j=a.charAt(g),g<h;g++)b+=
j,-1<d.indexOf(g+1)&&(b+="-");return b},initNewBulletPointData:function(){var b=a.data.predata.GET_DEFAULT_JSON();b.id=this.initNewBulletPointId();return b},isExpandWithID:function(){return!0},_setContent:function(a){this.element.innerHTML=a},_observe:function(){}})})(workpad);
(function(a){var d=a.util;a=a.views.Wp.prototype;a.buildDomByDatas=function(a){var c=this;return function e(a){for(var b="",d="",k=0,l=a.length;k<l;k++){var m=a[k];0<m.children.length&&m.expand&&(d=e(m.children));b+=c.buildHTMLBySingleData({id:m.id,content:m.content,description:m.description,children:d});d=""}return b}(a)};a.buildHTMLBySingleData=function(a){return d.string('<div class="item" data-id="#{id}"><div class="maindata"><div class="content">#{content}</div><div class="description">#{description}</div></div><div class="children">#{children}</div></div>').interpolate(a)}})(workpad);
(function(a){var d={initContent:void 0};a.Init=a.util.Events.extend({constructor:function(b,c){this.element="string"===typeof b?document.getElementById(b):b;this.config=a.util.object({}).merge(d).merge(c).get();this.currentView=this.wp=new a.views.Wp(this,this.element,this.config);this._isCompatible=a.browser.supported();this.currentView=this.composer=new a.views.Composer(this,this.wp,this.config);this.wp.initContentByData(this.config.initContent)}})})(workpad);
//@ sourceMappingURL=workpad.js.map