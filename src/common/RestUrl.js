/**
 * Created by Administrator on 2016/4/25.
 */

const EnvConfig = window.EnvConfig || {}

var URL_HOME = '/' //主页的链接
//*********本地开发环境************
// 后端服务地址
// var ADDR = "http://60.205.12.0:81";
var ADDR = EnvConfig.ADDR;

var MAURL = EnvConfig.MAURL;

// 后端服务项目名
var ROOT_PATH = EnvConfig.ROOT_PATH;
var WWK_PATH = EnvConfig.WWK_PATH;
// 参照注册服务地址
var REF_SERVER_URL = EnvConfig.REF_SERVER_URL;
// Portal首页地址
var URL_HOME_PORTAL = EnvConfig.URL_HOME_PORTAL;
var URL_WORKBENCH = EnvConfig.URL_WORKBENCH;
var FRONTEND_ROOT_PATH = '/icop-schedule-frontend';
var GET_REFINFO_BYCODE = '/icop-support-web/refer/findByCode';

// 单据类型（示例）
var MODULE_URL = {
    loginContextUrl: ADDR + ROOT_PATH + "/ssoLogin/checkToken",//MA验证token
    checkUpesnToken: ADDR + ROOT_PATH + "/upesn/checkUpesnToken",//友空间验证token

    findByInvoiceCode:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/findByInvoiceCode',//根据发票代码+发票编码=组合编码查询专用发票信息接口
    ContractType: ADDR + "/icop-tax-web/finmgmt/invoice/checkin/getContractType",//    获取合同类型
    getProjectInfoByCompanyId:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/getProjectInfoByCompanyId',//依据登录组织id获取购方+项目信息接口
    identifyMobile:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/identifyMobile',//保存所有
    reflist:ADDR+'/icop-share-web/project/project/reflist',//公司id查询当前公司有权限的项目列表
    getSellerInfoByProjectId:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/getSellerInfoByProjectId',//根据项目id获取购方
    getContractInfoByType:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/getContractInfoByType',//依据不同合同类型,获取合同列表
    getOrgCompany:MAURL+'/maservlet/html/addressnew/index.html#/selectTaxOrg/selectTaxOrg?url='+ADDR+'/icop-orgcenter-web/company/getOrgCompany',//选择税务组织
    getSellerInfoByTaxId:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/getSellerInfoByTaxId',//依据购方id(税务组id)获取购方
    findInvoiceByRegisterId:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/findInvoiceByRegisterId',// 获取我的发票列表
    findById:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/findById',//发票详情
    getSellerInfo:ADDR+'/icop-tax-web/finmgmt/invoice/checkin/getSellerInfo',// 依据销方名称获取销方信息

    //任务中心
    getTaskCount:ADDR+'/icop-ma-web/taskcenter/taskCount',// 获取当前用户的任务条数
    getTaskList:ADDR+'/icop-ma-web/taskcenter/taskList',// 获取当前用户的任务列表

    //审批列表
    queryTodoTask:ADDR+'/icop-bpmcenter-web/bpm/queryTodoTask',// 查询待办审批列表
    queryDoneTask:ADDR+'/icop-bpmcenter-web/bpm/queryDoneTask',// 查询已办审批列表
    queryMySubmit:ADDR+'/icop-bpmcenter-web/bpm/queryMySubmit',// 查询我提交的审批列表
    appDetail:ADDR+'/icop-ma-web/hyy/detail',// 获取任务单据详细信息
    approveList:ADDR+'/icop-ma-web/bpm/approveList',// 获取任务审批历史
    bodyDetail:ADDR+'/icop-ma-web/hyy/bodyDetail',// 获取制定任务单据表体的详细信息
    getBpmId:ADDR+'/icop-bpmcenter-web/bpm/getBpmId',// 获取bpmId
    diagramUrl:ADDR+'/icop-bpmcenter-web/pages/diagram-viewer/index.html?processInstanceId=',// iframe流程图引入地址

    //新闻
    queryRollNews:ADDR+'/icop-news-web/news/rollNews',//查询新闻滚动图片
    queryColumns:ADDR+'/icop-news-web/news/columns',//查询新闻标签
    queryPageNews:ADDR+'/icop-news-web/news/pageNews',//查询新闻列表
    queryNewsDetail:ADDR+'/icop-news-web/news/findContent',//查询新闻详情

    //业务（应用）中心
    myRecommends:ADDR + ROOT_PATH + "/app/myRecommends",// 获取我的推荐列表

    //问题反馈
    getPersonDetail:ADDR+'/icop-ma-web/address/personDetail', //获取用户信息
    insertProblem:ADDR+'/icop-ma-web/problem/insert', //获取用户信息

    //账号绑定
    getBindingInfo:ADDR+'/icop-ma-web/user/getBindingInfo',// 获取指定用户在第三方系统上的绑定信息
    accountBinding:ADDR+'/icop-ma-web/user/accountBinding',// 将用户在指定系统id的目标账号保存到数据库中
    cancelBind:ADDR+'/icop-ma-web/user/cancelBind',// 解除用户在指定系统账号的绑定
}

module.exports = {
  URL_HOME,
  URL_HOME_PORTAL,
  REF_SERVER_URL,
  MODULE_URL,
  ADDR,
  URL_WORKBENCH,
  ROOT_PATH,
  WWK_PATH,
  FRONTEND_ROOT_PATH,
  GET_REFINFO_BYCODE
}