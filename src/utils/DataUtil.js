'use strict';

/**
 * Created by wuhao on 2016/11/10.
 */
let _ = require('lodash');
let Cookies = require('js-cookie');
window._yylib_global_cache_ = {};

let DataUtil = {
    // 获取内存存储的数据
    getCache: function getCache(key) {
        return window._yylib_global_cache_[key];
    },
    // 保存数据到内存存储
    setCache: function setCache(key, value) {
        window._yylib_global_cache_[key] = value;
    },
    // 从内存存储中移除数据
    removeCache: function removeCache(key) {
        delete window._yylib_global_cache_[key];
    }
    // 保存本地存储数据
    , localSave: function localSave(key, data) {
        if (!window.localStorage) return;
        window.localStorage.setItem(key, _.isPlainObject(data) || _.isArray(data) ? JSON.stringify(data) : data);
    }
    // 根据key删除本地存储的数据
    , localRemove: function localRemove(keys) {
        if (!window.localStorage) return;
        if (_.isArray(keys)) {
            for (let idx in keys) {
                window.localStorage.removeItem(keys[idx]);
            }
        } else {
            window.localStorage.removeItem(keys);
        }
    }
    // 读取本地存储的数据
    , localRead: function localRead(key) {
        if (!window.localStorage) return;
        return window.localStorage[key] ? window.localStorage[key] : null;
    }
    // 读取本地存储的数据为object对象
    , localReadObject: function localReadObject(key) {
        if (!window.localStorage) return;
        return window.localStorage[key] ? JSON.parse(window.localStorage[key]) : null;
    }
    // 读取cookie中的数据
    , getCookie: function getCookie(key) {
        return Cookies.get(key);
    }
    // 保存数据到cookies，options 可选项 { expires: 7, path: '',domain: 'subdomain.site.com' }
    , setCookie: function setCookie(key, value, options) {
        return Cookies.set(key, value, options);
    }
    // 从cookies中移除数据，options 可选项 { path: '' }
    , removeCookie: function removeCookie(key, options) {
        return Cookies.remove(key, options);
    }
    // 保存到sessionStorage存储数据
    , localSessionSave: function localSave(key, data) {
        if (!window.sessionStorage) return;
        window.sessionStorage.setItem(key, _.isPlainObject(data) ? JSON.stringify(data) : data);
    },
    localSessionRemove: function localRemove(keys) {
        if (!window.sessionStorage) return;
        if (_.isArray(keys)) {
            for (let idx in keys) {
                window.sessionStorage.removeItem(keys[idx]);
            }
        } else {
            window.sessionStorage.removeItem(keys);
        }
    },
    localSessionRead: function localRead(key) {
        if (!window.sessionStorage) return;
        return window.sessionStorage[key] ? window.sessionStorage[key] : null;
    },
    localSessionReadObject: function localReadObject(key) {
        if (!window.sessionStorage) return;
        return window.sessionStorage[key] ? JSON.parse(window.sessionStorage[key]) : null;
    }
};

module.exports = DataUtil;