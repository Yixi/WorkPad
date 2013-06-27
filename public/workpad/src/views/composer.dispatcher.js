/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * the editor dispatch center.
 *
 */

;(function(workpad){
    var dom = workpad.dom,
        util = workpad.util;

    workpad.views.Composer.prototype.dispatcher = function(){
        var editor = this.parent,
            that = this;
        editor.on("addItem:dispatcher",function(){
            util.debug("Editor on Event:", "indentItem:dispatcher").info();
            that.commandExec("addItem");
        });

        editor.on("indentItem:dispatcher",function(){
           util.debug("Editor on Event:", "indentItem:dispatcher").info();
        });

        editor.on("outdentItem:dispatcher",function(){
            util.debug("Editor on Event:", "outdentItem:dispatcher").info();
        });
    };

})(workpad);