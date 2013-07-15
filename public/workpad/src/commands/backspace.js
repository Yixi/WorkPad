/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * when click backspace button
 *
 */

;workpad.commands.backspace = {
    exec:function(editor,command,event){
        editor.fire("backspace:dispatcher",event);
    }
};