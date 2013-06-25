module("workpad.dom.style",{
    setup:function(){
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
    },

    teardown:function(){
        this.container.parentNode.removeChild(this.container);
    }
});


test("Basic get style test",function(){
    this.container.innerHTML = "<span style='float: left'></span>" +
        "<span style='position: absolute'></span>" +
        "<i></i>" +
        "<div></div>";

    equal(workpad.dom.style("float").getfrom(this.container.getElementsByTagName("span")[0]),"left");
    equal(workpad.dom.style("position").getfrom(this.container.getElementsByTagName("span")[1]),"absolute");
    equal(workpad.dom.style("display").getfrom(this.container.getElementsByTagName("div")[0]),"block");
    equal(workpad.dom.style("display").getfrom(this.container.getElementsByTagName("i")[0]),"inline");
});

test("Textarea width/height when value causes overflow", function() {
    var textarea = document.createElement("textarea");
    textarea.style.width = "500px";
    textarea.style.height = "200px";
    textarea.value = Array(500).join("Lorem ipsum dolor foo bar");
    this.container.appendChild(textarea);

    equal(workpad.dom.style("width").getfrom(textarea),"500px");
    equal(workpad.dom.style("height").getfrom(textarea),"200px");
});

test("Basic set style test",function(){
    var ele = document.createElement('div'),
        ele2 = document.createElement('div');
    this.container.appendChild(ele);
    this.container.appendChild(ele2);

    workpad.dom.style({"text-align":"right","float":"left"}).setto(ele);
    equal(workpad.dom.style("text-align").getfrom(ele),"right");
    equal(workpad.dom.style("float").getfrom(ele),"left");

    workpad.dom.style("position:absolute; float:right").setto(ele2);
    equal(workpad.dom.style("position").getfrom(ele2),"absolute");
    equal(workpad.dom.style("float").getfrom(ele2),"right");
});

