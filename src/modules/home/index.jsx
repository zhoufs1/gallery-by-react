import React from 'react';
import ReactDOM from 'react-dom';
import {enquireScreen} from 'enquire-js';
import url from './audio/gbqq.mp3';


import Nav from './Nav';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Footer from './Footer';
import Point from './Point';

import './less/antMotion_style.less';

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
            show: !window.location.port,
        };
    }

    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({isMobile: !!b});
        });
        // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
        if (window.location.port) {
            // 样式 build 时间在 200-300ms 之间;
            setTimeout(() => {
                this.setState({
                    show: true,
                });
            }, 500);
        }
        const audio = document.getElementById('audio');
        setTimeout(audio.play(),8400);

    }

    render() {
        const children = [
            <Content0 id="content_0_0" key="content_0_0" isMobile={this.state.isMobile}/>,
            <Content1 id="content_1_0" key="content_1_0" isMobile={this.state.isMobile}/>,
            // 导航和页尾不进入锚点区，如果需要，自行添加;
        ];
        return (
            <div className="templates-wrapper">
                {this.state.show && children}
                <audio id="audio" src={url}></audio>
            </div>
        );
    }
}
