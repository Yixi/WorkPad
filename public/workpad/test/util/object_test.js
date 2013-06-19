module("workpad.util.object");

test("merge()",function(){
    var obj = {foo:1,bar:1},
        returnValue = workpad.util.object(obj).merge({bar:2,baz:3}).get();
    equal(returnValue,obj);
    deepEqual(obj,{foo:1,bar:2,baz:3});
});

test("clone()",function(){
    var obj = {foo:true},
        returnValue = workpad.util.object(obj).clone();
    ok(obj!=returnValue);
    deepEqual(obj,returnValue);
});

test("isArray()", function() {
    ok(workpad.util.object([]).isArray());
    ok(!workpad.util.object({}).isArray());
    ok(!workpad.util.object(document.body.childNodes).isArray());
    ok(!workpad.util.object("1,2,3").isArray());
});