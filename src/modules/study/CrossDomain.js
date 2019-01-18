/**
 * 跨域
 */
//什么是跨域？
//由于浏览器的同源策略，只能访问端口、域名、协议相同的服务器上的数据。
//1.jsonP跨域。利用<script/>标签特殊性可以传递回调函数的方式实现跨域。<script src="http://localhost:3001?callback=myFunction"/>
// 执行myFunction回调方法
//2.cors跨域。在请求首部设置请求资源的域名、端口等可以设置Access-Control-Allow-Origin参数来配置可以跨域地址，然后再xmlrequest的onreadystatechange中返回请求成功
//3.nodejs 的http-proxy-middleware 中间件实现跨域，启动一个代理服务器实现转发
//4.nginx

/****
 * 项目中webpack做了哪些事情
 */

//webpack,重要的配置入口、出口、plugins、loader等。
//配置入口文件和打包完文件格式，用到过
//起别名
//loader用法有less、sass等文件loader、babel-loader、url-loader、style-loader、file-loader。
//plugins 有补全css兼容浏览器写法的插件，还有自动生成html代码插件，这类插件插件跨域根据项目情况自行查找。webpack.DllPlugin打包文件

/***
 * webpack做了那些优化
 */

// 1.webpack压缩资源，比如js、css图片等。
// 1.使用webpackDll进行打包优化，节省打包时间。节省了依赖重复打包的时间。建立映射文件，通过依赖关系去查找依赖包。