/**
 * 报价详情
 * Created by yonyou_zhuyhz on 2018/4/24.
 */
import {Accordion} from 'antd-mobile';
import React from 'react';
import {hashHistory} from 'react-router';
import ajax from 'utils/ajax';
import _ from 'lodash';
import DataUtil from 'utils/DataUtil';
import tenderUrl from '../tender-url';
import 'common/css/supplier.less';
import 'common/css/iconfont/iconfont.css';
import arrowNext from 'common/img/arrowNext.png';
import Fill from 'common/img/Fill.png';

let url = window.EnvConfig.ADDR;

class quote extends React.Component {
    constructor(props) {
        super();
        this.state = {
            backData:{},
            activeKey:['0','1','2','3'],
            clickActive: true,
        }
    }
    onChange = (key) => {
        this.setState({
            activeKey:key,
        })
    };

    //DOM节点初始化
    componentDidMount() {
        let schemeId,openId,currentCode;
        if(window.location.href.split('schemeId=')[1]){
            let cache = window.location.href.split('schemeId=')[1];
            schemeId = cache.split('&currentCode=')[0];
            let cache2 = cache.split('&currentCode=')[1];
            currentCode = cache2.split('&openId=')[0];
            openId = cache2.split('&openId=')[1];
        }
        let linkUrl = tenderUrl.QUERY_QUOTE_DETAIL + `?schemeId=${schemeId}&currentCode=${currentCode}&openId=${openId}`;
        // let linkUrl = tenderUrl.QUERY_QUOTE_DETAIL + `?schemeId=cf837f9c4842ffb3ec089c3c7b7a7c47&currentCode=8&openId=654321`;

        ajax.postJSON(linkUrl , null, (result) => {
            if (result.success && result.backData) {
                this.setState({
                    backData:result.backData
                });
            }
        });
    }

    //招标方式
    inviteType = (backData) => {
        let data = backData.replyVOs;
        if (data && data[0].inviteType && data[0].inviteType == '0') {
            return '公开招标';
        } else if (data && data[0].inviteType && data[0].inviteType == '1') {
            return '邀请招标'
        } else if (data && data[0].inviteType && data[0].inviteType == '2') {
            return '询价'
        } else if (data && data[0].inviteType && data[0].inviteType == '3') {
            return '应急采购'
        } else if (data && data[0].inviteType && data[0].inviteType == '4') {
            return '单一来源'
        } else {
            return '未填写';
        }
    };

    //预算金额
    ntotaltaxmny = (backData)=>{
        if (backData && backData.nbudgetmny) {
            return backData.nbudgetmny.toFixed(2);
        } else {
            return '未填写';
        }
    };

    //需求清单渲染列表
    requireList = (backData)=>{
        let data = backData.schemeDetailVOs;
        if(data){
            let list = data.map((item,index)=>{
                return(
                    <ul>
                        <li>{item.itemType&&item.itemType.name?item.itemType.name:'未填写'}</li>
                        <li>{item.itemName&&item.itemName.name?item.itemName.name:'未填写'}</li>
                        <li>{item.num?item.num:'未填写'}</li>
                        <li>{item.itemUnit&&item.itemUnit.name?item.itemUnit.name:'未填写'}</li>
                        <li>{item.npremny?item.npremny.toFixed(2):'未填写'}</li>
                    </ul>
                )
            });
            return list;
        }
    };

    //点击需求清单事件
    requireListClick = (backData)=>{
        hashHistory.push({
            pathname: '/quote/requireList',
        });
        DataUtil.localSessionRemove('quoteRequireList');
        DataUtil.localSessionSave('quoteRequireList', {
            data: backData.schemeDetailVOs,
        });
    };

    //供应商报价渲染列表
    quoteList = (backData)=>{
        let data = backData.replyVOs;
        if(data){
            let list = data.map((item,index)=>{
                return(
                    <ul>
                        <li className="quote-list-left quote-list-first">{item.companyId&&item.companyId.name?item.companyId.name:'未填写'}</li>
                        <li className="quote-list-second">{item.ntotaltaxmny?item.ntotaltaxmny.toFixed(2):'未填写'}</li>
                        <li className="quote-list-third">{this.createtime(item.createtime)}</li>
                        {this.attachMgr(backData,item)}
                    </ul>
                )
            });
            return list;
        }
    };

    //供应商报价中的附件
    attachMgr = (backData,item) => {
        if (item && item.companyId && item.companyId.id) {
            let id = item.companyId.id;
            let {accessoryMap} = backData;
            if(accessoryMap[id]){
                return (
                    <li onClick={this.attachMgrClick.bind(this,backData,item)} className="attach-mgr-color quote-list-fourth">
                        查看
                    </li>
                )
            }else{
                return (<li className="quote-list-fourth">无</li>)
            }
        }else{
            return (<li className="quote-list-fourth">无</li>)
        }
    };

    //点击供应商报价中的附件查看 跳到新页面
    attachMgrClick = (backData,item) => {
        if (item && item.companyId && item.companyId.id) {
            let id = item.companyId.id;
            let {accessoryMap} = backData;
            if (accessoryMap[id]) {
                if (_.isEqual(url, "http://127.0.0.1:8080")) {//处理本地环境调用usercenter服务
                    url = "https://dev.yonyouccs.com";
                }
                //判断类别,是否为office软件类别
                let src = url + '/' + accessoryMap[id].filePath;
                let testSrc = /http.*?(.doc|.docx|.xls|.xlsx|.ppt|.pptx)/gi.test(src);
                let testSrc2 = /http.*?(.pdf|.PDF)/gi.test(src);
                if (testSrc) {
                    //为office软件
                    src = encodeURIComponent(url + '/' + accessoryMap[id].filePath);
                    src = 'http://view.officeapps.live.com/op/view.aspx?src=' + src;
                    window.location.href = src;
                } else if (testSrc2) {
                    //为pdf
                    hashHistory.push({
                        pathname: '/quoteAttachPdf',
                    });
                    DataUtil.localSessionRemove('quotePdfSrc');
                    DataUtil.localSessionSave('quotePdfSrc', {
                        quotePdfSrc: src,
                    });
                }else{
                    window.location.href = src;
                }
            }
        }
    };

    //报价时间
    createtime = (data)=>{
        if(data){
            let v = data.slice(0,10);
            return v;
        }else{
            return '未填写';
        }
    };

    //附件查看跳转到新页面
    attachList = (backData)=>{
        hashHistory.push({
            pathname: '/quote/quoteAttachList',
        });
        DataUtil.localSessionRemove('quoteAttachList');
        DataUtil.localSessionSave('quoteAttachList', {
            data: backData.fsAttaches,
        });

        DataUtil.localSessionRemove('active_state');
        DataUtil.localSessionSave('active_state',true);
    };

    //返回顶部
    top = ()=>{
        window.scrollTo(0, 0);
    };

    render() {
        const {backData} = this.state;
        if(Object.keys(backData).length>0){
            return (
                <div width="100%">
                    <div className="quoteCard-top">
                        <div className="quoteCard-title">
                            <div
                                className="quoteCard-title-title">{backData.tenderVO && backData.tenderVO.billName ? backData.tenderVO.billName : '未填写'}</div>
                        </div>
                    </div>
                    <div className="quoteCard-infor">
                        <Accordion activeKey={this.state.activeKey} className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header="基本信息" className="infor">
                                <p><p className="infor1 first">单据编号</p><p
                                    className="infor2 first">{backData.tenderVO && backData.tenderVO.billCode ? backData.tenderVO.billCode : '未填写'}</p>
                                </p>
                                <p><p className="infor1">方案名称</p><p
                                    className="infor2">{backData.schemeName ? backData.schemeName : '未填写'}</p>
                                </p>
                                <p><p className="infor1">招标方式</p><p className="infor2">{this.inviteType(backData)}</p></p>
                                <p><p className="infor1">公司名称</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.company ? backData.tenderVO.company : '未填写'}</p>
                                </p>
                                <p><p className="infor1">采购人</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.psndocId ? backData.tenderVO.psndocId.name : '未填写'}</p>
                                </p>
                                <p><p className="infor1">采购部门</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.deptId ? backData.tenderVO.deptId.name : '未填写'}</p>
                                </p>
                                <p><p className="infor1">预算金额</p>
                                    <p className="infor2">
                                        <span>{this.ntotaltaxmny(backData)}</span> 元
                                    </p>
                                </p>
                                <p><p className="infor1">单据日期</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.billDate ? backData.tenderVO.billDate : '未填写'}</p>
                                </p>
                                <p><p className="infor1">备注</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.memo ? backData.tenderVO.memo : '未填写'}</p>
                                </p>
                            </Accordion.Panel>
                            <Accordion.Panel header="需求清单" className="infor require-list">
                                <div onClick ={this.requireListClick.bind(this,backData)}>
                                    <p className="tip">单击表格可打开详情界面查看全部物料信息。</p>
                                    <ul className="title">
                                        <li>分类</li>
                                        <li>名称</li>
                                        <li>数量</li>
                                        <li>单位</li>
                                        <li>预算金额</li>
                                    </ul>
                                    {backData?this.requireList(backData):null}
                                </div>
                            </Accordion.Panel>
                            <Accordion.Panel header="供应商报价" className="infor quote-list">
                                <div>
                                    <ul className="title">
                                        <li className="quote-list-first">报价企业</li>
                                        <li className="quote-list-second">总金额</li>
                                        <li className="quote-list-third">报价时间</li>
                                        <li className="quote-list-fourth">附件</li>
                                    </ul>
                                    {backData?this.quoteList(backData):null}
                                </div>
                            </Accordion.Panel>
                            <Accordion.Panel header="单据信息" className="infor">
                                <p>
                                    <span className="infor1 first">创建人</span>
                                    <span className="infor2 first">{backData.tenderVO && backData.tenderVO.creator ? backData.tenderVO.creator : '未填写'}</span>
                                </p>
                                <p>
                                    <span className="infor1">创建时间</span>
                                    <span className="infor2">{backData.tenderVO && backData.tenderVO.createtime?backData.tenderVO.createtime:'未填写'}</span>
                                </p>
                            </Accordion.Panel>
                            <div className="list-attach-mgr">
                                附件查看
                                <span onClick={this.attachList.bind(this,backData)} style={{backgroundImage:{arrowNext}}}>
                                    <img className="arrowNext" src={arrowNext}/>
                                    {/*<i className="iconfont icon-arrowNext-copy"></i>*/}
                                </span>
                            </div>
                            <div className="top" onClick={this.top}>
                                <img className="fill" src={Fill}/>
                                {/*<i className="iconfont icon-Fill"></i>*/}
                            </div>
                        </Accordion>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default quote;