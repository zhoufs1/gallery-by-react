/**
 * Created by zhoufs1 on 2018/4/3.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ListView, PullToRefresh, Toast,WhiteSpace} from 'antd-mobile';
import classNames from 'classnames';
import 'common/css/list.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
let index = 1,
    self;
export default class tenderlist extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => true,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: true,
            count:0,
            isLoading: false,
            useBodyScroll: false,
            height: document.documentElement.clientHeight,
            loading: false,
            finish: false,
            data: [],//数据
        };
    }

    componentWillReceiveProps(nextProps) {
        if('data' in nextProps) {
            this.setState({
                data:nextProps.data,
                count:nextProps.data.length
            })
        }
        if('isLoading' in nextProps) {
            this.setState({
                isLoading:nextProps.isLoading
            })
        }
        if('refreshing' in nextProps) {
            this.setState({
                refreshing:nextProps.refreshing
            })
        }
        if('finish' in nextProps) {
            this.setState({
                finish:nextProps.finish
            })
        }
        if('children' in nextProps){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows([this.props.children]),
            })
        }
    }

    componentWillMount() {
        self = this
    }

    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.refs.lv).offsetTop;
        setTimeout(() => {
            this.setState({
                isLoading: false,
                height: hei
            });
        }, 600);
    }

    finishRequest = (backData, idx = 1) => {
        setTimeout(() => {
            self.setState({
                dataSource: self.state.dataSource.cloneWithRows([self.props.children]),
                backData: backData,
                refreshing: false,
                finish: false,
                isLoading: false,
            });
            index = idx
        }, 10);
    };

    noData = () => {
        Toast.fail('暂无数据！', 1);
        self.finishRequest([]);

    };

    finish = () => {
        this.setState({
            finish: true,
            isLoading: false,
        });
    };

    resolveLoading = () => {
        this.setState({
            finish: false,
            isLoading: true,
        });
    };

    onLoadMore = () => {
        const {data,count} = this.state;
        if(this.props.onLoadMore && _.isFunction(this.props.onLoadMore)) {
            this.props.onLoadMore(data, count);
        }
    };

    onScroll = (e) => {
    };

    onRefresh = () => {
        this.setState({refreshing: true, isLoading: true});
        if(this.props.onRefresh){
            this.props.onRefresh(this.finish);
        }
    };

    onEndReached = (event) => {
        const {finish, isLoading} = this.state;
        if (isLoading || finish) return;
        this.onLoadMore();

    };

    render() {
        let {children, multiLine, loaderLoadingText, loaderDefaultText, displayStyle, scrollerHeight} = this.props;
        let {refreshing, dataSource, useBodyScroll, height, isLoading, finish} = this.state;
        const cls = classNames({
            'my-list': true,
            'list-special': multiLine && displayStyle == '1' ? true : false,
            'list-specials': multiLine && displayStyle == '2' ? true : false,
            [this.props.className]: this.props.className ? true : false

        });

        const pullSty = {'fontSize':'0.16rem'};

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}
                >
                    {!refreshing ? children : []}
                </div>
            );
        };
        console.log('refreshing: ' + refreshing, 'finish: ' + finish, 'isLoading: ' + isLoading, "mmmmmmm")
        return (
            <div>
                <ListView
                    className={cls}
                    ref="lv"
                    dataSource={dataSource}
                    renderRow={row}
                    useBodyScroll={useBodyScroll}
                    selfSize={5}
                    renderFooter={() => (<div style={{textAlign: 'center', padding: 7}}>
                        {refreshing ? '' : finish ? `-- ${loaderDefaultText} --` : isLoading ? loaderLoadingText : false}
                    </div>)}
                    style={{
                        height: scrollerHeight || height,
                        margin: '0',
                        background: '#f8f8f8',
                        overflow: 'auto',
                    }}
                    pullToRefresh={
                        <PullToRefresh
                            style={pullSty}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                    onScroll={() => {
                        console.log('scroll');
                    }}
                    scrollRenderAheadDistance={500}


                />
            </div>
        );
    }
}
tenderlist.propTypes = {
    onLoadMore: PropTypes.func,
    displayStyle: PropTypes.string,
    scrollerHeight: PropTypes.number


};

tenderlist.defaultProps = {
    loaderLoadingText: '加载中...',
    loaderDefaultText: '无更多数据',
    triggerPercent: 100,
    displayStyle: '1',
    scrollerHeight: null,//滚动区域的高度


};
