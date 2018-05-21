// 'use strict';

import _ from 'lodash';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Created by
 */
//封装ajax的相关方法
var UrlUtils = {
    /**
     *填充url参数，通过参数key值替换 "{}" 里面的内容
     *@param url "http://xxxx/crm/{userId}" 或者 "http://xxxx/crm/list?userId={userId}"
     *@param params {userId: "001"}
     *@return "http://xxxx/crm/001" 或者 "http://xxxx/crm/list?userId=001"
     */
    fillUrlParams: function fillUrlParams(url, params) {
        if (_.isString(url) && _.isObject(params)) {
            var _ret = function () {
                var retUrl = url;
                _.forIn(params, function (value, key) {
                    retUrl = retUrl.replace(new RegExp('{' + escape(key) + '}', 'gm'), escape(value));
                });
                return {
                    v: retUrl
                };
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return url;
    }
    /**
     * @desc 将参数追加到URL后面,支持中文参数
     * @param params{object}需要追加的参数
     * @return 返回追加参数后的URL
     */
    , appendToUrl: function appendToUrl(url, params) {
        var _url = url;
        var isFirstParam = true; //是否为URL的第一个参数
        if (_url.indexOf("?") === -1) {
            //URL是否存在"?"
            _url += "?";
        } else {
            isFirstParam = false;
        }
        var _params = this.getParams(params);
        if (_.isPlainObject(_params) && !_.isEmpty(_params)) {
            _.forIn(_params, function (val, key) {
                var _val = val === undefined ? '' : val;
                if (isFirstParam) {
                    isFirstParam = false;
                    _url += key + "=" + _val;
                } else {
                    var _matchReg = new RegExp("[?|&]" + key + "=[^&]*");
                    var _replaceReg = new RegExp(key + "=[^&]*");
                    if (_url.match(_matchReg)) {
                        //存在相同Key值则进行替换
                        _url = _url.replace(_replaceReg, key + "=" + _val);
                    } else {
                        _url += "&" + key + "=" + _val;
                    }
                }
            });
        }
        return _url;
    }
    /**
     * @desc 解析动态参数获取最终参数值
     * @param 支持以下两类格式：
     * --------Function---------
     * function(){
     *   return {myKey1:'myVal1',myKey2:'myVal2'}
     * }
     * --------Obejct内嵌Function（一级）---------
     * {
     *    key0:"value0"
     *    ,key1:function(){
     *      return {key11:"value11"}
     *    }
     * }
     * 当参数中存在function，会执行并获取其值。
     * @return 最终返回简单格式的JSON对象
     */
    , getParams: function getParams(param) {
        var _otherParam = {};
        if (_.isFunction(param)) {
            return param.call();
        } else if (_.isPlainObject(param)) {
            _.forIn(param, function (propValue, propName) {
                if (_.isFunction(propValue)) {
                    _otherParam[propName] = propValue.call();
                } else {
                    _otherParam[propName] = propValue;
                }
            });
            return _otherParam;
        }
        return {};
    }
};

export default UrlUtils;