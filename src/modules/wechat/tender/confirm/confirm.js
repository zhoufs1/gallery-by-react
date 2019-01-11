/**
 * 定标详情
 * Created by zhoufs1 on 2018/4/24.
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

class confirm extends React.Component {
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
        let linkUrl = tenderUrl.QUERY_CONFIRM_DETAIL + `?schemeId=${schemeId}&currentCode=${currentCode}&openId=${openId}`;
        // let linkUrl = tenderUrl.QUERY_CONFIRM_DETAIL + `?schemeId=4b68732d7c641f618454d711506e1bf1&currentCode=7&openId=654321`;
        // let linkUrl = tenderUrl.QUERY_CONFIRM_DETAIL + `?schemeId=81d00cb26663561cb649fae3b59ffa48&currentCode=7&openId=654321`;

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
    confirmList = (backData,data)=>{
        let v = data.detailList;
        if(v){
            let list = v.map((item,index)=>{
                return(
                    <ul>
                        <li>{item.itemName&&item.itemName.name?item.itemName.name:'未填写'}</li>
                        <li>{item.nwinnum?item.nwinnum:'未填写'}</li>
                        <li>{item.itemUnit&&item.itemUnit.name?item.itemUnit.name:'未填写'}</li>
                        <li>{item.ntaxprice?item.ntaxprice.toFixed(2):'未填写'}</li>
                        <li>{this.bidOffer(backData,data)}</li>
                    </ul>
                )
            });
            return list;
        }
    };

    //金额
    bidOffer = (backData,data)=>{
        if(backData.tenderVO && backData.tenderVO.detailList){
            let cache = backData.tenderVO.detailList;
            let list = cache.map((item,index)=>{
                if(item.socompanyId.id === data.companyId.id){
                    return item.bidOffer.toFixed(2);
                }
            })
            return list;
        }else{
            return '未填写';
        }
    }

    //点击需求清单事件
    confirmListClick = (backData)=>{
        hashHistory.push({
            pathname: '/confirm/confirmList',
        });
        DataUtil.localSessionRemove('quoteConfirmList');
        DataUtil.localSessionSave('quoteConfirmList', {
            data: backData,
        });
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
            pathname: '/confirm/confirmAttachList',
        });
        DataUtil.localSessionRemove('confirmAttachList');
        DataUtil.localSessionSave('confirmAttachList', {
            data: backData.fsAttaches,
        });
        DataUtil.localSessionRemove('active_state');
        DataUtil.localSessionSave('active_state',true);
    };

    //返回顶部
    top = ()=>{
        window.scrollTo(0, 0);
    };

    //定标列表
    comfirm = (backData)=>{
        let data = backData.replyVOs;
        if(data){
            let list = data.map((item,index)=>{
                return(
                    <div>
                        <p className="supplierName">{item&&item.companyId&&item.companyId.name?item.companyId.name:'未填写'}</p>
                        <ul className="title">
                            <li>物料名称</li>
                            <li>数量</li>
                            <li>单位</li>
                            <li>单价</li>
                            <li>总金额</li>
                        </ul>
                        {backData?this.confirmList(backData,item):null}
                    </div>
                )
            });
            return list;
        }
    }

    render() {
        const {backData} = this.state;
        if(Object.keys(backData).length>0){
            return (
                <div width="100%">
                    <div className="quoteCard-top">
                        <div className="quoteCard-title">
                            <div
                                className="quoteCard-title-title">定标</div>
                        </div>
                    </div>
                    <div className="quoteCard-infor">
                        <Accordion activeKey={this.state.activeKey} className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header="基本信息" className="infor">
                                <p><p className="infor1 first">单据编号</p><p
                                    className="infor2 first">{backData.tenderVO && backData.tenderVO.billCode ? backData.tenderVO.billCode : '未填写'}</p>
                                </p>
                                <p><p className="infor1">单据日期</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.billDate ? backData.tenderVO.billDate : '未填写'}</p>
                                </p>
                                <p><p className="infor1">标题</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.billName ? backData.tenderVO.billName : '未填写'}</p>
                                </p>
                                <p><p className="infor1">招标方式</p><p className="infor2">{this.inviteType(backData)}</p></p>
                                <p><p className="infor1">公司名称</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.company ? backData.tenderVO.company : '未填写'}</p>
                                </p>
                                <p><p className="infor1">联系人</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.psndocId ? backData.tenderVO.psndocId.name : '未填写'}</p>
                                </p>
                                <p><p className="infor1">部门</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.deptId ? backData.tenderVO.deptId.name : '未填写'}</p>
                                </p>
                                <p><p className="infor1">备注</p><p
                                    className="infor2">{backData.tenderVO && backData.tenderVO.memo ? backData.tenderVO.memo : '未填写'}</p>
                                </p>
                            </Accordion.Panel>
                            <Accordion.Panel header="定标情况" className="infor require-list">
                                <p className="tip">单击表格可打开详情界面查看全部物料信息。</p>
                                <div onClick ={this.confirmListClick.bind(this,backData)}>
                                    {this.comfirm(backData)}
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
                                </span>
                            </div>
                            <div className="top" onClick={this.top}>
                                <img className="fill" src={Fill}/>
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

export default confirm;