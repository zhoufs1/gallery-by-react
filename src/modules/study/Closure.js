/***
 **
 * 闭包demo
 */

//闭包就是能够读取其它函数内部变量的函数，对变量有一定封装性。
// 能够访问其他函数作用域，闭包使变量一直保存不被释放，从而造成内存泄漏。

//闭包有两种使用情况：
// 1函数作为返回值；

function animal() {
    var x = 'xiaoming';
    this.a = 'xiaohu';
    return function findXiaoMing(y) {
        if (x === y) {
            console.log('小明已经被找到了！')
        }
        console.log(this.a);
    }
}

var dog = new animal();
dog('xiaozhou');

//2函数作为参数传递;
function animal1() {
    var x1 = 'xiaoming';
    console.log(x1)
}

(function f1(f) {
    var x1 = 'xiaogou';
    f();
})(animal1);


