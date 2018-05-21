'use strict';
/**
 * Created by wanghh on 2017/8/7.
 * 适用于移动组ICOP项目
 */
import sa from 'superagent'
import { Toast} from 'antd-mobile';
import ajax from './ajax'
//处理MA请求
export function getMAJSON(url, data, success, error) {
    ajax.getText(url,data,function(data){
        var data = JSON.parse(data);//返回数据转json
        if (data.flag && data.flag == '0') {//flag为0成功
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(error.text, 1);
            }
        } else {////flag为1、为空、undifine失败
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data);
                Toast.fail(data.desc, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.desc, 1);
            }
        }
    },error)
}
export function getICOPJSON(url, data, success, error) {
    ajax.getJSON(url,data,function(data){
        if (data.success && data.success == true) {
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.backData);
            } else {
                //如果没有则输出返回参数
                console.log(data.backData);
                Toast.success(data.backMsg, 1);
            }
        } else {
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data.backData);
                Toast.fail(data.backMsg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.backMsg, 1);
            }
        }
    },error)
}
export function getICOPJSON2(url, data, success, error) {
    ajax.getJSON(url,data,function(data){
        if (data.code && data.code == 'success') {
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(data.data, 1);
            }
        } else {
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data.data);
                Toast.fail(data.msg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.msg, 1);
            }
        }
    },error)
}
export function postMAJSON(url, data, success, error) {
    ajax.postText(url,data,function(data){
        var data = JSON.parse(data);//返回数据转json
        if (data.flag && data.flag == '0') {//flag为0成功
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(error.text, 1);
            }
        } else {////flag为1、为空、undifine失败
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                Toast.fail(data.desc, 1);
                error(data);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.desc, 1);
            }
        }
    },error)
}
export function postMAJSON2(url, data, success, error) {
    ajax.postText(url,data,function(data){
        var data = JSON.parse(data);//返回数据转json
        if (data.code && data.code == 'success') {//flag为0成功
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(data.code, 1);
            }
        } else {////flag为1、为空、undifine失败
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                Toast.fail(data.msg, 1);
                error(data);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.msg, 1);
            }
        }
    },error)
}
export function postICOPJSON(url, data, success, error) {
    ajax.postJSON(url,data,function(data){
        if (data.success && data.success == true) {
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.backData);
            } else {
                //如果没有则输出返回参数
                console.log(data.backData);
                Toast.success(data.backMsg, 1);
            }
        } else {
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data.backData);
                Toast.fail(data.backMsg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.backMsg, 1);
            }
        }
    },error)
}
export function postICOPText(url, data, success, error) {
    ajax.postText(url,data,function(data){
        var data = JSON.parse(data);//返回数据转json
        if (data.success && data.success == true) {
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.backData||data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.backData||data.data);
                Toast.success(data.backMsg||data.msg, 1);
            }
        } else {
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data.backData||data.data);
                Toast.fail(data.backMsg||data.msg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.backMsg||data.msg, 1);
            }
        }
    },error)
}
export function postICOPForm(url, data, success, error) {
    ajax.postForm(url,data,function(data){
        if (data.success && data.success == true) {
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.backData);
            } else {
                //如果没有则输出返回参数
                console.log(data.backData);
                Toast.success(data.backMsg, 1);
            }
        } else {
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data.backData);
                Toast.fail(data.backMsg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.backMsg, 1);
            }
        }
    },error)
}
/**
 *  superagent回调 ICOP使用
 *  @param err sa返回的错误信息
 *  @param res sa返回的成功信息
 *  @param success 成功回调
 *  @param error 失败回调
 */
function callback(err, res, success, error) {
    //接口获取异常失败（flag为1也是成功）
    if (err || res && res.badRequest) {
        if (typeof error == 'function') {
            //如果有外部的错误异常处理则使用外部的
            error(res);
        } else {
            //如果没有则使用内部默认的异常处理
            Toast.fail(err.message, 1);
        }
    }
    //接口获取成功
    if (res && res.ok) {
        let data = JSON.parse(res.text);//返回数据转json
        if (data.code && data.code == 'success') {//code success
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(res.text, 1);
            }
        } else {//code失败
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data);
                Toast.fail(data.msg, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.msg, 1);
            }
        }
    }
}

//用于请求token，无权限
export function postNoAuth(url, data, success, error) {
    sa.post(url)
        .send(data)
        .end(function (err, res) {
            callbackMa(err, res, success, error)
        });
}
/**
 *  superagent回调 MA使用
 *  @param err sa返回的错误信息
 *  @param res sa返回的成功信息
 *  @param success 成功回调
 *  @param error 失败回调
 */
function callbackMa(err, res, success, error) {
    //接口获取异常失败（flag为1也是成功）
    if (err || res && res.badRequest) {
        if (typeof error == 'function') {
            //如果有外部的错误异常处理则使用外部的
            error(res);
        } else {
            //如果没有则使用内部默认的异常处理
            Toast.fail(err.message, 1);
        }
    }
    //接口获取成功
    if (res && res.ok) {
        let data = JSON.parse(res.text);//返回数据转json
        if (data.flag && data.flag == '0') {//flag为0成功
            //如果有外部的成功回调则使用外部的
            if (typeof success == 'function') {
                success(data.data);
            } else {
                //如果没有则输出返回参数
                console.log(data.data);
                Toast.success(res.text, 1);
            }
        } else {////flag为1、为空、undifine失败
            //如果有外部的错误异常处理则使用外部的
            if (typeof error == 'function') {
                error(data);
                Toast.fail(data.desc, 1);
            } else {
                //如果没有则使用内部默认的异常处理
                Toast.fail(data.desc, 1);
            }
        }
    }
}
