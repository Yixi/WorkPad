/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * indent /outdent item
 *
 */

workpad.commands.indentItem = {
    exec:function(editor, command){
        editor.fire("indentItem:dispatcher");
    }
};

workpad.commands.outdentItem ={
    exec:function(editor, command){
        editor.fire("outdentItem:dispatcher");
    }
}