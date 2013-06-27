/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 *  private commands for the workapd content handler.
 *
 */


;(function(workpad){
    var util = workpad.util;

    workpad.views.Composer.commandCenter = {};
    window.rangy.init();
    workpad.views.Composer.prototype.commandExec = function(command,value){
        var obj = workpad.views.Composer.commandCenter[command],
            args = workpad.util.array(arguments).get(),
            method = obj && obj.exec,
            result = null;

        if(method){
            //parent is editor
            args.unshift(this.parent);
            result = method.apply(obj,args);
            return result;
        }
        return false;
    }
})(workpad);