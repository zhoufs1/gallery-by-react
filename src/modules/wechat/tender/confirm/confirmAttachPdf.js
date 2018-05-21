/**
 * 报价详情的附件查看的pdf
 * Created by yonyou_zhuyhz on 2018/4/26.
 */
import React from 'react';
import 'common/css/supplier.less';
import DataUtil from 'utils/DataUtil';
import PDF from '../pdf/PDF';
import Viewer from '../pdf/Viewer';
// let url = window.EnvConfig.ADDR,confirmPdfSrc;

class attachListPdf extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            confirmPdfSrc:'',
        }
    }

    //挂载之前
    componentWillMount(){
        this.setState({
            confirmPdfSrc:JSON.parse(DataUtil.localSessionRead('confirmPdfSrc'))
        });
    }

    // 初始化PDF组件时改变meta为可手动缩放
    componentDidMount(){
        // let val = window.location.href.split('?pdfData=')[1];
        // confirmPdfSrc = url +'/' + val;
        // this.setState({
        //     confirmPdfSrc:confirmPdfSrc,
        // });
        document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,user-scalable=yes,initial-scale=0.5,maximum-scale=1.2,minimum-scale=0.1");
    }

    // 组件卸载时恢复meta
    componentWillUnmount(){
        // DataUtil.localSessionRemove('confirmPdfSrc');
        document.querySelector('meta[name="viewport"]').setAttribute("content", "width=device-width,user-scalable=no,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5");
        window.location.reload();
    }

    render() {
        const {confirmPdfSrc} = this.state.confirmPdfSrc;
        return (
            <PDF src={confirmPdfSrc}>
                <Viewer />
            </PDF>
        );
    }
}

export default attachListPdf;