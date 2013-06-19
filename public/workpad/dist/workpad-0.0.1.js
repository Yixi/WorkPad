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
    util:       {},
    dom:        {},
    commands:   {},
    ui:         {},
    views:      {},
    log:        {},

    EMPTY_FUNCTION:function(){},

    ELEMENT_NODE:1,
    TEXT_NODE:3,

    KEYS:{
        BACKSPACE_KEY:  8,
        INDENT_KEY:     9,
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
};/**
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
        }





    }

})();
(function(){
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
             *      workpad.util.array([1,1,3,4,3]).unique; //=> [1,3,4]
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

})();
