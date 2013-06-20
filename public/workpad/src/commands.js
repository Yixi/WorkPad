/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * the workpad commands center
 *
 * @example
 *      var commands = new workpad.Commands(editor);
 */

workpad.Commands = Base.extend({
    constructor:function(editor){
        this.editor = editor;
        this.composer = editor.composer;
        this.doc = this.composer.doc;
    },

    /**
     *
     * @param {String}
     * @returns {*}
     */
    support:function(command){
        return workpad.browser.supportsCommand(this.doc,command);
    }
});
