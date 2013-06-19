module("workpad.browser",{
    userAgents: {
        iPad_iOS5:    "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3",
        Android4:      "Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        Chrome:       "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7",
        IE6:          "Mozilla/4.0 (Compatible; Windows NT 5.1; MSIE 6.0) (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
        IE7:          "Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; c .NET CLR 3.0.04506; .NET CLR 3.5.30707; InfoPath.1; el-GR)",
        IE8:          "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322)",
        IE9:          "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; Media Center PC 6.0; InfoPath.3; MS-RTC LM 8; Zune 4.7)"
    },

    setup:function(){
        this.originalUserAgent          = workpad.browser.USER_AGENT;
        this.originalExecCommand        = document.execCommand;
        this.originalQuerySelector      = document.querySelector;
        this.originalQuerySelectorAll   = document.querySelectorAll;
    },

    teardown:function(){
        workpad.browser.USER_AGENT = this.originalUserAgent;
        document.execCommand = this.originalExecCommand;
        document.querySelector = this.originalQuerySelector;
        document.querySelectorAll = this.originalQuerySelectorAll;
    }
});

test("Check mobile contentEditable support",function(){
    document.querySelector = document.querySelectorAll = function(){};

    workpad.browser.USER_AGENT = this.userAgents.iPad_iOS5;
    ok(workpad.browser.supported(),"iPad iOS 5 is correctly unsupported");

    workpad.browser.USER_AGENT = this.userAgents.Android4;
    ok(workpad.browser.supported(),"Android 4 is correctly supported");

});

test("Check with missing document.execCommand",function(){
    document.execCommand = null;
    ok(!workpad.browser.supported(),"Missing document.execCommand causes editor to be unsupported!");
});

