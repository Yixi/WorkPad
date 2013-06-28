/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this use for sync the content from the editarea to the workpad bullet point.
 *
 */

;workpad.views.Composer.commandCenter.syncContent = {
    exec:function(editor,command,editArea){



        var dom = workpad.dom,
            composer = editor.composer,
            wp = editor.wp,
            editAreaElement = editArea.getEditArea(),
            itemId = dom.getAttribute("data-id").from(editAreaElement),
            innerType = dom.getAttribute("data-type").from(editAreaElement);

//        workpad.util.debug(itemId,innerType,editArea.getContent()).debug();

        if (innerType === "content"){
            wp.setContentById(itemId,editArea.getContent());
        }


        //TODO: this is mean modify the content , but when to send the log ?

    }
};