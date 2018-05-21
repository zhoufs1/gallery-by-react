import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';

class App extends Component {

    componentWillMount() {
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    }

    onBackKeyDown() {
        if (window.location.hash === '#/') {
            window.YYPlugin.call("CommonPlugin", "closewindow");
        } else {
            hashHistory.goBack();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("backbutton", this.onBackKeyDown, false);
    }

    render() {
        return (
            this.props.children
        );
    }
}

// 利用connect将组件与Redux绑定起来
export default connect((AppMd) => ({AppMd}))(App)