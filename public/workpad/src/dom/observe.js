/**
 * @license workpad v@VERSION
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
}
