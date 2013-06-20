module("workpad.data.check");

test("isObject()",function(){
    var a ={"a":2,"c":3},
        b = "workpad",
        c = ["1","2","3"],
        d = {a:function(){var _d = 1},b:2};

    ok(workpad.data.check(a).isObject());
    ok(!workpad.data.check(b).isObject());
    ok(!workpad.data.check(c).isObject());
    ok(workpad.data.check(d).isObject());
});