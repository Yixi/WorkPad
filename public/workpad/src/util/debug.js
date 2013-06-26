/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * main console module.
 *
 * @example
 *      workpad.util.debug("workpad","d").error();
 *      workpad.util.debug("workpad","d").info();
 *      workpad.util.debug("workpad","d").debug();
 */

;(function(workpad){
    var DEBUGLEVEL = "debug";
    var config = {
        logLevel:DEBUGLEVEL,
        logLevels:["debug","info","warn","error"]
    };

    workpad.util.debug = function(){

        var args = Array.prototype.slice.call(arguments);

        var log = function(par,title,level){
            if(config.logLevel === 'never'){
                return workpad.EMPTY_FUNCTION;
            }
            var i = config.logLevels.indexOf(level),
                j = config.logLevels.indexOf(config.logLevel);
            // need to clone a new array.
            var params = workpad.util.array(par).clone();
            params.unshift(console,title);

            if (i>-1 && j>-1 && i>=j){
                if(console[level]){
                    return Function.prototype.bind.apply(console[level],params);
                }else{
                    return Function.prototype.bind.apply(console.log,params);
                }
            }
            return workpad.EMPTY_FUNCTION;
        }

        return {
            error:log(args,'[WorkPad Error!!!]: ','error'),
            debug:log(args,'[WorkPad Debug]: ','debug'),
            info:log(args,'[WorkPad Info]: ','info'),
            warn:log(args,'[Workpad Warn!]: ','warn')
        }
    };
})(workpad);