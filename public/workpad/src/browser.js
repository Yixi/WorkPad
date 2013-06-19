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
        }





    }

})();
