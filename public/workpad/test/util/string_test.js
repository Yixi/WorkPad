module("workpad.util.string");

test("trim()",function(){
    equal(workpad.util.string("  diigo   ").trim(),"diigo");
});

test("replace()",function(){
    equal(workpad.util.string("Hello diigo").replace("diigo").by("yixi"),"Hello yixi");
});

test("interpolate()",function(){
    equal(workpad.util.string("Hello #{name}").interpolate({name: "yixi"}),"Hello yixi");
});