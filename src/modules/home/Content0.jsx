import React, {PropTypes} from 'react';
import {Button, Icon} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {},
            show: true,
        }
    }

    getEnter = (e) => {
        switch (e.index) {
            case 0:
                return {
                    rotate: 90,
                    opacity: 0,
                    y: -60,
                };
            case 10:
            case 1:
                return {
                    y: -60,
                    x: -10,
                    opacity: 0,
                };
            case 9:
            case 2:
                return {
                    y: -60,
                    x: 20,
                    opacity: 0,
                };
            case 3:
                return {
                    y: 60,
                    opacity: 0,
                };
            case 8:
            case 4:
                return {
                    x: 30,
                    opacity: 0,
                };
            case 5:
                return {
                    enter: [
                        {
                            scale: 2,
                            opacity: 0,
                            type: 'set',
                        },
                        {scale: 1.2, opacity: 1, duration: 300},
                        {scale: 0.9, duration: 200},
                        {scale: 1.05, duration: 150},
                        {scale: 1, duration: 100},
                    ],
                    leave: {
                        opacity: 0, scale: 0,
                    },
                };
            case 6:
                return {
                    scale: 0.8,
                    x: 30,
                    y: -100,
                    opacity: 0,
                };
            case 7:
                return {
                    scale: 0.8,
                    x: 30,
                    y: 10,
                    opacity: 0,
                };
            default:
                return {
                    opacity: 0,
                };
        }
    }

    render() {
        const props = {...this.props};
        delete props.isMobile;
        return (
            <OverPack
                replay
                playScale={[0.3, 0.1]}
                {...props}
            >
                <QueueAnim
                    type={['bottom', 'top']}
                    delay={200}
                    className={`${props.className}-wrapper`}
                    key="text"
                    id={`${props.id}-wrapper`}
                >
          <span
              className="title"
              key="title"
              id={`${props.id}-title`}
          >
              <Texty delay={9000} style={{fontStyle: 'WenQuanYi Micro Hei', fontSize: '50px'}} enter={this.getEnter}
                     leave={this.getEnter}>{this.state.show && '永远爱你'}</Texty>
          </span>
                    <Texty delay={1000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'}}
                           enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '我亲爱的宝宝呀'}</Texty>
                    <Texty delay={2000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '往后余生，只想和你一起'}</Texty>
                    <Texty delay={3000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '说很多煽情的事'}</Texty>
                    <Texty delay={4000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '做很多疯狂的话'}</Texty>
                    <Texty delay={6000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '一日'}</Texty>
                    <Texty delay={7000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '两人'}</Texty>
                    <Texty delay={8000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '三餐'}</Texty>
                    <Texty delay={9000} style={{
                        height: '28px',
                        lineHeight: '28px',
                        fontStyle: 'WenQuanYi Micro Hei',
                        fontSize: '13px'
                    }} enter={this.getEnter}
                           leave={this.getEnter}>{this.state.show && '四季'}</Texty>
                </QueueAnim>
                <TweenOne
                    animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                    className={`${props.className}-icon`}
                    key="icon"
                >
                    <Icon type="down"/>
                </TweenOne>
            </OverPack>
        );
    }
}

Content.propTypes = {
    className: PropTypes.string,
};

Content.defaultProps = {
    className: 'banner0',
};

export default Content;
