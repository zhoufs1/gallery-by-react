import React, {Component} from 'react';
import classNames from 'classnames';
import {Icon} from 'antd-mobile';
// import SSIcon from '../icon/SSIcon';
class SSListBrief extends Component {

    renderThumbIcon() {
        const {icon} = this.props;
        let fontSize = icon === 'icon-weizhi' ? '0.44rem' : '0.5rem';
        if (icon == 'icon-shuji') {
            fontSize = '0.34rem'
        }
        let iconStyle = {
            width: fontSize,
            height: fontSize

        };
        return icon ? (
                <Icon icon={icon} size="md" style={iconStyle}/>
            ) : null;

    };

    renderExtraThumbIcon() {
        const {extraIcon} = this.props;
        let fontSize = extraIcon === 'icon-weizhi' ? '0.44rem' : '0.5rem';
        if (extraIcon == 'icon-shuji') {
            fontSize = '0.34rem'
        }
        const iconStyle = {
            width: fontSize,
            height: fontSize

        };
        return extraIcon ? (
                <Icon icon={extraIcon} size="md" style={iconStyle}/>
            ) : null;
    }


    renderExtra() {
        const {extra, type} = this.props;
        const cls = classNames({
            'brief-myExtra': true,
            'extra-italic': type === '6' || type === '7' ? true : false
        });
        let items = null;
        if (extra && (type == '6' || type == '7')) {
            let reg = /[0-9]*$/;
            let num = extra.match(reg)[0];
            let text = extra.replace(reg, '');
            items = <em>{text}<i className="italic-text">{num}</i></em>

        } else {
            items = <i style={{verticalAlign: 'text-bottom', fontStyle: 'normal'}}>{extra}</i>
        }
        return extra ? (
                <span className={cls}>{this.renderExtraThumbIcon()}{items}</span>

            ) : null;

    }

    renderDesc() {
        const {descColor, desc} = this.props;
        let style = {
            color: descColor || '#999'
        };
        return desc ? (
                <span style={style}>{desc}</span>

            ) : null;
    }

    render() {
        let {text, extra, desc, briefStyle, icon, singLine}=this.props;
        let clientWith = document.documentElement.clientWidth;
        let brieWith = icon ? clientWith * 0.82 : clientWith * 0.88;
        const cls = classNames({
            'am-list-brief': true,
            'listBrief': true,
            'brief-location': desc || extra ? true : false

        });
        const singleCls = classNames({
            'single-line': singLine
        });

        return (
            <div className={cls} style={briefStyle}>
                {this.renderThumbIcon()}
                <span className={singleCls} style={{verticalAlign: 'text-bottom', width: brieWith + 'px'}}>{text}</span>
                {this.renderExtra()}
            </div>

        );
    }
}


export default SSListBrief;