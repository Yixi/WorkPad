module("workpad.dom.getAsDom", {
    teardown: function() {
        var iframe;
        while (iframe = document.querySelector("iframe.workpad-sandbox")) {
            iframe.parentNode.removeChild(iframe);
        }
    }
});

test("Basic test", function() {
    var result;

    result = workpad.dom.getAsDom('<span id="get-in-dom-element-test">foo</span>');
    equal(result.nodeName, "SPAN");
    equal(result.ownerDocument, document);
    equal(result.innerHTML, "foo");
    ok(!document.getElementById("get-in-dom-element-test"));

    result = workpad.dom.getAsDom("<i>1</i> <b>2</b>");
    equal(result.length, 3);

    result = workpad.dom.getAsDom(document.createElement("div"));
    equal(result.nodeName, "DIV");
});


test("HTML5 elements", function() {
    var result;

    result = workpad.dom.getAsDom("<article><span>foo</span></article>");
    equal(result.nodeName.toLowerCase(), "article");
    equal(result.innerHTML.toLowerCase(), "<span>foo</span>");

    result = workpad.dom.getAsDom("<output>foo</output>");
    equal(result.innerHTML.toLowerCase(), "foo");
});