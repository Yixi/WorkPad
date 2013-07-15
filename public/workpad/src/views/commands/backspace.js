/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 *
 *
 */

;workpad.views.Composer.commandCenter.backspace = {
    exec:function(editor,command,event){
        workpad.util.debug("Get Event:","backspace:dispatcher").info();
        var dom = workpad.dom,
            composer = editor.composer,
            editArea = composer.getCurrentUseEditArea(),
            wp = editor.wp,
            char = editArea.getLRchar(),
            currentItemId = workpad.dom.getAttribute("data-id").from(editArea.getEditArea()),
            isHaveDescription = wp.haveDescriptionWithID(currentItemId),
            isExpand = wp.isExpandWithID(currentItemId),
            haveChildren = wp.haveChildrenWithId(currentItemId),
            currentItemElement = wp.getElementByitemId(currentItemId),
            theUpElementId = wp.getTheUpItemIdByCurrent(currentItemId),
            thePrevElement = wp.getPrevElementItemByItemId(currentItemId);
        if(thePrevElement){
            var
                thePrevItemId = thePrevElement && dom.getAttribute("data-id").from(thePrevElement),
                thePrevIsHaveDescription = wp.haveDescriptionWithID(thePrevItemId),
                thePrevIsExpand = wp.isExpandWithID(thePrevItemId),
                thePrevHaveChildren = wp.haveChildrenWithId(thePrevItemId);
        }



        composer.hideEditArea(composer.getUseHoverEditArea());



        /*
         there have different case have different behavior

         @ ==> mean the bullet point is collapse
         · ==> mean the bullet point is normal (expand)
         | ==> mean the current cursor location

         */
        if(char.left.length<1){
            //when the cursor left have no char.

            if(char.right.length > 0 && !thePrevElement){
               /*
                    case 1: when the current Item is the top bullet point of the workpad ,
                            and the current bullet point isn't empty.
                */

                return;
            }else if(char.right.length > 0 && !!thePrevElement){

                if(thePrevIsHaveDescription) {
                    /*
                        case 2-1: the prev bullet point have description ;
                     */
                    return;
                }

                if(thePrevHaveChildren){
                    /*
                        case 2-2: te prev bullet have children;

                     */
                    return;
                }

                if(!thePrevIsExpand){
                    /*
                        case 2-3: the prev bullet have children but not expand;
                     */
                    return;
                }

                /*
                    case 3: the current bullet isn't empty, the delete the prev bullet point and merge
                            the prev bullet content at cursor left of current bullet point.

                    · abcd ef dalf          <== ID 1   *prev
                    · | the second          <== ID 2   *current
                        · the second child  <== ID 3
                <=================backspace====================>
                    · abcd ef dalf| the second         <== ID 2 (focus) ID 1 is delete.
                        ·the second child              <== ID 3

                 */
                event.preventDefault();
                workpad.util.debug("Backspace button case 3").info();
                var prevContent = wp.getContentById(thePrevItemId);
                wp.removeItemByID(thePrevItemId);
                wp.setContentById(currentItemId,prevContent + char.right);
                composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
                editArea.setCursorLocation(prevContent.length);

            }else if(char.right.length<1){
                /* the mean when current bullet point is empty */

                if(wp.getLength() == 1){
                    /*
                        case 1-2: the current empty item is the last bullet point.
                     */
                    workpad.util.debug("Backspace button case 1-1").info();
                    return;
                }
                if( (haveChildren || !isExpand || isHaveDescription )
                    &&
                    (!thePrevElement || thePrevIsHaveDescription || thePrevHaveChildren || !thePrevIsExpand ) ){
                    /*
                        case 4: when the current item content is empty but the current have children or have the
                                description and the prev have description or children. or the current is the top
                                bullet point.
                     */

                    workpad.util.debug("Backspace button case 4").info();
                    return;
                }else if( (haveChildren || !isExpand || isHaveDescription )
                          && thePrevElement){
                    /*
                        case 3-2: when the current item content is empty but have children or desription. the delete
                                the prev bullet point and merge the prev bullet point content to current. the case
                                is similar with case 3.
                        · abcd ef dalf          <== ID 1   *prev
                        · |                     <== ID 2   *current
                            · the second child  <== ID 3
                    <=================backspace====================>
                        · abcd ef dalf|         <== ID 2 (focus) ID 1 is delete.
                            ·the second child   <== ID 3
                     */

                    event.preventDefault();
                    workpad.util.debug("Backspace button case 3-2").info();
                    var prevContent = wp.getContentById(thePrevItemId);
                    wp.removeItemByID(thePrevItemId);
                    wp.setContentById(currentItemId,prevContent);
                    composer.setEditAreaWithItemIdForContent(editArea,currentItemId);
                    editArea.setCursorLocation(prevContent.length);
                    return;
                }else{
                    /*
                        case 5: when the current item content is empty and have no description or children. then
                                delete the current item and set the focus to prev ,if prev is null , set focus to
                                next item.

                     */

                    event.preventDefault();
                    var theNextElement = wp.getNextElementItemByItemId(currentItemId),
                        theNextItemId = theNextElement && dom.getAttribute("data-id").from(theNextElement);
                    wp.removeItemByID(currentItemId);
                    if(theUpElementId){
                        composer.setEditAreaWithItemIdForContent(editArea,theUpElementId);
                        editArea.setCursorLocation('last');
                    }else{
                        editArea.blur();
                        composer.hideEditArea(editArea);
                    }
                }

            }

        }

    }
}