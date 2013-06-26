/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * add item command.
 *
 */

workpad.commands.addItem = {
    exec:function(editor, command){
        editor.fire("addItem:dispatcher");
    }
};