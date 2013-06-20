module("workpad.data.pretty");

test("get()",function(){
    var a = {content:"diigo"},
        b = [{a:2},{a:3}],
        c = [{diigo:function(){}},{a:2},{b:function(){}}],
        d = '{"a":2}';
    var x = {};
    x.x = x;
    var e = [x];

    deepEqual(workpad.data.pretty(a).get(),workpad.data.predata.EMPTY_DATA);
    deepEqual(workpad.data.pretty(b).get(),[{a:2},{a:3}]);
    deepEqual(workpad.data.pretty(c).get(),[{a:2}]);
    deepEqual(workpad.data.pretty(d).get(),workpad.data.predata.EMPTY_DATA);
    deepEqual(workpad.data.pretty(e).get(),workpad.data.predata.EMPTY_DATA);
});