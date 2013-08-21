/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Taking care of events
 *
 */

(function(workpad){
    var dom = workpad.dom,
        util = workpad.util,
        browser = workpad.browser,
        KEYS = workpad.KEYS;

    workpad.views.Composer.prototype.observe = function(){
        var that = this,
            editor = this.parent,
            element = this.parent.element,
            editAreaElementA = this.editAreaA.getEditArea(),
            editAreaElementARealNode = this.editAreaA.getRealNode(),
            editAreaElementB = this.editAreaB.getEditArea(),
            editAreaElementBRealNode = this.editAreaB.getRealNode();

            pasteEvents = ["drop","paste"];


        util.debug(element,editAreaElementA,editAreaElementB).debug();

        //Main Event handler.

        var
            editAreasEvent = function(event){
                var keyCode = event.keyCode;
                if(keyCode === KEYS.ENTER_KEY){
                    event.preventDefault();
                    that.commands.exec("addItem");
                }else if(keyCode === KEYS.TAB_KEY){
                    event.preventDefault();
                    if(event.shiftKey){
                        that.commands.exec("outdentItem");
                    }else{
                        that.commands.exec("indentItem");
                    }
                }else if(keyCode === KEYS.UP_KEY){
                    event.preventDefault();
                    that.commands.exec("moveUp");
                }else if(keyCode === KEYS.DOWN_KEY){
                    event.preventDefault();
                    that.commands.exec("moveDown");
                }else if(keyCode === KEYS.BACKSPACE_KEY){
                    that.commands.exec("backspace",event);
                }
            };

        dom.observe(editAreaElementARealNode,"keydown",editAreasEvent);
        dom.observe(editAreaElementBRealNode,"keydown",editAreasEvent);
        dom.observe(editAreaElementARealNode,"focus",function(event){
            that.editAreaA.lastEdit = true;
            that.editAreaB.lastEdit = false;
        })
        dom.observe(editAreaElementBRealNode,"focus",function(event){
            that.editAreaA.lastEdit = false;
            that.editAreaB.lastEdit = true;
        })
        that.editAreaA.handleContentChange(function(event){
            that.commandExec("syncContent",that.editAreaA);
            that.resizeEditAreaHeightWithContent(that.editAreaElementA);
        });
        that.editAreaB.handleContentChange(function(event){
            that.commandExec("syncContent",that.editAreaB);
            that.resizeEditAreaHeightWithContent(that.editAreaElementB);
        });

        // ----- set the editArea location -----
        dom.delegate(element,".content","mouseover",function(event){
            var itemEle = dom.getParentElement(event.target,{nodeName:"DIV",className:"item"}),
                itemid = dom.getAttribute("data-id").from(itemEle);
            that.setEditAreaWithItemIdForContent(that.getUseHoverEditArea(),itemid);
        });
//        dom.delegate(element,".content","mouseout",function(event){
//            var itemEle = dom.getParentElement(event.target,{nodeName:"DIV",className:"item"}),
//                itemid = dom.getAttribute("data-id")
//        });

    }

})(workpad);