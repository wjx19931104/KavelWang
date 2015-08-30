var data = [{
    "生活电器": ["净化器", "加湿器", "净水设备", "吸尘器", "生活电器", "其他生活电器"],
    "智能手机": ["苹果", "三星", "诺基亚", "摩托摩拉", "小米", "联想", "中兴", "华为", "索尼", "HTC", "vivo", "oppo", "锤子手机"],
    "笔记本电脑": ["苹果", "戴尔", "华硕", "惠普", "联想", "三星", "其他电脑"],
    "数码家电": ["冰箱", "洗衣机", "空调", "风扇", "电视", "摄像机", "收音机", "手电筒", "其他家用电器"]
}, "苹果,加湿器,小米,空调,戴尔"];

var navRender = {
    reg: null,
    getHTML: function (data) {
        var str = "";
        var count = 0;
        for (var key in data) {
            count++;
            var cur = data[key];
            var isDownClass = count === 1 ? "m" : "";
            var isFirClass = count === 1 ? "first" : "";
            var isBlock = count === 1 ? "block" : "none";
            var isH = count === 1 ? "56px" : "0";

            str += "<li class='one'>";
            str += "<h2 class='" + isFirClass + "'><span class='downOrUp " + isDownClass + "'></span>" + key + "</h2>";
            str += "<ul style='display: " + isBlock + ";height:" + isH + "' trueH='" + cur.length * 28 + "'>";
            for (var i = 0; i < cur.length; i++) {
                var isRed = this.reg.test(cur[i]) ? "red" : "";
                str += "<li class='" + isRed + "'>" + cur[i] + "</li>";
            }
            str += "</ul>";
            str += "<div class='more' style='display: " + isBlock + "'>查看更多<span class='moreEm'></span></div>";
            str += "</li>";
        }
        return str;
    },
    init: function () {
        //分析数据
        var dataObj = data[0];
        var dataStr = data[1].replace(/,/g, "|");
        this.reg = new RegExp("(" + dataStr + ")");
        //数据绑定
        var navUl = document.getElementById("navUl");
        navUl.innerHTML = this.getHTML(dataObj);
        //绑定事件
        navUl.onclick = function (e) {
            e = e || window.event;
            var srcE = e.target || e.srcElement;
            var pre = null;

            if (srcE.className === "more" || srcE.className === "moreEm") {//实现的是点击更多展示其余的产品
                if (srcE.className === "moreEm") {
                    srcE = srcE.parentNode;
                }
                pre = utils.getPre(srcE);
                srcE.style.display = "none";
                move(pre, pre.getAttribute("trueH"), 100, function () {
                    srcE.isClick = true;
                });

            } else if (srcE.nodeName.toLowerCase() === "h2") {
                //这个点击的是h2
                pre = srcE.parentNode;
                var siblings = utils.getSiblings(pre);
                siblings.myForEach(function (item, index) {
                    //item就是数组中的每一项的值，index是每一项的索引
                    var ul = utils.getChildren(item, "ul")[0];
                    move(ul, 0, 100, function () {
                        ul.style.display = "none";
                    });
                    //ul.style.display = "none";
                    //ul.style.height = "0";
                    var div = utils.getChildren(item, "div")[0];
                    div.style.display = "none";
                    var span = utils.getElementsByClass("downOrUp", item)[0];
                    utils.removeClass(span, "m");
                });

                var span = utils.getElementsByClass("downOrUp", srcE)[0];
                utils.addClass(span, "m");

                var next = utils.getNext(srcE);
                var tar = next.getAttribute("trueH");
                var last = utils.getLast(pre);
                if (!last.isClick) {
                    tar = 56;
                    last.style.display = "block";
                }
                next.style.display = "block";
                move(next, tar, 200);
            }
        }
    }
};

navRender.init();


function move(curEle, target, time, callBack) {
    var curH = utils.getCss(curEle, "height");
    var step = (Math.abs(target - curH) / time) * 10;
    _move();
    function _move() {
        window.clearTimeout(curEle.timer);
        var curH = utils.getCss(curEle, "height");
        if (curH < target) {
            if (curH + step >= target) {
                utils.setCss(curEle, "height", target);
                typeof callBack === "function" ? callBack.call(curEle) : void 0;
                return;
            }
            utils.setCss(curEle, "height", curH + step);
        } else if (curH > target) {
            if (curH - step <= target) {
                utils.setCss(curEle, "height", target);
                typeof callBack === "function" ? callBack.call(curEle) : void 0;
                return;
            }
            utils.setCss(curEle, "height", curH - step);
        } else {
            return;
        }
        curEle.timer = window.setTimeout(_move, 10);
    }
}






