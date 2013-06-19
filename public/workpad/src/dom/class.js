/**
 * @license workpad v@VERSION
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
