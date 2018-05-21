import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';
//获取路由信息
import routes from './routes';
import excludesRouters from './routes/excludes-router';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash';
// 增加页面权限控制
import RestUrl from './common/RestUrl';
import AuthToken from "./utils/AuthToken";
import { Router, hashHistory } from 'react-router';
//初始化store
const store = configureStore();
const URL_WORKBENCH = RestUrl.URL_WORKBENCH;
const URL_HOME_PORTAL = RestUrl.URL_HOME_PORTAL;
const history = syncHistoryWithStore(hashHistory, store);

//高清组件显示
window.document.documentElement.style.fontSize = window.innerWidth * 100 / 500 + 'px';//新增

const excludeHash = ['#/notice'];//不被前台登录拦截的页面（筑云采首页）
const portalOptions = {};
portalOptions.authentication = false;
portalOptions.url = URL_WORKBENCH;
portalOptions.wechat = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {excludesRouters}
            </Router>
        </Provider>
        , window.document.getElementById('root')
    );
};
portalOptions.success = function () {
    portalOptions.authentication = true;
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
        , window.document.getElementById('root')
    );
};
portalOptions.error = function () {
    window.setTimeout(function () {
        if (portalOptions.authentication === false && !_.includes(excludeHash, window.location.hash.substring(0, 8))) {
            window.location.href = URL_HOME_PORTAL;
        }else {
            ReactDOM.render(
                <Provider store={store}>
                    <Router history={history}>
                        {routes}
                    </Router>
                </Provider>
                , window.document.getElementById('root')
            );
        }
    }, 1000);
};
AuthToken.init(portalOptions);
// registerServiceWorker();
