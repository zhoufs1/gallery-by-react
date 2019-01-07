import React, {PropTypes} from 'react';
import {Button, Icon} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import TweenOne, {TweenOneGroup} from 'rc-tween-one';
import BannerAnim, {Element} from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const BgElement = Element.BgElement;

class Banner extends React.Component {
    constructor() {
        super();
        this.state = {d: 0, hour: 0, minute: 0, second: 0}
    }

    time = (year, month, day) => {
        const dateNow = new Date();
        const dateJNR = new Date(year, month - 1, day);
        const d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        const hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        const minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        const second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({d: d, hour: hour, minute: minute, second: second});
    };

    componentDidMount() {
        this.time.call(this, 2018, 9, 29);
    }

    render() {
        const props = {...this.props};
        delete props.isMobile;
        const {d, hour, minute, second} = this.state;
        const childrenData = [
            {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: `我的寶寶呀，我們在一起已經${d+1}天了`,
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '想起第一次见面',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '你微笑、可愛、美麗、大方的樣子',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: `在我心中汎起波浪，久久不能平静`,
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '我说，这就是我喜欢的模样',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '人这一生，有很多擦肩而过',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '人总是不顾一切的往前跑，却在不经意之间',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '错过了不该错过的人，伤了不该伤的心',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '当我鼓起勇气说，想要牵起你的手的时候',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '其实在我的内心已经是无比坚定',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '你就是我要找的人',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '我想一直保护你、陪伴你、宠着你',
                button: 'Learn More',
            }, {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '纵使天旋地转，北斗星移，年岁漂移',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '你永远是我的中心',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '我想娶你，不想让你等太久',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '往后的日子',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '只想埋头挣钱，拥抱幸福',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '平淡是你，快乐是你',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                content: '',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },
            {
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },{
                title: '<img width="50%" src="https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png" />',
                button: 'Learn More',
            },
        ];
        console.log(childrenData.length);
        const childrenToRender = childrenData.map((item, i) => {
            const title = item.title;
            const content = item.content;
            const button = item.button;
            return (<Element
                key={i}
                prefixCls="banner-user-elem"
            >
                <BgElement
                    className={`bg bg${i}`}
                    key="bg"
                />
                <QueueAnim
                    type={['bottom', 'top']} delay={800}
                    className={`${props.className}-title`}
                    key="text"
                    id={`${props.id}-wrapperBlock${i}`}
                >
          <span
              className="logo"
              key="logo"
              id={`${props.id}-titleBlock${i}`}
              dangerouslySetInnerHTML={{
                  __html: title,
              }}
          />
                    <p
                        key="content"
                        id={`${props.id}-contentBlock${i}`}
                    >
                        {content}
                    </p>
                </QueueAnim>
            </Element>);
        });
        return (
            <OverPack
                {...props}
            >
                <TweenOneGroup
                    key="banner"
                    enter={{opacity: 0, type: 'from'}}
                    leave={{opacity: 0}}
                    component=""
                >
                    <div className={`${props.className}-wrapper`}>
                        <BannerAnim
                            key="banner"
                        >
                            {childrenToRender}
                        </BannerAnim>
                    </div>
                </TweenOneGroup>
                <TweenOne
                    animation={{y: '-=20', yoyo: true, repeat: -1, duration: 1000}}
                    className={`${props.className}-icon`}
                    style={{bottom: 40}}
                    key="icon"
                >
                    {/*<Icon type="down"/>*/}
                </TweenOne>
            </OverPack>
        );
    }
}

Banner.propTypes = {
    className: PropTypes.string,
};

Banner.defaultProps = {
    className: 'banner1',
};

export default Banner;

