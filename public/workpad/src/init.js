/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Workpad init .
 *
 */

/**
 * workpad init constructor.
 *
 * @param {Element} a div element which should be turned into a outliner edit area.
 * @param {Object} [config] See defaultConfig object below for explanation of each individual config option
 *
 * @events
 *  ...
 */


(function(workpad){
    var undef;

    var defaultConfig = {
        //the init Content, this is a workpad josn data.
        initContent:    undef
    };

    workpad.Init = workpad.util.Events.extend({
        constructor:function(element,config){
            this.element = typeof(element) === "string" ? document.getElementById(element) : element;
            this.config = workpad.util.object({}).merge(defaultConfig).merge(config).get();
            this.wp = new workpad.views.Wp(this, this.element, this.config);
            this.currentView = this.wp;
            this._isCompatible = workpad.browser.supported();


            //init composer;

            this.composer = new workpad.views.Composer(this,this.wp, this.config);
            this.currentView = this.composer;

            this.wp.initContentByJson(this.config.initContent);
        }
    })

})(workpad);