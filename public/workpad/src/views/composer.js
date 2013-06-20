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
        browser = workpad.browser;

    workpad.views.Composer = workpad.views.View.extend({
        name:"composer",

        constructor:function(parent, element, config){
            this.base(parent, element, config);
        }
    });

})(workpad);