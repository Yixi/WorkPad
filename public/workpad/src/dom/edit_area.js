/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * eidtArea for bullet points and description.
 *
 * - now we just use a textarea for edit area , then sync the content to the bullet point. future will use div for rich edit.
 *
 * @param {Function} [readyCallback] Method that gets invoked when the textarea is ready.
 * @param {Object} [config] Optional parameters
 *
 * @example
 *  new workpad.dom.editArea(function(editArea){
 *      editArea.setContent("begin to edit your workpad");
 *  });
 */

;(function(workpad){

    /**
     * Default configuration
     */

    var doc = document;
    /**
     * @scope workpad.dom.editArea.prototype.
     */
    workpad.dom.editArea = workpad.dom.editAreaRange.extend({

        constructor:function(readyCallback,config){
            var that = this;
            this.callback = readyCallback || workpad.EMPTY_FUNCTION;
            this.config = workpad.util.object({}).merge(config).get();
            this.editArea =  this._createTextArea();
            this.base(this.getRealNode());
            setTimeout(function() { that.callback(that); }, 0);
        },

        insertInto:function(element){
            if (typeof(element) === 'string'){
                element = doc.getElementById(element);
            }
            element.appendChild(this.editArea);
        },

        getEditArea:function(){
            return this.editArea;
        },

        // this function to return the real editArea like <textarea> for event handler.
        getRealNode:function(){
            return this.editArea.getElementsByTagName("textarea")[0];
        },

        setContent:function(value){
            this.editArea.getElementsByTagName("textarea")[0].value = value;
            return this;
        },

        getContent:function(){
            return this.editArea.getElementsByTagName("textarea")[0].value;
        },

        empty:function(){
            this.editArea.getElementsByTagName("textarea")[0].value = "";
            return this;
        },

        handleContentChange:function(fn){
            var ele = this.getRealNode();
            ele.addEventListener("input",fn,false);
        },

        /**
         * Creates the textarea element.
         *
         * important notes:
         *  -
         *
         * @returns {HTMLElement}
         * @private
         */
        _createTextArea:function(){
            var that = this,
                textareaWrapper = doc.createElement("div");
                textarea = doc.createElement("textarea");
            textareaWrapper.className = "workpad-editArea editor";
            textareaWrapper.appendChild(textarea);


            return textareaWrapper;
        }

    });

})(workpad);

