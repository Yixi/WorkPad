module("workpad.dom.editArea",{
    teardown: function(){
        var editArea;
        while (editArea = document.querySelector(".workpad-editArea")){
            editArea.parentNode.removeChild(editArea);
        }
    }
});


test("Basic Test",function(){
    expect(3);

    var editArea = new workpad.dom.editArea(function(edit){

        equal(edit,editArea,"The parameter passed into the readyCallback is the editArea instance");

        var Areas = document.querySelectorAll(".workpad-editArea");
        equal(Areas.length, 1, "EditArea insert into dom tree");

        var edit_area = Areas[Areas.length-1];

        equal(editArea.getEditArea(), edit_area, "workpad.dom.editArea.prototype.getEditArea() retruns correctly");
    });

    editArea.insertInto(document.body);
})
