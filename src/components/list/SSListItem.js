/**
 * Created by liulei on 2017/8/24.
 */
import React, {Component} from 'react'
import {List,Icon} from 'antd-mobile/lib/index'
import PropTypes from 'prop-types'
// import SSIcon from '../icon/SSIcon'
import SSExtraItem from './SSExtraItem'
import SSListBrief from './SSListBrief'
import classNames from 'classnames'
import _ from 'lodash'

const Item = List.Item;

class SSListItem extends Component {

    onClick = (e) => {
        if (_.isFunction(this.props.onClick)) this.props.onClick(e)

    };
    handleLongPress = (e) => {
        if (_.isFunction(this.props.onLongPress)) this.props.onLongPress(e)
    };

    renderIcon() {
        let {thumb, thumbColor} = this.props;
        return thumb ? (<Icon icon={thumb} color={thumbColor}/>) : null;
    }

    render() {
        const extraStyle = {
                color: '#000',
                fontSize: '0.28rem',
                width: '3.2rem'
            },
            briefStyle = {
                color: '#868686',
            },
            //针对type为7 l3的样式
            otherBriefStyle = {
                color: '#868686',
                height: '0.5rem',
                lineHeight: '0.5rem'
            };
        let extraIconColor = '#1482FF',
            childR1Icon = '',
            child2Icon = '',
            child3Icon = '',
            child4Icon = '',
            extraIcon = '',
            extraR4Icon = '',
            multipleLine = true,
            arrow = '',
            extraAlign = 'top',
            itemHeight = '2rem',
            clientWidth = document.documentElement.clientWidth, rate = 0.88;//l1占屏幕宽度的比例
        let {
            l1,
            r1,
            l2,
            l2Icon,
            r2,
            r2Icon,
            l3,
            l3Icon,
            r3,
            r3Icon,
            l4,
            l4Icon,
            r4,
            r4Icon,
            type,
            error,
            wrap,
            activeStyle,
            platform,
            exColor,
        } = this.props;
        switch (type) {
            case '0':
                multipleLine = false
                extraStyle.fontSize = '0.34rem';
                extraStyle.color = '#ACB0BA';
                extraStyle.lineHeight = '0.5rem';
                break;
            case '1':
                multipleLine = false;
                arrow = 'horizontal';
                extraAlign = 'middle';
                extraStyle.fontSize = '0.34rem';
                extraStyle.color = '#ACB0BA';
                extraStyle.lineHeight = '0.5rem';
                break;
            case '2':
                r2 = '';
                r3 = '';
                l4 = '';
                r4 = '';
                rate = 0.55;
                child2Icon = l2Icon || 'icon-Person';
                child3Icon = l3Icon || 'icon-Time';
                extraStyle.width = '2.5rem';
                itemHeight = '2.3rem';
                extraStyle.marginTop = '0.08rem';
                if (r1 == '未确认' || r1 == '未同步') {
                    extraStyle.backgroundColor = '#FFF5E9';
                    extraStyle.color = '#FF9825'
                } else if (r1 == '未提交') {
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#4DA7FF'

                } else if (r1 == '已确认' || r1 == '已同步') {
                    extraStyle.backgroundColor = '#DCF7DC';
                    extraStyle.color = '#2EB62E'

                } else if (r1 == '已作废') {
                    extraStyle.backgroundColor = '#FFE6E6';
                    extraStyle.color = '#F94A35'

                } else if (r1 == '已撤销') {
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#148CFF'
                } else {
                    extraStyle.width = '3.2rem'
                }
                break
            case '3':
                child2Icon = l2Icon || 'icon-Name';
                child3Icon = l3Icon || 'icon-Model';
                child4Icon = l4Icon || 'icon-Number';
                briefStyle.overflow = 'hidden';
                extraStyle.width = '2.8rem';
                itemHeight = '2.95rem';
                rate = 0.52
                r2 = '';
                r3 = '';
                r4 = '';
                if (r1 == '未同步') {
                    extraStyle.backgroundColor = '#FFF5E9';
                    extraStyle.color = '#FF9825';
                    extraStyle.width = '2.5rem'
                } else if (r1 == '已同步') {
                    extraStyle.backgroundColor = '#DCF7DC';
                    extraStyle.color = '#2EB62E';
                    extraStyle.width = '2.5rem'
                } else if (/见证取样/.test(r1) || /委托试验/.test(r1)) {
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#3099FF';
                    child4Icon = 'icon-Type';
                    rate = 0.50

                }
                break;
            case '4':
                extraStyle.backgroundColor = '#EFF7FF';
                extraStyle.color = '#3099FF';
                child4Icon = l4Icon || 'icon-Type';
                child2Icon = l2Icon || 'icon-Time';
                briefStyle.height = '0.8rem';
                briefStyle.paddingTop = '0.25rem';
                extraStyle.width = '2.6rem';
                itemHeight = '2rem';
                rate = 0.55;
                r2 = '';
                l3 = '';
                r3 = '';
                l4 = '';
                r4 = '';
                break;

            case '5':
                child2Icon = l2Icon || 'icon-weizhi';
                extraIcon = r2Icon || 'icon-Time';
                childR1Icon = 'icon-biaoqian';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                briefStyle.height = '0.85rem';
                briefStyle.paddingTop = '0.15rem';
                briefStyle.width = '87%';
                extraStyle.width = '1.8rem';
                itemHeight = '2rem';
                rate = 0.65;
                // l3 = ''
                r3 = '';
                l4 = '';
                r4 = '';
                extraIconColor = exColor;
                if (r1 == '0' || r1 == '自由态') {
                    extraIconColor = '#17C06E';
                    r1 = '自由态'
                } else if (r1 == '1' || r1 == '已提交') {
                    r1 = '已提交';
                    extraIconColor = '#FF8B35'
                } else if (r1 == '3' || r1 == '审批通过') {
                    r1 = '审批通过';
                    extraIconColor = '#3099FF'
                }
                else if (r1 == '2' || r1 == '审批中') {
                    r1 = '审批中'
                }
                break;
            case '6':
                extraStyle.backgroundColor = '#EFF7FF';
                extraStyle.color = '#3099FF';
                extraStyle.width = '2.5rem';
                itemHeight = '2.35rem';
                child2Icon = l2Icon || '';
                child3Icon = l3Icon || '';
                extraIcon = r3Icon || '';
                rate = 0.54;
                r2 = '';
                l4 = '';
                r4 = '';
                break;
            case '7':
                if (r1 == '已交底') {
                    extraStyle.backgroundColor = '#EFF7FF';
                    extraStyle.color = '#3099FF'
                } else if (r1 == '未交底') {
                    extraStyle.backgroundColor = '#FFF3E4';
                    extraStyle.color = '#FF9322'

                }
                child2Icon = l2Icon || 'icon-Person';
                extraIcon = r2Icon || '';
                briefStyle.height = '0.65rem';
                briefStyle.paddingTop = '0.15rem';
                extraStyle.width = '2.5rem';
                itemHeight = '2.5rem';
                rate = 0.54;
                r3 = '';
                l4 = '';
                r4 = '';
                break;
            case '8':
                child2Icon = l2Icon || 'icon-Person';
                child3Icon = l3Icon || 'icon-Time';
                extraIcon = r3Icon || '';
                childR1Icon = 'icon-biaoqian';
                extraStyle.width = '2.3rem';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                extraStyle.width = '1.8rem';
                itemHeight = '2.35rem';
                rate = 0.65;
                r2 = '';
                r4 = '';
                if (r1 == '已提交') {
                    extraIconColor = '#17C06E'
                } else if (r1 == '未提交') {
                    extraIconColor = '#FF8B35'
                }
                break
            case '9':
                child2Icon = l2Icon || 'icon-Person';
                child3Icon = l3Icon || '';
                extraIcon = r2Icon || 'icon-Time';
                itemHeight = '2.35rem';
                briefStyle.width = '89%';
                rate = 0.75;
                if (r1 == '已同步') {
                    extraStyle.color = '#75BC97';
                    extraStyle.fontStyle = 'italic'
                } else if (r1 == '未同步') {
                    extraStyle.color = '#FF8B35'
                }
                r4 = ''
                break
            case '10':
                child2Icon = l2Icon || 'icon-shuji';
                extraIcon = r2Icon || 'icon-Time';
                itemHeight = '1.7rem';
                briefStyle.width = '87.5%';
                rate = 0.75;
                r3 = '';
                l3 = '';
                l4 = '';
                r4 = '';
                break;
            case '11':
                child2Icon = l2Icon || 'icon-Person';
                extraIcon = r2Icon || 'icon-Time';
                childR1Icon = 'icon-biaoqian';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                briefStyle.height = '0.8rem';
                briefStyle.lineHeight = '1rem';
                briefStyle.width = '89%';
                extraStyle.width = '1.8rem';
                itemHeight = '2rem';
                rate = 0.65;
                l3 = '';
                r3 = '';
                l4 = '';
                r4 = '';
                if (r1 == '0' || r1 == '自由态') {
                    extraIconColor = '#17C06E';
                    r1 = '自由态'
                } else if (r1 == '3' || r1 == '审批完成') {
                    r1 = '审批完成';
                    extraIconColor = '#3099FF'
                }
                break;
            case '12':
                child2Icon = l2Icon || '';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                briefStyle.height = '0.7rem';
                briefStyle.lineHeight = '0.8rem';
                briefStyle.width = '89%';
                extraStyle.width = '1.8rem';
                itemHeight = '2rem';
                rate = 0.55;
                break;
            case '13':
                child2Icon = l2Icon || '';
                child3Icon = l3Icon || '';
                extraIcon = r3Icon || '';
                child4Icon = l4Icon || '';
                extraR4Icon = r4Icon || '';
                extraStyle.width = '2.5rem';
                itemHeight = '2.3rem';
                rate = 0.55;
                break;
            case '14':
                r3 = '';
                l4 = '';
                r4 = '';
                child2Icon = l2Icon || 'icon-Person';
                child3Icon = l3Icon || 'icon-Time';
                extraStyle.width = '1.2rem';
                extraStyle.height = '0.6rem';
                extraStyle.lineHeight = '0.6rem';
                briefStyle.height = '0.7rem';
                briefStyle.lineHeight = '1rem';
                briefStyle.width = '87%';
                itemHeight = '2rem';
                rate = 0.55;
                extraStyle.color = '#fff';
                if (r1 == '未确认' || r1 == '未提交' || r1 == '未完成' || r1 == '待确认' || r1 == '未提交') {
                    extraStyle.backgroundColor = '#E54242'

                } else if (r1 == '延期完成') {
                    extraStyle.width = '1.34rem';
                    extraStyle.backgroundColor = '#E54242'
                } else if (r1 == '已确认' || r1 == '已同步' || r1 == '完成') {
                    extraStyle.backgroundColor = '#0D92E4'

                } else if (r1 == '已作废' || r1 == '驳回' || r1 == '已撤销') {
                    extraStyle.backgroundColor = '#aaa'

                } else {
                    extraStyle.width = '3.2rem'
                }
                break
            case '15':
                child2Icon = l2Icon || '';
                extraIcon = r2Icon || '';
                childR1Icon = 'icon-biaoqian';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                briefStyle.width = '89%';
                extraStyle.width = '1.8rem';
                itemHeight = '2rem';
                rate = 0.65;
                if (r1 == '0' || r1 == '自由态') {
                    extraIconColor = '#17C06E';
                    r1 = '自由态'
                } else if (r1 == '1' || r1 == '已提交') {
                    r1 = '已提交';
                    extraIconColor = '#FF8B35'
                } else if (r1 == '3' || r1 == '审批通过') {
                    r1 = '审批通过';
                    extraIconColor = '#3099FF'
                }
                else if (r1 == '2' || r1 == '审批中') {
                    r1 = '审批中'
                }
                break;
            case '16':
                child2Icon = l2Icon || '';
                extraIcon = r2Icon || '';
                childR1Icon = 'icon-biaoqian';
                extraStyle.color = '#fff';
                extraStyle.fontStyle = 'italic';
                briefStyle.width = '89%';
                extraStyle.width = '1.8rem';
                itemHeight = '2rem';
                rate = 0.65;
                if (r1 == '0' || r1 == '自由态') {
                    extraIconColor = '#17C06E';
                    r1 = '自由态'
                } else if (r1 == '1' || r1 == '已提交') {
                    r1 = '已提交';
                    extraIconColor = '#FF8B35'
                } else if (r1 == '3' || r1 == '审批通过') {
                    r1 = '审批通过';
                    extraIconColor = '#3099FF'
                }
                else if (r1 == '2' || r1 == '审批中') {
                    r1 = '审批中'
                }
                break;
            case '17':
                r3 = '';
                l4 = '';
                r4 = '';
                child2Icon = l2Icon || '';
                child3Icon = l3Icon || '';
                extraStyle.width = '1.2rem';
                extraStyle.height = '0.6rem';
                extraStyle.lineHeight = '0.6rem';
                briefStyle.height = '0.7rem';
                briefStyle.lineHeight = '1rem';
                briefStyle.width = '87%';
                itemHeight = '2rem';
                rate = 0.55;
                extraStyle.color = '#fff';
                if (r1 == '未确认' || r1 == '未提交' || r1 == '未完成' || r1 == '待确认' || r1 == '未提交') {
                    extraStyle.backgroundColor = '#E54242'

                } else if (r1 == '延期完成') {
                    extraStyle.width = '1.34rem';
                    extraStyle.backgroundColor = '#E54242'
                } else if (r1 == '已确认' || r1 == '已同步' || r1 == '完成') {
                    extraStyle.backgroundColor = '#0D92E4'

                } else if (r1 == '已作废' || r1 == '驳回' || r1 == '已撤销') {
                    extraStyle.backgroundColor = '#aaa'

                } else {
                    extraStyle.width = '3.2rem'
                }
                break;
            default:
                break

        }
        let childR1 = r1 ? (<SSExtraItem text={r1} extraStyle={extraStyle} extraIcon={childR1Icon}
                                         extraIconColor={extraIconColor}/>) : null
        let child2 = l2 ? (
                <SSListBrief text={l2} extra={r2 ? r2 : null} briefStyle={briefStyle}
                             icon={child2Icon}
                             singLine={r2 ? false : true}
                             extraIcon={extraIcon} type={type}/>) : null
        let child3 = l3 ? (
                <SSListBrief text={l3} extra={r3 ? r3 : null}
                             briefStyle={type === '7' ? otherBriefStyle : briefStyle}
                             icon={child3Icon}
                             singLine={r3 ? false : true}
                             type={type} extraIcon={extraIcon}/>) : null
        let child4 = l4 ? (
                <SSListBrief text={l4} extra={r4 ? r4 : null} briefStyle={briefStyle}
                             singLine={r4 ? false : true}
                             icon={child4Icon} extraIcon={extraR4Icon}/>) : null

        const cls = classNames({
            'over-brim': childR1Icon == 'icon-biaoqian' ? true : false

        })
        const l1Cls = classNames({
            'single-line': true

        })
        let l1With = null
        if (r1 || r1 == 0) {
            l1With = clientWidth * rate
        } else {
            l1With = clientWidth * 0.88
        }
        return (
            <Item
                style={{overflow: childR1Icon == 'icon-biaoqian' ? 'visible' : 'hidden', minHeight: itemHeight}}
                thumb={this.renderIcon()}
                extra={childR1}
                arrow={arrow}
                align={extraAlign}
                error={error}
                multipleLine={multipleLine}
                wrap={wrap}
                activeStyle={activeStyle}
                platform={platform}
                onClick={(e) => this.onClick(e)}>

                {<div style={{height: '0.5rem', marginBottom: '0.15rem'}}>
                    <span className={l1Cls} style={{width: l1With + 'px'}}>{l1}</span>
                </div>}

                {child2}

                {child3}

                {child4}
            </Item>

        )
    }
}

SSListItem.defaultProps = {
    type: '0',
    /*    subText: '',
     extraText: '',*/
    /*   extraAlign: 'top',*/
    /*extraColor: '#666',*/
    /*    extraFontStyle: 'normal',*/
    wrap: false,
    /*  arrow: '',
     thumb: null,*/
}

SSListItem.propTypes = {
    type: PropTypes.string,//列表类型
    l1: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
    ]),
    r1: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
    ]),
    l2: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
    ]),
    r2: PropTypes.string,
    l3: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
    ]),
    r3: PropTypes.string,
    l4: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element,
    ]),
    r4: PropTypes.string,
    l2Icon: PropTypes.string,
    r2Icon: PropTypes.string,
    l3Icon: PropTypes.string,
    r3Icon: PropTypes.string,
    r4Icon: PropTypes.string,
    l4Icon: PropTypes.string,

    /* subText: PropTypes.string,//列表内的子标题
     extraText: PropTypes.string,//列表右侧上方内容
     extraAlign: PropTypes.string,//列表右侧上方内容对齐形式和右侧箭头对齐形式
     extraStyle:PropTypes.object,//列表右侧上方内容样式
     extraColor: PropTypes.string,//列表右侧上方内容字体颜色
     extraFontStyle: PropTypes.string,//列表右侧上方内容字体样式
     extraFontSize:PropTypes.number,//列表右侧上方内容字体大小
     thumb:PropTypes.string||PropTypes.element,//普通列表缩略图(当为 string 类型时作为 img src)
     multipleLine: PropTypes.bool,//列表展示多行还是单行默认单行
     arrow:PropTypes.string,//箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示,
     error:PropTypes.bool,//报错样式,右侧文字颜色变成橙色,
     wrap:PropTypes.bool,//是否换行，默认情况下，文字超长会被隐藏,
     activeStyle:PropTypes.object,//自定义active的样式
     platform:PropTypes.string,//设定组件的平台特有样式, 可选值为 android, ios， 默认为 cross， 即组件会自动检测设备 UA 应用不同平台的样式*/

};

export default SSListItem;