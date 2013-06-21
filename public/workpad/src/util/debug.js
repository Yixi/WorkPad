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
    var config = {
        logLevel:"debug",
        logLevels:["debug","info","warn","error"]
    };

    workpad.util.debug = function(){

        var args = Array.prototype.slice.call(arguments);

        function log(params, level){
            if(config.logLevel === 'never'){
                return;
            }
            var i = config.logLevels.indexOf(level),
                j = config.logLevels.indexOf(config.logLevel);
            if (i>-1 && j>-1 && i>=j){
                if(console[level]){
                    console[level].apply(console,params);
                }else{
                    console.log.apply(console,params);
                }
            }
        }

        return {
            debug: function(){
                args.unshift('[WorkPad debug]: ');
                log(args,'debug');
            },
            info: function(){
                args.unshift('[WorkPad info]: ');
                log(args,'info');
            },
            error: function(){
                args.unshift('[WorkPad error!!!]: ');
                log(args,'error');
            },
            warn: function(){
                args.unshift('[Workpad warn!]: ');
                log(args,'warn');
            }
        }
    };
})(workpad);