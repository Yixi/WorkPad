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
            eidtAreaElementBRealNode = this.editAreaB.getRealNode();

            pasteEvents = ["drop","paste"];


        util.debug(element,editAreaElementA,editAreaElementB).debug();

        //Main Event handler.

        var editAreasEvent = function(event){
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
            }
        }

        dom.observe(editAreaElementARealNode,"keydown",editAreasEvent);
        dom.observe(eidtAreaElementBRealNode,"keydown",editAreasEvent);

        // ----- set the editArea location -----
        dom.delegate(element,".content","mouseover",function(event){
            var itemEle = dom.getParentElement(event.target,{nodeName:"DIV",className:"item"}),
                contentText = event.target.textContent,
                itemid = dom.getAttribute("data-id").from(itemEle);
            dom.offset(that.getUseHoverEditAreaElement()).set(dom.offset(event.target).get());
            that.getUseHoverEditArea().setContent(contentText);
            dom.setAttributes({"data-id":itemid,"data-type":"content"}).on(that.getUseHoverEditAreaElement());
        });

    }

})(workpad);