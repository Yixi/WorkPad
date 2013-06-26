(function(){
    var mapping = {
        "className":"class"
    };
    workpad.dom.setAttributes = function(attributes){
        return {
            on: function(element){
                for (var i in attributes){
                    element.setAttribute(mapping[i] || i, attributes[i]);
                }
            }
        };
    };

    workpad.dom.getAttribute = function(attribute){
        return {
            from: function(element){
                return element.getAttribute(attribute);
            }
        };
    };
})();