/**
 * （招标公告）单行数据
 * Created by zhoufs1 on 2018/4/3.
 */
import React, {Component} from 'react';
import {List} from 'antd-mobile';
import _ from 'lodash';
import 'common/css/list.css';
import logo1 from 'common/img/logo1.jpg';
import logo2 from 'common/img/logo2.jpg';
import logo3 from 'common/img/logo3.jpg';
import logo4 from 'common/img/logo4.jpg';
import logo5 from 'common/img/logo5.jpg';
import logo6 from 'common/img/logo6.jpg';


const ENUMS = {
    1:logo1,
    2:logo2,
    3:logo3,
    4:logo4,
    5:logo5,
    6:logo6,
};

const randomInt = parseInt(Math.random()*6,10)+1;

const {Item} = List;
const Brief = Item.Brief;
export default class tenderitem extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {logoPath, title, company, content, endTime} = this.props;
        const style = {
            fontSize: '0.16rem',
            height:'0.3rem',
            lineHeight: '0.3rem',
            width: '2.667rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'PingFang SC Regular'
        };
        const dot3 = {
            width: '2.6667rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'PingFang SC Regular'
        };
        let src = `${window.EnvConfig.ADDR}/${logoPath}`;
        if(_.isEqual(window.EnvConfig.ADDR,'http://127.0.0.1:8080')){
            src = `https://dev.yonyouccs.com/${logoPath}`;
        }
        if (_.isEmpty(logoPath)) {
            src = ENUMS[randomInt];
            console.log(randomInt, src);
        }
        return <div>
            <Item style={{textAlign: 'left'}}
                  align="middle"
                  onClick={this.onClick.bind(this)}
                  thumb={<div className="item-img"><img src={src}/>
                      <div className="item-title">招标中</div>
                  </div>}
                  multipleLine>
                <div style={dot3}>{title}</div>
                <Brief><p style={style}>招标单位：{company}</p></Brief>
                <Brief><p style={style}>招标内容：{content ? content : '无'}</p></Brief>
                <Brief><p style={style}>截标时间：{endTime}</p></Brief>
            </Item>
            <div className="item-line"></div>
        </div>

    }
}
