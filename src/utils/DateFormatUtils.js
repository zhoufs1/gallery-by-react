"use strict";

/**
 * Created by xg on 2017/4/17.
 */
var DateFormatUtils = {

    /**
     * 根据format表达式,转换日期对象
     * @param date
     * @param format
     * @returns {*}
     */
    formatDate: function formatDate(date, format) {
        if (date == null || !(date instanceof Date)) {
            return date;
        }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (!format) {
            format = "yyyy-MM-dd";
        }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },

    /**
     * 将字符串转换成日期对象
     * @param value
     * @param format
     * @returns {*}
     */
    parseAntDate: function parseAntDate(value, format) {
        if (value) {
            if ("yyyy" === format) {
                // 这种方式在必输项校验时会报错
                value = new Date(this.formatDate(value, format)).getFullYear();
            } else {
                if (!(value instanceof Date)) {
                    value = new Date(value.replace(/-/g, '/'));
                }
                return new Date(this.formatDate(value, format));
            }
        }
        return value;
    }
};
module.exports = DateFormatUtils;