module("workpad.dom.setAttributes",{
    setup:function() {
        this.element = document.createElement("div");
    }
});

test("Basic test",function(){
    workpad.dom.setAttributes({
       id: "foo",
       "class": "bar"
    }).on(this.element);

    equal(this.element.id,"foo");
    equal(this.element.className,"bar");
});

module("workpad.dom.getAttributes",{
    setup:function() {
        this.element = document.createElement("div");
    }
});

test("Basic test",function(){
    this.element.setAttribute("data-id","000-000-000");
    this.element.setAttribute("class","diigo");

    equal(workpad.dom.getAttribute("data-id").from(this.element),"000-000-000");
    equal(workpad.dom.getAttribute("class").from(this.element),"diigo");
});