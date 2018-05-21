/**
 * Created by TJQ on 2017/8/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SSIcon extends Component {
    render() {
        const {icon, size, ...restProps} = this.props;
        let svg = void 0;
        if (icon) {
            try {
                svg = require('../../common/svg/' + icon + '.svg');
            } catch (e) {
                console.error(e);
            } finally {
            }
        }
        return (
            <span style={{verticalAlign: 'sub'}}>
                <svg className={`am-icon am-icon-${svg.substr(1)} am-icon-${size}`}
                     {...restProps}>
            <use xlinkHref={svg}/>
            </svg></span>
        )
    }
}

SSIcon.defaultProps = {
    icon: '',
    color: '#868686', //图标的颜色
    size: 'md', //'xxs'/'xs'/'sm'/'md'/'lg'
}

SSIcon.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
}

export default SSIcon;
