import React, {Component} from 'react';

//子页面路由
class PageRoutes extends Component {

    render() {
        return (
            this.props.children
        );
    }
};
export default PageRoutes;
