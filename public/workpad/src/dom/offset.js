/**
 * @license workpad v@VERSION
 * https://github.com/Yixi/WorkPad
 * Author: liuyixi
 * Copyright (c) 2013 Yixi
 *
 * Get/set the element offset  .
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

        function nodeName( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }

        var dom = workpad.dom,
            util = workpad.util;
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

            /**
             * set the element offset by the document offset;
             * @example
             *      workpad.dom.offset(this.editArea).set({top:5,left:10})
             * @param options
             */
            set:function(options){
                var curPositon, curLeft, curCSSTop, curTop, curOffset, curCssLeft, calculatePosition,
                    position = dom.style("position").getfrom(element),
                    props = {};

                if(position === "static"){
                    element.style.position = "relative";
                }

                curOffset = dom.offset(element).get();
                curCSSTop = dom.style("top").getfrom(element);
                curCssLeft = dom.style("left").getfrom(element);
                calculatePosition  = (position === "absolute" || position === "fixed" ) && (curCSSTop + curCssLeft).indexOf("auto") > -1;

                if(calculatePosition){
                    curPositon = dom.offset(element).position();
                    curTop = curPositon.top;
                    curLeft = curPositon.left;
                }else{
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCssLeft) || 0;
                }


                if(options.top != null){
                    props.top = (options.top - curOffset.top) + curTop +'px';
                }
                if(options.left != null){
                    props.left = (options.left - curOffset.left )+ curLeft + 'px';
                }
                if(options.width != null){
                    props.width = options.width + 'px';
                }
                if(options.height !=null){
                    props.height = options.height + 'px';
                }

                dom.style(props).setto(element);
            },

            /**
             * return the real offsetParent
             * @example
             *      workpad.dom.offset(element).offsetParent();
             *
             * @returns {Function|HTMLElement|Function|Element|Element}
             */
            offsetParent:function(){
                var ele = element,
                    offsetParent = ele.offsetParent || document.documentElement;
                while (offsetParent && (!nodeName(offsetParent,"html")) && dom.style("position").getfrom(offsetParent) === "static"){
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || document.documentElement;
            },

            /**
             * calculate position
             *
             * @returns {{top: number, left: number}}
             */
            position:function(){
                if(!element){
                    return ;
                }

                var offsetParent, offset,
                    elem = element,
                    parentOffset = { top:0 ,left:0};

                //Fix element are offset from window

                if(dom.style("position").getfrom(elem) === "fixed"){
                    offset = elem.getBoundingClientRect();
                }else{
                    offsetParent = dom.offset(elem).offsetParent();
                    offset = dom.offset(elem).get();
                    if(!nodeName(offsetParent,"html")){
                        parentOffset = dom.offset(offsetParent).get();
                    }

                    parentOffset.top += dom.style("borderTopWidth").getNumberFrom(offsetParent);
                    parentOffset.left += dom.style("borderLeftWidth").getNumberFrom(offsetParent);
                }

                return {
                    top: offset.top - parentOffset.top - dom.style('marginTop').getNumberFrom(offsetParent),
                    left: offset.left - parentOffset.left - dom.style('marginLeft').getNumberFrom(offsetParent)
                };
            }
        }
    }

})(workpad);