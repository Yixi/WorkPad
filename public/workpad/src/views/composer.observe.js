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
        browser = workpad.browser;

    workpad.views.Composer.prototype.observe = function(){
        var that = this,
            element = this.parent.element,
            editAreaElementA = this.editAreaA.getEditArea(),
            editAreaElementB = this.editAreaB.getEditArea(),
            pasteEvents = ["drop","paste"];


        util.debug(element,editAreaElementA,editAreaElementB).debug();

        //Main Event handler.

        dom.observe(editAreaElementA,"keydown",function(event){

        });
        dom.observe(editAreaElementB,"keydown",function(event){

        });

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