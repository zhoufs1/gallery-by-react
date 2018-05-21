/**
 * 找供应商卡片
 * Created by yonyou_zhuyhz on 2018/4/2.
 */
import {Accordion} from 'antd-mobile';
import React from 'react';
import ajax from 'utils/ajax';
import formatUtils from 'utils/formatUtils';
import _ from 'lodash';
import logo from 'common/img/companyLogo.png';
import '../../../common/css/supplier.less';
import logo1 from '../../../common/img/2.png';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';

let that;
let url = window.EnvConfig.ADDR;
if (_.isEqual(url, "http://127.0.0.1:8080")) {//处理本地环境调用usercenter服务
    // url = "http://127.0.0.1:8083";
    url = "https://dev.yonyouccs.com";
}

class supcard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            backData:{},
            activeKey:['0','1','2'],
        }
    }
    onChange = (key) => {
        this.setState({
            activeKey:key,
        })
    };

    //DOM节点初始化
    componentDidMount() {
        that = this;
        let companyId = window.location.href.split('?id=')[1];
        let linkUrl = url + `/icop-supplier-web/supplier/base/queryDetailByWeChat?companyId=${companyId}`;
        ajax.postJSON(linkUrl , null, (result) => {
            if (result.success && result.backData) {
                this.setState({
                    backData:result.backData
                });
            }
        });
    }

    //logo
    logoPic = (backData) => {
        if(Object.keys(backData).length > 0){
            let newsLogoUrl = '';
            if (backData.type && backData.type.logoPath && backData.type.logoName) {
                newsLogoUrl = url + '/' + backData.type.logoPath;
            } else{
                newsLogoUrl = logo;
            }
            return newsLogoUrl;
        }
    };

    //公司性质
    companyNature = (backData) => {
        if (backData.corporate && backData.corporate.companyNature == '1') {
            return '国资';
        } else if (backData.corporate && backData.corporate.companyNature == '2') {
            return '民营'
        } else {
            return '未填写';
        }
    };

    //注册日期 和 发证日期
    trsDate = (data) => {
        if (data) {
            let time = formatUtils.formatAntDate(new Date(data),'yyyy-MM-dd');
            return time;
        }else {
            return '未填写';
        }
    };

    //纳税人身份
    taxPayerType = (backData) => {
        if (backData.corporate && backData.corporate.taxPayerType == '0') {
            return '一般纳税人';
        } else if (backData.corporate && backData.corporate.taxPayerType == '1') {
            return '小规模纳税人'
        } else {
            return '未填写';
        }
    };

    //供应商类型
    supplierType = (backData) => {
        if (backData.type && backData.type.supplierType) {
            let str = '';
            let v = backData.type.supplierType;
            if (v) {
                let data = v.split(',');
                _.forEach(data, (val) => {
                    if (str == '') {
                        switch (val) {
                            case '0':
                                str = '物资';
                                break;
                            case '1':
                                str = '设备';
                                break;
                            case '2':
                                str = '劳务';
                                break;
                            case '3':
                                str = '专业';
                                break;
                            case '4':
                                str = '其他';
                                break;
                        }
                    } else {
                        switch (val) {
                            case '0':
                                str = str + ',' + '物资';
                                break;
                            case '1':
                                str = str + ',' + '设备';
                                break;
                            case '2':
                                str = str + ',' + '劳务';
                                break;
                            case '3':
                                str = str + ',' + '专业';
                                break;
                            case '4':
                                str = str + ',' + '其他';
                                break;
                        }
                    }
                })
            }
            return str;
        }else {
            return '未填写';
        }
    };

    //供货内容的内容
    suplyCont = (data) => {
        if (data) {
            let suplyCont = renderSupContent(data);
            return suplyCont;
        }else {
            return '未填写';
        }
    };

    //供货内容标签是否显示
    isShow = (backData, v) => {
        let data = backData.type ? backData.type : null;
        if (data) {
            if ((data.matSuplyCont && v == '0') || (data.devSuplyCont && v == '1') || (data.labSuplyCont && v == '2')
                || (data.majSuplyCont && v == '3') || (data.othSuplyCont && v == '4')) {
                return {display: "block"};
            } else {
                return {display: "none"};
            }
        } else {
            return {display: "none"};
        }
    };

    //缩略图
    getThumbnailContent = (item) => {
        return (
            //小图
            <img style={{zIndex:item.index,position: 'absolute', top:'2.62rem', left:0,border:'1px solid rgba(65, 70, 85, 0.5)'}}
                 src={item.thumbnail} width={window.innerWidth * 0.4267} height={window.innerWidth * 0.32}/>
        );
    };
    getThumbnailContent2 = (item2) => {
        return (
            //小图
            <img style={{zIndex:item2.index,position: 'absolute',top:'2.62rem',right:0,border:'1px solid rgba(65, 70, 85, 0.5)'}}
                 src={item2.thumbnail} width={window.innerWidth * 0.4267} height={window.innerWidth * 0.32}/>
        );
    };

    //企业证照图的items
    items = (backData,v) => {
        if(backData && backData.documentFsAttachList && backData.documentFsAttachList.length>0 && v=='1'){
            let arr = [];
            const arrPic1 = backData.documentFsAttachList.map((item,index)=>{
                //大图
                arr.push({
                    src: url + '/' + item.filePath,
                    thumbnail: url + '/' + item.filePath,
                    index: 99 - index,
                    w: 1200,
                    h: 900,
                    title: that.title(item.sourceType),
                });
                return arr;
            });
            return arrPic1[0];
        }else {
            return [{
                src: logo1,
                thumbnail: logo1,
                index: 10,
                w: 1200,
                h: 900,
                title: '未上传图片',
            }]
        }
    };

    //资质信用的items
    items2 = (backData,v) => {
        if(backData && backData.qualificateFsAttachList && backData.qualificateFsAttachList.length>0 && v=='2'){
            let arr2 = [];
            const arrPic2 = backData.qualificateFsAttachList.map((item,index)=>{
                //大图
                arr2.push({
                    src: url + '/' + item.filePath,
                    thumbnail: url + '/' + item.filePath,
                    index: 88 - index,
                    w: 1200,
                    h: 900,
                    title: that.title(item.sourceType),
                });
                return arr2;
            });
            return arrPic2[0];
        } else {
            return [{
                src: logo1,
                thumbnail: logo1,
                index: 10,
                w: 1200,
                h: 900,
                title: '未上传图片',
            }]
        }
    };

    //缩略图options
    options = {
        getThumbBoundsFn:function(index) {
            //留空抵消到底层代码的弹出位置
            // return {x: 1, y: 2 + 3, w: 4};
        }
    };

    //图片放大后的名字
    title = (v)=>{
        if (v === 'Y023') {
            return '社会信用证件电子版';
        } else if (v === 'Y005') {
            return '营业执照证件电子版';
        } else if (v === 'Y007') {
            return '组织机构代码证电子版';
        } else if (v === 'Y008') {
            return '税务登记证电子版';
        } else if (v === 'Y006') {
            return '公司授权书';
        } else if (v === 'bankGrade') {
            return '银行信用等级';
        } else if (v === 'CompanyGrade') {
            return '工商企业信用等级';
        } else if (v === 'taxGrade') {
            return '纳税信用等级';
        } else if (v === 'accountingGrade') {
            return '财务会计信用等级';
        } else if (v === 'credit') {
            return '资质证书(正、副本)';
        } else if (v === 'productPermission') {
            return '安全生产许可证(正、副本)';
        } else if (v === 'proxy') {
            return '代理资格证明';
        } else if (v === 'quality') {
            return '质量认证体系证书';
        } else if (v === 'safety') {
            return '职业健康安全认证体系证书';
        } else if (v === 'environment') {
            return '环境管理认证体系证书';
        } else if (v === 'ouTown') {
            return '外阜企业管理手续相关文件';
        } else if (v === 'sale') {
            return '销售许可证(特殊物资设备供应商)';
        } else if (v === 'produce') {
            return '产品生产许可证';
        } else if (v === 'openAccount') {
            return '银行开户许可证';
        } else if (v === 'other') {
            return '其他资料';
        }
    };


render() {
        const {backData} =  this.state;
        return(
            <div width="100%">
                <div className="card-logo"><img src={this.logoPic(backData)} alt=""/></div>
                <div className="card-top">
                    <div className="card-title">{backData.type?backData.type.companyId.name:null}</div>
                    <div className="card-little-title">已被 <span>{backData.type&&backData.type.storageNum?backData.type.storageNum:0}</span> 家采购商入库</div>
                </div>
                <div className="card-infor" style={{ marginBottom: 40 }}>
                    <Accordion activeKey={this.state.activeKey} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="基本信息" className="pad infor">
                            <p><p className="infor1 first">公司电话</p><p className="infor2 first">{backData.corporate&&backData.corporate.companyPhone?backData.corporate.companyPhone:'未填写'}</p></p>
                            <p><p className="infor1">详细地址</p><p className="infor2">{backData.corporate&&backData.corporate.companyAddress?backData.corporate.companyAddress:'未填写'}</p></p>
                            <p><p className="infor1">公司性质</p><p className="infor2">{this.companyNature(backData)}</p></p>
                            <p><p className="infor1">法人代表</p><p className="infor2">{backData.corporate?backData.corporate.legalRepresentative:'未填写'}</p></p>
                            {/*<p><p className="infor1">注册资金</p><p className="infor2"><span>{backData.corporate&&backData.corporate.zijin?backData.corporate.zijin:0}</span> 万</p></p>*/}
                            <p><p className="infor1">注册日期</p><p className="infor2">{backData.corporate&&backData.corporate.establishedDate?this.trsDate(backData.corporate.establishedDate):'未填写'}</p></p>
                            <p><p className="infor1">纳税人身份</p><p className="infor2">{this.taxPayerType(backData)}</p></p>
                        </Accordion.Panel>
                        <Accordion.Panel header="业务信息" className="pad infor">
                            <p>
                                <span className="infor1 infor3 first">年营业额</span>
                                <span className="infor2 infor4 first">
                                    <span>
                                        {backData.corporate && backData.corporate.annualTurnover ? backData.corporate.annualTurnover : 0}
                                    </span> 万元
                                </span>
                            </p>
                            <p>
                                <span className="infor1 infor3">供应商类型</span>
                                <span className="infor2 infor4">{this.supplierType(backData)}</span>
                            </p>
                            <p style={this.isShow(backData,'0')}>
                                <span className="infor1 infor3">物资供货内容</span>
                                <span className="infor2 infor4">{backData.type&&backData.type.matSuplyCont?this.suplyCont(backData.type.matSuplyCont):null}</span>
                            </p>
                            <p style={this.isShow(backData,'1')}>
                                <span className="infor1 infor3">设备供货内容</span>
                                <span className="infor2 infor4">{backData.type&&backData.type.devSuplyCont?this.suplyCont(backData.type.devSuplyCont):null}</span>
                            </p>
                            <p style={this.isShow(backData,'2')}>
                                <span className="infor1 infor3">劳务供货内容</span>
                                <span className="infor2 infor4">{backData.type&&backData.type.labSuplyCont?this.suplyCont(backData.type.labSuplyCont):null}</span>
                            </p>
                            <p style={this.isShow(backData,'3')}>
                                <span className="infor1 infor3">专业供货内容</span>
                                <span className="infor2 infor4">{backData.type&&backData.type.majSuplyCont?this.suplyCont(backData.type.majSuplyCont):null}</span>
                            </p>
                            <p style={this.isShow(backData,'4')}>
                                <span className="infor1 infor3">其他供货内容</span>
                                <span className="infor2 infor4">{backData.type&&backData.type.othSuplyCont?this.suplyCont(backData.type.othSuplyCont):null}</span>
                            </p>
                        </Accordion.Panel>
                        <Accordion.Panel header="证件信息" className="pad infor">
                            <p><span className="infor1 first infor5">社会信用统一代码</span><span className="infor2 first infor6">{backData.corporate&&backData.corporate.creditCode?backData.corporate.creditCode:'未填写'}</span></p>
                            <p><span className="infor1 infor5">发证日期</span><span className="infor2 infor6">{backData.corporate&&backData.corporate.creditDate?this.trsDate(backData.corporate.creditDate):'未填写'}</span></p>
                            <p><span className="infor1 infor5">营业执照号</span><span className="infor2 infor6">{backData.corporate&&backData.corporate.businessLicence?backData.corporate.businessLicence:'未填写'}</span></p>
                            <p><span className="infor1 infor5">组织机构代码</span><span className="infor2 infor6">{backData.corporate&&backData.corporate.organizationCode?backData.corporate.organizationCode:'未填写'}</span></p>
                            <p><span className="infor1 infor5">纳税人识别码</span><span className="infor2 infor6">{backData.compBill&&backData.compBill.taxpayerIdNum?backData.compBill.taxpayerIdNum:'未填写'}</span></p>
                            <p><span className="infor1 infor5">税务登记证发证日期</span><span className="infor2 infor6">{backData.corporate&&backData.corporate.taxDate?this.trsDate(backData.corporate.taxDate):'未填写'}</span></p>
                            <div className="pic-box">
                                <div className="cache1">企业证照（{backData.documentFsAttachList?backData.documentFsAttachList.length:0}）</div>
                                <div className="cache2">资质信用（{backData.qualificateFsAttachList?backData.qualificateFsAttachList.length:0}）</div>
                                <PhotoSwipeGallery options={this.options} items={this.items(backData,'1')} thumbnailContent={this.getThumbnailContent.bind(this)}/>
                                <PhotoSwipeGallery options={this.options} items={this.items2(backData,'2')} thumbnailContent={this.getThumbnailContent2.bind(this)}/>
                            </div>
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}
let renderSupContent = function (suplyContList) {
    let retArr = '';
    _.forEach(suplyContList,function (suplyCont) {
        if(retArr==''){
            retArr= retArr + suplyCont.name;
        }
        else {
            retArr = retArr + ',' + suplyCont.name;
        }
    });
    return retArr;
};

export default supcard;