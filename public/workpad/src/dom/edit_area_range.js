/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * for range and selection for input textarea
 *
 */

;(function(workpad){

    var setSelection,getSelection,makeSelection;

    makeSelection = function(ele,start,end){
        return {
            start:start,
            end:end,
            length:end - start,
            text: ele.value.slice(start,end)
        };
    };

    getSelection = function(ele){
        var start = ele.selectionStart,
            end = ele.selectionEnd;
        return makeSelection(ele,start,end);
    };


    workpad.dom.editAreaRange = Base.extend({
        constructor:function(element){
            this.element = element;
        },

        getSelection:function(){
            return getSelection(this.element);
        },

        getLRchar:function(){
            var selection = getSelection(this.element),
                textContent = this.element.value;

            return {
                left:textContent.slice(0,selection.start),
                right:textContent.slice(selection.start,textContent.length)
            };
        }
    });

})(workpad);