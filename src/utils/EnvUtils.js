import _AuthToken from './AuthToken';
import _formatUtils from './formatUtils';

var _AuthToken2 = _interopRequireDefault(_AuthToken);

/*Object.defineProperty(exports, "__esModule", {
    value: true
})*/;

var _formatUtils2 = _interopRequireDefault(_formatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 客户端环境信息变量
 *
 * author: 张远志（zhangzhye@yonyou.com）
 * time 16/09/12 18:19
 *
 */
var Keys = {
    STAFF: "staff", //职员信息
    STAFF_ID: "staffId", //职员ID
    STAFF_NAME: "staffName", //职员姓名

    USER_ID: "userId", //用户ID
    USER_NAME: "userName", //用户名

    CURRENT_ROLE_ID: "currentRoleId", // 角色ID

    ORGA_ID: "orgaId", //组织ID

    CURRENT_DATE: "currentDate", //当前日期
    CURRENT_TIME: "currentTime" //当前时间
};

function getKeyValue(key) {
    //console.log(`ClientEnvironment----获取客户端环境变量值${key}`);
    // eslint-disable-next-line
    switch (key) {
        case Keys.STAFF:
            {
                return _AuthToken2.default.getStaff();
            }
        case Keys.STAFF_ID:
            {
                return _AuthToken2.default.getStaffId();
            }
        case Keys.USER_ID:
            {
                return _AuthToken2.default.getUserId();
            }
        case Keys.USER_NAME:
            {
                return _AuthToken2.default.getUserName();
            }
        case Keys.CURRENT_ROLE_ID:
            {
                return _AuthToken2.default.getCurrentRoleId();
            }
        case Keys.ORGA_ID:
            {
                return _AuthToken2.default.getOrgaId();
            }
        case Keys.CURRENT_DATE:
            {
                return _formatUtils2.default.formatDate(new Date(), "yyyy-MM-dd");
            }
        case Keys.CURRENT_TIME:
            {
                return _formatUtils2.default.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
            }
    }
    return null;
}
function setKeyValue(key, value) {
    console.log('暂不提供支持');
}

export default {
    getKeyValue,
    setKeyValue,
    Keys
};