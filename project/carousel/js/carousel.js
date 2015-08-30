var oCarousel = document.getElementById("carousel");
var oImgCur = oCarousel.getElementsByClassName("img_cur")[0];
var oImgPre = oCarousel.getElementsByClassName("img_pre")[0];
var oFocusTitle = oCarousel.getElementsByClassName("focus_title")[0];
var oFocusInner = oCarousel.getElementsByClassName("focus_thumbnails_inner")[0];
var oUl = oFocusInner.getElementsByTagName("ul")[0];
var oBtnPrev = oCarousel.getElementsByClassName("btn_prev")[0];
var oBtnNext = oCarousel.getElementsByClassName("btn_next")[0];
var index = -1;//li的索引号，自动轮播使用

//数据绑定
function dataBind() {
    var str = "";
    for (var i = 0, len = jsonData.length; i < len; i++) {
        if (i < 7) {
            str += '<li style="display: list-item;">';
        }else{
            str += '<li style="display: none;">';
        }
        str += '<a href="javascript:void 0;" target="_blank" title="' + jsonData[i].title + '" data-pic="' + jsonData[i].max + '"><img src="' + jsonData[i].min + '" alt="' + jsonData[i].title + '"></a></li>';
    }
    oUl.innerHTML = str;
}
dataBind();

var oLis = oUl.getElementsByTagName("li");
var oLisLen = oLis.length;

//实现两组li的切换
function changeLis() {
    for (var i = 0; i < oLisLen; i++) {
        if (oLis[i].style.display == "none") {
            oLis[i].style.display = "list-item";
        } else {
            oLis[i].style.display = "none";
        }
    }
}
//给"上一组"和"下一组"事件绑定方法，用来切换li
oBtnPrev.addEventListener("click", changeLis, false);
oBtnNext.addEventListener("click", changeLis, false);

//图片切换时的动画
function changed() {
    if (oImgCur.getAttribute("title") == title) {
        return;
    }
    for (var i = 0; i < oLisLen; i++) {
        oLis[i].className = "";
    }
    oLis[index].className = "current";

    var aHref = oLis[index].getElementsByTagName("a")[0];
    var imgUrl = aHref.getAttribute("data-pic");
    var title = aHref.getAttribute("title");

    var h2Title = title.split(" ");
    var focusTitle = title;
    if (h2Title.length == 2) {
        focusTitle = h2Title[0] + "<br/>" + h2Title[1];
    }
    oFocusTitle.innerHTML = focusTitle;
    oFocusTitle.setAttribute("title", title);
    oImgPre.style.backgroundImage = oImgCur.style.backgroundImage;
    oImgCur.style.opacity = 0;
    oImgCur.style.backgroundImage = "url(" + imgUrl + ")";
    oImgCur.setAttribute("title", title);

    var totalTime = 100;//单位毫秒，是切换图片动画总的执行时间
    var interval = 10;//动画的时间间隔，单位毫秒
    var usedTime = 0;//动画已用的时间，单位毫秒
    var rate = usedTime / totalTime;//已用时间和总时间的比率，rate*(目标值-初始值)是每次执行动画所运动的值
    var timer = window.setTimeout(_move, interval);//动画的定时器
    function _move() {
        timer = null;
        usedTime += interval;
        rate = usedTime / totalTime;
        if (rate >= 1) {
            oImgCur.style.opacity = 1;
            window.clearTimeout(timer);
            return;
        }
        oImgCur.style.opacity = usedTime / totalTime;
        timer = window.setTimeout(_move, interval);
    }
}

//给ul添加滑过事件，让滑过的li添加current样式，并把其他的li的current样式清除，然后把h2和大图的图片切换为当前li对应的文字信息和图片
oUl.addEventListener("mouseover", function (e) {
    var curNode = e.target.nodeName;
    if (curNode == "LI" || curNode == "IMG") {
        var oLi = curNode == "LI" ? e.target : e.target.parentNode.parentNode;
        var ary = [], pre = oLi.previousElementSibling;
        while (pre) {
            ary.unshift(pre);
            pre = pre.previousElementSibling;
        }
        index = ary.length;
        changed();
    }
}, false);

function autoChange() {
    index += 1;
    if (index == oLisLen) {
        index = 0;
    }
    if (oLis[index].style.display == "none") {
        changeLis();
    }
    changed();
}
autoChange();//初始化页面，当页面加载完成后，首先执行init方法，显示第一张大图并且让第一个li是选中状态
var interval = window.setInterval(autoChange, 2000);

oCarousel.addEventListener("mouseenter", function (e) {
    window.clearInterval(interval);
    interval = null;
}, false);
oCarousel.addEventListener("mouseleave", function (e) {
    interval = window.setInterval(autoChange, 2000);
}, false);