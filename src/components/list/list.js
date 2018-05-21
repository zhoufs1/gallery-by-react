import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ListView, PullToRefresh, Toast} from 'antd-mobile/lib/index';
import classNames from 'classnames';
import '../../common/css/list.css';
import _ from 'lodash'
import PropTypes from 'prop-types';
import {LoadMore} from 'react-weui'

import ajax from '../../utils/ajax'
let index = 1;
let page;
const defaultParams = {
    pageNumber:0,
    pageSize:20
};
class list extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => true,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: true,
            isLoading: false,
            useBodyScroll: false,
            height: document.documentElement.clientHeight,
            loading: false,
            finish: false,
            data: [],
            items: this.props.children

        };
    }

    componentWillReceiveProps(nextProps) {
        let paramsChange = JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params);
        let urlChange = JSON.stringify(nextProps.url) !== JSON.stringify(this.props.url);
        if (paramsChange || urlChange) {
            this.setState({
                refreshing: true,
                finish: false,
                isLoading: false
            });
            let newParams = paramsChange ? Object.assign({}, defaultParams, nextProps.params) : Object.assign({}, defaultParams, this.props.params);
            let newUrl = urlChange ? nextProps.url : this.props.url;
            this.initData(newUrl, newParams);
        }
    }

    componentWillMount() {
        page = this
    }

    componentDidMount() {

        const hei =document.documentElement.clientHeight-ReactDOM.findDOMNode(this.refs.lv).offsetTop;
        setTimeout(() => {
            this.setState({
                isLoading: false,
                height:hei

            });
        }, 600);
        let newParams = Object.assign({}, defaultParams, this.props.params);
        this.initData(this.props.url, newParams);

    }

    finishRequest = (backData, idx = 1) => {
        if (page.props.initData) page.props.initData(backData);
        setTimeout(() => {
            page.setState({
                dataSource: page.state.dataSource.cloneWithRows([page.props.children]),
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
        page.finishRequest([]);

    };

    initData = (url, params) => {
        let queryType = this.props.ajaxType || 'postJSON';
        if (this.props.className == 'referList-content') {
            params.pageSize = 10;
            params.pageNumber = 1;
            queryType = 'getJSON'
        }
        this.setState({
            refreshing: true,
            isLoading: true,
        });
        if (url) {
            ajax[queryType](url, params, function (result) {
                if (result && result.code === 'success') {
                    page.setState({
                        data: result.data.content,
                        count: result.data.count,
                    });
                    page.finishRequest(result, 2)

                } else if (result && result.success) {
                    if (result.backData) {
                        const content = result.backData.content;
                        const list = result.backData.list;
                        if (_.isArray(content) && content.length > 0) {
                            page.setState({
                                data: content,
                                count: result.backData.totalElements,
                            });
                            page.finishRequest(content)
                        }
                        else if(_.isArray(list) && list.length > 0){
                            page.setState({
                                data: list,
                                count: result.backData.total,
                            });
                            page.finishRequest(list)
                        }
                        else {
                            page.noData()
                        }
                    } else {
                        page.noData()
                    }
                } else {

                    Toast.fail(result ? result.backMsg : '请求出错', 1);
                    page.setState({
                        refreshing: false
                    });
                }
            }, function (err) {
                Toast.fail("服务器通讯异常!", 1);
                page.setState({
                    refreshing: false,
                });
            })
        }
    };

    getListData = (referUrl, pageNumber) => {
        let newParams = Object.assign({}, defaultParams, this.props.params);
        newParams.pageNumber = pageNumber;

        let queryType = this.props.ajaxType || 'postJSON';
        if (this.props.className == 'referList-content') {
            queryType = 'getJSON'
        }
        console.log(newParams, 'newParams')
        ajax[queryType](referUrl, newParams, function (result) {
            page.setState({
                banLoad: false,
                isLoading: false
            });
            if (result && result.code === 'success') {
                page.setState({
                    data: page.state.data.concat(result.data.content),

                })
                console.log(page.state.data, 'data')
                if (page.props.onLoadMore) page.props.onLoadMore(page.state.data)
            } else if (result && result.success) {
                if (result.backData) {
                    page.setState({
                        data: page.state.data.concat(result.backData.content),
                        dataSource: page.state.dataSource.cloneWithRows([page.props.children])


                    });

                    if (page.props.onLoadMore) page.props.onLoadMore(page.state.data)
                }

            } else {
                Toast.fail(result.backMsg, 3);
            }
        }, function (err) {
            page.setState({
                banLoad: false,
                isLoading: false
            });
            Toast.fail("服务器通讯异常!", 3);
        })
    };

    finish = () => {
        this.setState({
            finish: true,
            isLoading: false,

        });
    }
    resolveLoading = () => {
        this.setState({
            finish: false,
            isLoading: true,
        });
    };
    onLoadMore = (resolve, finish) => {
        if (this.state.data.length === this.state.count) {
            finish()
        } else {
            this.getListData(this.props.url, index);
            resolve();
            index++;

        }
    };


    onScroll = (e) => {
    };

    onRefresh = () => {
        this.setState({refreshing: true, isLoading: true});
        let newParams = Object.assign({}, defaultParams, this.props.params);
        this.initData(this.props.url, newParams);
    };

    onEndReached = (event) => {
        let {finish, isLoading} = this.state;
        if (isLoading || finish) return;
        this.onLoadMore(this.resolveLoading, this.finish);

    };

    render() {
        let {children, multiLine, loaderLoadingText, loaderDefaultText,displayStyle,scrollerHeight} = this.props;
        let {refreshing, dataSource, useBodyScroll, height, isLoading, finish} = this.state;
        const cls = classNames({
            'my-list': true,
            'list-special': multiLine&&displayStyle=='1' ? true : false,
            'list-specials': multiLine&&displayStyle=='2' ? true : false,
            [this.props.className]: this.props.className ? true : false

        });


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
            <ListView
                className={cls}
                ref="lv"
                dataSource={dataSource}
                renderRow={row}
                useBodyScroll={useBodyScroll}
                pageSize={5}
                renderFooter={() => (<div style={{textAlign: 'center',padding:15}}>
                    {refreshing ? '' : finish ? `———— ${loaderDefaultText} ————` : isLoading ? loaderLoadingText : false}
                </div>)}
                style={{
                    height:scrollerHeight||height,
                    margin: '0',
                    background: '#f8f8f8',
                    overflow: 'auto',
                }}
                pullToRefresh={
                    <PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}


            />



        );
    }
}
list.propTypes = {
    params: PropTypes.object,
    url: PropTypes.string,
    initData: PropTypes.func,
    onLoadMore: PropTypes.func,
    displayStyle:PropTypes.string,
    scrollerHeight:PropTypes.number


};

list.defaultProps = {
    loaderLoadingText: '加载中...',
    loaderDefaultText: '无更多数据',
    triggerPercent: 100,
    url: '',
    params: {},
    displayStyle:'1',
    scrollerHeight:null,//滚动区域的高度


};

export default list;