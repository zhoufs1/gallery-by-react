/**
 * 用户上下文信息
 */
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import {Toast,Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
import {postMAJSON} from "./maAjax";
import ajax from './ajax';
import {ADDR,MODULE_URL} from '../common/RestUrl';
import {isJsonStr, evil, GetUrlObject, yyBrowserVersions} from './util';

/**
 * 处理移动上下文
 * @param url 请求MA地址
 * @param checkParams 参数
 * @param _success 成功回调
 */
function loginContextPost(url, checkParams, _success) {
    Toast.loading('Loading...', 0, null, false);
    postMAJSON(url, checkParams, function (resultJson) {
        if (resultJson.success == true) {
            Toast.hide();
            let resultExt = JSON.parse(resultJson.ext);
            sessionStorage.setItem("icop_context", JSON.stringify(resultExt['icop_context']));
            //验证成功的回调
            if (typeof _success === 'function') {
                _success();
            }
        } else {
            Toast.fail("身份校验失败");
        }
    })
}
/**
 * 获取微信js-sdk的方法
 * @param url 请求MA地址
 * @param Params 参数
 *
 */

function getJssdk(url,Params) {
    ajax.getText(url, {url: Params}, function (data) {
        console.log(data);
        let JSData = JSON.parse(data);
        if (JSData.flag == '0') {
            console.log(JSData.data);
            console.log('authToken加载wx.config')
            setTimeout(function () {
                wx.config({
                    debug: false,
                    appId: JSData.data.appid,
                    timestamp: JSData.data.timestamp,
                    nonceStr: JSData.data.nonceStr,
                    signature: JSData.data.signature,
                    jsApiList: ['closeWindow','scanQRCode']
                })
            },200)

        } else {
            console.log(JSData + '1');
            Toast.info(JSData.desc);
        }

    })
}

/**
 * 根据openid获取上下文信息
 * @param url 请求MA地址
 * @param Params 参数
 */
function get_context(url,Params,that,_success){
    ajax.getText(url, Params, function (data) {
        let extData = JSON.parse(data);
        if (extData.flag == 1) {
            Toast.info('请先去官网完善企业信息', 2);
            setTimeout(function () {
                window.Bridge_YYPlugin.call('CommonPlugin', 'closewindow')
            }, 3000)

        } else {
            if(extData.data && Object.keys(extData.data).length!==0){
                console.log(extData.data.ext.icop_context);
                sessionStorage.setItem('icop_context', JSON.stringify(extData.data.ext.icop_context));
                Cookies.set(that.CONTEXT_KEY, extData.data.ext.icop_context);
                Cookies.set('tenantid',extData.data.ext.icop_context.tenantid);
                Cookies.set('token',extData.data.ext.icop_context.token);
                Cookies.set('u_logints',extData.data.ext.icop_context.u_logints);
                Cookies.set('u_usercode',extData.data.ext.icop_context.u_usercode);
                Cookies.set('userId',extData.data.ext.icop_context.userId);
                Cookies.set('userType',extData.data.ext.icop_context.userType);
                _success()
            } else {
                //未获取到上下文信息，跳转到绑定页面界面
                console.log('----未获取到上下文-----')
                const openidBind =  Modal.alert('账号绑定','未绑定账号是否进行账号绑定？',[
                    {text:'取消',onPress:()=>window.Bridge_YYPlugin.call('CommonPlugin','closewindow')},
                    {text:'确定', onPress:()=>{
                        console.log('确定')
                        window.location.href = ADDR + '/icop-ydyy-mobile/#/openIdBind';
                    }}
                ])
            }

        }

    }, function (data) {
        Toast.info('失败请求', 2)
    })
}


let AuthToken = {
    CONTEXT_KEY: 'icop_context', //cookie键
    SERVER_URL: ADDR + '/icop-workbench/getWorkbenchCookie', //获取上下文的URL
    _cacheContext: null //内存级存储
    /**
     * 初始化上下文信息
     * @param options 参数配置{
     *  url:获取上下文的URL
     *  success:初始化上下文成功时的回调
     *  error:初始化上下文失败时的回调
     * }
     */
    , init: function init(options) {
        //本地环境参数
        let _url = options && options.url ? options.url : this.SERVER_URL; //无URL参数则使用默认获取上下文的URL
        let _success = options && options.success ? options.success : null;
        let _error = options && options.error ? options.error : null;
        let _clear = options && options.clear !== undefined ? options.clear : true; //是否清除历史上下文
        let that = this;

        let urlParam = GetUrlObject();//移动端环境参数
        let nativeCookie = Cookies.get(this.CONTEXT_KEY);
        if (yyBrowserVersions().microMessenger) {
            console.log('-------------微信-------------')
            //TODO 是微信走自己的url
            let url = window.location.href;
            if (url.indexOf('openIdBind') !== -1) {
                //绑定界面
                console.log('----微信端白名单------')
                //判断是否已经绑定信息
                if(sessionStorage.getItem('openid')){
                    //从外部界面已经获取过openid，直接跳转页面
                    if(url.indexOf('#')!==-1){
                        //配置JS-SDK及签名算法
                        let js_Url = window.location.href.split('#')[0];
                        getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',js_Url);
                        options.wechat();
                    } else {
                        getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',url);
                        options.wechat();
                    }

                } else {
                    //有code且不是分享，先获取到openid再打开页面
                    if(url.indexOf('code')!==-1 && url.indexOf('from=timeline')==-1){
                        //配置JS-SDK及签名算法
                        let js_Url = window.location.href;
                        getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',js_Url);
                        //获取openId
                        let showCode = url.split('code=')[1].split('&')[0];
                        let getIdUrl = ADDR + '/icop-ma-web/wechat/openid';
                        let getCodeParams = {code: showCode};
                        ajax.getText(getIdUrl, getCodeParams, function (data) {
                            let idData = JSON.parse(data);
                            if (idData.flag == 0) {
                                //临时缓存openid供开发使用
                                sessionStorage.setItem('openid', idData.data.openid);
                                console.log(idData.data.openid);
                                options.wechat();
                            } else {
                                Toast.info('未获取到openid', 2)
                            }

                        }, function (data) {
                            alert('失败请求', data)
                        })
                    } else {
                        //没有获取openid的code，直接打开url
                        if(url.indexOf('#')!==-1){
                            //配置JS-SDK及签名算法
                            let js_Url = window.location.href.split('#')[0];
                            getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',js_Url);
                            options.wechat();
                        } else {
                            //配置JS-SDK及签名算法
                            getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',url);
                            options.wechat();
                        }
                    }

                }

            } else if (url.indexOf('wechatwork') !== -1) {
                console.log('----------微信企业号---------')

                //配置JS-SDK及签名算法
                let js_Url = window.location.href.split('#')[0];
                getJssdk('https://dev.yonyouccs.com/icop-ma-web/wechat/jssdkConfig',js_Url);

                //根据code获取上下文信息
                let showCode = url.split('code=')[1].split('&')[0];
                console.log(showCode);
                let getCodeUrl = ADDR + '/icop-ma-web/wechatWork/info';
                let getCodeParams = {code: showCode,corpid:urlParam.corpid,agentid:urlParam.agentid};
                ajax.getText(getCodeUrl, getCodeParams, function (data) {
                    let extData = JSON.parse(data);
                    if (extData.flag == 1) {
                        Toast.info(extData.desc, 2);
                        setTimeout(function () {
                            window.Bridge_YYPlugin.call('CommonPlugin', 'closewindow')
                        }, 3000)

                    } else {
                        if(extData.data && Object.keys(extData.data).length!==0){
                            console.log(extData.data.ext.icop_context);
                            sessionStorage.setItem('icop_context', JSON.stringify(extData.data.ext.icop_context));
                            Cookies.set(that.CONTEXT_KEY, extData.data.ext.icop_context);
                            _success()
                        } else {
                            //未获取到上下文信息，跳转到绑定页面界面
                            console.log('----未获取到上下文-----');
                            Toast.info('未获取到上下文信息',2000);
                        }

                    }

                }, function (data) {
                    alert('失败请求', data)
                })
            }
            else {
                if (url.indexOf('code') !== -1) {
                    console.log('-----微信公众号端-----')
                    //配置JS-SDK及签名算法
                    let js_Url = window.location.href.split('#')[0];
                    getJssdk(ADDR + '/icop-ma-web/wechat/jssdkConfig',js_Url);

                    //根据code获取openid,然后根据openid获取上下文信息
                    let showCode = url.split('code=')[1].split('&')[0];
                    let getIdUrl = ADDR+'/icop-ma-web/wechat/openid';
                    let getCodeParams = {code: showCode};
                    ajax.getText(getIdUrl, getCodeParams, function (data) {
                        let idData = JSON.parse(data);
                        if (idData.flag == 0) {
                            //缓存openid供开发使用
                            let openid = idData.data.openid;
                            sessionStorage.setItem('openid', idData.data.openid);
                            console.log(idData.data.openid);
                            let getCodeUrl = ADDR + '/icop-ma-web/wechat/info';
                            let getCodeParams = {openid: openid};
                            get_context(getCodeUrl,getCodeParams,that,_success);
                        } else {
                            Toast.info('未获取到openid', 2)
                        }

                    }, function (data) {
                        alert('失败请求', data)
                    })


                } else {
                    if(url.indexOf('openid')!==-1){
                        //获取openid,然后根据openid获取上下文信息
                        let openid = url.split('openid=')[1].split('&')[0];
                        let getCodeUrl = ADDR + '/icop-ma-web/wechat/info';
                        let getCodeParams = {openid: openid};
                        get_context(getCodeUrl,getCodeParams,that,_success);
                    } else {
                        Toast('未获取到code',1);
                    }
                }
            }

        }
        else if (nativeCookie && !urlParam.token&&urlParam.cookie === 0) {
            console.log('-------------cookie-------------')
            if (typeof _success === 'function') {
                _success();
            }
        } else if (urlParam.fromType && urlParam.fromType === 'upEsnApp') {
            console.log('-------------友空间-------------')

            let param = {};
            param.token = urlParam.token;
            param.appid = urlParam.appid;
            loginContextPost(MODULE_URL.checkUpesnToken, param, _success);
        } else if (urlParam.token) {
            console.log('-------------token-------------')
            let param = {};
            param.token = urlParam.token;
            param.appid = urlParam.appid;
            loginContextPost(MODULE_URL.loginContextUrl, param, _success);
        } else {
            console.log('-------------开发态-------------');

            if (_clear) {
                delete this._cacheContext; //清除内存级存储
                Cookies.remove(this.CONTEXT_KEY); //清除cookie级存储
            }
            let firstResp = false;
            superagent.get(_url).use(jsonp).end(function (err, res) {
                Toast.hide();
                if (res !== null && res.body !== null && res.body !== undefined) {
                    Cookies.set(that.CONTEXT_KEY, res.body);
                    if (typeof _success === 'function') {
                        _success();
                    }
                } else {
                    if (_clear) {
                        delete this._cacheContext; //清除内存级存储
                        Cookies.remove(this.CONTEXT_KEY); //清除cookie级存储
                    }
                    if (firstResp === false) {
                        firstResp = true; //解决错误回调被执行了两次的问题
                    } else {
                        if (_clear) {
                            delete this._cacheContext; //清除内存级存储
                            Cookies.remove(this.CONTEXT_KEY); //清除cookie级存储
                        }
                        if (firstResp === false) {
                            firstResp = true; //解决错误回调被执行了两次的问题
                        } else {
                            if (typeof _error === 'function') {
                                _error(err);
                            }
                        }
                    }
                }
            });
        }
    }
    /**
     * 获取上下文信息
     * @returns {String}
     */
    , getContext: function getContext() {
        let context = {}
        if (sessionStorage.getItem(this.CONTEXT_KEY)) {
            context = sessionStorage.getItem(this.CONTEXT_KEY);
        } else if (!this._cacheContext) {
            //内存级存储
            context = Cookies.get(this.CONTEXT_KEY); //cookies级存储
        }
        if (isJsonStr(context)) {
            //确保为JSON格式的字符串
            let jsTxt = '(' + decodeURIComponent(context.replace(/'/, "'")) + ')';
            let jsonObj = evil(jsTxt); //转换为JSON对象
            this._cacheContext = jsonObj;
        }
        return this._cacheContext;
    }, getToken: function getToken() {
        // 获取Token
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["token"];
    }, getStaff: function getStaff() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["staffId"],
            code: context["staffCode"],
            name: context["staffName"]
        };
    }, getStaffId: function getStaffId() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffId"];
    }, getStaffCode: function getStaffCode() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffCode"];
    }, getStaffName: function getStaffName() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["staffName"];
    }, getDept: function getDept() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["deptId"],
            code: context["deptCode"],
            name: context["deptName"]
        };
    }, getDeptId: function getDeptId() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptId"];
    }, getDeptCode: function getDeptCode() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptCode"];
    }, getDeptName: function getDeptName() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["deptName"];
    }, getUser: function getUser() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["_A_P_userId"],
            code: context["_A_P_userLoginName"],
            name: context["_A_P_userName"]
        };
    }, getUserId: function getUserId() {
        // 获取用户ID
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userId"];
    }, getUserCode: function getUserCode() {
        // 获取用户编码
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userLoginName"];
    }, getUserName: function getUserName() {
        // 获取用户名称
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_userName"];
    }, getCurrentRoleId: function getCurrentRoleId() {
        // 获取当前角色ID
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["_A_P_currentRoleId"];
    }, getOrga: function getOrga() {
        // 获取组织ID,CODE,NAME信息
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return {
            id: context["companyId"],
            code: context["companyCode"],
            name: context["companyName"]
        };
    },
    getOrgaId: function getOrgaId() {
        // 获取组织ID
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyId"];
    }, getOrgaCode: function getOrgaCode() {
        // 获取组织编码
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyCode"];
    }, getOrgaName: function getOrgaName() {
        // 获取组织名称
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["companyName"];
    }, getLogints: function getLogints() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["u_logints"];
    }, getTenantId: function getTenantId() {
        let context = this.getContext();
        if (context === null || context === undefined) {
            return null;
        }
        return context["tenantid"];
    }, getAuthenticationStr: function getAuthenticationStr() {
        let includeFields = ["u_logints", "u_usercode", "token", "tenantid", "userId", "userType", "typeAlias" //认证需要的字段，下面为扩展字段
            , "_A_P_userLoginName", "_A_P_userName", "userType", "companyId", "companyName", "companyCode"];
        let set = new Set();
        includeFields.forEach(function (value) {
            set.add(value);
        });

        let authentication = '';
        let context = this.getContext();
        if (context) {
            for (let prop in context) {
                if (set.has(prop) && context[prop]) {
                    authentication += prop + '=' + encodeURI(context[prop]) + ';';
                }
            }
        }
        if (authentication.length > 0 && authentication[authentication.length - 1] === ';') authentication = authentication.substring(0, authentication.length - 1);
        return authentication;
    }
};

export default AuthToken;