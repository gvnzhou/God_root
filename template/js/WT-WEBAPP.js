"use strict";
/*global WT*/
/****1.1 ajax框架****/
if (document.location.toString().split("127").length <= 1 && document.location.toString().split("test").length <= 1) {
    //WT.return_url="http://www.w5t5.com/webApp/index.html#view_orderDetail?orderId={0}";
    WT.trace = function(s) {};

    WT.url = 'http://test.rtdream.com';

} else {
    WT.url = 'http://127.0.0.1:3000';
}
var webError = {
    'Not Found': '无此接口',
    'Network Error': '网络出错！稍后重新再试！',
    'Server Error': '服务端出错！',
    'Unexpected token N': '服务器端出错!',
    undefined: '无对照错误'
};
var $ = WT.$;

/*window.onerror=function(Msg,Url,Num){
    console.error([Msg,Url,Num]);
};*/

//var a = {a:1,b:2,c:[1,2,3,56,66,{o:'abc'}]};
//全局品种设置get方法
function settingsGet(s, a) {
    var ret = a || WT.G.P.settings;
    s.split('.').forEach(function(key) {
        ret = ret ? ret[key] : null;
    });
    return ret;
}
//全局品种设置set方法
function settingsSet(key, value, a, show_tips) {
    var ret = a || WT.G.P.settings;
    var arr = key.split('.');
    var last = arr.pop();
    arr.forEach(function(key) {
        if (!ret[key])
            ret[key] = {};
        ret = ret[key];
    });
    ret[last] = value;
    var val = {};
    val[key] = value;
    WT.Tool.ajax({
        apiName: '/user/modify_setting',
        param: {
            setting_val: val
        },
        ifShowTips: !(show_tips === false),
        cbFn: {
            onSuccess: function(d) {}
        }
    });
}

var convertDOMToImage = function(dom, callback) {
    if (window.html2canvas)
        window.html2canvas(dom, {
            onrendered: function(canvas) {
                callback(canvas.toDataURL('image/png'));
            }
        });
};


var Operation = function() {
    var op_list = [];
    var ret = {};
    var current_index = -1;
    ret.addOp = function(fn_back, fn_forward, name, params) {
        op_list.push({
            forward: fn_forward,
            back: fn_back,
            name: name,
            params: params || {}
        });
        current_index += 1;
    };
    ret.detectEdge = function() {
        return {
            back: current_index >= 0 ? true : false,
            forward: current_index < op_list.length - 1 ? true : false
        };
    };
    ret.back = function() {
        if (current_index >= 0)
            op_list[current_index--].back();
    };
    ret.forward = function() {
        if (current_index < op_list.length - 1)
            op_list[++current_index].forward();
    };
    ret.prev = function() {
        return op_list[current_index];
    };
    ret.get_list = function() {
        return op_list;
    };
    ret.fn_dict = {};
    return ret;
}();

function wtCallBackFn(s) {
    try {
        var j;
        if (browser.versions.ios) {
            j = s;
        } else {
            j = JSON.parse(s.replaceAll("\t", "").replaceAll("\n", ""));
        }
        alert(JSON.stringify(j));
        return j;

    } catch (e) {
        alert("解析出错")
    }
}

function hrefObj(str) {
    var a = str.split("?")[1];
    var o = {};
    if (!a) {
        return o
    } else {
        var t = a.split("&");
        for (var i = 0; i < t.length; i++) {
            var tItem = t[i].split("=")
            o[tItem[0]] = tItem[1];
        }
    }
    return o;
}

function count2Second(n) {
    var t = parseInt(n / 1000);
    var min = parseInt(t / 60);
    var sec = t % 60;
    min = min < 10 ? ("0" + min) : min;
    sec = sec < 10 ? ("0" + sec) : sec;
    return min + ":" + sec
}

function showTips(m, txt, delay) {
    txt = txt ? txt : "";
    if (txt.trim().length == 0) return;
    if (WT.$('mainTips') == null)
        $DB.adElm('mainTips', 'div').cn('r5 pa tac dn fs14 bc_10').css("left:0px;top:-50px;height:45px;line-height:45px;width:300px;border:1px solid #C3C1C1");
    WT.$('mainTips').dc('tipsAnimationOut').css("z-index:2000");
    if (m == "success") {
        //txt="数据提交成功！";
        WT.$('mainTips').dc('dn').ac('bc_success').ac('c_52').dc('c_15').dc('bc_danger').ac('tipsAnimationIn').css('left:' + (WT.wh()[0] - 150) + 'px;' + 'top:' + ($DB.scrollTop + 86) + 'px').h(txt);
    }
    if (m == "danger") {

        WT.$('mainTips').dc('dn').dc('bc_success').dc('c_52').ac('c_15').ac('bc_danger').ac('tipsAnimationIn').css('left:' + (WT.wh()[0] - 150) + 'px;' + 'top:' + ($DB.scrollTop + 86) + 'px').h(txt);
    }
    setTimeout(function() {
        WT.$('mainTips').dc('tipsAnimationIn').ac('tipsAnimationOut')
    }, delay || 3000)
}

function wtBrige(cmd, param) { //手机桥
    //alert([cmd,param,JSON.stringify(window.wtAndroid)])
    if (browser.versions.ios) {
        try {
            iframeTemp.src = "http://www.w5t5.com/webapp/client/index.html?cmd=" + cmd + (param.length > 0 ? "&param=" : "") + param;
            //cmd=back 告知app返回 {err:null,msg:"商户点评成功!"}
        } catch (e) { /*alert("调用IOS失败")*/ }
    } else {
        try {
            window.wtAndroid[cmd](param);
            //alert("调用成功")
        } catch (e) {
            //alert("调用安卓失败")
        }
    }
}

function wtCallBackFn(s) {
    //安卓 ios回调
    try {
        var j = JSON.parse(s);
        switch (j.cmd) {
            case "addClass":
                try {
                    $(j.param.elm).ac(j.param.class)
                } catch (e) {}
                break;
            default:

        }
    } catch (e) {
        alert(s);
    }
}
var webAjax = function(apiName, paramObj, callBackFnObj, method) { //apiName前后去除 "/"
    var obj = webAPI; //每个系统不同
    var url = WT.url;
    var cbFn = callBackFnObj || {};
    var newPath;
    var id = paramObj['id'];
    if (!obj[apiName]) {
        WT.trace(['前端错', '无此接口']);
        showTips('danger', '无此接口:"' + apiName + '"');
        loadingHide();
        return;
    }
    newPath = id ? obj[apiName].path.replaceAll('{id}', id) : newPath = obj[apiName].path;
    delete paramObj['id'];
    WT.trace([apiName, obj[apiName].method, url + newPath + "?" + WT.toUrl(paramObj) + "&access_token=" + WT.ls.get("web_access_token_2015"), paramObj])


    var checkData = WT.checkParam(paramObj, obj[apiName].param);
    if (checkData.err != 0) {
        WT.trace(['前端错', checkData.err]);
        showTips('danger', checkData.err);
        loadingHide();
    } else {
        var ver = paramObj['ver'] || "v10"; //版本控制在这里
        url = url + ver + "/";
        var URL = url + newPath
        if (apiName === "get_html") {
            URL = paramObj["filename"];
            new WT.ajax(URL, "", {
                onSuccess: function(d) {
                    cbFn.onSuccess(d);
                },
                onError: function() {}
            }, "GET")
            return;
        }
        //{a:1,b:2, c: [1,2,3]} application/json

        new WT.ajax(URL, WT.toUrl(paramObj) + "&rnd=" + Math.random(), {
            onError: function(d, s) {
                try {

                    var jCode = JSON.parse(d).code;
                    showTips('danger', obj[apiName].code[jCode], s)
                } catch (e) {
                    showTips('danger', webError[d])
                }
                WT.trace([apiName + '返回:', d])
                try {
                    cbFn.onError(d, s)
                } catch (e) {}
                loadingHide();
                if (jCode == "bad_access_token" || jCode == "require_access_token") {
                    WT.ls.set("web_last_err", "bad_access_token");
                    //top.location.href="login.html";
                    return;
                }


            },
            onSuccess: function(d) {
                WT.trace([apiName + '返回:', JSON.parse(d || "{}")]);
                var data = JSON.parse(d || "{}"); //这里json化返回了
                loadingHide()
                if (+data.code > 1000) {
                    if (!paramObj.noTips) showTips('danger', data.desc);
                    if (cbFn.onError) cbFn.onError(d);
                } else {
                    cbFn.onSuccess(data)
                }


            } || function(d) {
                showTips('success', d);
                WT.trace('suc:' + d)
            }
        }, obj[apiName].method || "POST")
    }
};

//base func
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

function createLoadMask() {
    if (!$("loading")) {
        $DB.adElm("loading", "div")
            .css("top:30%;left:0;bottom:0;right:0;z-index:503;")
            .cn("load8 pf ma dn")
            .adElm("", "div").cn("loader");
    }
    if (!$("mask")) {
        $DB.adElm("mask", "div")
            .css("top:0;z-index:502")
            .cn("pf bc_62 hp wp dn pne");
    }
}

function loadingHide() {
    createLoadMask();
    $("loading").hide();
    $("mask").hide();
}

function loadingShow(ifNotLoading, ifNoHide) {
    createLoadMask();
    if (!ifNotLoading) $("loading").show();
    $("mask").alpha(0.1).show();
    var autoHide = 0;
    if (ifNoHide === undefined) autoHide = 1;
    if (autoHide) {
        setTimeout(function() {
            loadingHide();
        }, 18000);
    }
}

function trace(s) {
    WT.trace(s);
}

function track(k, v) { //调用统计系统
    WT.Tool.ajax({apiName:'/statistics/front',param:{
        'key': k,
        'val': v || 1
    },cbFn:{  
            onSuccess:function(d){}
        }
    });
}

function viewLoad(source, toDiv, onloadFn) { //加载html页面到div
    history.pushState({}, "");
    loadingShow();
    var url = location.href.split("/");
    url.pop();
    url.push(source)
    var str = url.join("/");
    if (source != WT.G.nowView) WT.G.preView = WT.G.nowView;
    //TODO: 多来源还是会有问题
    console.log("跳转来自:" + WT.G.preView);
    var regText = function(d) {
        var bodyTag = new RegExp("<body[^>]*?>([\\s\\S]*?)<\/body>", "gm");
        d.match(bodyTag);
        if ($(toDiv)) {
            $(toDiv).h(RegExp.$1);
            var scriptTag = new RegExp("<script[^>]*?>([\\s\\S]*?)<\/script>", "gm");
            try {
                d.match(scriptTag).forEach(function(i) {
                    i.match(scriptTag);
                    eval(RegExp.$1);
                });
            } catch (e) {
                console.error('【加载html脚本错误:' + source + '】' + e.stack);
            }

            WT.G.nowView = source;
        } else {
            location.href = "index.html?view=" + source;
            WT.G.nowView = source;
            console.log("加载容器不存在")
                //showTips('danger',"加载容器不存在");
        }
        loadingHide();
    }

    console.log([source, toDiv])
    if (WT.G.cache[source]) {
        loadingShow();
        console.log("此页面被缓存了。。。");
        regText(WT.G.cache[source]);
        (onloadFn || function() {})();
    } else {
        setTimeout(function() {
            new WT.ajax(source, "", {
                onSuccess: function(d) {
                    loadingShow();
                    regText(d);
                    WT.G.cache[source] = d;
                    (onloadFn || function() {})();
                },
                onError: function(e) {
                    showTips('danger', e.toString());
                    loadingHide()
                }
            }, "GET");

        }, 16);
    }


}
//weixin
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//html5
function getGps() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    alert["Latitude: " + position.coords.latitude, "Longitude: " + position.coords.longitude]
}
//H5
function plusReady() {

    var wv = plus.webview.all()[0];
    plus.key.addEventListener("backbutton", function() {
        wv.back();
    });
    window.h_exitApp = function() {
        if (confirm("是否要退出“扫位”？")) plus.runtime.quit();
    }
}
if (window.plus) {
    plusReady();
} else {
    document.addEventListener("plusready", plusReady, false);
}

function h_Function(s, o) {
    try {
        if (window.plus) {
            window[s](o);
        }
    } catch (e) {}

}
//项目全局变量放在这里
WT.G = {};
WT.G.timeOpt = function() {
        var me = this;
        var funcAry = {};
        me.get = function(s) {
            if (!funcAry[s]) {
                return null;
            }
            if (!s || typeof funcAry[s].fn != "function") {
                return null;
            }
            return funcAry[s]
        }
        me.add = function(o, fn) {
            var o = o || {}
            if (!o.name || funcAry[o.name]) return;
            funcAry[o.name] = {
                fn: o.fn,
                start: o.start,
                now: o.now || o.start,
                do: 0,
                endFn: o.endFn
            };
        };
        me.del = function(s) {
            if (!funcAry[s]) {
                return null;
            }
            if (!s || typeof funcAry[s].fn != "function") {
                return null;
            }
            me.stop(s);
            funcAry[s] = null;
            delete funcAry[s];
        };
        me.clear = function() {
            funcAry = null;
            funcAry = {};
        };
        me.start = function(s) {
            if (!funcAry[s]) {
                return null;
            }
            if (!s || typeof funcAry[s].fn != "function") {
                return null;
            }
            funcAry[s].do = 1;
        };
        me.pause = function(s) {
            if (!funcAry[s]) {
                return null;
            }
            if (!s || typeof funcAry[s].fn != "function") {
                return null;
            }
            funcAry[s].do = 0;
        };
        me.stop = function(s) { //rest
            if (!funcAry[s]) {
                return null;
            }
            if (!s || typeof funcAry[s].fn != "function") {
                return null;
            }
            funcAry[s].do = 0;
            funcAry[s].now = funcAry[s].start;
        };
        var mainTimer = function() {
            for (var i in funcAry) {
                var f = funcAry[i];
                if (f && (typeof f.fn === "function") && f.do === 1 && f.now > -1) {
                    f.fn(me);
                    f.now--;
                    if (f.now < 0 && f.endFn) {
                        f.do = 0;
                        f.endFn(me);
                    }
                }
            }
            setTimeout(function() {
                mainTimer();
            }, 1000);
        }
        mainTimer();
        return me;
    }
    /*  //例子
    var tOpt=new WT.G.timeOpt()
        tOpt.add({
            name:"first",
            start:5,
            now:2,
            fn:function(){
                console.log(tOpt.get("first"));
            },
            endFn:function(){

            }
        })
        tOpt.start("first");*/

WT.G.position = "";
WT.G.outLink = "blank.html";
WT.G.preView = "home.html"; //前一个页面
WT.G.nowView = "home.html"; //当前页面
WT.G.cityId = WT.ls.get("cityId") || "310100";
WT.G.cityName = WT.ls.get("cityName") || "上海"; //默认上海
WT.G.keyword = "";
WT.G.searchList = WT.ls.get("searchList") || "";
WT.G.bizAreaId = "";
WT.G.userObj = {};
WT.G.openId = ""; //微信openId
//zc项目
WT.G.cache = {}; //全局缓存
WT.G.socket = null; //socket对象
WT.G.P = {}; //页面想共享的 全局变量
WT.G.nowPage = 'home';
WT.G.P.menuTypeItems = ''; //版式弹框数据
WT.G.P.pTable = {};  //table页面全局变量
WT.G.P.pTable.renderSigdata = ''; //右侧商品详情渲染函数
WT.G.P.pTable.renderSighistory = ''; //右侧商品交易记录渲染函数
WT.G.P.renderMiniMarket = ''; //行情页面数据变化特效函数
WT.G.P.pTable.renderFirst = ''; //首次渲染行情页面函数
WT.G.P.pTable.marketClassify = ''; //商品数据分类函数
WT.G.P.pTable.timeOut = ''; //获取商品数据的计时器
WT.G.P.renderNewsLive = ''; //新闻直播渲染函数
WT.G.P.settings = ''; //个人设置JSON
WT.G.P.ChartComponent = '';  //行情图集合
WT.G.P.searchVal = '';
WT.G.P.searchTxt = '';
WT.G.P.PageName = ''; //当前页面
WT.G.P.mySwiper = '';  //新闻页面图片轮播对象
WT.G.P.mini_chart_map = ''; //mini行情图集合
WT.G.P.chart_mini_quote_updater = ''; //更新行情图报价的计时器
WT.G.P.showMiniChart = ''; //显示mini行情图
WT.G.P.pTable.delSymbol = ''; //删除自选商品函数
WT.G.P.pTable.addSymbol = ''; //添加自选商品函数
WT.G.P.multi = ''; //商品搜索对象（行情图相关）
WT.G.P.pTable.showDetail = ''; //渲染商品详情函数
WT.G.P.newsShareParams = ''; //跨页面到聊天室分享新闻
WT.G.P.canvasShareParams = null; //跨页面到聊天室分享图表
WT.G.P.followPage = null;  //标记跳转到关注/粉丝页面
WT.G.P.chatPanelUtil = null; //聊天消息相关工具集
WT.G.P.chatScrollUtil = null; //聊天滚动相关工具集
WT.G.P.chatTemplate = null;//聊天页面模板集合
WT.G.P.chatTargetUser = {};//标记聊天目标
WT.G.P.chartIdcSetting = null; //记录用户的指标设置
WT.G.P.symbolList = []; //保存商品中英文对照表
WT.api = {}; //存放要访问的api
WT.G.P.chatMsg = {};//存放聊天记录
WT.G.SystemNotice = {};//存放系统消息提醒

