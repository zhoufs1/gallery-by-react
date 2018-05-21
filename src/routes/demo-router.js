import React from 'react';
import {Route, IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
const LazyPageRoutes = asyncComponent(() => import('./page-routes'));
const ListDemo = asyncComponent(() => import('../modules/demo/demo'));
const ListDemo2 = asyncComponent(() => import('../modules/demo/demo2'));

export default
([<Route>
    <Route key="001001" path="demo" component={LazyPageRoutes}>
        <IndexRoute component={ListDemo}/>
    </Route>
    <Route key="001002" path="demo2" component={LazyPageRoutes}>
        <IndexRoute component={ListDemo2}/>
    </Route>
</Route>])