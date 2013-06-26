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
        var editor = this.parent;

        editor.on("addItem:dispatcher",function(){
            util.debug("Event:","additem:dispatcher").info();
        });

        editor.on("indentItem:dispatcher",function(){
           util.debug("Event:", "indentItem:dispatcher").info();
        });

        editor.on("outdentItem:dispatcher",function(){
            util.debug("Event:", "outdentItem:dispatcher").info();
        });


    };
})(workpad);