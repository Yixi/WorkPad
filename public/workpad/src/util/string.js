/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * simple string functions
 *
 */

(function(){
    var WHITE_SPACE_START = /^\s+/,
        WHITE_SPACE_END = /\s+$/;

    workpad.util.string = function(str){
        str = String(str);
        return {
            /**
             * @example
             *      workpad.util.string("   diigo   ").trim();  ==> "diigo"
             */
            trim:function(){
                return str.replace(WHITE_SPACE_START,"").replace(WHITE_SPACE_END,"");
            },

            /**
             * @example
             *      workpad.util.string("Hello #{name}").interpolate({name:"diigo"});  ==> "Hello diigo"
             * @param vars {JSON}
             */
            interpolate: function(vars){
                for(var i in vars){
                    str = this.replace("#{" + i + "}").by(vars[i]);
                }
                return str;
            },

            /**
             * @expample
             *      workpad.util.string("Hello yixi").replace("yixi").by("Diigo"); ==> "Hello Diigo"
             * @param search
             * @returns {{by: Function}}
             */

            replace:function(search){
                return {
                    by:function(replace){
                        return str.split(search).join(replace);
                    }
                };
            }
        };
    };

})();