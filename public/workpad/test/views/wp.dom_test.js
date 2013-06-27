module("workpad.views.Wp.prototype",{
    data:{
        a:[{
            id:"001",
            description:"note1",
            content:"title1",
            expand:true,
            children:[]
        }],
        b:[{
            id:"001",
            description:"note1",
            content:"title1",
            expand:true,
            children:[]
        },{
            id:"002",
            description:"note2",
            content:"title2",
            expand:true,
            children:[]
        }],
        c:[{
            id:"001",
            description:"note1",
            content:"title1",
            expand:true,
            children:[]
        },{
            id:"002",
            description:"note2",
            content:"title2",
            expand:true,
            children:[{
                id:"003",
                description:"note3",
                content:"title3",
                expand:true,
                children:[]
            },{
                id:"004",
                description:"note4",
                content:"title4",
                expand:true,
                children:[]
            },{
                id:"005",
                description:"note5",
                content:"title5",
                expand:true,
                children:[{
                    id:"006",
                    description:"note6",
                    content:"title6",
                    expand:true,
                    children:[]
                }]
            }]
        },{
            id:"007",
            description:"note7",
            content:"title7",
            expand:true,
            children:[]
        }]
    },
    setup:function(){
        this.element = document.createElement('div');
    }
});

/**
 * the test must modify when the /src/views/wp.dom.js default template has changed.
 */


test("Single Data test",function(){
    var html = '<div class="item" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div>';
    var WP = new workpad.views.Wp();
    equal(WP.buildHTMLBySingleData(this.data.a[0]),html);
});

test("Bacic test by Template 1",function(){

    var WP = new workpad.views.Wp();

    var html_a ='<div class="item" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div>';
    var html_b ='<div class="item" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div><div class="item" data-id="002"><div class="maindata"><div class="content">title2</div><div class="description">note2</div></div><div class="children"></div></div>';
    var html_c =
        '<div class="item" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div>' +
        '<div class="item" data-id="002"><div class="maindata"><div class="content">title2</div><div class="description">note2</div></div><div class="children">' +
            '<div class="item" data-id="003"><div class="maindata"><div class="content">title3</div><div class="description">note3</div></div><div class="children"></div></div>' +
            '<div class="item" data-id="004"><div class="maindata"><div class="content">title4</div><div class="description">note4</div></div><div class="children"></div></div>' +
            '<div class="item" data-id="005"><div class="maindata"><div class="content">title5</div><div class="description">note5</div></div><div class="children">' +
                '<div class="item" data-id="006"><div class="maindata"><div class="content">title6</div><div class="description">note6</div></div><div class="children"></div></div>' +
            '</div></div>' +
        '</div></div>' +
        '<div class="item" data-id="007"><div class="maindata"><div class="content">title7</div><div class="description">note7</div></div><div class="children"></div></div>';

    equal(WP.buildDomByDatas(this.data.a),html_a);
    equal(WP.buildDomByDatas(this.data.b),html_b);
    equal(WP.buildDomByDatas(this.data.c),html_c);

});

