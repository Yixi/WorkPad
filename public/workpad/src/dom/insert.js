/**
 * @license workpad v@VERSION
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
