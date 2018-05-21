/**
 * Created by zhoufs1 on 2018/4/3.
 */
import RestUrl from 'common/RestUrl';

const ADDR = 'https://dev.yonyouccs.com';
const ROOT_PATH = '/icop-purchase-web';

export default {
    QUERY_LIST:ADDR + ROOT_PATH + '/openTender/queryListByWeChat', // 列表查询
    QUERY_DETAIL:ADDR + ROOT_PATH + '/openTender/queryDetailByWeChat', //卡片查询
    QUERY_WIN_DETAIL:ADDR + ROOT_PATH + '/openTender/queryWinNoticeDetailByWeChat',//中标详情
    QUERY_QUOTE_DETAIL:ADDR + ROOT_PATH + '/openTender/queryInquiryDetailByWeChat',//报价详情
    QUERY_CONFIRM_DETAIL:ADDR + ROOT_PATH + '/openTender/queryConfirmDetailByWeChat',//定标详情
};