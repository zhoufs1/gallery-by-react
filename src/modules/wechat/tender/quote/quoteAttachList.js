/**
 * 报价详情的附件查看
 * Created by yonyou_zhuyhz on 2018/4/25.
 */
import React from 'react';
import DataUtil from 'utils/DataUtil';
import 'common/css/supplier.less';
import logo1 from 'common/img/2.png';
import _ from 'lodash';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';
import formatUtils from 'utils/formatUtils';
import {hashHistory} from 'react-router';

let that;
let url = window.EnvConfig.ADDR;

class attachList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data:{},
            clickActive: true,
            picNum:'',
            docNum:'',
            picCache:[],
            docCache:[],
        }
    }

    //挂载之前
    componentWillMount(){
        //读取报价页面最底部附件查看进来的数据
        this.setState({
            data:JSON.parse(DataUtil.localSessionRead('quoteAttachList'))
        });
    }

    //DOM节点初始化
    componentDidMount() {
        that = this;
        //进入文档后返回过来，赋值
        const activeFlag = JSON.parse(DataUtil.localSessionRead('active_state'));
        if(activeFlag !== null){
            this.setState({clickActive:activeFlag})
        }
        //读取从报价页面过来的附件信息
        let num1 = 0, num2 = 0, temp1 = [], temp2 = [];
        if (_.isEqual(url, "http://127.0.0.1:8080")) {//处理本地环境调用usercenter服务
            url = "https://dev.yonyouccs.com";
        }
        if (this.state.data && this.state.data.data && Object.keys(this.state.data).length > 0) {
            //确认记录 按时间降序sort排序
            if(this.state.data.data.length > 1){
                this.state.data.data.sort(function(a,b){
                    if(a.createDate < b.createDate)return 1;
                    else if(a.createDate > b.createDate)return -1;
                    else return 0;
                });
            }
            _.forEach(this.state.data.data,(item)=>{
                //判断类别,是否为图片
                let src = url + '/' + item.filePath;
                let testSrc = /.*?(.gif|.png|.jpg|.jpeg|.bmp)/gi.test(src);
                if (!testSrc) {
                    //为文档时，数量加1
                    temp1.push(item);
                    num1 += 1;
                }else{
                    //为图片
                    num2 += 1;
                    temp2.push(item);
                }
            })
            this.setState({
                docNum:num1,
                docCache:temp1,
                picNum:num2,
                picCache:temp2,
            })
        }
    }

    //在组件移除和销毁之前被调用
    componentWillUnmount() {
        // DataUtil.localSessionRemove('quoteAttachList');
    }

    //点击图片
    clickPic = ()=>{
        this.setState({
            clickActive:true,
        })
        that.saveActiveState(true);
    };

    //切换图片或文档后存值
    saveActiveState(flag){
        DataUtil.localSessionRemove('active_state');
        DataUtil.localSessionSave('active_state',flag);
    }

    //点击文档
    clickDoc = ()=>{
        this.setState({
            clickActive:false,
        })
        that.saveActiveState(false);
    };

    //图片缩略图
    attachMgrPic = (data)=>{
        return(
            <div>
                <PhotoSwipeGallery style={{clear:'both'}} items={this.items(data)}
                                   thumbnailContent={this.getThumbnailContent.bind(this)}/>
            </div>
        )
    };

    //缩略图
    getThumbnailContent = (item) => {
        return (
            //小图
            <img style={{margin:'0.1rem 0.03rem 0rem',border:'1px solid rgba(65, 70, 85, 0.5)',float:'left'}}
                 src={item.thumbnail} width='23.15%' height={window.innerWidth * 0.22}/>
        );
    };

    //图片的items
    items = (data) => {
        if(data && data.length>0){
            let arr = [];
            const arrPic1 = data.map((item,index)=>{
                //大图
                arr.push({
                    src: url + '/' + item.filePath,
                    thumbnail: url + '/' + item.filePath,
                    w: 1200,
                    h: 900,
                    title: that.title(item.fileName),
                });
                return arr;
            });
            return arrPic1[0];
        }else {
            return [{
                src: logo1,
                thumbnail: logo1,
                w: 1200,
                h: 900,
                title: '未上传图片',
            }]
        }
    };

    //图片放大后的名字
    title = (v)=>{
        let val = v.split('.')[0];
        return val;
    };

    //文档
    attachMgrDoc = (data)=>{
        let list = data.map((item,index)=>{
            //文档时间
            let date = this.trsDate(item.createDate);
            //文档多少MB，多少kb
            let size = this.size(item.fileSize);
            let val = item.filePath.split('.')[1];
            if(val == 'pdf'){
                let src = url + '/' + item.filePath;
                return(
                    <li onClick={this.attachMgrPdfClick.bind(this,src)}>
                         <p className="fileName">{item.fileName}</p>
                         <p className="size">{size}</p>
                         <p className="date">{date}</p>
                    </li>
                )
            }else{
                return(
                    <li onClick={this.attachMgrDocClick.bind(this,item.filePath)}>
                        <p className="fileName">{item.fileName}</p>
                        <p className="size">{size}</p>
                        <p className="date">{date}</p>
                    </li>
                )
            }
        });
        return list;
    };

    //点击每一项文档
    attachMgrDocClick = (data) => {
        //判断类别,是否为office软件类别
        let src = url + '/' + data;
        let testSrc = /.*?(.doc|.docx|.xls|.xlsx|.ppt|.pptx)/gi.test(data);
        if(testSrc){
            //为office软件
            src = encodeURIComponent(url + '/' + data);
            src = 'http://view.officeapps.live.com/op/view.aspx?src=' + src;
        }
        window.location.href = src;
    };

    //点击每一项文档中的pdf
    attachMgrPdfClick = (data)=>{
        hashHistory.push({
            pathname: '/quoteAttachPdf',
        });
        DataUtil.localSessionRemove('quotePdfSrc');
        DataUtil.localSessionSave('quotePdfSrc', {
            quotePdfSrc: data,
        });
    };

    //日期换算
    trsDate = (data) => {
        if (data) {
            let time = formatUtils.formatAntDate(new Date(data),'yyyy-MM-dd');
            return time;
        }else {
            return '未填写';
        }
    };

    //大小换算
    size = (data) => {
        if (data) {
            let fileSize = data/1024 < 1000? (data/1024).toFixed(2) + ' KB':(data/1024/1024).toFixed(2) +' MB';
            return fileSize;
        }else {
            return '未填写';
        }
    };

    render() {
        const {data} = this.state.data ? this.state.data : null;
        if (data && data.length > 0) {
            return (
                <div style={{width: window.innerWidth}}>
                    <div className="attach-mgr">
                        <ul className="title">
                            <li className={this.state.clickActive ? "click-active" : null} onClick={this.clickPic}>
                                图片({this.state.picNum})
                            </li>
                            <li className={!this.state.clickActive ? "click-active" : null} onClick={this.clickDoc}>
                                文档({this.state.docNum})
                            </li>
                        </ul>
                        <div
                            className={this.state.clickActive ? "attach-mgr-pic click-is-show" : "attach-mgr-pic click-not-show"}>
                            {this.attachMgrPic(this.state.picCache)}
                        </div>
                        <div
                            className={this.state.clickActive ? "attach-mgr-doc click-not-show" : "attach-mgr-doc click-is-show"}>
                            <ul>
                                {this.attachMgrDoc(this.state.docCache)}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div className="noData">-- 暂无数据 --</div>)
        }
    }
}

export default attachList;