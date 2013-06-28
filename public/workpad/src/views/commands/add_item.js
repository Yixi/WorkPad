/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this is use for add workpad bullet point.
 *
 */

;workpad.views.Composer.commandCenter.addItem = {
    exec:function(editor,command){
        workpad.util.debug("Get Event:","additem:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            char = editArea.getLRchar(),
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            currentItemElement = wp.getElementByitemId(currentItemId),
            haveChildren = wp.haveChildrenWithId(currentItemId),
            isExpand = wp.isExpandWithID(currentItemId),
            newItemData = wp.initNewBulletPointData(),
            newItemId = newItemData.id,
            newItemElement = dom.getAsDom(wp.buildHTMLBySingleData(newItemData));

        composer.hideEditArea(composer.getUseHoverEditArea());

        workpad.util.debug(char,currentItemId,currentItemElement,haveChildren,isExpand,newItemData,newItemElement).debug();

        /*
            there have different case have different behavior

            @ ==> mean the bullet point is collapse
            · ==> mean the bullet point is normal (expand)
            | ==> mean the current cursor location

         */
        if(haveChildren && char.right.length<1 && isExpand){
            /*
                case 1: when the cursor at the end of the bullet point and the point have children is expand,
                        then will create a new bullet for the old first child item.

                · abcd ef dalf |      <== ID 1
                    · the child       <== ID 2
            <=================enter====================>
                · abcd ef dalf        <== ID 1
                    · |               <== ID 3 (new focus)
                    · the child       <== ID 2

             */

            workpad.util.debug("Add item case 1").info();

        }else if(!haveChildren && char.right.length<1){
            /*
                case 2: when the cursor at the end of the bullet point and the point don't have child or have child
                        but the point is collapse, then will create a new bullet point after the old point.

                case 2-1:

                 @ abcd ef dalf |      <== ID 1
                 · second df           <== ID 2
                 <=================enter====================>
                 @ abcd ef dalf        <== ID 1
                 · |                   <== ID 3 (new focus)
                 · second df           <== ID 2

                case 2-2:

                 · abcd ef dalf |      <== ID 1
                 · the child           <== ID 2
                 <=================enter====================>
                 · abcd ef dalf        <== ID 1
                 · |                   <== ID 3 (new focus)
                 · second df           <== ID 2

             */

            workpad.util.debug("Add item case 2").info();
            dom.insert(newItemElement).after(currentItemElement);
            wp.setContentById(currentItemId,char.left);
            composer.setEditAreaWithItemIdForContent(editArea,newItemId);

        }else{
            /*
                case 3: when the cursor at the middle or start of the bullet point, if at the start of the bullet point
                        then will create a empty point *before* the old , if at the middle of the point, then will
                        create a new point *before* the old and set it content with the left of the cursor content, and
                        set the old with the right of the cursor conetnt.

                case 3-1:                                     case 3-2:

                 · abcd ef | dalf      <== ID 1                  @ abcd ef | gh      <== ID 1
                 · second df           <== ID 2                  · second df         <== ID 2
                 <=================enter====================>   <===============enter================>
                 · abcd ef             <== ID 3 (new)            · abcd ef           <== ID 3 (new)
                 · | dalf              <== ID 1 (focus)          @ | gh              <== ID 1 (focus)
                 · second df           <== ID 2                  · second df         <== ID 2

                case 3-3:                                      more case like 3-3...
                 · | abcd ef dalf      <== ID 1
                    · the child        <== ID 2
                 <=================enter====================>
                 ·                     <== ID 3 (new)
                 · | abcd ef dalf      <== ID 1 (focus)
                    · the child        <== ID 2

             */

            workpad.util.debug("Add item case 3").info();
            dom.insert(newItemElement).before(currentItemElement);
            wp.setContentById(currentItemId,char.right);
            wp.setContentById(newItemId,char.left);
            composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
            editArea.setCursorLocation(0);

            //TODO:send data modify log
        }

    }
};
