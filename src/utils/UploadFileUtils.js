import ajax from './ajax'
import BaseHost from './BaseHost'
import AuthToken from './AuthToken'
import {Toast} from 'antd-mobile'
import _ from 'lodash'

/**
 * 文件上传工具
 */
var ADDR = BaseHost.ADDR
var downloadUrl = '/icop-file/file/download?id='
//获取附件列表的url
var listUrl = '/icop-file/file/list'
//上传url
var uploadUrl = '/icop-file/file/muploadx'

//上传base64数据url
var uploadBase64Url = '/icop-file/file/uploadBase64'

var delUrl = '/icop-file/file/del'

var maxSize = 200 * 1024   //200KB

//根据附件id获取纯附件列表
var getFileListByFileIdsUrl = '/icop-file/file/getFileListByFileIds'

/**
 * 文件上传
 * @param itemData
 * @param obj
 * @param billType
 * @param source
 */

function multiFilesUpLoad(obj, billType, source, callback) {
    var loginContext = AuthToken.getContext()
    var files = []
    var imgPics = []
    var fileList = []
    var source = source || {
        sourceId: '',
        sourceType: ''
    }
    if (obj.file) {
        Toast.loading('正在上传...', 1)
        var reader = new FileReader()
        reader.readAsDataURL(obj.file)
        reader.onload = function (e) {
            var imgInfo = {}, result = this.result;
            imgInfo.src = result;
            imgPics.push(imgInfo);

            var img = new Image();
            img.src = result;
            var fileContent = result;

            img.onload = function () {
                var singleFile = {};
                singleFile.fileName = obj.file.name;
                if (fileContent.length > maxSize)
                    fileContent = compress(this);    //图片压缩

                singleFile.fileSize = fileContent.length;
                singleFile.fileContent = fileContent.substring(fileContent.indexOf(',') + 1);

                files.push(singleFile);

                var params = {
                    billType: billType,
                    sourceId: source.sourceId,
                    sourceType: source.sourceType,
                    userId: loginContext.userId,
                    userName: loginContext._A_P_userName,
                    files: files
                }
                ajax.postJSON(ADDR + uploadUrl, params, function (data) {
                    if (data.success) {
                        var backData = data.backData;
                        if (backData.length) {
                            for (var i = 0; i < backData.length; i++) {
                                var item = backData[i];
                                var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                                var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                                var fileUrl = ADDR + '/' + item.filePath;
                                var file = {
                                    gid: item.gid,
                                    name: item.fileName,
                                    url: thumbUrl,
                                    originalUrl: originalUrl,
                                    fileUrl: fileUrl,
                                    status: 'done',
                                    backData: item
                                }
                                fileList.push(file);
                            }
                        }
                        Toast.success(data.backMsg ? data.backMsg : '上传成功!', 1);
                        if (callback && _.isFunction(callback)) {
                            callback(fileList);
                        }
                    } else {
                        Toast.fail(data.backMsg ? data.backMsg : '上传失败!', 1);
                    }
                })
            }
        }
    }else if(obj.files){
        Toast.loading('正在上传...', 1)
        let params = {};
        params.files = obj.files;
        params.billType = billType;
        params.sourceId = source.sourceId;
        params.sourceType = source.sourceType;
        ajax.postJSON(ADDR + uploadUrl, params, function (data) {
            if (data.success) {
                var backData = data.backData;
                if (backData.length) {
                    for (var i = 0; i < backData.length; i++) {
                        var item = backData[i];
                        var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                        var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                        var fileUrl = ADDR + '/' + item.filePath;
                        var file = {
                            gid: item.gid,
                            name: item.fileName,
                            url: thumbUrl,
                            originalUrl: originalUrl,
                            fileUrl: fileUrl,
                            status: 'done',
                            backData: item
                        }
                        fileList.push(file);
                    }
                }
                Toast.success(data.backMsg ? data.backMsg : '上传成功!', 1);
                if (callback && _.isFunction(callback)) {
                    callback(fileList);
                }
            } else {
                Toast.fail(data.backMsg ? data.backMsg : '上传失败!', 1);
            }
        })
    }
}

/**
 * 图片压缩
 * @param img
 * @returns {string}
 */
function compress(img) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    //利用canvas进行绘图
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    //将原来图片的质量压缩到原先的0.2倍。
    var data = canvas.toDataURL('image/jpeg', 0.2) //data url的形式
    return data
}

function delAttach(params, onSuccess, onFail) {
    ajax.getJSON(ADDR + delUrl, params, function (data) {
        if (data.success) {
            Toast.success(data.backMsg ? data.backMsg : '删除成功!', 1)
            if (onSuccess && _.isFunction(onSuccess)) {
                onSuccess()
            }
        } else {
            Toast.fail(data.backMsg ? data.backMsg : '删除失败!', 1)
            if (onFail && _.isFunction(onFail)) {
                onFail()
            }
        }
    }, function (error) {
        Toast.fail('服务器请求失败!', 1)
    })
}

//获取缩略图路径
/**
 *
 * @param filePath
 * @param dimension //缩略图尺寸 置空表示原图  格式: '_100x100'
 * @returns {*}
 */
function zoomImgPath(filePath, dimension) {
    if (!filePath) return filePath

    var idx = filePath.lastIndexOf('.')
    if (idx > -1) {
        var ext = filePath.substr(idx)
        return filePath.substr(0, idx) + (dimension || '') + ext
    } else {
        return filePath
    }
}

function loadAttachList(params, callback) {
    var fileList = []
    ajax.getJSON(ADDR + listUrl, params, function (data) {
        if (data.success) {
            var backData = data.backData
            if (backData != null) {
                for (var i = 0; i < backData.length; i++) {
                    var item = backData[i]
                    var thumbUrl = ADDR + '/' + zoomImgPath(item.filePath, '_100x100');
                    var originalUrl = ADDR + '/' + zoomImgPath(item.filePath);
                    var fileUrl = ADDR + '/' + item.filePath;
                    var file = {
                        gid: item.gid,
                        name: item.fileName,
                        url: thumbUrl,
                        originalUrl: originalUrl,
                        fileUrl: fileUrl,
                        status: 'done',
                        backData: item,
                    }
                    fileList.push(file)
                }
            }
            if (callback && _.isFunction(callback)) {
                callback(fileList)
            }
        } else {
            Toast.fail(data.backMsg ? data.backMsg : '加载附件失败!', 1)
        }
    })
}

/**
 * ajax上传base64图片数据，上传成功后返回url
 * @param imgData  base64图片数据
 * @param params  扩展参数
 * @param callback   数据处理回调
 */
function uploadBase64Img(imgData, params, callback) {
    var data = _.assign({}, params, {content: imgData.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '')})
    ajax.postJSON(ADDR + uploadBase64Url, data, (result) => {
        if (result.success) {
            Toast.fail(result.backMsg ? result.backMsg : '上传成功!', 1)
            if (callback && _.isFunction(callback)) {
                callback()
            }
        } else {
            Toast.fail(result.backMsg ? result.backMsg : '上传失败!', 1)
        }
    }, (error) => {

    })
}

function zipImg(imgBase64, options, callback) {
    console.log('原始大小:' + imgBase64.length)
    var img = new Image()
    img.src = imgBase64
    img.onload = function () {
        var canvas = document.createElement('CANVAS')
        var ctx = canvas.getContext('2d')
        var width = img.width
        var height = img.height
        // 按比例压缩4倍
        //var rate = (width<height ? width/height : height/width)/4;
        var rate = 0.3
        if (width > 800 && height > 480) rate = 0.8
        if (width > 900 && height > 600) rate = 0.75
        if (width > 960 && height > 720) rate = 0.7
        if (width > 1024 && height > 768) rate = 0.65
        if (width > 1280 && height > 768) rate = 0.6
        if (options && options.rate) rate = options.rate
        canvas.width = width * rate
        canvas.height = height * rate
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate)
        var dataURL = canvas.toDataURL('image/png', 0.1)
        // var dataURL = canvas.toDataURL("image/jpeg", 0.8);
        console.log('压缩后大小:' + dataURL.length)
        if (typeof callback == 'function') callback(dataURL)
        canvas = null
    }
}

export default {
    multiFilesUpLoad,
    delAttach,
    loadAttachList,
    uploadBase64Img,
    zipImg
}