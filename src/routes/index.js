/**
 * 路由配置
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
import demo from './demo-router';
import tender from './tender-router';
import sup from './sup-router';
import only from '../modules/only/only.js';
import home from '../modules/home/index.jsx';
import love from '../modules/home/words/love';
import CanvasDemo from '../modules/demo/CanvasDemo';

const App = asyncComponent(() => import('../App'));//主应用
const MenuGrid = asyncComponent(() => import('../grids/menu'));//主菜单

let groupRouter = [
    <IndexRoute key='001' component={MenuGrid}></IndexRoute>,
    <Route key="0010011" path="only" component={only}/>,
    <Route key="0010012" path="home" component={home}/>,
    <Route key="0010013" path="love" component={love}/>,
    <Route key="0010014" path="canvasDemo" component={CanvasDemo}></Route>,
    ...demo,
    ...tender,
    ...sup,
];
export default <Route path="/" component={App}>
    {groupRouter}
</Route>