module("workpad.views.Wp.prototype",{
    data:{
        a:[{
            id:"001",
            description:"note1",
            content:"title1",
            collapse:true,
            children:[]
        }],
        b:[{
            id:"001",
            description:"note1",
            content:"title1",
            collapse:true,
            children:[]
        },{
            id:"002",
            description:"note2",
            content:"title2",
            collapse:true,
            children:[]
        }],
        c:[{
            id:"001",
            description:"note1",
            content:"title1",
            collapse:true,
            children:[]
        },{
            id:"002",
            description:"note2",
            content:"title2",
            collapse:true,
            children:[{
                id:"003",
                description:"note3",
                content:"title3",
                collapse:true,
                children:[]
            },{
                id:"004",
                description:"note4",
                content:"title4",
                collapse:true,
                children:[]
            },{
                id:"005",
                description:"note5",
                content:"title5",
                collapse:true,
                children:[{
                    id:"006",
                    description:"note6",
                    content:"title6",
                    collapse:true,
                    children:[]
                }]
            }]
        },{
            id:"007",
            description:"note7",
            content:"title7",
            collapse:true,
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
    var html = '<div class="" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div>';
    var WP = new workpad.views.Wp();
    equal(WP.buildHTMLBySingleData(this.data.a[0]),html);
});

test("Bacic test by Template 1",function(){

    var WP = new workpad.views.Wp();

    var html_a ='<div class="" data-id="001"><div class="maindata"><div class="content">title1</div><div class="description">note1</div></div><div class="children"></div></div>';



    equal(WP.buildDomByDatas(this.data.a),html_a);

});

