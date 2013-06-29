/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this function use for move the editAera up and down
 *
 */

;workpad.commands.moveUp = {
    exec:function(editor,command){
        editor.fire("editAreaMoveUp:dispatcher");
    }
};

workpad.commands.moveDown = {
    exec:function(editor,command){
        editor.fire("editAreaMoveDown:dispatcher");
    }
};