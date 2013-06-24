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
            eidtAreaElement = this.editArea.getEditArea();
            pasteEvents = ["drop","paste"];


        util.debug(element,eidtAreaElement).debug();

        //Main Event handler.

        dom.observe(eidtAreaElement,"keydown",function(event){

        });

        // ----- set the editArea location -----
        dom.delegate(element,".content","mouseover",function(event){
            util.debug(event.target).debug();

        });

    }

})(workpad);