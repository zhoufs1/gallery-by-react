import React, {Component} from 'react';
import {List,ListView, Toast, NavBar, Card, WingBlank, WhiteSpace, Tabs, Badge} from 'antd-mobile';
import SSList from '../../components/list/list';
import SSLIstItem from '../../components/list/SSListItem';
const {Item} = List;
const {Brief} = Item;

/*const Item = List.Item;
 const Brief = Item.Brief;*/
/*
 * 说明：
 *   SSList 增加multiLine属性，当为列表页时，需要传此属性
 *   ListItem:
 *    type:字符串（1~9）
 *     2:对应节点：周工作安排（接收三个参数,l1(左边最上边的元素：'板筋安装'，r1:右边最上边元素,l2左边第二个，l3左边第三个元素)）
 *     3:对应节点：见证取样(已见证)（接收l1,r1,l2,l3,l4）
 *     3:对应节点：见证取样(未见证)（接收l1,r1,l2,l3,l4）
 *     4：对应节点：图纸管理（接收 l1 ,r1 l2）
 *     5:对应节点：技术交底（接收参数l1,r1,l2,r2）
 *     6:对应节点：见证取样（列表右侧为钢筋原材料的，接收参数l1,r1,l2,r2,l3）
 *     7：对应节点：执行情况检查（接收参数l1,r1,l2,r2）
 *     8:对应节点：委托实验（接收参数l1,r1,l2,r2,l3）
 *     9:对应节点：施工情况检查（接收参数l1,r1,l2,r2,l3）
 *     10：对应节点：作业指导书（接收参数l1,r1,l2,r2）
 *
 *
 *
 * */


/*
 <ListItem
 type="2"
 l1="板筋安装"
 r1='2017-03-21完成'
 l2="钢筋工长：张三"
 l3="计划完成时间:2017-03-21"
 onClick={(e) => this.onClick(e)}
 />

 {/!*-----分割线----------------*!/}
 <ListItem
 type="2"
 l1="板筋安装"
 r1='未确认'
 l2="钢筋工长：张三"
 l3="计划完成时间:2017-03-21"
 onClick={(e) => this.onClick(e)}
 />
 {/!*-----分割线----------------*!/}

 <ListItem
 type="3"
 l1="验收20160403"
 r1='已同步'
 l2="物资名称：钢筋"
 l3="型号:HRB40032"
 l4="取样通知单编号：AAAAAAAAAAAAAAA"
 onClick={(e) => this.onClick(e)}
 />
 {/!*-----分割线----------------*!/}
 <ListItem
 type="3"
 l1="验收20160403"
 r1='见证取样0次'
 l2="物资名称：钢筋"
 l3="型号:HRB40032"
 l4="单据类型：钢筋原材取样通知单"
 onClick={(e) => this.onClick(e)}
 />
 {/!*-----分割线----------------*!/}
 <ListItem
 type="4"
 l1="图纸编号：会所0526"
 r1='结构施工图'
 l2="期间：2017年3月第2周"
 onClick={(e) => this.onClick(e)}
 />



 {/!*-----分割线----------------*!/}


 <ListItem
 type="5"
 l1="TSK0986001"
 r1='自由态'
 l2="施工部位"
 r2="交底日期 2017-03-06"
 onClick={(e) => this.onClick(e)}
 />

 {/!*-----分割线----------------*!/}

 <ListItem
 type="6"
 l1="TSK0986001"
 r1='钢筋原材料'
 l2='钢筋原材料'
 l3='规格型号：TKB400E'
 r3='复核整改单数量3'
 onClick={(e) => this.onClick(e)}
 />

 {/!*-----分割线----------------*!/}

 <ListItem
 type="7"
 l1="TSK0986001"
 r1='未交底'
 l2='检查人：陈海'
 r2='复核整改单数量3'
 onClick={(e) => this.onClick(e)}
 />

 {/!*-----分割线----------------*!/}

 <ListItem
 type="8"
 l1="TSK0986001"
 r1='已提交'
 l2='施工组织设计名称：陈海'
 l3='复核日期 2017-03-06'
 r3='已同步'
 onClick={(e) => this.onClick(e)}
 />
 {/!*-----分割线----------------*!/}

 <ListItem
 type="9"
 l1="TSK0986001"
 r1='已同步'
 l2='整改责任人：陈海'
 r2='复核日期 2017-03-06'
 l3='吊篮作业未采取防摆动措施或吊兰钢丝绳垂掉下拉，需要注意或吊兰钢丝绳垂掉下拉，需要注意'
 onClick={(e) => this.onClick(e)}
 />*/
const dom = <div>

    <h2>白花藤</h2>

    <h3>韩华生</h3>

    <h4>高德利</h4>

    <h5>朱大昌</h5>

    <h6>李东挂</h6>
</div>;

const tabs = [
    {title: <Badge text={'99+'}>全部</Badge>},
    {title: <Badge text={'今日(20)'}>物资</Badge>},
    {title: <Badge dot>设备</Badge>},
    {title: <Badge dot>劳务</Badge>},
    {title: <Badge dot>专业</Badge>},
    {title: <Badge dot>其他</Badge>},
];

const renderRows = (rowData, sectionID, rowID)=>{
    return <div><h2 style={{
        lineHeight: '50px',
        color: '#888',
        fontSize: 18,
        borderBottom: '1px solid #F6F6F6',
    }}>{rowData.data}</h2></div>
};

const dataSource = new ListView.DataSource({
    getRowData:[{rowID:1},{rowID:2}],
    getSectionHeaderData:[{sectionID:1},{sectionID:2}],
    rowHasChanged:(row1,row2)=>row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class ListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListData: []
        }
    }

    onClick = (e) => {
        console.log('onClick', e)
    };

    initData = (result) => {
        this.setState({
            ListData: result
        })
    };
    onLoadMore = (result) => {
        this.setState({
            ListData: result
        })
    };
    saveData = (imgData) => {
        console.log(imgData, 'dddd')
    }

    render() {
        const url = 'https://dev.yonyouccs.com/icop-technology-web/tAStieManWorkInstru/queryList';
        return (
            <div>
                {/*<NavBar*/}
                {/*title='例子'*/}
                {/*/>*/}
                {/*  <SSignature saveData={this.saveData}/>*/}
                <Tabs tabs={tabs}
                      initialPage={2}
                      onChange={(tab, index) => {
                          console.log('onChange', index, tab);
                      }}
                      onTabClick={(tab, index) => {
                          console.log('onTabClick', index, tab);
                      }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                        backgroundColor: '#fff'
                    }}>
                        暂无数据！
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '150px',
                        backgroundColor: '#fff'
                    }}>
                        暂无数据！
                    </div>
                        <SSList multiLine url={url} initData={this.initData} onLoadMore={this.onLoadMore}>
                            {
                                this.state.ListData.map((item, index) => {
                                    let id = item.id;
                                    return (
                                        <Item
                                            key={index}
                                            type="10"
                                            l1={item.billCode}
                                            l2={item.workInstruName}
                                            r1={item.creator}
                                            r2={item.createtime.slice(0, 10)}
                                            onClick={(e) => this.onClick(id)}
                                        />
                                    )
                                })
                            }

                            <Card
                                full={true}>
                                <Card.Header
                                    title="This is title"
                                    thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                                    extra={<div style={{textAlign: 'left'}}><span>this is extra</span>
                                        <h2>韩哥</h2>
                                        <h2>朱哥</h2>
                                        <h2>李哥</h2></div>}/>
                                <Card.Body>
                                    <div>This is content of `Card`</div>
                                </Card.Body>
                                <Card.Footer content="footer content" extra={<div>extra footer content</div>}/>
                            </Card>

                            <WhiteSpace size="lg"/>
                            <Card full>
                                <Card.Header
                                    title="This is title"
                                    thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                                    extra={<div>
                                        <h1>韩哥</h1>
                                        <h2>朱哥</h2>
                                        <h3>李哥</h3>
                                    </div>}
                                />
                                <Card.Body>
                                    <div>This is content of `Card`</div>
                                </Card.Body>
                                <Card.Footer content="footer content" extra={<div>extra footer content</div>}/>
                            </Card>

                            <Item
                                multipleLine={true}>
                                <Brief>{dom}</Brief>
                            </Item>

                            <SSLIstItem
                                type="2"
                                l1="板筋安装"
                                r1='2017-03-21完成'
                                l2="钢筋工长：张三"
                                l3="计划完成时间:2017-03-21"
                                onClick={(e) => this.onClick(e)}
                            />


                            <SSLIstItem
                                type="2"
                                l1="板筋安装"
                                r1='未确认'
                                l2="钢筋工长：张三"
                                l3="计划完成时间:2017-03-21"
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="3"
                                l1="验收20160403"
                                r1='已同步'
                                l2="物资名称：钢筋"
                                l3="型号:HRB40032"
                                l4="取样通知单编号：AAAAAAAAAAAAAAA"
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="3"
                                l1="验收20160403"
                                r1='见证取样0次'
                                l2="物资名称：钢筋"
                                l3="型号:HRB40032"
                                l4="单据类型：钢筋原材取样通知单"
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="4"
                                l1="图纸编号：会所0526"
                                r1='结构施工图'
                                l2="期间：2017年3月第2周"
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="5"
                                l1="TSK0986001"
                                r1='自由态'
                                l2="施工部位"
                                r2="交底日期 2017-03-06"
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="6"
                                l1="TSK0986001"
                                r1='钢筋原材料'
                                l2='钢筋原材料'
                                l3='规格型号：TKB400E'
                                r3='复核整改单数量3'
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="7"
                                l1="TSK0986001"
                                r1='未交底'
                                l2='检查人：陈海'
                                r2='复核整改单数量3'
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="8"
                                l1="TSK0986001"
                                r1='已提交'
                                l2='施工组织设计名称：陈海'
                                l3='复核日期 2017-03-06'
                                r3='已同步'
                                onClick={(e) => this.onClick(e)}
                            />

                            <SSLIstItem
                                type="9"
                                l1="TSK0986001"
                                r1='已同步'
                                l2='整改责任人：陈海'
                                r2='复核日期 2017-03-06'
                                l3='吊篮作业未采取防摆动措施或吊兰钢丝绳垂掉下拉，需要注意或吊兰钢丝绳垂掉下拉，需要注意'
                                onClick={(e) => this.onClick(e)}
                            />
                        </SSList>
                    <ListView dataSource={dataSource} renderRow={renderRows}>
                    </ListView>
                </Tabs>
            </div>
        )
    }
}

export default ListDemo

