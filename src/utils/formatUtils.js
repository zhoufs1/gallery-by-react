/**
 * 默认toFixed方法为四舍六入五成双算法
 * 例如：
 * 0.015.toFixed(2)=>"0.01"
 * 0.105.toFixed(2)=>"0.10"
 * 0.5255.toFixed(3)=>"0.525"
 * 重写toFixed方法调整为四舍五入算法
 */
// eslint-disable-next-line
Number.prototype.toFixed = function (d) {
    var s = this + "";
    if (!d) d = 0;
    if (typeof d === 'string') d = Number(d);
    if (s.indexOf(".") === -1) s += ".";
    s += new Array(d + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
        var t = "0" + RegExp.$2,
            pm = RegExp.$1,
            a = RegExp.$3.length,
            b = true;
        if (a === d + 2) {
            a = t.match(/\d/g);
            // eslint-disable-next-line
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    // eslint-disable-next-line
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] === 10) {
                        a[i] = 0;
                        b = i !== 1;
                    } else break;
                }
            }
            t = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
        }
        if (b) t = t.substr(1);
        return (pm + t).replace(/\.$/, "");
    }
    return this + "";
};
var formatUtils = {
    /**
     * 每三位数字用逗号分隔
     * @param num 实际数值(number类型)（支持小于0的值）
     * @param digits 小数位位数，默认值：2，即保留两位小数
     * @param sp 每隔几位数进行逗号分隔，默认值：3，即千分位逗号分隔
     * @param defaultValue 当值不存在的情况下显示的默认值，默认为空字符串
     * @returns {*}
     */
    formatNumber: function formatNumber(num, digits, sp, defaultValue) {
        if (isNaN(num) || num === '' || num === undefined || num === null) {
            if (arguments.length === 4) return arguments[3];
            return '';
        }
        if (sp === null) {
            sp = 3;
        }
        digits = digits >= 0 && digits <= 20 ? digits : 2;
        num = parseFloat((num + "").replace(/[^\d.-]/g, ""));
        var flag = false;
        if (num < 0) {
            flag = true;
            num = Math.abs(num);
        }
        num = num.toFixed(digits) + "";
        var tem = num.split(".");
        var l = tem[0].split("").reverse();
        var r = tem[1] && tem[1].length >= 1 ? tem[1] : "";
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % sp === 0 && i + 1 !== l.length ? "," : "");
        }
        if (digits === 0) {
            return (flag ? "-" : "") + t.split("").reverse().join("");
        } else {
            return (flag ? "-" : "") + t.split("").reverse().join("") + "." + r;
        }
    },
    formatMoney: function formatMoney(money) {
        return this.formatNumber(money, 2, 3);
    },
    formatDate: function formatDate(date, format) {
        if (date === null || !(date instanceof Date)) {
            return date;
        }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "(H|h)+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    parseAntDate: function parseAntDate(value) {
        if (value) {
            value = new Date(value.replace(/-/g, '/'));
        }
        return value;
    },

    //格式化日期控件值
    formatAntDate: function formatAntDate(date) {
        if (date && date instanceof Date) {
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            mm = mm < 10 ? '0' + mm : mm; //补0
            dd = dd < 10 ? '0' + dd : dd; //补0
            date = date.getFullYear() + '-' + mm + '-' + dd;
        }
        return date;
    }
    //value:100---->100台
    ,
    formatUnitTA: function formatUnitTA(value) {
        return formatUtils.formatText(value, '台');
    }
    //value:100---->100元
    ,
    formatMoneyCN: function formatMoneyCN(value) {
        return formatUtils.formatText(value, '元');
    }
    //value:100---->100元/人
    ,
    formatMoneyPeopleCN: function formatMoneyPeopleCN(value) {
        return formatUtils.formatText(value, '元/人');
    }
    //value:100---->100元/天
    ,
    formatMoneyDayCN: function formatMoneyDayCN(value) {
        return formatUtils.formatText(value, '元/天');
    }
    //value:100---->￥100
    ,
    formatMoneyEN: function formatMoneyEN(value) {
        return formatUtils.formatText(value, '￥', 'left');
    }
    //value:22---->22%
    ,
    formatRatio: function formatRatio(value) {
        return formatUtils.formatText(value, '%');
    }
    /**
     * 格式化单位
     * @param value 原始值
     * @param unit 单位名称，如：元、台
     * @param pos 单位位置，'right'-默认值，放在右侧(如:"100元")，'left'-放在左侧(如:"￥100")
     */
    ,
    formatText: function formatText(value, unit, pos) {
        if (value !== '') {
            return pos === 'left' ? unit + value : value + unit;
        }
        return '';
    }
    /**
     * 将对象中 指定的boolean类型转换为string   true-->Y | false-->N
     * @param obj   要转换的对象
     * @param formatPropertiesArray 要转换的属性数组
     */
    ,
    formatBooleanToString: function formatBooleanToString(obj, formatPropertiesArray) {
        if (!(obj instanceof Object) || !(formatPropertiesArray instanceof Array)) {
            return {};
        }
        formatPropertiesArray.forEach(function (property) {
            obj[property] = obj[property] === true ? "Y" : "N";
        });
        return obj;
    }
};

export default formatUtils;