/**
 * Created by zhoufs1 on 2018/4/8.
 */
import React, {Component} from 'react';
import ajax from 'utils/ajax';
import tenderUrl from '../tender-url';
import 'common/css/tender'
import left from 'common/img/left.png';
import right from 'common/img/right.png';

export default class nodetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail:{}
        }
    }

    /**
     * 初次进入查询详情
     */
    componentDidMount(){
        const id = this.props.location.query.id;
        const self = this;
        if (id) {
            ajax.getJSON(tenderUrl.QUERY_DETAIL, {id: id}, result => {
                if (result && result.success) {
                    self.setState({
                        detail: result.backData
                    })
                }
            })
        }
    }

    render(){
        const {detail} = this.state;
        return <div>
            <div className="tender-card1">
                <div className="tender-title">
                    <img className="tender-img-left" src={left}/>
                    <p className="tender-title-content">招标详情</p>
                    <img className="tender-img-right" src={right}/>
                </div>
                <div className="tender-form-items">
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title tender-form-line-color">招标名称：</span>
                        <span className="tender-form-row-content tender-form-line-color">{detail.billName}</span>
                    </p>
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title tender-form-line-color">招标编号：</span>
                        <span className="tender-form-row-content tender-form-line-color">{detail.billCode}</span>
                    </p>
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title">招标单位：</span>
                        <span className="tender-form-row-content">{detail.company}</span>
                    </p>
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title">截标时间：</span>
                        <span className="tender-form-row-content">{detail.endTime}</span>
                    </p>
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title-space">联系</span>
                        <span className="tender-form-row-content">人：{detail.psndocId ? detail.psndocId.name : '无'}</span>
                    </p>
                    <p className="tender-form-row1">
                        <span className="tender-form-row-title">联系方式：</span>
                        <span className="tender-form-row-content">{detail.phone}</span>
                    </p>
                </div>
            </div>
            <div className="tender-card2">
                {detail.content ?
                    <p className="content" dangerouslySetInnerHTML={{__html:detail.content}}></p> :
                    <p className="content" style={{textAlign: 'center'}}>--暂无数据--</p>}
            </div>
            <div className="tender-card3">
                <p className="bottom1">投标请到用友建筑云平台网页端操作</p>
            </div>
        </div>
    }
}