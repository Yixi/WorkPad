/**
 * @license workpad v@VERSION
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
