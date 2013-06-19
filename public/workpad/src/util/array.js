(function(){
    workpad.util.array = function(arr){
        return {

            /**
             * Check whether a given object exists in an array
             * @example
             *      workpad.util.array([1,2]).contains(1);  //==> true
             * @param needle
             * @returns {boolean}
             */
            contains:function(needle){
                if(arr.indexOf){
                    return arr.indexOf(needle) !==-1;
                }else{
                    for(var i= 0,len = arr.length;i<len;i++){
                        if(arr[i]===needle){return true;}
                    }
                    return false;
                }
            },

            /**
             * Substract one array from another
             * @example
             *      workpad.util.array([1,2,3,4]).without([3,4]);  //==> [1,2]
             *
             * @param arrayToSubstract
             * @returns {Array}
             */
            without:function(arrayToSubstract){
                arrayToSubstract = workpad.util.array(arrayToSubstract);
                var newArr = [],
                    i = 0,
                    len = arr.length;
                for (; i<len; i++){
                    if(!arrayToSubstract.contains(arr[i])){
                        newArr.push(arr[i]);
                    }
                }
                return newArr;
            },

            get:function(){

            },

            unique:function(){

            }
        };
    }
})();