/**
 * Created by zhoufs1 on 2018/4/2.
 */
import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import List from 'components/list/tenderlist';
import 'common/css/tender';
import Item from 'components/list/tenderitem';
import {Tabs} from 'antd-mobile';
import ajax from 'utils/ajax';
import _ from 'lodash';
import tenderUrl from '../tender-url';
const tabs = [
    {title: "全部"},
    {title: '物资'},
    {title: '设备'},
    {title: '劳务'},
    {title: '专业'},
    {title: '其他'},
];

const params = {
    pageNum: 1,
    pageSize: 5,
};
let page = {};

export default class notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],//列表数据
            refreshing: true,//刷新
            isLoading: false,//加载中
            count: 0,
            tabIndex: 0,
            finish: false,//已查询所有数据
        };
    }

    /**
     * 点击事件
     * @param id
     */
    onItemClick(id){
        const location = {pathname:'notice/card',query:{id:id}};
        page.props.router.push(location)
    }

    /**
     * 根据分页参数查询数据
     * @param params
     * @param callback
     */
    fetchData(params, dataSource, callback) {
        ajax.getJSON(tenderUrl.QUERY_LIST, params, result => {
            if (result && result.success) {
                if (result.backData.list) {
                    let retData = _.cloneDeep(result.backData.list);
                    if (dataSource && !_.isEmpty(dataSource)) {
                        retData = [...dataSource, ...retData];
                    }
                    page.setState({
                        dataSource: retData,
                        count: retData.length,
                        refreshing: false,
                    });
                    if (callback) {
                        callback(result.backData.list);
                    }
                }
            } else {
                Toast.fail(result.error, 1);
                page.setState({
                    dataSource: [],
                    count: 0,
                    refreshing: false,
                });
            }
        })
    }

    //获取this
    componentWillMount() {
        page = this
    }

    /**
     * 销毁时候重置param
     */
    componentWillUnmount() {
        delete params.busiType;
    }

    /**
     * 首次打开查询‘全部工程’
     */
    componentDidMount() {
        this.fetchData(params)
    }

    /**
     * 下滑查询更多
     * @param data
     * @param count
     */
    onLoadMore = (data, count) => {
        params.pageNum++;
        this.resolveLoading();
        this.fetchData(params, data, (dataSource) => {
            if (_.isEmpty(dataSource)) {
                this.setState({
                    finish: true,
                    isLoading: false
                });
            }
            else {
                this.setState({
                    isLoading: false,
                });
            }
        });
    };

    /**
     * 下拉刷新列表数据
     */
    onRefresh() {
        const {tabIndex} = page.state;
        if (tabIndex === 0) {
            delete params.busiType;
        } else {
            params.busiType = `${tabIndex - 1}`;
        }
        params.pageNum = 1;
        page.setState({
            refreshing: true,
        });
        page.fetchData(params);
    }

    /**
     * 设置刷新态
     */
    resolveLoading = () => {
        this.setState({
            finish: false,
            isLoading: true,
        });
    };

    /**
     * 页签选择
     * @param tab
     * @param index
     */
    onTabClick(tab, index) {
        if (index === 0) {
            delete params.busiType;
        } else {
            params.busiType = `${index - 1}`;
        }
        params.pageNum = 1;
        this.setState({
            refreshing: true,
            tabIndex: index
        });
        this.fetchData(params);
    }

    /**
     * 页签切换
     * @param tab
     * @param index
     */
    onTabChange(tab,index){
        if (index === 0) {
            delete params.busiType;
        } else {
            params.busiType = `${index - 1}`;
        }
        params.pageNum = 1;
        this.setState({
            refreshing: true,
            tabIndex: index
        });
        this.fetchData(params);
    }

    render = () => {
        const sty = {height:'0.5867rem'};//tab文字样式
        return <div>
            <Tabs tabs={tabs}
                  swipeable={false}
                  tabBarTextStyle={sty}
                  initialPage={0}
                  renderTabBar={props =>
                      <Tabs.DefaultTabBar {...props} page={6}/>}
                  tabBarUnderlineStyle={{//下划线样式
                      width: '8%',
                      marginLeft: '6%'
                  }}
                  onTabClick={this.onTabClick.bind(this)}
                  onChange={this.onTabChange.bind(this)}>
                <div>
                    <List multiLine
                          refreshing={this.state.refreshing}
                          finish={this.state.finish}
                          isLoading={this.state.isLoading}
                          data={this.state.dataSource}
                          onRefresh={this.onRefresh}
                          count={this.state.dataSource.length}
                          onLoadMore={this.onLoadMore}>
                        {_.map(this.state.dataSource, (item, index) => {
                            return <Item
                                onClick={this.onItemClick.bind(this,item.id)}
                                logoPath = {item.logoPath}
                                title={item.billName}
                                company={item.company}
                                content={item.purchaseContent}
                                endTime={item.endTime}
                            />
                        })}
                    </List>
                </div>
            </Tabs></div>
    }
}