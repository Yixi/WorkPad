/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * make the edit area move up and down
 *
 */

;workpad.views.Composer.commandCenter.moveUp = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","editAreaMoveUp:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            theUpElementId = wp.getTheUpItemIdByCurrent(currentItemId);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(theUpElementId){
            composer.setEditAreaWithItemIdForContent(editArea,theUpElementId);
            editArea.setCursorLocation(0);
        }


    }
};

workpad.views.Composer.commandCenter.moveDown = {
    exec:function(editor, command){
        workpad.util.debug("Get Event:","editAreaMoveDown:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            theDownElementId = wp.getTheDownItemIdByCurrent(currentItemId);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(theDownElementId){
            composer.setEditAreaWithItemIdForContent(editArea,theDownElementId);
            editArea.setCursorLocation(0);
        }
    }
};
