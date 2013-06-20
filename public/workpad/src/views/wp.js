/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * This is workpad edit area constructor.
 *
 */
(function(workpad){
    var D = workpad.data;
    workpad.views.Wp = workpad.views.View.extend({
        name:"workpad",

        constructor:function(parent,element,config){
            this.base(parent,element,config);

            this._observe();
        },


        initContentByData: function(jsonData){
            var data = D.pretty(jsonData).get();
        },
        /**
         * private funciton to set the workpad content
         * @param content {HTMLstring}
         * @private
         */
        _setContent:function(content){

        },

        _observe:function(){
            var element = this.element,
                parent = this.parent

        }
    });

})(workpad);

