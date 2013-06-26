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
     * check whether the browser supports the given command
     * @param {String}
     * @returns {*}
     */
    support:function(command){
        return workpad.browser.supportsCommand(this.doc,command);
    },

    exec: function(command,value){
        var obj = workpad.commands[command],
            args = workpad.util.array(arguments).get(),
            method = obj && obj.exec,
            result = null;

        if(method){
            args.unshift(this.editor);
            result = method.apply(obj,args);
        }else{
            try{
                result = this.doc.execCommand(command, false, value);
            }catch(e){}
        }
        return result;
    }
});
