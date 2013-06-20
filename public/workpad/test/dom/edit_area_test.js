module("workpad.dom.editArea",{
    teardown: function(){
        var editArea;
        while (editArea = document.querySelector(".workpad-editArea")){
            editArea.parentNode.removeChild(editArea);
        }
    }
});


asyncTest("Basic Test",function(){
    expect(3);

    var editArea = new workpad.dom.editArea(function(edit){

        equal(edit,editArea,"The parameter passed into the readyCallback is the editArea instance");

        var Areas = document.querySelectorAll(".workpad-editArea");
        equal(Areas.length, 1, "EditArea insert into dom tree");

        var edit_area = Areas[Areas.length-1];

        equal(editArea.getEditArea(), edit_area, "workpad.dom.editArea.prototype.getEditArea() retruns correctly");

        start();
    });

    editArea.insertInto(document.body);
})

asyncTest("EditArea get/set vaule test",function(){

    expect(3);

    var editArea = new workpad.dom.editArea(function(edit){

        editArea.empty();
        equal(editArea.getContent(),"","get ok!");

        editArea.setContent("workpad edit area");
        equal(editArea.getContent(),"workpad edit area","set content ok");

        editArea.empty();
        equal(editArea.getContent(),"","empty ok!");

        start();
    });

});
