/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * this will return a right workpad json data, when jsonData isn't a right data will return the pre oder EMPTY_DATA.
 *
 */

(function(workpad){
    var util = workpad.util;

    workpad.data.pretty = function(jsonData){
        return {
            /**
             * get a right data
             * @returns {[]}
             */
            get:function(){
                if(util.object(jsonData).isArray()){
                    var newArr = [],
                        len = jsonData.length,
                        i = 0;
                    for(; i<len; i++){
                        if(workpad.data.check(jsonData[i]).isObject()){
                            try{
                                //make the json data is safe
                                var safeData_ = JSON.stringify(jsonData[i]);
                                if(safeData_!=="{}"){
                                    newArr.push(JSON.parse(safeData_));
                                }
                            }catch(e){}
                        }
                    }
                    if(newArr.length<1){
                        newArr = workpad.data.predata.GET_EMPTY_DATA();
                    }
                    return newArr;

                }else{
                    return workpad.data.predata.GET_EMPTY_DATA();
                }
            }
        }
    }
})(workpad);
