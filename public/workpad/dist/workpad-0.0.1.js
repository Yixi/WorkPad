/**
 * @license workpad v0.0.1
 * https://github.com/Yixi/WorkPad
 *
 * Author: liuyixi
 *
 * Copyright (c) 2013 Yixi
 *
 */

var workpad = {
    version: "0.0.1",

    // namespaces
    util:       {},
    dom:        {},
    commands:   {},
    ui:         {},
    views:      {},
    log:        {},

    EMPTY_FUNCTION:function(){},

    ELEMENT_NODE:1,
    TEXT_NODE:3,

    KEYS:{
        BACKSPACE_KEY:  8,
        INDENT_KEY:     9,
        ENTER_KEY:      13,
        ESCAPE_KEY:     27,
        SPACE_KEY:      32,
        END_KEY:        35,
        HOME_KEY:       36,
        LEFT_KEY:       37,
        UP_KEY:         38,
        RIGHT_KEY:      39,
        DOWN_KEY:       40,
        DELETE_KEY:     46,

        A_KEY:          65,
        C_KEY:          67,
        X_KEY:          88,
        V_KEY:          86,
        Z_KEY:          90
    }
};/**
 * @license workpad v0.0.1
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
