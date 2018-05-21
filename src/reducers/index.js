/**
 * Created by
 */
import {combineReducers} from 'redux';
//注册路由组件需要的reducer
import { routerReducer } from 'react-router-redux';
import ReduxUtils from '../utils/ReduxUtils';
//注册参照组件需要的reducer
// var refinfo = require('yylib-ui/refer/reducers/refinfo');
// var bpm = require('yylib-business/bpmapprove/bpm/reducers/bpm');

/**
 * 将所有State组织成一个状态树来进行维护
 */
export default combineReducers({
    routing: routerReducer,
    // refinfo,
    // bpm,
});