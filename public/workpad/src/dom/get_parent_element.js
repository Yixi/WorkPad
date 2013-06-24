/**
 * @license workpad v@VERSION
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

})();