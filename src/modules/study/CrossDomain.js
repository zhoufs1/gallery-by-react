/**
 * 跨域
 */
//什么是跨域？
//由于浏览器的同源策略，只能访问端口、域名、协议相同的服务器上的数据。
//1.jsonP跨域。利用<script/>标签特殊性可以传递回调函数的方式实现跨域。
// <script src="http://localhost:3001?callback=myFunction"/>
// 执行myFunction回调方法
//2.cors跨域。在请求首部设置请求资源的域名、端口等可以设置Access-Control-Allow-Origin参数来配置可以跨域地址，
// 然后再xmlrequest的onreadystatechange中返回请求成功。
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

// 1.webpack插件压缩资源，比如js、css图片等，节约打包文件大小。
// 2.单页面应用首屏加载资源过多，react的做法是拆分组件，按需加载。
// 3.使用webpackDll进行打包优化，节省打包时间。节省了依赖重复打包的时间。建立映射文件，通过依赖关系去查找依赖包。

/***
 * 做过哪些浏览器兼容
 */
// css3和h5新特性在部分浏览器或者低版本浏览器上不兼容，做法是在caniuse.com网站查找不同浏览器的兼容情况，加上内核前缀用于兼容。
// 兼容ie浏览器怪异盒子模型。
// 部分ui页面伪类hover或者动画或者时间等做防抖处理，防止闪屏，页面。
// forEach、等JavaScript新特性在浏览器中不兼容，比较暴力的做法，重写window.Array.forEach()方法。

/***
 * 做过哪些优化
 */
// 1.单页面应用首屏加载，react组件进行按需加载。
// 2.压缩图片，格式转换，有几个网站好用的压缩网站。
// 3.第三方资源使用cdn服务器加速。
// 4.http header加入缓存，设置缓存过期时间，if-modified-cence，cache-control:max-ages=1000或者nocache,
// cache-control参数：（1）no-control,不缓存；（2）max-age缓存多长时间；（3）no-store,不进行缓存；
// expires设定一个时间，当这个时间到来时更新，cache-Control和Expires同时使用时cache-Control优先级更大。
// 5.适当使用cookie，localStore，sessionStore等缓存数据，避免重复的后端请求。
// 6.css前置，js放底部。
// 7.使用雪碧图合并图片，减少http访问量，UI制作一个大的UI雪碧图，我们使用的时候background-position定位所需图表的位置。
// 8.使用css3动画，尽量不实用js动画,或使用canvas绘画。
// 9.避免回流和重绘。
// 10.图片懒加载。
//

/****
 * 双飞翼布局和圣杯布局
 */

// 圣杯布局和双飞翼布局特点一样，header和footer置头和底部，占满全宽，中间部分3栏，左右固定宽度，中间自适应宽度，container部分宽度保持一致。
// 公共部分
// 1.mian,left,right依次排开，给三者公共的高度，左浮动，这样三列从上往下排成main,left,right;
// 2.mian宽度100%，left宽度100px,right宽度200px；
// 3.给left一个margin-left:-100%,往左移动至main的左边，并挡住mian左边100px，给right一个margin-right：200px,right往左偏移
// 一个自己的宽度。出现在main的右边，并覆盖200px;
// 4.这样你会发现main的内容部分被left和right覆盖了100px和200px;
// —— 圣杯布局 ——
// 给三者外部包裹一个container，contrainer的给一个margin：0 200px 0 100px;原来的left,main,right出现两边留白，
// 这时候只需要left往左给一个-100px，padding即往左移动到空白处，right往右移动一个200px,即给一个-200px的padding，
// 这时候会发现right部分移动到填满右侧空白，这时候mian部分不被填充了。
// ——————————
// —— 双飞翼布局 ——
// 给main一个内部盒子main-container,内部盒子给一个margin：0 200px 0 100px,这样mian被覆盖的部分往左边移动100px，往右变移动200px

/***
 * 自己怎么学习前端的
 */
//平常经常逛掘金、CSDN、技术博客等。
//留意前端几大技术框架和h5、css3、es6新特性，在项目中要有使用和实践，
//有自己的GitHub，对日常所学进行总结。
//通过阅读源码的方式理解技术原理和实现过程，来提升自己。

/***
 * 前端网络安全
 */
// 1.xss攻击，利用漏洞植入script代码，并执行相应的script代码造成泄密等危害。例如输入框，富文本编辑器等。
// 防范xss的做法：对于可能存在漏洞的输入框等进行特殊字符的处理，例如标签等。但是react申明自身是能防御script等特殊
// 字符的攻击，但是dangerouslySetInnerHtml={_html:}这样的写法是能够被攻击的，不建议写。
// 2.csrf攻击，即利用用户在网站上已经登录过未过期的cookies认证信息，以此作为令牌去编写请求执行get等请求，来进行攻击。
// 防范做法：是每次请求都需要验证请求是否携带token；判断请求header的origin，拦截非法部分。

/***
 * 解决过哪些前端兼容性问题
 */
// 1.
