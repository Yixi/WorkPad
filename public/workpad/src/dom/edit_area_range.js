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

    var setSelection,getSelection,collapseSelection;

    function makeSelection(ele,start,end){
        return {
            start:start,
            end:end,
            length:end - start,
            text: ele.value.slice(start,end)
        };
    }

    function adjustOffsets(ele,start,end){
        if(start < 0 ){
            start += ele.value.length;
        }
        if(typeof end == "undefined"){
            end = start;
        }
        if(end < 0 ){
            end += ele.value.length;
        }
        return {start:start,end:end};
    }

    getSelection = function(ele){
        var start = ele.selectionStart,
            end = ele.selectionEnd;
        return makeSelection(ele,start,end);
    };

    setSelection = function(ele, startOffset, endOffset){
        if(startOffset == 'last'){
            startOffset = ele.value.length;
        }
        var offsets = adjustOffsets(ele, startOffset, endOffset);
        ele.selectionStart = offsets.start;
        ele.selectionEnd = offsets.end;
    };

    collapseSelection = function(ele, toStart){
        if (toStart){
            ele.selectionEnd = ele.selectionStart;
        }else{
            ele.selectionStart = ele.selectionEnd;
        }
    };



    workpad.dom.editAreaRange = Base.extend({
        constructor:function(element){
            this.element = element;
        },

        getSelection:function(){
            return getSelection(this.element);
        },
        setSelection:function(start,end){
            setSelection(this.element, start, end);
        },
        setCursorLocation:function(index){
            setSelection(this.element,index);
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