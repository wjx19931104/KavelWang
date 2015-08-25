var Promise = function () {
    //声明两个字段，一个用于存储成功时执行的函数，一个用于失败时执行的函数。默认值为空函数
    this.onDone = this.onFail = new Function;
};
//then方法用于注册成功函数和失败函数，仅此而已，并且把自己返回，用于链式调用
Promise.prototype.then = function (done, fail) {
    if(typeof done == "function") {
        this.onDone = done;
    }
    if(typeof fail == "function") {
        this.onFail = fail;
    }
    return this;
};

//声明一个延迟对象，用于内部使用，promise是外部使用的
var Deferred = function () { //三种状态：未完成态，完成态，失败态，只能由未完成态变为完成态或失败态
    //添加一个字段，用于存储promise
    this.promise = new Promise();
    this.state = "unfilled";
};
//执行promise对象的成功方法，状态改为完成态
Deferred.prototype.onFilled = function () {
    this.state = "filled";
    this.promise.onDone.apply(null,arguments);
};
//执行promise对象的失败方法，状态改为失败态
Deferred.prototype.onFailed = function () {
    this.state = "failed";
    this.promise.onDone.apply(null,arguments);
};