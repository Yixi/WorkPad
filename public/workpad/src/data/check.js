/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * This function use for check the workpad json data is right.
 *
 */

workpad.data.check = function(jsonData){
    return {
        isObject:function(){
            return typeof(jsonData) === "object" && Object.prototype.toString.call(jsonData).toLowerCase() === "[object object]" && !jsonData.length;
        }
    }
};
