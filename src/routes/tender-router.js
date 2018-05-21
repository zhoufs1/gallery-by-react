/**
 * Created by zhoufs1 on 2018/4/2.
 */
import React from 'react';
import {Route,IndexRoute} from 'react-router';
import asyncComponent from '../utils/asyncLoader';
const LazyPageRoutes = asyncComponent(() => import('./page-routes'));
const notice = asyncComponent(() => import('../modules/wechat/tender/notice/notice'));
const nodetail = asyncComponent(() => import('../modules/wechat/tender/notice/nodetail'));
const windetail = asyncComponent(() => import('../modules/wechat/tender/win/windetail'));
const quote = asyncComponent(() => import('../modules/wechat/tender/quote/quote'));
const confirm = asyncComponent(() => import('../modules/wechat/tender/confirm/confirm'));
const requireList = asyncComponent(() => import('../modules/wechat/tender/quote/requireList'));
const quoteAttachList = asyncComponent(() => import('../modules/wechat/tender/quote/quoteAttachList'));
const confirmList = asyncComponent(() => import('../modules/wechat/tender/confirm/confirmList'));
const confirmAttachList = asyncComponent(() => import('../modules/wechat/tender/confirm/confirmAttachList'));
const quoteAttachPdf = asyncComponent(() => import('../modules/wechat/tender/quote/quoteAttachPdf'));
const confirmAttachPdf = asyncComponent(() => import('../modules/wechat/tender/confirm/confirmAttachPdf'));

export default
([<Route path='notice' component={LazyPageRoutes}>
    <IndexRoute component={notice}/>
    <Route path='card' component={nodetail}/>
</Route>,
    <Route path='windetail' component={LazyPageRoutes}>
        <IndexRoute component={windetail}/>
    </Route>,
    <Route path='quote' component={LazyPageRoutes}>
        <IndexRoute component={quote}/>
        <Route path='requireList' component={requireList}/>
        <Route path='quoteAttachList' component={quoteAttachList}/>
    </Route>,
    <Route path='confirm' component={LazyPageRoutes}>
        <IndexRoute component={confirm}/>
        <Route path='confirmList' component={confirmList}/>
        <Route path='confirmAttachList' component={confirmAttachList}/>
    </Route>,
    <Route path='quoteAttachPdf' component={LazyPageRoutes}>
        <IndexRoute component={quoteAttachPdf}/>
    </Route>,
    <Route path='confirmAttachPdf' component={LazyPageRoutes}>
        <IndexRoute component={confirmAttachPdf}/>
    </Route>,
])