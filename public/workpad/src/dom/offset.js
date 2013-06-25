/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Get/set the element offset  from jquery.
 *
 */

;(function(workpad){

    workpad.dom.offset = function(element){

        function isWindow(obj){
            return obj != null && obj === obj.window;
        }

        function getWindow( elem ) {
            return isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        return {

            /**
             * get the element offset of document.
             *
             * @example
             *      workpad.dom.offset(document.getElementById("content")).get()
             *
             * @returns {{top: number, left: number}}
             */
            get:function(){
                var doc = element && element.ownerDocument,
                    box = { top: 0, left: 0},
                    docElem, win;

                if (! doc){
                    return;
                }

                docElem = doc.documentElement;

                if(typeof element.getBoundingClientRect !== (typeof undefined)){
                    box = element.getBoundingClientRect();
                }
                win = getWindow(doc);

                return {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft,
                    width: box.width,
                    height: box.height
                };
            },

            set:function(){


            }
        }
    }

})(workpad);