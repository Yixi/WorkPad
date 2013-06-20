/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * This is workpad edit area constructor.
 *
 */

workpad.views.Wp = workpad.views.View.extend({
    name:"workpad",

    constructor:function(parent,element,config){
        this.base(parent,element,config);

        this._observe();
    },



    _observe:function(){
        var element = this.element,
            parent = this.parent

    }




});