/**
 * Created by zhoufs1 on 2018/4/10.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
import tender from './tender-router';

const App = asyncComponent(() => import('../App'));//主应用
const MenuGrid = asyncComponent(() => import('../grids/menu'));//主菜单


let groupRouter = [
    <IndexRoute key='001' component={MenuGrid}></IndexRoute>,
    tender[0],
];
export default
<Route path="/" component={App}>
    {groupRouter}
</Route>