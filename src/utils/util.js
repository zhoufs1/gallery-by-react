
/**
 * Created by WHH on 2017-10-10.
 */
export function titleBack() {
    if(window.history.length > 1){
        window.history.back();
    }else{
        if(typeof YYPlugin != 'undefined'){
            window.YYPlugin.call("CommonPlugin", "closewindow");
        }else{
            console.log('无回退，且未加载YYPlus！')
        }
    }
}
/**
 * 获取页面请求地址后面的参数
 * 该方法只在此次申明和在下方调用一次，以后需要参数到sessionStorage中获取
 */
export function GetUrlObject() {
    var url = window.location.href;//直接获取href中的参数，不从search中获取
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split('?')[1];
        str = str.split('#')[0];
        if (url.split('?').length > 2) {
            var str2 = url.split('?')[2];
            str = str + '&' + str2;
        }
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            var eqIndex = strs[i].indexOf("=");
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].substr(eqIndex + 1));
        }
    } else {
        //antd 提示错误
        //Toast.info(location.href)
        console.log(window.location.href)
    }
    return theRequest;
}
export function yyBrowserVersions() {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        microMessenger: u.indexOf('MicroMessenger') > -1,	//是否为微信内置浏览器
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
}
/**
 * 一个变量指向Function，防止有些前端编译工具报错
 * @param fn
 * @returns {*}
 */
export function evil(fn) {
    var Fn = Function;
    return new Fn('return ' + fn)();
}
/**
 * @desc 是否为JSON对象格式的字符串形态。匹配格式:"{...}"
 */
export function isJsonStr(val) {
    return typeof val === "string" && /^\{.*\}$/.test(val);
}

