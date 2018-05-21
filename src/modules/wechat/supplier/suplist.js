/**
 * 找供应商列表
 * Created by yonyou_zhuyhz on 2018/4/2.
 */
import {SearchBar, WhiteSpace,Modal} from 'antd-mobile';
import React from 'react';
import ajax from 'utils/ajax';
import _ from 'lodash';
import '../../../common/css/supplier.less';
import assign from 'lodash/assign';
import formatUtils from 'utils/formatUtils';
import AuthToken from 'utils/AuthToken';
let fiveData = '',queryScheme = {},linkUrl = '',that;
let queryFiveLei, queryCompany = {}, pagination = {};
let url = window.EnvConfig.ADDR;
if (_.isEqual(url, "http://127.0.0.1:8080")) {//处理本地环境调用usercenter服务
    // url = "http://127.0.0.1:8083";
    url = "https://dev.yonyouccs.com";
}

class suplist extends React.Component {
    constructor(){
        super();
        this.state = {
            content:{},
            value:'',
            showCancelButton :false,
            isListShow:true,
            fiveLeiLight:[false,false,false,false,false],
            height:0,
            checkHeight:false,
        };
    }

    //DOM节点初始化
    componentDidMount() {
        that = this;
        let userId = AuthToken.getUserId();
        let checkUrl = url + `/icop-supplier-web/supplier/base/checkEnterpriseType?userId=${userId}`;
        ajax.postJSON(checkUrl, null, (result) => {
            if (result.success) {
                if (result.backData == '0' || result.backData == '0,1') {
                    linkUrl = url + `/icop-supplier-web/supplier/base/enterprise/queryListByWeChat`;
                    if(!queryScheme.condition){
                        queryScheme.condition = [];
                    }
                    // 将分页信息合并到查询方案
                    pagination = {
                        pageNumber: 0,
                        pageSize: 10
                    };
                    queryScheme = assign({}, pagination, queryScheme);
                    ajax.postJSON(linkUrl, queryScheme, (result) => {
                        if (result.success && result.backData) {
                            this.setState({
                                content: result.backData.content
                            });
                        }
                    })
                } else {
                    Modal.alert('提示', '对不起，此功能暂时只对采购商开放！', [
                        {
                            text: '确定', onPress: () => {
                            //返回到主页面
                            window.Bridge_YYPlugin.call('CommonPlugin','closewindow')
                            }
                        }
                    ]);
                }
            } else {
                Modal.alert('账号绑定','未绑定账号是否进行账号绑定？',[
                    //返回到主页面
                    {text:'取消',onPress:()=>window.Bridge_YYPlugin.call('CommonPlugin','closewindow')},
                    {text:'确定', onPress:()=>{
                        console.log('确定');
                        window.location.href = url + '/icop-ydyy-mobile/#/openIdBind';
                    }}
                ])
            }
        });
    };

    //点击跳转到卡片页面
    listClick = (val,i) => {
        val.browseNum +=1;


        linkUrl = url + `/icop-supplier-web/supplier/base/saveBrowseNum?companyId=${val.soCompanyId}&browseNum=${val.browseNum}`;
        ajax.postJSON(linkUrl,null,(result)=>{
            if(result.success){

            }
        });
        this.props.router.push(`/suplist/card?id=${val.soCompanyId}`);
    };

    //五类是否显示
    isShow = (text,v) => {
        let data = text.supplierType ? text.supplierType : null;
        if (data) {
            if ((data.includes(0) && v == '0') || (data.includes(1) && v == '1') || (data.includes(2) && v == '2')
                || (data.includes(3) && v == '3') || (data.includes(4) && v == '4')) {
                return {display: "inline-block"};
            } else {
                return {display: "none"};
            }
        } else {
            return {display: "none"};
        }
    };

    //公司地址
    companyAddress = (text) => {
        if (text && text.companyAddress) {
            // let province = text.companyAddress.split
            // console.log(str.indexOf("们")); -1不存在slice
            return text.companyAddress;
        } else {
            return '未填写';
        }
    };

    //浏览数
    viewNum = (text, i) => {
        return text.browseNum?text.browseNum:'0';
    };

    //渲染类名
    classLei = (text, i) => {
        if (i == 0) {
            return {borderTop: 'none'};
        }else{
            return null;
        }
    };

    //滑动事件
    scroll = (i) => {
        window.onscroll = function () {
            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //搜索框及之上高度单位px;
            let height1 = 65.984/150 * (window.innerWidth * 100 / 500);
            //一个公司div的高度
            let height2 = 222.45/150 * (window.innerWidth * 100 / 500);
            let num = (i+1)/5-1;
            if(scrollTop > (height2*5*num)){
                queryScheme.pageSize = 10 + 5*num;
                ajax.postJSON(linkUrl ,queryScheme, (result) => {
                    if (result.success && result.backData) {
                        that.setState({
                            content:result.backData.content
                        });
                    }
                });
            }
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

    //内容渲染
    contentList = (content) => {
        if (content && _.isArray(content)) {
            const ret = content.map((text, i) => {
                return (
                    <div key={i} style={this.classLei(text,i)} onClickCapture={this.scroll(i)} className="box-content" onClick={this.listClick.bind(this,text,i)}>
                        <p className="row1">
                            <span className="box-title">{text.soCompanyRef&&text.soCompanyRef.name?text.soCompanyRef.name:'未填写'}</span>
                            <span style={this.isShow(text,'0')} className="lei lei-mat">物</span>
                            <span style={this.isShow(text,'1')} className="lei lei-dev">设</span>
                            <span style={this.isShow(text,'2')} className="lei lei-lab">劳</span>
                            <span style={this.isShow(text,'3')} className="lei lei-maj">专</span>
                            <span style={this.isShow(text,'4')} className="lei lei-oth">他</span>
                        </p>
                        <p className="row2"><span className="box-company">公司地址</span><span
                            className="box-city">{this.companyAddress(text)}</span></p>
                        {/*<p className="row3"><span className="box-company">注册资金</span><span className="box-city box-money">0 万元</span></p>*/}
                        <p className="row3"><span className="box-company">注册日期</span><span className="box-city box-money">{text&& text.establishedDate?this.trsDate(text.establishedDate):'未填写'}</span></p>
                        <p className="row4"><span className="box-view">浏览 <span>{this.viewNum(text,i)}</span></span><span
                            className="box-storage">入库 {text.storageNum?text.storageNum:'0'}</span></p>
                    </div>
                )
            })
            return ret;
        } else {
            return <div></div>
        }
    };
    //搜索框
    onChange= (value) => {
        this.setState({ value });
        console.log(this.state.value,'onChange');
    };

    //列表项是否显示
    isListShow = (v) => {
        if (v) {
            return {display: "block"};
        } else {
            return {display: "none"};
        }
    };

    //搜索页面点五类
    leiClick = (v) => {
        this.manualFocusInst.focus(); //点五类时，焦点在搜索框
        const retList = _.cloneDeep(this.state.fiveLeiLight);
        retList[v] = !retList[v];

        //后来添加：只能单选注释开始
        if(retList[v]){
            retList.map((text,i)=>{
                if (v != i) {
                    retList[i] = false;
                }
                return retList;
            })
        }
        //后来添加：只能单选注释解释

        this.setState({
            fiveLeiLight : retList
        });
        console.log(this.state.fiveLeiLight);
        if(retList[v]){
            fiveData = v;
            queryFiveLei = {
                compare: "eq",
                data: fiveData,
                field: "supplierType",
                inputtype: "input",
                left: false,
                logic: "and",
                presetFunc: null,
                right: false,
                title: "供应商类型"
            };
        }else{
            fiveData = '';
            queryFiveLei = {};
        }
    };

    //五类的亮度
    light = (v) => {
        if (this.state.fiveLeiLight[v]) {
            return {color: 'rgba(0, 145, 250, 1)'}
        } else {
            return {color: 'rgba(170, 175, 185, 1)'}
        }
    };

    //搜索页面背景全高度变白
    addSearchHeight = (val) => {
        if(val){
            return {height:this.state.height,background:'#fff'}

        }
    };

    render() {
        let {content} =  this.state;
        console.log(this.contentList.bind(this,content));
        return (<div style={this.addSearchHeight(this.state.checkHeight)}>
            <WhiteSpace style={{background:'#fff'}}/>
            <SearchBar
                ref={ref => this.manualFocusInst = ref}  //点五类时，焦点在搜索框
                placeholder="搜索"
                maxLength={20}
                value={this.state.value}
                onSubmit={value => {

                    let {condition} = queryScheme;
                    let soCompanyIdFlag = '2', supplierTypeFlag = '2';
                    if (value) {
                        console.log('onSubmitValue');
                        queryCompany = {
                            compare: "cn",
                            data: value,
                            field: "supplierName",
                            inputtype: "input",
                            left: false,
                            logic: "and",
                            presetFunc: null,
                            right: false,
                            title: '公司名称',
                        };
                        for (let i = 0; i < condition.length; i++) {
                            if (condition[i] && condition[i].field && condition[i].field.includes('supplierName')) {
                                condition[i].data = value;
                                soCompanyIdFlag = '1';
                                break;
                            } else {
                                soCompanyIdFlag = '2';
                            }
                        }
                        if(soCompanyIdFlag === '2'){
                            condition.push(queryCompany);
                        }
                    } else {
                        condition.map((text,i)=>{
                            if(text.field =="supplierName"){
                                condition.splice(i,1);
                            }
                            return condition;
                        })
                    }

                    if (!(fiveData.length > 0)) {
                        let conditionCache = [];
                        for (let j = 0; j < condition.length; j++) {
                            if(condition[j].field !== 'supplierType'){
                                conditionCache.push(condition[j]);
                            }
                        }
                        queryScheme.condition = conditionCache;
                    } else {
                        for (let j = 0; j < condition.length; j++) {
                            if (condition[j] && condition[j].field && condition[j].field.includes('supplierType')) {
                                condition[j].data = fiveData;
                                supplierTypeFlag = '1';
                                break;
                            } else {
                                supplierTypeFlag = '2';
                            }
                        }
                        if (supplierTypeFlag === '2' && queryFiveLei) {
                            condition.push(queryFiveLei);
                        }
                    }

                    console.log(value, 'onSubmit');
                    ajax.postJSON(linkUrl ,queryScheme, (result) => {
                        if (result.success && result.backData) {
                            this.setState({
                                content:result.backData.content,
                                isListShow:true
                            });
                        }
                    });
                    this.setState({checkHeight:false});
                }}
                onClear={value => console.log(value, 'onClear')}
                onFocus={
                    () => {
                        console.log('onFocus');
                        this.setState({isListShow:false,height:window.innerHeight,checkHeight:true});
                    }
                }
                onBlur={() => console.log('onBlur')}
                onCancel={
                    () => {
                        this.setState({showCancelButton: false, isListShow: true, value: '', checkHeight: false})

                    }
                }
                showCancelButton = {this.state.showCancelButton}
                onChange={this.onChange}
            />
            <div className="sup-box" style={this.isListShow(this.state.isListShow)}>
                {this.contentList(content)}
            </div>
            <div className="noMore" style={this.isListShow(this.state.isListShow)}>-- 没有更多数据 --</div>
            <div className="search-list" style={this.isListShow(!this.state.isListShow)}>
                <div className="search-title">搜索指定类别供应商</div>
                <div className="search-lei-row1">
                    <div className="search-mat" style={this.light('0')} onClick={this.leiClick.bind(this,'0')}>物资</div>
                    <div className="search-dev" style={this.light('1')} onClick={this.leiClick.bind(this,'1')}>设备</div>
                    <div className="search-lab" style={this.light('2')} onClick={this.leiClick.bind(this,'2')}>劳务</div>
                </div>
                <div className="search-lei-row2">
                    <div className="search-maj" style={this.light('3')} onClick={this.leiClick.bind(this,'3')}>专业</div>
                    <div className="search-oth" style={this.light('4')} onClick={this.leiClick.bind(this,'4')}>其他</div>
                </div>
            </div>
        </div>);
    }
}
export default suplist;
