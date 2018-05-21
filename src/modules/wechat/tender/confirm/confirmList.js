/**
 * 定标详情的定标情况清单
 * Created by yonyou_zhuyhz on 2018/4/26.
 */
import React from 'react';
import DataUtil from 'utils/DataUtil';
import 'common/css/supplier.less';

class confirmList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data:{},
        }
    }

    //挂载之前
    componentWillMount(){
        this.setState({
            data:JSON.parse(DataUtil.localSessionRead('quoteConfirmList'))
        });
    }

    //DOM节点初始化
    componentDidMount() {

    }

    //在组件移除和销毁之前被调用
    componentWillUnmount() {
        DataUtil.localSessionRemove('quoteConfirmList');
    }

    //需求清单渲染列表
    confirmList2 = (backData)=>{
        let data = backData.replyVOs;
        if(data){
            let list = data.map((item,index)=>{
                return(
                    <div>
                        <p className="confirm-title">{item&&item.companyId&&item.companyId.name?item.companyId.name:'未填写'}</p>
                        <ul className="title">
                            <li>物料分类</li>
                            <li>物料名称</li>
                            <li>规格型号</li>
                            <li>数量</li>
                            <li>单位</li>
                            <li>含税单价</li>
                            <li>总金额</li>
                        </ul>
                        {backData?this.confirmListCache(backData,item):null}
                    </div>
                )
            });
            return list;
        }
    };

    //需求清单渲染列表
    confirmListCache = (backData,data)=>{
        let v = data.detailList;
        if(v){
            let list = v.map((item,index)=>{
                return(
                    <ul>
                        <li className="require-list-left">{item.itemType&&item.itemType.name?item.itemType.name:'未填写'}</li>
                        <li className="require-list-left">{item.itemName&&item.itemName.name?item.itemName.name:'未填写'}</li>
                        <li>{item.spec?item.spec:'未填写'}</li>
                        <li>{item.num?item.num:'未填写'}</li>
                        <li>{item.itemUnit&&item.itemUnit.name?item.itemUnit.name:'未填写'}</li>
                        <li>{item.ntaxprice?item.ntaxprice.toFixed(2):'未填写'}</li>
                        <li>{this.bidOffer2(backData,data)}</li>
                    </ul>
                )
            });
            return list;
        }
    };

    //金额
    bidOffer2 = (backData,data)=>{
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

    render() {
        const {data} = this.state.data;
        return (
            <div id="content" style={{background:"#fff"}}>
                <div className="confirm-list-box">
                    <p className="confirm-list-box-title">定标情况</p>
                    <span>横屏查看体验更佳~</span>
                    {this.confirmList2(data)}
                </div>
            </div>
        )
    }
}

export default confirmList;