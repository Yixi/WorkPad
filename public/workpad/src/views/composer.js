/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * workpad.views.Composer.prototype.
 *
 */

(function(workpad){
    var dom = workpad.dom,
        browser = workpad.browser,
        F = workpad.util.fn;

    workpad.views.Composer = workpad.views.View.extend({
        name:"composer",

        constructor:function(parent, element, config){
            this.base(parent, element, config);
            this.wp = this.parent.wp;
            this._initEditArea();
        },

        _initEditArea:function(){
            var that = this;

            this.editArea = new dom.editArea(function(){
               that._create();
            });

            this.editAreaElement = this.editArea.getEditArea();
            var wpElement = this.wp.element;
            dom.insert(this.editAreaElement).after(wpElement);


        },


        _create:function(){
            this.doc = document;
            this.element = this.wp;
            this.wp = this.parent.wp;

            //make sure commands dispatcher is ready
            this.commands = new workpad.Commands(this.parent);

            this.observe();
        }

    });

})(workpad);