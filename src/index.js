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
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
// 增加页面权限控制
import { Router, hashHistory } from 'react-router';
//初始化store
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

//高清组件显示
window.document.documentElement.style.fontSize = window.innerWidth * 100 / 500 + 'px';//新增

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
    , window.document.getElementById('root')
);
registerServiceWorker();
