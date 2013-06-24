/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * workpad.views.Wp.prototype
 *
 */

;(function(workpad){
    var dom = workpad.dom,
        util = workpad.util;


    /**
     * Default Template
     * @param data
     */

    //one bullet points
    var BULLET_POINT =
        '<div class="item" data-id="#{id}">' +
            '<div class="maindata">' +
                '<div class="content">#{content}</div>' +
                '<div class="description">#{description}</div>' +
            '</div>' +
            '<div class="children">#{children}</div>' +
        '</div>';

    workpad.views.Wp.prototype.buildDomByDatas = function(datas){
        var that = this;
        return function build(datas){
            var
                html = "",
                childrens = "",
                i = 0,
                len = datas.length;
            for(; i<len; i++){
                var data = datas[i];
                if(data.children.length > 0 && data.collapse){
                    childrens = build(data.children);
                }
                html += that.buildHTMLBySingleData({
                    id:data.id,
                    content:data.content,
                    description:data.description,
                    children:childrens
                });
                childrens = "";   //need reset the variable when replace complete.
            }
            return html;
        }(datas);
    };


    workpad.views.Wp.prototype.buildHTMLBySingleData = function(json){
        return util.string(BULLET_POINT).interpolate(json);
    };

})(workpad);