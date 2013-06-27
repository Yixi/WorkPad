/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this is use for add workpad bullet point.
 *
 */

workpad.views.Composer.commandCenter.addItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","additem:dispatcher").info();
        var editArea = editor.composer.getCurrentUseEditArea(),
            wp = editor.wp,
            char = editArea.getLRchar(),
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea());
        workpad.util.debug(char,currentItemId,wp.haveChildrenWithId(currentItemId)).debug();


    }
}
