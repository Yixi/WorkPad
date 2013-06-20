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
        browser = workpad.browser;

    workpad.views.Composer.prototype.observe = function(){
        var that = this,
            element = this.element,
            eidtAreaElement = this.editArea.getEditArea();
            pasteEvents = ["drop","paste"];



        //Main Event handler.

        dom.observe(eidtAreaElement,"keydown",function(event){

        });

    }

})(workpad);