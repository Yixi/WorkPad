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
    var D = workpad.data,
        debug = workpad.util.debug;

    workpad.views.Wp = workpad.views.View.extend({
        name:"workpad",

        constructor:function(parent,element,config){
            this.base(parent,element,config);

            this._observe();
        },


        initContentByData: function(jsonData){
            var datas = D.pretty(jsonData).get();
            var Dom = this.buildDomByDatas(datas);
            this._setContent(Dom);
        },

        getElementByitemId:function(itemid){
            return this.element.querySelector(".item[data-id='"+itemid+"']");
        },

        getContentById: function(itemid){
            var ele = this.getElementByitemId(itemid);
            debug(ele).debug();
        },

        /**
         * private funciton to set the workpad content
         * @param content {HTMLstring}
         * @private
         */
        _setContent:function(DOMcontent){
            this.element.innerHTML = DOMcontent;
        },

        _observe:function(){
            var element = this.element,
                parent = this.parent

        }
    });

})(workpad);

