module("workpad.dom.style",{
    setup:function(){
        this.container = document.createElement("div");
        document.body.appendChild(this.container);

        this.div = document.createElement("div");
        this.span = document.createElement("span");
        this.anotherDiv = document.createElement("div");
        document.body.appendChild(this.div);
        document.body.appendChild(this.span);
        document.body.appendChild(this.anotherDiv);
    },

    teardown:function(){
        this.container.parentNode.removeChild(this.container);
        this.div.parentNode.removeChild(this.div);
        this.span.parentNode.removeChild(this.span);
        this.anotherDiv.parentNode.removeChild(this.anotherDiv);
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

test("Basic style copy test",function(){
    this.div.style.cssText = "width: 400px; height: 200px; text-align: right; float: left;";

    workpad.dom.style(["width", "height", "text-align", "float"]).copyfrom(this.div).to(this.span)

    equal(workpad.dom.style("width")      .getfrom(this.span), "400px",  "Width correctly copied");
    equal(workpad.dom.style("height")     .getfrom(this.span), "200px",  "Height correctly copied");
    equal(workpad.dom.style("text-align") .getfrom(this.span), "right",  "Text-align correctly copied");
    equal(workpad.dom.style("float")      .getfrom(this.span), "left",   "Float correctly copied");
});

test("Whether it copies native user agent styles",function(){
    workpad.dom.style(["display"]).copyfrom(this.span).to(this.div);

    equal(workpad.dom.style("display").getfrom(this.div),"inline","Display correctly copied");
});

test("Advance style copy test",function(){
    this.span.style.cssText = "color: rgb(255, 0, 0); -moz-border-radius: 5px 5px 5px 5px;";
    this.div.style.cssText  = "color: rgb(0, 255, 0); text-decoration: underline;";

    workpad.dom
        .style(["color", "-moz-border-radius", "unknown-style"])
        .copyfrom(this.span)
        .to(this.div)
        .andTo(this.anotherDiv);

    // Opera and IE internally convert color values either to rgb or hexcode, and some version of IE either
    // strip or add white spaces between rgb values
    var divColor = workpad.dom.style("color").getfrom(this.div).replace(/\s+/g, "");
    ok(divColor == "rgb(255,0,0)" || divColor == "#ff0000", "First div has correct color");

    var anotherDivColor = workpad.dom.style("color").getfrom(this.anotherDiv).replace(/\s+/g, "");
    ok(anotherDivColor == "rgb(255,0,0)" || anotherDivColor == "#ff0000", "Second div has correct color");

    equal(workpad.dom.style("text-decoration").getfrom(this.div), "underline", "Text-decoration hasn't been overwritten");

    if ("MozBorderRadius" in this.div.style) {
        equal(workpad.dom.style("-moz-border-radius").getfrom(this.div),        "5px 5px 5px 5px", "First div has correct border-radius");
        equal(workpad.dom.style("-moz-border-radius").getfrom(this.anotherDiv), "5px 5px 5px 5px", "Second div has correct border-radius");
    }
});