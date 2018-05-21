/**
 * Created by yonyou_zhuyhz on 2018/4/2.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
const LazyPageRoutes = asyncComponent(() => import('./page-routes'));
const suplist = asyncComponent(() => import('../modules/wechat/supplier/suplist'));
const supcard = asyncComponent(() => import('../modules/wechat/supplier/supcard'));

export default
([<Route>
    <Route key="001003" path="suplist" component={LazyPageRoutes}>
        <IndexRoute component={suplist}/>
    </Route>
    <Route key="001004" path="suplist/card" component={LazyPageRoutes}>
        <IndexRoute component={supcard}/>
    </Route>
</Route>])