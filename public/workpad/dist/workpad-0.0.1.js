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
});/**
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
        collapsed:true,
        children:[]
    }];

    return {
        EMPTY_DATA:EMPTY_DATA
    }

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
                        newArr = workpad.data.predata.EMPTY_DATA;
                    }
                    return newArr;

                }else{
                    return workpad.data.predata.EMPTY_DATA;
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

    return function(node, matchingSet, levels){
        levels = levels || 70;
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

    workpad.dom.editAreaRange = Base.extend({

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
    workpad.dom.editArea = Base.extend({

        constructor:function(readyCallback,config){
            var that = this;
            this.callback = readyCallback || workpad.EMPTY_FUNCTION;
            this.config = workpad.util.object({}).merge(config).get();
            this.editArea =  this._createTextArea();
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

        /* this function to return the real editArea like <textarea> for event handler. */
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

workpad.commands.indentItem = {
    exec:function(editor, command){
        editor.fire("indentItem:dispatcher");
    }
};

workpad.commands.outdentItem ={
    exec:function(editor, command){
        editor.fire("outdentItem:dispatcher");
    }
}/**
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
            eidtAreaElementBRealNode = this.editAreaB.getRealNode();

            pasteEvents = ["drop","paste"];


        util.debug(element,editAreaElementA,editAreaElementB).debug();

        //Main Event handler.

        var editAreasEvent = function(event){
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
            }
        }

        dom.observe(editAreaElementARealNode,"keydown",editAreasEvent);
        dom.observe(eidtAreaElementBRealNode,"keydown",editAreasEvent);

        // ----- set the editArea location -----
        dom.delegate(element,".content","mouseover",function(event){
            var itemEle = dom.getParentElement(event.target,{nodeName:"DIV",className:"item"}),
                contentText = event.target.textContent,
                itemid = dom.getAttribute("data-id").from(itemEle);
            dom.offset(that.getUseHoverEditAreaElement()).set(dom.offset(event.target).get());
            that.getUseHoverEditArea().setContent(contentText);
            dom.setAttributes({"data-id":itemid,"data-type":"content"}).on(that.getUseHoverEditAreaElement());
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
        });

        editor.on("outdentItem:dispatcher",function(){
            util.debug("Editor on Event:", "outdentItem:dispatcher").info();
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

workpad.views.Composer.commandCenter.addItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","additem:dispatcher").info();
    }
}
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

        getElementByitemId:function(itemid){
            return this.element.querySelector(".item[data-id='"+itemid+"']");
        },

        getContentById: function(itemid){
            var ele = this.getElementByitemId(itemid);
            debug(ele).debug();
        },

        /**
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
        util = workpad.util;


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

    workpad.views.Wp.prototype.buildDomByDatas = function(datas){
        var that = this;
        return function build(datas){
            var
                html = "",
                childrens = "",
                i = 0,
                len = datas.length;
            for(; i<len; i++){
                var data = datas[i];
                if(data.children.length > 0 && data.collapse){
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


    workpad.views.Wp.prototype.buildHTMLBySingleData = function(json){
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
