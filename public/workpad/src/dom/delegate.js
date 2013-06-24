/**
 * @license workpad v@VERSION
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
})(workpad);