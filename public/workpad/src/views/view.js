/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * init View area
 *
 */

workpad.views.View = Base.extend({
    constructor:function(parent, Element, config){
        this.parent = parent;
        this.element = Element;
        this.config = config;
    },

    focus:function(){
        if(this.element.ownerDocument.querySelector(":focus") === this.element){
            return;
        }

        try { this.element.focus(); } catch(e) {}
    },

    hide:function(){
        this.element.style.display = "none";
    },

    show:function(){
        this.element.style.display = "";
    },

    disable:function(){
        this.element.setAttribute("disabled","disabled");
    },

    enable: function(){
        this.element.removeAttribute("disabled");
    }
});