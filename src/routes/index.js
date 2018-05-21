/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
import demo from './demo-router';
import tender from './tender-router';
import sup from './sup-router';

const App = asyncComponent(() => import('../App'));//主应用
const MenuGrid = asyncComponent(() => import('../grids/menu'));//主菜单


let groupRouter = [
    <IndexRoute key='001' component={MenuGrid}></IndexRoute>,
    ...demo,
    ...tender,
    ...sup,
];
export default
    <Route path="/" component={App}>
        {groupRouter}
    </Route>