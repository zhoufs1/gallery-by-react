import React, {Component} from 'react';
import classNames from 'classnames';
import {Icon} from 'antd-mobile';
// import SSIcon from '../icon/SSIcon'
class SSExtraItem extends Component {
    renderBackgroundImg(){
        let {extraIcon,extraIconColor}=this.props;

        return extraIcon ? (
                <Icon icon={extraIcon} size="md" color={extraIconColor}/>
            ) : null;
    }

    render() {
        let {text, extraStyle,extraIcon}=this.props;
        const cls = classNames({
            'listItem-extra': true,
            'listItem-extra-backgroundColor': extraIcon || extraStyle.backgroundColor ? false : true,
            'listItem-extra-backgroundImg': extraIcon ? true : false
        });


        return (
            <div>
                {this.renderBackgroundImg()}
                 <span className={cls} style={extraStyle}>{text}</span>
            </div>

        );
    }
}


export default SSExtraItem;