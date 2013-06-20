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
    workpad.dom.editArea = Base.extend({

        constructor:function(readyCallback,config){
            var that = this;
            this.callback = readyCallback || workpad.EMPTY_FUNCTION;
            this.config = workpad.util.object({}).merge(config).get();
            this.editArea =  this._createTextArea();
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

        setContent:function(value){
            this.editArea.value = value;
            return this;
        },

        empty:function(){
            this.editArea.value = "";
            return this;
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
                textarea = doc.createElement("textarea");
            textarea.className = "workpad-editArea";
            workpad.dom.setAttributes({
                "width":0,
                "height":0
            }).on(textarea);


            return textarea;
        }

    });

})(workpad);

