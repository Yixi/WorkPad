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
        dom = workpad.dom,
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

        /* for single bullet point functions*/

        getElementByitemId:function(itemid){
            return this.element.querySelector(".item[data-id='"+itemid+"']");
        },


        /** find bullet points */

        getPrevElementItemByItemId:function(itemid){
            return this.getElementByitemId(itemid).previousElementSibling;
        },

        getParentElementByitemId:function(itemid){
            return dom.getParentElement(this.getElementByitemId(itemid),{nodeName:"DIV", className:"item"},true);
        },

        /**
         * get the content by item id
         * @param itemid
         * @returns {*|string}
         */
        getContentById: function(itemid){
            var ele = this.getElementByitemId(itemid);
            return ele.querySelector(".content").innerHTML;
        },

        /**
         * set the content by item id
         * @param itemid
         * @param content {String} , this can be text or HTML string.
         */
        setContentById: function(itemid,content){
            var ele = this.getElementByitemId(itemid);
            ele.querySelector(".content").innerHTML = content;
        },

        haveChildrenWithId:function(itemid){
            var ele = this.getElementByitemId(itemid),
                childNode = ele.querySelector(".children");
            if(workpad.util.string(childNode.innerHTML).trim().length <1 ){
                return false;
            }
            return true;
        },


        /* this function will return the element of bulletPoint */

        getContentElementById:function(itemid){
            return this.getElementByitemId(itemid).querySelector("div.content");
        },



        /*  create bullet point */
        /**
         * create a new bullet point id
         *      xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  {8}-{4}-{4}-{4}-{12}
         * @returns {string}
         */
        initNewBulletPointId:function(){
            var randMd5 = hex_md5(Date.parse(new Date()).toString() + Math.random().toString()),
                newItemId = "",
                splitBy = [8,12,16,20];

            for(var i = 0,len = randMd5.length,c; c = randMd5.charAt(i), i < len; i++){
                newItemId += c;
                if(splitBy.indexOf(i+1) > -1){
                    newItemId += "-";
                }
            }
            return newItemId;
        },

        initNewBulletPointData:function(){
            var temp = workpad.data.predata.GET_DEFAULT_JSON();
            temp.id = this.initNewBulletPointId();
            return temp;
        },

        /**
         * return the bullet point is expand
         * @param itemid
         * @returns {boolean}
         */
        isExpandWithID:function(itemid){
            //TODO:finish this function

            return true; // for test default is all expand.
        },

        /**-------------------
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

