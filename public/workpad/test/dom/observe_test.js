module("workpad.dom.observe",{
    setup:function(){
        this.container = document.createElement("div");
        this.element = document.createElement("div");
        this.container.appendChild(this.element);
        document.body.appendChild(this.container);
    },

    teardown:function(){
        this.container.parentNode.removeChild(this.container);

        var iframe;
        while(iframe = document.querySelector("iframe.workpad-sanbox")){
            iframe.parentNode.removeChild(iframe)
        }
    }
});

test("Basic test",function(){
    expect(4);

    var element = this.element;
    workpad.dom.observe(element,["mouseover","mouseout"],function(event){
        ok(true,"'" + event.type + "' correctly fired");
    });

    workpad.dom.observe(element,"click",function(event){
        equal(event.target,element,"event.target or event.srcElement are set");
        ok(true,"'click' correctly fired");
    });

    QUnit.triggerEvent(element, "mouseover");
    QUnit.triggerEvent(element, "mouseout");
    QUnit.triggerEvent(element, "click");
});

test("StopPropagation test",function(){
    expect(2);
    var element = this.element;
    workpad.dom.observe(this.container,"click",function(event){
       ok(false,"the event shouldn't have been bubbled!");
    });

    workpad.dom.observe(this.element,"click",function(event){
        event.stopPropagation();
        equal(this,element,"Event handle bond to to correct scope");
        ok(true,"stopPropagation correctly fired");
    });

    QUnit.triggerEvent(this.element,"click");
});

test("Test detaching events",function(){
    expect(0);
    var eventListener = workpad.dom.observe(this.element,"click",function(){
        ok(false,"this should not be triggerd");
    });

    eventListener.stop();
    QUnit.triggerEvent(this.element,"click");
})
