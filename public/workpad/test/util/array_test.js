module("workpad.util.array");

test("contains()",function(){
    var arr = [1,"2","workpad"];
    ok(workpad.util.array(arr).contains(1));
    ok(!workpad.util.array(arr).contains(2));
    ok(workpad.util.array(arr).contains("2"));
    ok(workpad.util.array(arr).contains("workpad"));
});

test("without()",function(){
    var arr = [1,2,3,4,5];
    deepEqual(workpad.util.array(arr).without([1]),[2,3,4,5]);
    deepEqual(workpad.util.array(arr).without([1,3,5]),[2,4]);
});

test("get()",function(){
    var nodeList = document.getElementsByTagName("*"),
        arr = workpad.util.array(nodeList).get();
    equal(arr.length,nodeList.length);
    ok(arr instanceof Array);
});

test("unique()",function(){
    deepEqual(workpad.util.array([1,1,1,2,4,5,2,1]),[1,2,4,5]);
    deepEqual(workpad.util.array(["a","b","c","a","e"]),["a","b","c","e"]);
});