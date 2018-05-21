/**
 * Created by zhoufs1 on 2018/4/9.
 */
import React, {Component} from 'react';
import 'common/css/tender';
import winimg from 'common/img/win.png';
import ajax from 'utils/ajax';
import _ from 'lodash';
import tenderUrl from '../tender-url';
import DateFormatUtils from 'utils/DateFormatUtils';
import winconts from './winconts';
let self = {};
export default class windetail extends Component {
    constructor(props) {
        super(props);
        this.state = {detail:null}
    }

    componentDidMount() {
        self = this;
        const winId = this.props.location.query.id || {};
        const companyId = this.props.location.query.companyId || {};
        this.fetchData(winId,companyId);
    }

    /**
     * 查询数据
     * @param id
     */
    fetchData(id,companyId) {
        ajax.getJSON(tenderUrl.QUERY_WIN_DETAIL,{winId:id,winCompanyId:companyId},result=>{
            if(result&&result.success){
                self.setState({
                    detail:result.backData
                })
            }
        })
    }

    /**
     *
     * @param winDetail
     * @returns {*}
     */
    sortWinTime(winDetail){
        if(winDetail){
            return DateFormatUtils.formatDate(new Date(Date.parse(winDetail.winNoticeVO.createtime)),"yyyy-MM-dd");
        }
        else {
            return null;
        }
    }

    /**
     * 渲染业务类型
     * @param value
     * @returns {*}
     */
    renderBusiType(value) {
        switch (value) {
            case '0':
                return '物资';
                break;
            case '1':
                return '设备';
                break;
            case '2':
                return '劳务';
                break;
            case '3':
                return '专业';
                break;
            case '4':
                return '其他';
                break;
            default :
                return '';
                break;
        }
    }

    /**
     * 不同业务类型渲染不同的表体
     * @param busiType
     */
    renderTableTitle(busiType){
        const titles = winconts.TABLE_TITLE[`${busiType}`];
        return <div className="win-content-box">
            <ul>
                <li>
                    <p className="win-table-item">{titles[0]}</p>
                    <p className="win-table-item">{titles[1]}</p>
                    <p className="win-table-item">{titles[2]}</p>
                    <p className="win-table-item">{titles[3]}</p>
                </li>
            </ul>
        </div>
    }

    /**
     * 渲染表体
     * @param detailList
     */
    renderTable(detailList, busiType) {
        return _.map(detailList, row => {
            const itemTypeName = row.itemType ? row.itemType.name : '无';
            const itemNameVal = row.itemName ? row.itemName.name : '无';
            const itemUnitName = row.itemUnit ? row.itemUnit.name : '无';
            const num = row.num ? row.num : '无';
            const wbs = row.wbs ? row.wbs : '无';
            if(_.includes(['2','3'],busiType)){
                return <div className="win-content-box win-content-box-child">
                    <ul>
                        <li>
                            <p className="win-table-item">{itemTypeName}</p>
                            <p className="win-table-item">{itemNameVal}</p>
                            <p className="win-table-item">{wbs}</p>
                            <p className="win-table-item">{num}</p>
                        </li>
                    </ul>
                </div>
            }
            return <div className="win-content-box win-content-box-child">
                <ul>
                    <li>
                        <p className="win-table-item">{itemTypeName}</p>
                        <p className="win-table-item">{itemNameVal}</p>
                        <p className="win-table-item">{itemUnitName}</p>
                        <p className="win-table-item">{num}</p>
                    </li>
                </ul>
            </div>
        });
    }

    render() {
        const {detail} = this.state;
        const busiType = detail?detail.winNoticeVO.busiType:'0';
        const soCompany = detail ? detail.socompanyId.name : '无';
        return <div>
            <div className="win-card1">
                <div className="win-title-content">
                    <div className="win-img"><img style={{width: '0.96rem'}} src={winimg}/></div>
                    <div className="win-title">
                        <p className="win-title-p1">恭喜您，您已经中得此标！</p>
                        <p className="win-title-p2">请查看中标详情</p>
                    </div>
                </div>
                <div className="win-line"></div>
                <div className="win-ul">
                    <ul>
                        <li className="win-li">招标名称：{detail?detail.winNoticeVO.name:'无'}</li>
                        <li className="win-li">招标单位：{detail?detail.winNoticeVO.company:'无'}</li>
                        <li className="win-li-i">中标单位：{soCompany}</li>
                        <li className="win-li">采购类型：{detail?this.renderBusiType(busiType):'无'}</li>
                        <li className="win-li">中标时间：{detail?detail.winNoticeVO.winTime:'无'}</li>
                        <li className="win-li">定标金额(元)：{detail?detail.bidOffer:0}</li>
                    </ul>
                </div>
            </div>
            <div className="win-card2">
                <p className="win-content-title">采购内容：</p>
                {this.renderTableTitle(busiType)}
                {this.renderTable(detail?detail.schemeDetailVOs:[],busiType)}
            </div>
        </div>
    }
}