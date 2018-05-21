import React,{Component} from 'react';
import {Grid, WhiteSpace,NavBar} from 'antd-mobile';
import Commiss from '../common/img/Commiss.png';
import Sampling from '../common/img/Sampling.png';
import DrawMan from '../common/img/DrawMan.png';
import GroupIn from '../common/img/GroupIn.png';
import GroupRecord from '../common/img/GroupRecord.png';
import GroupProces from '../common/img/GroupProces.png';
import ProgramInsp from '../common/img/ProgramInsp.png';
import ProgramRecord from '../common/img/ProgramRecord.png';
import ProgramProcess from '../common/img/ProgramProcess.png';
import TechnicalDisc from '../common/img/TechnicalDisc.png';
import WorkInstru from '../common/img/WorkInstru.png';
import DateBasic from '../common/img/DateBasic.png';

class MenuGrid extends Component {
    clickGrid(info, index) {
        const location = {};
        if (info.url) location.pathname = info.url;
        if (info.query) location.query = info.query;
        if (info.state) location.state = info.state;
        this.props.router.push(location);
    }

    onLeftClick = () => {
        window.YYPlugin.call("CommonPlugin","closewindow");
    };

    render() {
        const data = [{
            icon: DateBasic,
            text: 'demo1',
            url: '/demo',
        },
            {
                icon: DateBasic,
                text: 'demo2',
                url: '/demo2',
            },
            {
                icon: DateBasic,
                text: '供应商',
                url: '/suplist',
            },{
                icon: GroupProces,
                text: '招标商机',
                url: '/notice',
            },{
                icon: GroupProces,
                text: '报价',
                url: '/quote',
            },{
                icon: GroupProces,
                text: '定标',
                url: '/confirm',
            },

        ];

        return (
            <div className="menu-grid">
                <NavBar title="筑云采" onLeftClick={this.onLeftClick}/>
                <WhiteSpace/>
                <Grid hasLine={false} data={data} columnNum={3} onClick={this.clickGrid.bind(this)}/>
            </div>
        )
    }
}

export default MenuGrid;
