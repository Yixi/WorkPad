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

            /**
             * Return a clean native array , convert a live nodelist to a proper array.
             * @example
             *      var childNodes = workpad.util.array(document.body.childNodes).get();
             *
             * @returns {Array}
             */
            get:function(){
                var i = 0,
                    len = arr.length,
                    newArray = [];
                for(; i<len; i++){
                    newArray.push(arr[i]);
                }
                return newArray;
            },

            /**
             * unique a array
             * @example
             *      workpad.util.array([1,1,3,4,3]).unique; //=> [1,3,4]
             *
             * @returns {Array}
             */
            unique:function(){
                var newArray = [],
                    i = 0,
                    len = arr.length;
                for(; i<len; i++){
                    if(!workpad.util.array(newArray).contains(arr[i])){
                        newArray.push(arr[i]);
                    }
                }
                return newArray;
            }
        };
    }
})();