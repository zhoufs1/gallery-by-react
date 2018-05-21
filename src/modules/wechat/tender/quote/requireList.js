/**
 * 报价详情的需求清单
 * Created by yonyou_zhuyhz on 2018/4/25.
 */
import React from 'react';
import DataUtil from 'utils/DataUtil';
import 'common/css/supplier.less';

class requireList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data:{},
        }
    }

    //挂载之前
    componentWillMount(){

    }

    //DOM节点初始化
    componentDidMount() {
        this.setState({
            data:JSON.parse(DataUtil.localSessionRead('quoteRequireList'))
        });
    }

    //在组件移除和销毁之前被调用
    componentWillUnmount() {
        DataUtil.localSessionRemove('quoteRequireList');
    }

    //需求清单渲染列表
    requireList2 = (data)=>{
        if (data && data.length > 0) {
            let list = data.map((item, index) => {
                return (
                    <ul>
                        <li className="require-list-left">{item.itemType && item.itemType.name ? item.itemType.name : '未填写'}</li>
                        <li className="require-list-left">{item.itemName && item.itemName.name ? item.itemName.name : '未填写'}</li>
                        <li>{item.num ? item.num : '未填写'}</li>
                        <li>{item.itemUnit && item.itemUnit.name ? item.itemUnit.name : '未填写'}</li>
                        <li>{item.npremny ? item.npremny.toFixed(2) : '未填写'}</li>
                    </ul>
                )
            });
            return list;
        }
    };

    render() {
        const {data} = this.state.data;
        return (
            <div id="content2" style={{background:"#fff"}}>
                <div className="require-list-box">
                    <p className="require-list-box-title">需求清单</p>
                    <span>横屏查看体验更佳~</span>
                    <ul className="title">
                        <li>分类</li>
                        <li>名称</li>
                        <li>数量</li>
                        <li>单位</li>
                        <li>预算金额</li>
                    </ul>
                    {data?this.requireList2(data):null}
                </div>
            </div>
        )
    }
}

export default requireList;