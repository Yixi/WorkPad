/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * indent / outdent item.
 *
 */

;workpad.views.Composer.commandCenter.indentItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","indentItem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            prevItemElement = wp.getPrevElementItemByItemId(currentItemId),
            prevItemId = prevItemElement && dom.getAttribute("data-id").from(prevItemElement);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(prevItemElement){
            dom.insert(currentItemElement).into(prevItemElement.querySelector(".children"));
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
        }
    }
};


workpad.views.Composer.commandCenter.outdentItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","outdentItem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            parentItemElement = wp.getParentElementByitemId(currentItemId),
            parentItemId = parentItemElement && dom.getAttribute("data-id").from(parentItemElement);
        composer.hideEditArea(composer.getUseHoverEditArea());
        if(parentItemElement){
            dom.insert(currentItemElement).after(parentItemElement);
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
        }

    }
};