// 'use strict';

/**
 * 依据环境自判断IP地址
 */
let ADDR;
let MAURL;
window.EnvConfig = window.EnvConfig || null;
if (window.EnvConfig && window.EnvConfig.YYLIB_BASEHOST) {
    //配置外部化
    ADDR = window.EnvConfig.YYLIB_BASEHOST;
    MAURL = window.EnvConfig.MAURL;
}else{
    ADDR = 'https://dev.yonyouccs.com';
    MAURL = 'http://123.103.9.200:9080';
}
    // 正式环境
    /*if (process.env.NODE_ENV === 'zjy') {
        ADDR = "http://10.11.248.91";
    }
    //用友环境   阿里云CC
    else if (process.env.NODE_ENV === 'cc') {
        ADDR = "https://cc.yonyouccs.com";
    }
    // online环境
    else if (process.env.NODE_ENV === 'online') {
        ADDR = "http://i3b.cscec.com";
    }
    // 三局测试环境
    else if (process.env.NODE_ENV === 'testcscec3b') {
        ADDR = "http://123.103.9.200:9080";
    }
    // 外网环境
    else if (process.env.NODE_ENV === 'outer') {
        ADDR = 'https://dev.yonyouccs.com';
    }
    // 开发环境
    else if (process.env.NODE_ENV === 'development') {
        ADDR = 'https://dev.yonyouccs.com';
        // 测试环境
    } else if (process.env.NODE_ENV === "test") {
        ADDR = "http://test.cscec3b.com.cn";
        // 本地环境
    } else {
        ADDR = 'http://127.0.0.1:8080';
    }*/

export default {
    ADDR,
    MAURL
};