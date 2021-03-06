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

        /*get editArea for set hover */

        getUseHoverEditAreaElement:function(){
            return this.getUseHoverEditArea().getEditArea();
        },

        getUseHoverEditArea:function(){
            if(this.editAreaA.lastEdit){
                return this.editAreaB;
            }else{
                return this.editAreaA;
            }
        },

        getCurrentUseEditAreaElement:function(){
            return this.getCurrentUseEditArea().getEditArea();
        },

        getCurrentUseEditArea:function(){
            if(this.editAreaA.lastEdit){
                return this.editAreaA;
            }else{
                return this.editAreaB;
            }
        },

        /*set the editArea */

        setEditAreaWithItemIdForContent:function(editarea,itemid){
            var itemElement = this.wp.getContentElementById(itemid);
            dom.offset(editarea.getEditArea()).set(dom.offset(itemElement).get());
            editarea.getEditArea().style.display = "";
            editarea.setContent(itemElement.textContent);
            dom.setAttributes({"data-id":itemid,"data-type":"content"}).on(editarea.getEditArea());
        },

        resizeEditAreaHeightWithContent:function(editareaElement){
            var currentId = dom.getAttribute("data-id").from(editareaElement);
            if(currentId){
                var editAreaHeight = dom.offset(editareaElement).get().height;
                var contentHeight = dom.offset(this.wp.getContentElementById(currentId)).get().height;
                if(editAreaHeight!==contentHeight){
                    dom.offset(editareaElement).set({height:contentHeight});
                }
            }
        },

        hideEditArea:function(editarea){
            dom.offset(editarea.getEditArea()).set({top:0,left:0});
            editarea.getEditArea().style.display = "none";
        },

        /* private function */

        _initEditArea:function(){
            var that = this;
            this.editAreaA = new dom.editArea(function(){
               that.editAreaB = new dom.editArea(function(){
                   that._insertEditAreas();
               });
            });
        },

        _insertEditAreas:function(){
            this.editAreaElementA = this.editAreaA.getEditArea();
            this.editAreaElementB = this.editAreaB.getEditArea();
            var wpElement = this.wp.element;
            dom.insert(this.editAreaElementA).after(wpElement);
            dom.insert(this.editAreaElementB).after(wpElement);

            // default first use the editAreaA for hover.
            this.editAreaA.lastEdit = false;
            this.editAreaB.lastEdit = true;

            this._create();
        },

        _create:function(){
            this.doc = document;
            this.element = this.wp;
            this.wp = this.parent.wp;

            //make sure commands dispatcher is ready
            this.commands = new workpad.Commands(this.parent);
            this.parent.commands = this.commands;

            this.observe();
            this.dispatcher();
        }

    });

})(workpad);