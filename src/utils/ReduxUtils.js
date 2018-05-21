/**
 * Created by
 * 基于Redux的动作处理
 */

import {connect} from 'react-redux';

import _ from 'lodash';
//通过dispatch扩展组件props对象属性
function _mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        //发送一个动作指令
        sendAction: function sendAction() {
            dispatch(ReduxUtils.createAction.apply(this, arguments));
        }
    };
}
var ReduxUtils = {
    //标识封装的动作指令
    ACTION_KEY: "__REDUX_SEND_ACTION_DATA__"
    //标识外部未知的动作指令
    , UNKNOW_ACTION_KEY: "__REDUX_SEND_ACTION_UNKNOW__"
    /**
     * 将动作与组件进行连接
     * @param reactClass React组件
     * @param mapStateToProps 新状态映射给组件属性的回调函数
     * @param mapDispatchToProps 扩展组件属性的回调函数
     */
    , connectAction: function connectAction(reactClass, mapStateToProps, mapDispatchToProps) {
        return connect(mapStateToProps, function (dispatch) {
            var _props = _mapDispatchToProps(dispatch);
            if (_.isFunction(mapDispatchToProps)) {
                _props = _.assign(_props, mapDispatchToProps(dispatch));
            }
            return _props;
        })(reactClass);
    }
    //创建一个动作指令
        , createAction: function createAction(key) {
        var actionKey = arguments[0]; //动作指令标识
        if (!actionKey) {
            console.error('调用sendAction方法，需要将动作指令名称{string}作为第一个参数值');
            return { "type": ReduxUtils.UNKNOW_ACTION_KEY };
        }
        //除动作指令标识以外的其它参数
        var actionArgs = [];
        for (var i = 1; i < arguments.length; i++) {
            actionArgs.push(arguments[i]);
        }
        //构建动作指令包
        var newAction = {};
        newAction.type = ReduxUtils.ACTION_KEY;
        newAction.actionKey = actionKey;
        newAction.actionArgs = actionArgs;
        return newAction;
    }
    //监听接收到的动作
    , listenActions: function listen(actions) {
        return function () {
            var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var action = arguments.length <= 1 || arguments[1] === undefined ? { type: null, actionKey: null, actionArgs: [] } : arguments[1];

            if (action.type === ReduxUtils.ACTION_KEY) {
                //当前动作指令对应的处理函数
                var actionFunc = actions[action.actionKey];
                if (_.isFunction(actionFunc)) {
                    //将当前state和本动作相关的参数传递给动作处理函数
                    var callArgs = [state].concat(action.actionArgs);
                    //获取动作处理函数返回的新状态
                    var newState = actionFunc.apply(this, callArgs);
                    //如果动作处理函数无返回结果则返回原始状态，否则返回新状态
                    return newState === undefined ? state : newState;
                } else {
                    return state;
                }
            } else {
                return state;
            }
        };
    }
};

export default ReduxUtils;