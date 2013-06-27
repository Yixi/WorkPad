/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this is some default data
 *
 */

workpad.data.predata = (function(){

    var EMPTY_DATA = [{
            content:"Begin to edit your workpad",
            description:"",
            id:"00000000-0000-0000-0000-000000000000",
            expand:true,
            children:[]
        }],
        DEFAULT_JSON = {
            content:"",
            description:"",
            id:"",
            expand:true,
            children:[]
        };
    /* must clone the data to return for use */
    function cloneData(data){
        return JSON.parse(JSON.stringify(data));
    }

    return {
        GET_EMPTY_DATA:function(){
            return cloneData(EMPTY_DATA);
        },
        GET_DEFAULT_JSON: function(){
            return cloneData(DEFAULT_JSON);
        }
    };

})();
