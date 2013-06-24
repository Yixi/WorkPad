module("workpad.dom.getParentElement",{
    setup:function(){
        this.container = document.createElement("div");
    }
});


test("Basic test , nodeName only",function(){
    this.container.innerHTML = "<ul><li>foo</li></ul>";

    var listItem = this.container.querySelector("li"),
        textNode = listItem.firstChild,
        list     = this.container.querySelector("ul");
    equal(workpad.dom.getParentElement(listItem, { nodeName: "LI" }), listItem);
    equal(workpad.dom.getParentElement(listItem, { nodeName: ["LI", "UL"] }), listItem);
    equal(workpad.dom.getParentElement(listItem, { nodeName: "UL" }), list);
    equal(workpad.dom.getParentElement(textNode, { nodeName: "UL" }), list);
    equal(workpad.dom.getParentElement(listItem, { nodeName: "ul" }), null);
    equal(workpad.dom.getParentElement(listItem, { nodeName: "SPAN" }), null);
});

test("Check 'levels' param - nodeName only", function() {
    this.container.innerHTML = "<div><div><ul><li></li></ul></div></div>";

    var listItem  = this.container.querySelector("li"),
        nestedDiv = this.container.querySelector("div").querySelector("div");
    equal(workpad.dom.getParentElement(listItem, { nodeName: "DIV" }, 2), null);
    equal(workpad.dom.getParentElement(listItem, { nodeName: "DIV" }, 3), nestedDiv);

});


test("Basic test - nodeName + className", function() {
    this.container.innerHTML = '<span class="workpad-color-red workpad-color-green">foo</span>';

    var spanElement = this.container.firstChild,
        textNode    = this.container.firstChild.firstChild,
        result;

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   "SPAN",
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, spanElement);

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   ["STRONG", "SPAN"],
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, spanElement);

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   ["STRONG"],
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, null);

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   "DIV",
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, null);

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   "SPAN",
        className:  "workpad-color-blue",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, null);

    result = workpad.dom.getParentElement(textNode, {
        nodeName:   "SPAN",
        className:  "workpad-color-red",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, null);

    result = workpad.dom.getParentElement(spanElement, {
        nodeName:   "SPAN",
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, spanElement);

    result = workpad.dom.getParentElement(spanElement, {
        nodeName:   "span",
        className:  "workpad-color-green",
        classRegExp: /workpad-color-[a-z]+/g
    });
    equal(result, null);
});


test("Check 'levels' param - nodeName + className", function() {
    this.container.innerHTML = '<div class="workpad-color-green"><div class="workpad-color-green"><ul><li></li></ul></blockquote></div></div>';

    var listItem  = this.container.querySelector("li"),
        nestedDiv = this.container.querySelector("div").querySelector("div"),
        result;

    result = workpad.dom.getParentElement(listItem, {
        nodeName:     "DIV",
        className:    "workpad-color-green",
        classRegExp:  /workpad-color-[a-z]+/g
    }, 2);
    equal(result, null);

    result = workpad.dom.getParentElement(listItem, {
        nodeName:     "DIV",
        className:    "workpad-color-green",
        classRegExp:  /workpad-color-[a-z]+/g
    }, 3);
    equal(result, nestedDiv);
});


test("Check  - no nodeName", function() {
    this.container.innerHTML = '<div><div class="workpad-text-align-right"><span>foo</span></div></div>';

    var spanElement = this.container.querySelector("span"),
        alignedDiv  = this.container.querySelector("div").querySelector("div"),
        result;

    result = workpad.dom.getParentElement(spanElement, {
        className:    "workpad-text-align-right",
        classRegExp:  /workpad-text-align-[a-z]+/g
    });
    equal(result, alignedDiv);
});

test("Test - with no nodeName", function() {
    this.container.innerHTML = '<div><div class="workpad-text-align-right"><span>foo</span></div></div>';

    var spanElement = this.container.querySelector("span"),
        alignedDiv  = this.container.querySelector("div").querySelector("div"),
        result;

    result = workpad.dom.getParentElement(spanElement, {
        className:    "workpad-text-align-right",
        classRegExp:  /workpad-text-align-[a-z]+/g
    });
    equal(result, alignedDiv);
});

test("Test - with only a classRegExp", function() {
    this.container.innerHTML = '<div><div class="workpad-text-align-right"><span>foo</span></div></div>';

    var spanElement = this.container.querySelector("span"),
        alignedDiv  = this.container.querySelector("div").querySelector("div"),
        result;

    result = workpad.dom.getParentElement(spanElement, {
        classRegExp:  /workpad-text-align-[a-z]+/g
    });
    equal(result, alignedDiv);
});
