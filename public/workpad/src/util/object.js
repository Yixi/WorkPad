(function(){
    workpad.util.object = function(obj){
        return {
            /**
             * merge object
             * @example
             *      workpad.util.object({foo:1,bar:1}).merge({bar:2,baz:3}).get();  //=> {foo:1,bar:2,baz:3}
             * @param otherObj
             * @returns {object}
             */
            merge:function(otherObj){
                for (var i in otherObj){
                    obj[i] = otherObj[i];
                }
                return this;
            },
            get:function(){
                return obj;
            },

            /**
             * clone object
             * @example
             *      workpad.util.object({foo:1}).clone(); //=> {foo:1}
             * @returns {object}
             */
            clone:function(){
                var newObj = {},
                    i;
                for (i in obj){
                    newObj[i] = obj[i];
                }
                return newObj;
            },

            /**
             * @example
             *      workpad.util.object([]).isArray();  //=> true
             * @returns {boolean}
             */
            isArray:function(){
                return Object.prototype.toString.call(obj) === "[object Array]";
            }
        }
    };
})();