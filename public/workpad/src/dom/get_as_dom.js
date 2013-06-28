/**
 * @license workpad v@VERSION
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
})();