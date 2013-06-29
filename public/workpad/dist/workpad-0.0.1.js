/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 *
 * Author: liuyixi
 *
 * Copyright (c) 2013 Yixi
 *
 */

var workpad = {
    version: "0.0.1",

    // namespaces
    util:       {},    //for util language extend
    dom:        {},    //extend dom method
    commands:   {},    // command center
    ui:         {},    // UI library , like the drag and drop sort library...
    views:      {},    // the view layer
    log:        {},    // the process the data log.
    data:       {},    // make a sync josn tree data about the workpad content in memory.

    EMPTY_FUNCTION:function(){},

    ELEMENT_NODE:1,
    TEXT_NODE:3,

    KEYS:{
        BACKSPACE_KEY:  8,
        TAB_KEY:        9,
        ENTER_KEY:      13,
        ESCAPE_KEY:     27,
        SPACE_KEY:      32,
        END_KEY:        35,
        HOME_KEY:       36,
        LEFT_KEY:       37,
        UP_KEY:         38,
        RIGHT_KEY:      39,
        DOWN_KEY:       40,
        DELETE_KEY:     46,

        A_KEY:          65,
        C_KEY:          67,
        X_KEY:          88,
        V_KEY:          86,
        Z_KEY:          90
    }
};/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
//  try { hexcase } catch(e) { hexcase=0; }   //modify this.
  if(!window.hexcase){hexcase = 0;}
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
//  try { b64pad } catch(e) { b64pad=''; }   //modify this
  if(!window.b64pad){ b64pad = ""}
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
/**
 * Detect browser.
 *
 */

workpad.browser = (function(){
    var userAgent   = navigator.userAgent,
        testElement = document.createElement("div"),
    // Browser sniffing is unfortunately needed since some behaviors are impossible to feature detect
        isIE        = userAgent.indexOf("MSIE")         !== -1 && userAgent.indexOf("Opera") === -1,
        isGecko     = userAgent.indexOf("Gecko")        !== -1 && userAgent.indexOf("KHTML") === -1,
        isWebKit    = userAgent.indexOf("AppleWebKit/") !== -1,
        isChrome    = userAgent.indexOf("Chrome/")      !== -1,
        isOpera     = userAgent.indexOf("Opera/")       !== -1;

    function iosVersion(userAgent) {
        return +((/ipad|iphone|ipod/.test(userAgent) && userAgent.match(/ os (\d+).+? like mac os x/)) || [, 0])[1];
    }

    function androidVersion(userAgent) {
        return +(userAgent.match(/android (\d+)/) || [, 0])[1];
    }

    return {
        //need a static variable for unit tests.
        USER_AGENT: userAgent,

        /**
         * Exclude browsers that are not capable of displaying and handling
         *
         * @return {Boolean}
         */
        supported: function(){
            var userAgent = this.USER_AGENT.toLowerCase(),
                hasContentEditableSupport = "contentEditable" in testElement,
                hasEditingApiSupport        = document.execCommand && document.queryCommandSupported && document.queryCommandState,
                hasQuerySelectorSupport     = document.querySelector && document.querySelectorAll,
                isIncompatibleMobileBrowser = (this.isIos() && iosVersion(userAgent) < 5) || (this.isAndroid() && androidVersion(userAgent) < 4) || userAgent.indexOf("opera mobi") !== -1 || userAgent.indexOf("hpwos/") !== -1;

            return hasContentEditableSupport
                && hasEditingApiSupport
                && hasQuerySelectorSupport
                && !isIncompatibleMobileBrowser;
        },

        isIos:function(){
            return (/ipad|iphone|ipod/i).test(this.USER_AGENT);
        },

        isAndroid:function(){
            return this.USER_AGENT.indexOf("Android") !== -1;
        },

        isTouchDevice:function(){
            return this.supportEvent("touchmove");
        },

        /*support functions */

        supportEvent:function(eventName){
            return "on" + eventName in testElement || (function(){
                testElement.setAttribute("on" + eventName,"return;");
                return typeof(testElement["on" + eventName]) === "function";
            })();
        },


        /**
         * Checks whether a document supports a certain queryCommand
         * In particular, Opera needs a reference to a document that has a contentEditable in it's dom tree
         * in oder to report correct results
         *
         * @param {Object} doc Document object on which to check for a query command
         * @param {String} command The query command to check for
         * @return {Boolean}
         *
         * @example
         *    workpad.browser.supportsCommand(document, "bold");
         */
        supportsCommand: (function() {
            // Following commands are supported but contain bugs in some browsers
            var buggyCommands = {
                // formatBlock fails with some tags (eg. <blockquote>)
                "formatBlock":          isIE,
                // When inserting unordered or ordered lists in Firefox, Chrome or Safari, the current selection or line gets
                // converted into a list (<ul><li>...</li></ul>, <ol><li>...</li></ol>)
                // IE and Opera act a bit different here as they convert the entire content of the current block element into a list
                "insertUnorderedList":  isIE || isWebKit,
                "insertOrderedList":    isIE || isWebKit
            };

            // Firefox throws errors for queryCommandSupported, so we have to build up our own object of supported commands
            var supported = {
                "insertHTML": isGecko
            };

            return function(doc, command) {
                var isBuggy = buggyCommands[command];
                if (!isBuggy) {
                    // Firefox throws errors when invoking queryCommandSupported or queryCommandEnabled
                    try {
                        return doc.queryCommandSupported(command);
                    } catch(e1) {}

                    try {
                        return doc.queryCommandEnabled(command);
                    } catch(e2) {
                        return !!supported[command];
                    }
                }
                return false;
            };
        })()





    }

})();
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * main console module.
 *
 * @example
 *      workpad.util.debug("workpad","d").error();
 *      workpad.util.debug("workpad","d").info();
 *      workpad.util.debug("workpad","d").debug();
 */

;(function(workpad){
    var DEBUGLEVEL = "debug";
    var config = {
        logLevel:DEBUGLEVEL,
        logLevels:["debug","info","warn","error"]
    };

    workpad.util.debug = function(){

        var args = Array.prototype.slice.call(arguments);

        var log = function(par,title,level){
            if(config.logLevel === 'never'){
                return workpad.EMPTY_FUNCTION;
            }
            var i = config.logLevels.indexOf(level),
                j = config.logLevels.indexOf(config.logLevel);
            // need to clone a new array.
            var params = workpad.util.array(par).clone();
            params.unshift(console,title);

            if (i>-1 && j>-1 && i>=j){
                if(console[level]){
                    return Function.prototype.bind.apply(console[level],params);
                }else{
                    return Function.prototype.bind.apply(console.log,params);
                }
            }
            return workpad.EMPTY_FUNCTION;
        }

        return {
            error:log(args,'[WorkPad Error!!!]: ','error'),
            debug:log(args,'[WorkPad Debug]: ','debug'),
            info:log(args,'[WorkPad Info]: ','info'),
            warn:log(args,'[Workpad Warn!]: ','warn')
        }
    };
})(workpad);(function(){
    workpad.util.array = function(arr){
        return {

            /**
             * Check whether a given object exists in an array
             * @example
             *      workpad.util.array([1,2]).contains(1);  //==> true
             * @param needle
             * @returns {boolean}
             */
            contains:function(needle){
                if(arr.indexOf){
                    return arr.indexOf(needle) !==-1;
                }else{
                    for(var i= 0,len = arr.length;i<len;i++){
                        if(arr[i]===needle){return true;}
                    }
                    return false;
                }
            },

            /**
             * Substract one array from another
             * @example
             *      workpad.util.array([1,2,3,4]).without([3,4]);  //==> [1,2]
             *
             * @param arrayToSubstract
             * @returns {Array}
             */
            without:function(arrayToSubstract){
                arrayToSubstract = workpad.util.array(arrayToSubstract);
                var newArr = [],
                    i = 0,
                    len = arr.length;
                for (; i<len; i++){
                    if(!arrayToSubstract.contains(arr[i])){
                        newArr.push(arr[i]);
                    }
                }
                return newArr;
            },

            /**
             * Return a clean native array , convert a live nodelist to a proper array.
             * @example
             *      var childNodes = workpad.util.array(document.body.childNodes).get();
             *
             * @returns {Array}
             */
            get:function(){
                var i = 0,
                    len = arr.length,
                    newArray = [];
                for(; i<len; i++){
                    newArray.push(arr[i]);
                }
                return newArray;
            },

            /**
             * unique a array
             * @example
             *      workpad.util.array([1,1,3,4,3]).unique(); //=> [1,3,4]
             *
             * @returns {Array}
             */
            unique:function(){
                var newArray = [],
                    i = 0,
                    len = arr.length;
                for(; i<len; i++){
                    if(!workpad.util.array(newArray).contains(arr[i])){
                        newArray.push(arr[i]);
                    }
                }
                return newArray;
            },

            /**
             * clone a array
             * @example
             *      workpad.util.array([1,2]).clone() //=> [1,2];
             * @returns {Array}
             */
            clone:function(){
                var newArray = [],
                    i= 0,
                    len = arr.length;
                for(; i<len; i++){
                    newArray.push(arr[i]);
                }
                return newArray;
            }
        };
    }
})();/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * simple string functions
 *
 */

(function(){
    var WHITE_SPACE_START = /^\s+/,
        WHITE_SPACE_END = /\s+$/;

    workpad.util.string = function(str){
        str = String(str);
        return {
            /**
             * @example
             *      workpad.util.string("   diigo   ").trim();  ==> "diigo"
             */
            trim:function(){
                return str.replace(WHITE_SPACE_START,"").replace(WHITE_SPACE_END,"");
            },

            /**
             * @example
             *      workpad.util.string("Hello #{name}").interpolate({name:"diigo"});  ==> "Hello diigo"
             * @param vars {JSON}
             */
            interpolate: function(vars){
                for(var i in vars){
                    str = this.replace("#{" + i + "}").by(vars[i]);
                }
                return str;
            },

            /**
             * @expample
             *      workpad.util.string("Hello yixi").replace("yixi").by("Diigo"); ==> "Hello Diigo"
             * @param search
             * @returns {{by: Function}}
             */

            replace:function(search){
                return {
                    by:function(replace){
                        return str.split(search).join(replace);
                    }
                };
            }
        };
    };

})();(function(){
    workpad.util.object = function(obj){
        return {
            /**
             * merge object
             * @example
             *      workpad.util.object({foo:1,bar:1}).merge({bar:2,baz:3}).get();  //=> {foo:1,bar:2,baz:3}
             * @param otherObj
             * @returns {object}
             */
            merge:function(otherObj){
                for (var i in otherObj){
                    obj[i] = otherObj[i];
                }
                return this;
            },
            get:function(){
                return obj;
            },

            /**
             * clone object
             * @example
             *      workpad.util.object({foo:1}).clone(); //=> {foo:1}
             * @returns {object}
             */
            clone:function(){
                var newObj = {},
                    i;
                for (i in obj){
                    newObj[i] = obj[i];
                }
                return newObj;
            },

            /**
             * @example
             *      workpad.util.object([]).isArray();  //=> true
             * @returns {boolean}
             */
            isArray:function(){
                return Object.prototype.toString.call(obj) === "[object Array]";
            },

            /**
             * get a safe json data.
             * @example
             *      workpad.util.object({a:function(){},b:2}).safeJSON() //=> { b:2 }
             * @returns {*|{}}
             */
            safeJSON:function(){
                try{
                    var newJSON = JSON.parse(JSON.stringify(obj));
                }catch(e){
                    var newJSON = {};
                }
                return newJSON;
            }
        }
    };
})();workpad.util.Events = Base.extend({
    on:function(eventName,handler){
        this.events = this.events || {};
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(handler);
        return this;
    },

    off:function(eventName,handler){
        this.events = this.events || {};
        var i = 0,
            handlers,
            newHandlers;
        if(eventName){
            handlers = this.events[eventName] || [];
            newHandlers = [];
            for(; i<handlers.length;i++){
                if(handlers[i] !== handler && handler){
                    newHandlers.push(handlers[i]);
                }
            }
            this.events[eventName] = newHandlers;
        }else{
            //if eventName is empty , clean up all events.
            this.events = {};
        }
        return this;
    },

    fire:function(eventName,payload){
        this.events = this.events || {};
        var handlers = this.events[eventName] || [],
            i = 0;
        for(;i<handlers.length;i++){
            handlers[i].call(this,payload);
        }
        return this;
    }
});
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this is some default data
 *
 */

workpad.data.predata = (function(){

    var EMPTY_DATA = [{
            content:"Begin to edit your workpad",
            description:"",
            id:"00000000-0000-0000-0000-000000000000",
            expand:true,
            children:[]
        }],
        DEFAULT_JSON = {
            content:"",
            description:"",
            id:"",
            expand:true,
            children:[]
        };
    /* must clone the data to return for use */
    function cloneData(data){
        return JSON.parse(JSON.stringify(data));
    }

    return {
        GET_EMPTY_DATA:function(){
            return cloneData(EMPTY_DATA);
        },
        GET_DEFAULT_JSON: function(){
            return cloneData(DEFAULT_JSON);
        }
    };

})();
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * This function use for check the workpad json data is right.
 *
 */

workpad.data.check = function(jsonData){
    return {
        isObject:function(){
            return typeof(jsonData) === "object" && Object.prototype.toString.call(jsonData).toLowerCase() === "[object object]" && !jsonData.length;
        }
    }
};
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this will return a right workpad json data, when jsonData isn't a right data will return the pre oder EMPTY_DATA.
 *
 */

(function(workpad){
    var util = workpad.util;

    workpad.data.pretty = function(jsonData){
        return {
            /**
             * get a right data
             * @returns {[]}
             */
            get:function(){
                if(util.object(jsonData).isArray()){
                    var newArr = [],
                        len = jsonData.length,
                        i = 0;
                    for(; i<len; i++){
                        if(workpad.data.check(jsonData[i]).isObject()){
                            try{
                                //make the json data is safe
                                var safeData_ = JSON.stringify(jsonData[i]);
                                if(safeData_!=="{}"){
                                    newArr.push(JSON.parse(safeData_));
                                }
                            }catch(e){}
                        }
                    }
                    if(newArr.length<1){
                        newArr = workpad.data.predata.GET_EMPTY_DATA();
                    }
                    return newArr;

                }else{
                    return workpad.data.predata.GET_EMPTY_DATA();
                }
            }
        }
    }
})(workpad);
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 *
 * Author: liuyixi
 *
 * Copyright (c) 2013 Yixi
 *
 * simple function to addClass removeClass .
 *
 */

(function(workpad){
    var api = workpad.dom;

    api.addClass = function(element,className){
        var classList = element.classList;
        if(classList){
            return classList.add(className);
        }
        if(api.hasClass(element,className)){
            return;
        }
        element.className += " "+className;
    };

    api.removeClass = function(element,className){
        var classList = element.classList;
        if(classList){
            return classList.remove(className);
        }
        element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
    };

    api.hasClass = function(element,className){
        var classList = element.classList;
        if(classList){
            return classList.contains(className);
        }

        var elementClassName = element.className;
        return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
    };
})(workpad);
(function(){
    var mapping = {
        "className":"class"
    };
    workpad.dom.setAttributes = function(attributes){
        return {
            on: function(element){
                for (var i in attributes){
                    element.setAttribute(mapping[i] || i, attributes[i]);
                }
            }
        };
    };

    workpad.dom.getAttribute = function(attribute){
        return {
            from: function(element){
                return element.getAttribute(attribute);
            }
        };
    };
})();/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * get / set /copy styles
 *
 */

;workpad.dom.style = function(styles){

    var dom = workpad.dom;

    var stylePropertyMapping = {
        "float": ("styleFloat" in document.createElement('div').style) ? "styleFloat" : "cssFloat"
        },
        REG_EXP_CAMELIZE = /\-[a-z]/g;
    function camelize(str){
        return str.replace(REG_EXP_CAMELIZE,function(match){
           return match.charAt(1).toUpperCase();
        });
    }


    var BOX_SIZING_PROPERTIES = ["-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing"];
    var shouldIgnoreBoxSizingBorderBox = function(element){
        if(hasBoxSizingBorderBox(element)){
            return parseInt(dom.style('width').getfrom(element),10) < element.offsetWidth;
        }
        return false;
    }
    var hasBoxSizingBorderBox = function(element){
        var i = 0,
            length = BOX_SIZING_PROPERTIES.length;
        for(; i<length; i++){
            if (dom.style(BOX_SIZING_PROPERTIES[i]).getfrom(element) === "border-box"){
                return BOX_SIZING_PROPERTIES[i];
            }
        }
    }


    return {

        /**
         * set style to element, the @param styles is {JSON}
         * @example
         *      workpad.dom.style({width:"500"}).setto(document.body);
         * @param element
         */
        setto:function(element){
            var style = element.style;
            if(typeof(styles) === "string"){
                style.cssText += ";" + styles;
                return;
            }
            styles = workpad.util.object(styles).safeJSON();
            for (var i in styles){
                if(i === "float"){
                    style.cssFloat = styles[i];
                    style.styleFloat = styles[i];
                } else {
                    style[i] = styles[i];
                }
            }
        },

        /**
         * get style form element, the @param styles is {String}
         * @example
         *      workpad.dom.style("position").getfrom(document.body); //=> "absolute"
         * @param element
         */

        getfrom:function(element){
            if(element.nodeType !== workpad.ELEMENT_NODE){
                return;
            }
            var doc = element.ownerDocument,
                property = styles,
                camelizedProperty = stylePropertyMapping[styles] || camelize(styles),
                style = element.style,
                currentStyle = element.currentStyle,
                styleValue = style[camelizedProperty];
            if(styleValue){
                return styleValue;
            }

            if(currentStyle){
                try{
                    return currentStyle[camelizedProperty];
                } catch (e){

                }
            }

            var win = doc.defaultView || doc.parentWindow,
                needsOverflowReset = (property === "height" || property === "width") && element.nodeName === "TEXTAREA",
                originalOverflow,
                returnValue;

            if(win.getComputedStyle){
                if(needsOverflowReset){
                    originalOverflow = style.overflow;
                    style.overflow = "hidden";
                }
                returnValue = win.getComputedStyle(element,null).getPropertyValue(property);
                if(needsOverflowReset){
                    style.overflow = originalOverflow || "";
                }
                return returnValue;
            }
        },

        /**
         * get style form element, the @param styles is {String}, but this function return number
         * @example
         *      workpad.dom.style("position").getNumberfrom(document.body); //=> 1000
         * @param element
         */
        getNumberFrom:function(element){
            var value = this.getfrom(element);
            if(value){
                value = value.replace("px","");
            }else{
                value = 0
            }
            var number = parseFloat(value);
            if(!isNaN(number)){
                return number;
            }else{
                workpad.util.debug("can't return a number about " + styles + " from ", element).error();
                return 0;
            }
        },

        /**
         * copy style to  element and other element , the @param styles is {Ararry}
         * @example
         *      workpad.dom.style(["overflow-y","width"]).copyfrom(textarea).to(div).andTo(anotherDiv);
         * @param element
         * @returns {object}
         */
        copyfrom:function(element){
            var stylesToCopy = styles;
            if(shouldIgnoreBoxSizingBorderBox(element)){
                stylesToCopy = workpad.util.array(stylesToCopy).without(BOX_SIZING_PROPERTIES);
            }
            var cssText = "",
                length = stylesToCopy.length,
                i = 0,
                property;

            for(; i<length; i++){
                property = stylesToCopy[i];
                cssText += property + ":" + dom.style(property).getfrom(element) + ";";
            }

            return {
                to: function(element){
                    dom.style(cssText).setto(element);
                    return { andTo: arguments.callee };
                }
            };
        }
    };
}
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Get/set the element offset  .
 *
 */

;(function(workpad){

    workpad.dom.offset = function(element){

        function isWindow(obj){
            return obj != null && obj === obj.window;
        }

        function getWindow( elem ) {
            return isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        function nodeName( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }

        var dom = workpad.dom,
            util = workpad.util;
        return {

            /**
             * get the element offset of document.
             *
             * @example
             *      workpad.dom.offset(document.getElementById("content")).get()
             *
             * @returns {{top: number, left: number}}
             */
            get:function(){
                var doc = element && element.ownerDocument,
                    box = { top: 0, left: 0},
                    docElem, win;

                if (! doc){
                    return;
                }

                docElem = doc.documentElement;

                if(typeof element.getBoundingClientRect !== (typeof undefined)){
                    box = element.getBoundingClientRect();
                }
                win = getWindow(doc);

                return {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft,
                    width: box.width,
                    height: box.height
                };
            },

            /**
             * set the element offset by the document offset;
             * @example
             *      workpad.dom.offset(this.editArea).set({top:5,left:10})
             * @param options
             */
            set:function(options){
                var curPositon, curLeft, curCSSTop, curTop, curOffset, curCssLeft, calculatePosition,
                    position = dom.style("position").getfrom(element),
                    props = {};

                if(position === "static"){
                    element.style.position = "relative";
                }

                curOffset = dom.offset(element).get();
                curCSSTop = dom.style("top").getfrom(element);
                curCssLeft = dom.style("left").getfrom(element);
                calculatePosition  = (position === "absolute" || position === "fixed" ) && (curCSSTop + curCssLeft).indexOf("auto") > -1;

                if(calculatePosition){
                    curPositon = dom.offset(element).position();
                    curTop = curPositon.top;
                    curLeft = curPositon.left;
                }else{
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCssLeft) || 0;
                }


                if(options.top != null){
                    props.top = (options.top - curOffset.top) + curTop +'px';
                }
                if(options.left != null){
                    props.left = (options.left - curOffset.left )+ curLeft + 'px';
                }
                if(options.width != null){
                    props.width = options.width + 'px';
                }
                if(options.height !=null){
                    props.height = options.height + 'px';
                }

                dom.style(props).setto(element);
            },

            /**
             * return the real offsetParent
             * @example
             *      workpad.dom.offset(element).offsetParent();
             *
             * @returns {Function|HTMLElement|Function|Element|Element}
             */
            offsetParent:function(){
                var ele = element,
                    offsetParent = ele.offsetParent || document.documentElement;
                while (offsetParent && (!nodeName(offsetParent,"html")) && dom.style("position").getfrom(offsetParent) === "static"){
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || document.documentElement;
            },

            /**
             * calculate position
             *
             * @returns {{top: number, left: number}}
             */
            position:function(){
                if(!element){
                    return ;
                }

                var offsetParent, offset,
                    elem = element,
                    parentOffset = { top:0 ,left:0};

                //Fix element are offset from window

                if(dom.style("position").getfrom(elem) === "fixed"){
                    offset = elem.getBoundingClientRect();
                }else{
                    offsetParent = dom.offset(elem).offsetParent();
                    offset = dom.offset(elem).get();
                    if(!nodeName(offsetParent,"html")){
                        parentOffset = dom.offset(offsetParent).get();
                    }

                    parentOffset.top += dom.style("borderTopWidth").getNumberFrom(offsetParent);
                    parentOffset.left += dom.style("borderLeftWidth").getNumberFrom(offsetParent);
                }

                return {
                    top: offset.top - parentOffset.top - dom.style('marginTop').getNumberFrom(offsetParent),
                    left: offset.left - parentOffset.left - dom.style('marginLeft').getNumberFrom(offsetParent)
                };
            }
        }
    }

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Returns the given html wrapped in a div element
 *
 */

;workpad.dom.getAsDom = (function(){

    var _innerHTMLshiv = function(html,context){
        var tempElement = context.createElement("div");
        tempElement.style.display ="none";
        context.body.appendChild(tempElement);
        try { tempElement.innerHTML = html } catch (e){}
        context.body.removeChild(tempElement);
        return tempElement;
    }

    return function(html,context){
        context = context || document;
        var tempElement;
        if(typeof(html) === "object" && html.nodeType){
            tempElement = context.createElement("div");
            tempElement.appendChild(html);
        }else{
            tempElement = _innerHTMLshiv(html,context);
        }
        var childNodes = tempElement.childNodes;
        if(childNodes.length==1){
            childNodes = childNodes[0];
        }
        return childNodes;
    };
})();/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * simple dom insert function
 *
 */

workpad.dom.insert = function(elementToInsert){
    return {
        after: function(element){
            element.parentNode.insertBefore(elementToInsert,element.nextSibling);
        },

        before: function(element){
            element.parentNode.insertBefore(elementToInsert,element);
        },

        into: function(element){
            element.appendChild(elementToInsert);
        }
    }
};
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Simple Method to set dom events
 * @example
 *      workpad.dom.observer(document.body,["focus","blur"],function(){....});
 *
 */

workpad.dom.observe = function(element,eventNames,handler){
    eventNames = typeof (eventNames) === "string" ? [eventNames] : eventNames;

    var handlerWrapper,
        eventName,
        i = 0,
        length = eventNames.length;

    for(; i<length; i++){
        eventName = eventNames[i];
        if (element.addEventListener){
            element.addEventListener(eventName,handler,false);
        } else {
            handlerWrapper = function(event){
                if (!("target" in event)){
                    event.target = event.srcElement;
                }
                event.preventDefault = event.preventDefault || function(){
                    this.returnValue = false;
                };
                event.stopPropagation = event.stopPropagation || function(){
                    this.cancelBubble = true;
                };
                handler.call(element,event);
            };
            element.attachEvent("on" + eventName, handlerWrapper);
        }
    }

    return {
        stop: function(){
            var eventName,
                i = 0,
                length = eventNames.length;
            for (; i<length; i++){
                eventName = eventNames[i];
                if(element.removeEventListener){
                    element.removeEventListener(eventName,handler,false);
                }else{
                    element.detachEvent("on" + eventName, handlerWrapper);
                }
            }
        }
    }
};
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Event Delegation
 *
 * @example
 *      workpad.dom.delegate(document.body,".content", ["click","mousemmove"],function(){
 *         //fn
 *      });
 *
 */

;(function(workpad){

    workpad.dom.delegate = function(container, selector, eventName, handler){
        return workpad.dom.observe(container,eventName,function(event){
            var target = event.target,
                match = workpad.util.array(container.querySelectorAll(selector));

            while(target && target !== container){
                if (match.contains(target)){
                    handler.call(target,event);
                    break;
                }
                target = target.parentNode;
            }
        });
    };
})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Walks the dom tree from the given node up until it finds a match
 *
 *
 * @example
 *      var listElement = workpad.dom.getParentElement(document.querySelector('li'), {nodeName: ["UL","OL"] });
 *
 *      var colorElement = workpad.dom.getParentElment(myNode, {nodeName:"SPAN", classRegExp: /workpad-color-[a-z]/g });
 *
 */

;workpad.dom.getParentElement = (function(){

    function _isSameNodeName(nodeName, desiredNodeNames){
        if(!desiredNodeNames || !desiredNodeNames.length){
            return true;
        }

        if(typeof(desiredNodeNames) === "string"){
            return nodeName === desiredNodeNames;
        }else{
            return workpad.util.array(desiredNodeNames).contains(nodeName);
        }
    }

    function _isElement(node){
        return node.nodeType === workpad.ELEMENT_NODE;
    }

    function _hasClassName(element,className, classRegExp){
        classRegExp = classRegExp || className;
        var classNames = (element.className || "").match(classRegExp) || [];
        if(!className){
            return !!classNames.length;
        }
        return classNames[classNames.length-1] === className;
    }

    function _getParentElementWithNodeName(node, nodeName, levels){
        while(levels-- && node && node.nodeName !== "BODY"){
            if(_isSameNodeName(node.nodeName, nodeName)){
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }

    function _getParentElementWithNodeNameAndClassName(node, nodeName, className, classRegExp, levels){
        while(levels-- && node && node.nodeName !== "BODY"){
            if(_isElement(node) &&
               _isSameNodeName(node.nodeName, nodeName) &&
               _hasClassName(node,className,classRegExp)){
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }

    return function(node, matchingSet,levels,ignoreSelf){

        if(arguments.length == 3){
            if(typeof levels == "boolean"){
                ignoreSelf = levels;
                levels = 70;
            }
        }
        levels = levels || 70;
        if(ignoreSelf){
            node = node.parentNode;
        }
        if(matchingSet.className || matchingSet.classRegExp){
            return _getParentElementWithNodeNameAndClassName(node, matchingSet.nodeName, matchingSet.className, matchingSet.classRegExp ,levels);
        }else{
            return _getParentElementWithNodeName(node, matchingSet.nodeName, levels);
        }
    }

})();/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * for range and selection for input textarea
 *
 */

;(function(workpad){

    var setSelection,getSelection,collapseSelection;

    function makeSelection(ele,start,end){
        return {
            start:start,
            end:end,
            length:end - start,
            text: ele.value.slice(start,end)
        };
    }

    function adjustOffsets(ele,start,end){
        if(start < 0 ){
            start += ele.value.length;
        }
        if(typeof end == "undefined"){
            end = start;
        }
        if(end < 0 ){
            end += ele.value.length;
        }
        return {start:start,end:end};
    }

    getSelection = function(ele){
        var start = ele.selectionStart,
            end = ele.selectionEnd;
        return makeSelection(ele,start,end);
    };

    setSelection = function(ele, startOffset, endOffset){
        var offsets = adjustOffsets(ele, startOffset, endOffset);
        ele.selectionStart = offsets.start;
        ele.selectionEnd = offsets.end;
    };

    collapseSelection = function(ele, toStart){
        if (toStart){
            ele.selectionEnd = ele.selectionStart;
        }else{
            ele.selectionStart = ele.selectionEnd;
        }
    };



    workpad.dom.editAreaRange = Base.extend({
        constructor:function(element){
            this.element = element;
        },

        getSelection:function(){
            return getSelection(this.element);
        },
        setSelection:function(start,end){
            setSelection(this.element, start, end);
        },
        setCursorLocation:function(index){
            setSelection(this.element,index);
        },
        getLRchar:function(){
            var selection = getSelection(this.element),
                textContent = this.element.value;

            return {
                left:textContent.slice(0,selection.start),
                right:textContent.slice(selection.start,textContent.length)
            };
        }
    });

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * eidtArea for bullet points and description.
 *
 * - now we just use a textarea for edit area , then sync the content to the bullet point. future will use div for rich edit.
 *
 * @param {Function} [readyCallback] Method that gets invoked when the textarea is ready.
 * @param {Object} [config] Optional parameters
 *
 * @example
 *  new workpad.dom.editArea(function(editArea){
 *      editArea.setContent("begin to edit your workpad");
 *  });
 */

;(function(workpad){

    /**
     * Default configuration
     */

    var doc = document;
    /**
     * @scope workpad.dom.editArea.prototype.
     */
    workpad.dom.editArea = workpad.dom.editAreaRange.extend({

        constructor:function(readyCallback,config){
            var that = this;
            this.callback = readyCallback || workpad.EMPTY_FUNCTION;
            this.config = workpad.util.object({}).merge(config).get();
            this.editArea =  this._createTextArea();
            this.base(this.getRealNode());
            setTimeout(function() { that.callback(that); }, 0);
        },

        insertInto:function(element){
            if (typeof(element) === 'string'){
                element = doc.getElementById(element);
            }
            element.appendChild(this.editArea);
        },

        getEditArea:function(){
            return this.editArea;
        },

        // this function to return the real editArea like <textarea> for event handler.
        getRealNode:function(){
            return this.editArea.getElementsByTagName("textarea")[0];
        },

        setContent:function(value){
            this.editArea.getElementsByTagName("textarea")[0].value = value;
            return this;
        },

        getContent:function(){
            return this.editArea.getElementsByTagName("textarea")[0].value;
        },

        empty:function(){
            this.editArea.getElementsByTagName("textarea")[0].value = "";
            return this;
        },

        handleContentChange:function(fn){
            var ele = this.getRealNode();
            ele.addEventListener("input",fn,false);
        },

        /**
         * Creates the textarea element.
         *
         * important notes:
         *  -
         *
         * @returns {HTMLElement}
         * @private
         */
        _createTextArea:function(){
            var that = this,
                textareaWrapper = doc.createElement("div");
                textarea = doc.createElement("textarea");
            textareaWrapper.className = "workpad-editArea editor";
            textareaWrapper.appendChild(textarea);


            return textareaWrapper;
        }

    });

})(workpad);

/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * the workpad commands center
 *
 * @example
 *      var commands = new workpad.Commands(editor);
 */

workpad.Commands = Base.extend({
    constructor:function(editor){
        this.editor = editor;
        this.composer = editor.composer;
        this.doc = this.composer.doc;
    },

    /**
     * check whether the browser supports the given command
     * @param {String}
     * @returns {*}
     */
    support:function(command){
        return workpad.browser.supportsCommand(this.doc,command);
    },

    exec: function(command,value){
        var obj = workpad.commands[command],
            args = workpad.util.array(arguments).get(),
            method = obj && obj.exec,
            result = null;

        if(method){
            args.unshift(this.editor);
            result = method.apply(obj,args);
        }else{
            try{
                result = this.doc.execCommand(command, false, value);
            }catch(e){}
        }
        return result;
    }
});
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * add item command.
 *
 */

workpad.commands.addItem = {
    exec:function(editor, command){
        editor.fire("addItem:dispatcher");
    }
};/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * indent /outdent item
 *
 */

;workpad.commands.indentItem = {
    exec:function(editor, command){
        editor.fire("indentItem:dispatcher");
    }
};

;workpad.commands.outdentItem ={
    exec:function(editor, command){
        editor.fire("outdentItem:dispatcher");
    }
};/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this function use for move the editAera up and down
 *
 */

;workpad.commands.moveUp = {
    exec:function(editor,command){
        editor.fire("editAreaMoveUp:dispatcher");
    }
};

workpad.commands.moveDown = {
    exec:function(editor,command){
        editor.fire("editAreaMoveDown:dispatcher");
    }
};/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * init View area
 *
 */

workpad.views.View = Base.extend({
    constructor:function(parent, Element, config){
        this.parent = parent;
        this.element = Element;
        this.config = config;
    },

    focus:function(){
        if(this.element.ownerDocument.querySelector(":focus") === this.element){
            return;
        }

        try { this.element.focus(); } catch(e) {}
    },

    hide:function(){
        this.element.style.display = "none";
    },

    show:function(){
        this.element.style.display = "";
    },

    disable:function(){
        this.element.setAttribute("disabled","disabled");
    },

    enable: function(){
        this.element.removeAttribute("disabled");
    }
});/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * workpad.views.Composer.prototype.
 *
 */

(function(workpad){
    var dom = workpad.dom,
        browser = workpad.browser,
        F = workpad.util.fn;

    workpad.views.Composer = workpad.views.View.extend({
        name:"composer",

        constructor:function(parent, element, config){
            this.base(parent, element, config);
            this.wp = this.parent.wp;
            this._initEditArea();
        },

        /*get editArea for set hover */

        getUseHoverEditAreaElement:function(){
            return this.getUseHoverEditArea().getEditArea();
        },

        getUseHoverEditArea:function(){
            if(this.editAreaA.lastEdit){
                return this.editAreaB;
            }else{
                return this.editAreaA;
            }
        },

        getCurrentUseEditAreaElement:function(){
            return this.getCurrentUseEditArea().getEditArea();
        },

        getCurrentUseEditArea:function(){
            if(this.editAreaA.lastEdit){
                return this.editAreaA;
            }else{
                return this.editAreaB;
            }
        },

        /*set the editArea */

        setEditAreaWithItemIdForContent:function(editarea,itemid){
            var itemElement = this.wp.getContentElementById(itemid);
            dom.offset(editarea.getEditArea()).set(dom.offset(itemElement).get());
            editarea.getEditArea().style.display = "";
            editarea.setContent(itemElement.textContent);
            dom.setAttributes({"data-id":itemid,"data-type":"content"}).on(editarea.getEditArea());
        },

        hideEditArea:function(editarea){
            dom.offset(editarea.getEditArea()).set({top:0,left:0});
            editarea.getEditArea().style.display = "none";
        },

        /* private function */

        _initEditArea:function(){
            var that = this;
            this.editAreaA = new dom.editArea(function(){
               that.editAreaB = new dom.editArea(function(){
                   that._insertEditAreas();
               });
            });
        },

        _insertEditAreas:function(){
            this.editAreaElementA = this.editAreaA.getEditArea();
            this.editAreaElementB = this.editAreaB.getEditArea();
            var wpElement = this.wp.element;
            dom.insert(this.editAreaElementA).after(wpElement);
            dom.insert(this.editAreaElementB).after(wpElement);

            // default first use the editAreaA for hover.
            this.editAreaA.lastEdit = false;
            this.editAreaB.lastEdit = true;

            this._create();
        },

        _create:function(){
            this.doc = document;
            this.element = this.wp;
            this.wp = this.parent.wp;

            //make sure commands dispatcher is ready
            this.commands = new workpad.Commands(this.parent);
            this.parent.commands = this.commands;

            this.observe();
            this.dispatcher();
        }

    });

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Taking care of events
 *
 */

(function(workpad){
    var dom = workpad.dom,
        util = workpad.util,
        browser = workpad.browser,
        KEYS = workpad.KEYS;

    workpad.views.Composer.prototype.observe = function(){
        var that = this,
            editor = this.parent,
            element = this.parent.element,
            editAreaElementA = this.editAreaA.getEditArea(),
            editAreaElementARealNode = this.editAreaA.getRealNode(),
            editAreaElementB = this.editAreaB.getEditArea(),
            editAreaElementBRealNode = this.editAreaB.getRealNode();

            pasteEvents = ["drop","paste"];


        util.debug(element,editAreaElementA,editAreaElementB).debug();

        //Main Event handler.

        var
            editAreasEvent = function(event){
                var keyCode = event.keyCode;
                if(keyCode === KEYS.ENTER_KEY){
                    event.preventDefault();
                    that.commands.exec("addItem");
                }else if(keyCode === KEYS.TAB_KEY){
                    event.preventDefault();
                    if(event.shiftKey){
                        that.commands.exec("outdentItem");
                    }else{
                        that.commands.exec("indentItem");
                    }
                }else if(keyCode === KEYS.UP_KEY){
                    event.preventDefault();
                    that.commands.exec("moveUp");
                }else if(keyCode === KEYS.DOWN_KEY){
                    event.preventDefault();
                    that.commands.exec("moveDown");
                }
            };

        dom.observe(editAreaElementARealNode,"keydown",editAreasEvent);
        dom.observe(editAreaElementBRealNode,"keydown",editAreasEvent);
        dom.observe(editAreaElementARealNode,"focus",function(event){
            that.editAreaA.lastEdit = true;
            that.editAreaB.lastEdit = false;
        })
        dom.observe(editAreaElementBRealNode,"focus",function(event){
            that.editAreaA.lastEdit = false;
            that.editAreaB.lastEdit = true;
        })
        that.editAreaA.handleContentChange(function(event){
            that.commandExec("syncContent",that.editAreaA);
        });
        that.editAreaB.handleContentChange(function(event){
            that.commandExec("syncContent",that.editAreaB);
        });

        // ----- set the editArea location -----
        dom.delegate(element,".content","mouseover",function(event){
            var itemEle = dom.getParentElement(event.target,{nodeName:"DIV",className:"item"}),
                itemid = dom.getAttribute("data-id").from(itemEle);
            that.setEditAreaWithItemIdForContent(that.getUseHoverEditArea(),itemid);
        });

    }

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * the editor dispatch center.
 *
 */

;(function(workpad){
    var dom = workpad.dom,
        util = workpad.util;

    workpad.views.Composer.prototype.dispatcher = function(){
        var editor = this.parent,
            that = this;
        editor.on("addItem:dispatcher",function(){
            util.debug("Editor on Event:", "indentItem:dispatcher").info();
            that.commandExec("addItem");
        });

        editor.on("indentItem:dispatcher",function(){
           util.debug("Editor on Event:", "indentItem:dispatcher").info();
           that.commandExec("indentItem");
        });

        editor.on("outdentItem:dispatcher",function(){
            util.debug("Editor on Event:", "outdentItem:dispatcher").info();
            that.commandExec("outdentItem");
        });

        editor.on("editAreaMoveUp:dispatcher",function(){
            util.debug("Editor on Event:", "editAreaMoveUp:dispatcher").info();
            that.commandExec("moveUp");
        });

        editor.on("editAreaMoveDown:dispatcher",function(){
            util.debug("Editor on Event:", "editAreaMoveDown:dispatcher").info();
            that.commandExec("moveDown");
        });
    };

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 *  private commands for the workapd content handler.
 *
 */


;(function(workpad){
    var util = workpad.util;

    workpad.views.Composer.commandCenter = {};
    workpad.views.Composer.prototype.commandExec = function(command,value){
        var obj = workpad.views.Composer.commandCenter[command],
            args = workpad.util.array(arguments).get(),
            method = obj && obj.exec,
            result = null;

        if(method){
            //parent is editor
            args.unshift(this.parent);
            result = method.apply(obj,args);
            return result;
        }
        return false;
    }
})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this is use for add workpad bullet point.
 *
 */

;workpad.views.Composer.commandCenter.addItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","additem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            char = editArea.getLRchar(),
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            haveChildren = wp.haveChildrenWithId(currentItemId),
            isExpand = wp.isExpandWithID(currentItemId),
            newItemData = wp.initNewBulletPointData(),
            newItemId = newItemData.id,
            newItemElement = dom.getAsDom(wp.buildHTMLBySingleData(newItemData));

        composer.hideEditArea(composer.getUseHoverEditArea());

//        workpad.util.debug(char,currentItemId,currentItemElement,haveChildren,isExpand,newItemData,newItemElement).debug();

        /*
            there have different case have different behavior

            @ ==> mean the bullet point is collapse
            · ==> mean the bullet point is normal (expand)
            | ==> mean the current cursor location

         */
        if(haveChildren && char.right.length<1 && isExpand){
            /*
                case 1: when the cursor at the end of the bullet point and the point have children is expand,
                        then will create a new bullet for the old first child item.

                · abcd ef dalf |      <== ID 1
                    · the child       <== ID 2
            <=================enter====================>
                · abcd ef dalf        <== ID 1
                    · |               <== ID 3 (new focus)
                    · the child       <== ID 2

             */

            workpad.util.debug("Add item case 1").info();

        }else if(!haveChildren && char.right.length<1){
            /*
                case 2: when the cursor at the end of the bullet point and the point don't have child or have child
                        but the point is collapse, then will create a new bullet point after the old point.

                case 2-1:

                 @ abcd ef dalf |      <== ID 1
                 · second df           <== ID 2
                 <=================enter====================>
                 @ abcd ef dalf        <== ID 1
                 · |                   <== ID 3 (new focus)
                 · second df           <== ID 2

                case 2-2:

                 · abcd ef dalf |      <== ID 1
                 · the child           <== ID 2
                 <=================enter====================>
                 · abcd ef dalf        <== ID 1
                 · |                   <== ID 3 (new focus)
                 · second df           <== ID 2

             */

            workpad.util.debug("Add item case 2").info();
            dom.insert(newItemElement).after(currentItemElement);
            wp.setContentById(currentItemId,char.left);
            composer.setEditAreaWithItemIdForContent(editArea,newItemId);

        }else{
            /*
                case 3: when the cursor at the middle or start of the bullet point, if at the start of the bullet point
                        then will create a empty point *before* the old , if at the middle of the point, then will
                        create a new point *before* the old and set it content with the left of the cursor content, and
                        set the old with the right of the cursor conetnt.

                case 3-1:                                     case 3-2:

                 · abcd ef | dalf      <== ID 1                  @ abcd ef | gh      <== ID 1
                 · second df           <== ID 2                  · second df         <== ID 2
                 <=================enter====================>   <===============enter================>
                 · abcd ef             <== ID 3 (new)            · abcd ef           <== ID 3 (new)
                 · | dalf              <== ID 1 (focus)          @ | gh              <== ID 1 (focus)
                 · second df           <== ID 2                  · second df         <== ID 2

                case 3-3:                                      more case like 3-3...
                 · | abcd ef dalf      <== ID 1
                    · the child        <== ID 2
                 <=================enter====================>
                 ·                     <== ID 3 (new)
                 · | abcd ef dalf      <== ID 1 (focus)
                    · the child        <== ID 2

             */

            workpad.util.debug("Add item case 3").info();
            dom.insert(newItemElement).before(currentItemElement);
            wp.setContentById(currentItemId,char.right);
            wp.setContentById(newItemId,char.left);
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
            editArea.setCursorLocation(0);

            //TODO:send data modify log
        }

    }
};
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this use for sync the content from the editarea to the workpad bullet point.
 *
 */

;workpad.views.Composer.commandCenter.syncContent = {
    exec:function(editor,command,editArea){



        var dom = workpad.dom,
            composer = editor.composer,
            wp = editor.wp,
            editAreaElement = editArea.getEditArea(),
            itemId = dom.getAttribute("data-id").from(editAreaElement),
            innerType = dom.getAttribute("data-type").from(editAreaElement);

//        workpad.util.debug(itemId,innerType,editArea.getContent()).debug();

        if (innerType === "content"){
            wp.setContentById(itemId,editArea.getContent());
        }


        //TODO: this is mean modify the content , but when to send the log ?

    }
};/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * indent / outdent item.
 *
 */

;workpad.views.Composer.commandCenter.indentItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","indentItem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            prevItemElement = wp.getPrevElementItemByItemId(currentItemId),
            prevItemId = prevItemElement && dom.getAttribute("data-id").from(prevItemElement);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(prevItemElement){
            dom.insert(currentItemElement).into(prevItemElement.querySelector(".children"));
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
        }
    }
};


workpad.views.Composer.commandCenter.outdentItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","outdentItem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            parentItemElement = wp.getParentElementByitemId(currentItemId),
            parentItemId = parentItemElement && dom.getAttribute("data-id").from(parentItemElement);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(parentItemElement){
            dom.insert(currentItemElement).after(parentItemElement);
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
        }

    }
};/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * make the edit area move up and down
 *
 */

;workpad.views.Composer.commandCenter.moveUp = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","editAreaMoveUp:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            theUpElementId = wp.getTheUpItemIdByCurrent(currentItemId);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(theUpElementId){
            composer.setEditAreaWithItemIdForContent(editArea,theUpElementId);
            editArea.setCursorLocation(0);
        }


    }
};

workpad.views.Composer.commandCenter.moveDown = {
    exec:function(editor, command){
        workpad.util.debug("Get Event:","editAreaMoveDown:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            theDownElementId = wp.getTheDownItemIdByCurrent(currentItemId);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(theDownElementId){
            composer.setEditAreaWithItemIdForContent(editArea,theDownElementId);
            editArea.setCursorLocation(0);
        }
    }
};
/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * This is workpad edit area constructor.
 *
 */
(function(workpad){
    var D = workpad.data,
        dom = workpad.dom,
        debug = workpad.util.debug;

    workpad.views.Wp = workpad.views.View.extend({
        name:"workpad",

        constructor:function(parent,element,config){
            this.base(parent,element,config);

            this._observe();
        },


        initContentByData: function(jsonData){
            var datas = D.pretty(jsonData).get();
            var Dom = this.buildDomByDatas(datas);
            this._setContent(Dom);
        },

        /* for single bullet point functions*/

        getElementByitemId:function(itemid){
            return this.element.querySelector(".item[data-id='"+itemid+"']");
        },


        /** find bullet points */

        getPrevElementItemByItemId:function(itemid){
            return this.getElementByitemId(itemid).previousElementSibling;
        },

        getNextElementItemByItemId:function(itemid){
            return this.getElementByitemId(itemid).nextElementSibling;
        },

        getParentElementByitemId:function(itemid){
            return dom.getParentElement(this.getElementByitemId(itemid),{nodeName:"DIV", className:"item"},true);
        },

        getFirstChildElementByItemId: function(itemid){
            if(this.haveChildrenWithId(itemid)){
                var childrens = this.getElementByitemId(itemid).querySelector(".children").childNodes;
                return childrens[0];
            }
        },
        getLastChildElementByItemId: function(itemid){
            if(this.haveChildrenWithId(itemid)){
                var childrens = this.getElementByitemId(itemid).querySelector(".children").childNodes;
                return childrens[childrens.length-1];
            }
        },

        /** get the up down */

        getTheUpElementByItemId: function(itemid,isStack){
            var current = this.getElementByitemId(itemid);
            if(isStack){
                var prev_tmp = current;
            }else{
                var prev_tmp = this.getPrevElementItemByItemId(itemid);
            }
            if(prev_tmp){
                var prev_tmp_id = dom.getAttribute("data-id").from(prev_tmp);
                if(this.haveChildrenWithId(prev_tmp_id)){
                    var prev_last_child_tmp =  this.getLastChildElementByItemId(prev_tmp_id);
                    return this.getTheUpElementByItemId(dom.getAttribute("data-id").from(prev_last_child_tmp),true);
                }else{
                    return prev_tmp;
                }
            }
            var parent_tmp = this.getParentElementByitemId(itemid);
            return parent_tmp;
        },
        getTheUpItemIdByCurrent: function(itemid){
            var up = this.getTheUpElementByItemId(itemid);
            return up && dom.getAttribute("data-id").from(up);
        },

        getTheDownElementByItemId: function(itemid, isStack){
            var current = this.getElementByitemId(itemid),
                next_tmp = this.getNextElementItemByItemId(itemid),
                haveChild = this.haveChildrenWithId(itemid);
            if(!isStack && haveChild){
                return this.getFirstChildElementByItemId(itemid);
            }
            if(next_tmp){
                return next_tmp;
            }
            var parent_tmp = this.getParentElementByitemId(itemid);
            if(parent_tmp){
                return this.getTheDownElementByItemId(dom.getAttribute("data-id").from(parent_tmp),true);
            }
        },
        getTheDownItemIdByCurrent: function(itemid){
            var down = this.getTheDownElementByItemId(itemid);
            return down && dom.getAttribute("data-id").from(down);
        },


        /**
         * get the content by item id
         * @param itemid
         * @returns {*|string}
         */
        getContentById: function(itemid){
            var ele = this.getElementByitemId(itemid);
            return ele.querySelector(".content").innerHTML;
        },

        /**
         * set the content by item id
         * @param itemid
         * @param content {String} , this can be text or HTML string.
         */
        setContentById: function(itemid,content){
            var ele = this.getElementByitemId(itemid);
            ele.querySelector(".content").innerHTML = content;
        },

        haveChildrenWithId:function(itemid){
            var ele = this.getElementByitemId(itemid),
                childNode = ele.querySelector(".children");
            if(workpad.util.string(childNode.innerHTML).trim().length <1 ){
                return false;
            }
            return true;
        },


        /* this function will return the element of bulletPoint */

        getContentElementById:function(itemid){
            return this.getElementByitemId(itemid).querySelector("div.content");
        },



        /*  create bullet point */
        /**
         * create a new bullet point id
         *      xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  {8}-{4}-{4}-{4}-{12}
         * @returns {string}
         */
        initNewBulletPointId:function(){
            var randMd5 = hex_md5(Date.parse(new Date()).toString() + Math.random().toString()),
                newItemId = "",
                splitBy = [8,12,16,20];

            for(var i = 0,len = randMd5.length,c; c = randMd5.charAt(i), i < len; i++){
                newItemId += c;
                if(splitBy.indexOf(i+1) > -1){
                    newItemId += "-";
                }
            }
            return newItemId;
        },

        initNewBulletPointData:function(){
            var temp = workpad.data.predata.GET_DEFAULT_JSON();
            temp.id = this.initNewBulletPointId();
            return temp;
        },

        /**
         * return the bullet point is expand
         * @param itemid
         * @returns {boolean}
         */
        isExpandWithID:function(itemid){
            //TODO:finish this function

            return true; // for test default is all expand.
        },

        /**-------------------
         * private funciton to set the workpad content
         * @param content {HTMLstring}
         * @private
         */
        _setContent:function(DOMcontent){
            this.element.innerHTML = DOMcontent;
        },

        _observe:function(){
            var element = this.element,
                parent = this.parent

        }
    });

})(workpad);

/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * workpad.views.Wp.prototype
 *
 */

;(function(workpad){
    var dom = workpad.dom,
        util = workpad.util,
        WpProto = workpad.views.Wp.prototype;


    /**
     * Default Template
     * @param data
     */

    //one bullet points
    var BULLET_POINT =
        '<div class="item" data-id="#{id}">' +
            '<div class="maindata">' +
                '<div class="content">#{content}</div>' +
                '<div class="description">#{description}</div>' +
            '</div>' +
            '<div class="children">#{children}</div>' +
        '</div>';

    WpProto.buildDomByDatas = function(datas){
        var that = this;
        return function build(datas){
            var
                html = "",
                childrens = "",
                i = 0,
                len = datas.length;
            for(; i<len; i++){
                var data = datas[i];
                if(data.children.length > 0 && data.expand){
                    childrens = build(data.children);
                }
                html += that.buildHTMLBySingleData({
                    id:data.id,
                    content:data.content,
                    description:data.description,
                    children:childrens
                });
                childrens = "";   //need reset the variable when replace complete.
            }
            return html;
        }(datas);
    };


    WpProto.buildHTMLBySingleData = function(json){
        return util.string(BULLET_POINT).interpolate(json);
    };

})(workpad);/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Workpad init .
 *
 */

/**
 * workpad init constructor.
 *
 * @param {Element} a div element which should be turned into a outliner edit area.
 * @param {Object} [config] See defaultConfig object below for explanation of each individual config option
 *
 * @events
 *  ...
 */


(function(workpad){
    var undef;

    var defaultConfig = {
        //the init Content, this is a workpad josn data.
        initContent:    undef
    };

    workpad.Init = workpad.util.Events.extend({
        constructor:function(element,config){
            this.element = typeof(element) === "string" ? document.getElementById(element) : element;
            this.config = workpad.util.object({}).merge(defaultConfig).merge(config).get();
            this.wp = new workpad.views.Wp(this, this.element, this.config);
            this.currentView = this.wp;
            this._isCompatible = workpad.browser.supported();


            //init composer;

            this.composer = new workpad.views.Composer(this,this.wp, this.config);
            this.currentView = this.composer;

            this.wp.initContentByData(this.config.initContent);
        }
    })

})(workpad);
