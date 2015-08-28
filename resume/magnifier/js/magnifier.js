function magnifier(ele, zoomImg, zoomWidth, zoomHeight, coverStyle, zoomStyle) {
    function getCss(curEle, attr) {
        var value = null, reg = /(margin|padding|float|display|border|background)/;
        if (window.getComputedStyle) {
            value = window.getComputedStyle(curEle, null)[attr];
        } else {
            value = curEle.currentStyle[attr];
        }
        value = !reg.test(attr) ? parseFloat(value) : value;
        return value;
    }

    function setCss(curEle, attr, value) {
        var regPx = /^(width|height|margin|marginLeft|marginRight|marginTop|marginBottom|padding|paddingLeft|paddingRight|paddingTop|paddingBottom|left|top|right|bottom)$/;
        if (attr === "opacity") {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        if (regPx.test(attr)) {
            var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|em|rem|pt|%)$/;
            curEle["style"][attr] = reg.test(value) ? value : value + "px";
            return;
        }
        curEle["style"][attr] = value;
    }

    function setGroupCss(curEle, styleObj) {
        if (Object.prototype.toString.call(styleObj) === "[object Object]") {
            for (var key in styleObj) {
                setCss(curEle, key, styleObj[key]);
            }
        }
    }

    if (!(ele && zoomImg)) {
        return false;
    }
    var coverStyle = coverStyle ? coverStyle : {};
    var zoomStyle = zoomStyle ? zoomStyle : {};
    var oMask = document.createElement("div");
    var oZoom = document.createElement("div");
    ele.onmouseenter = function (e) {
        oMask.style.left = e.pageX - this.offsetLeft + "px";
        oMask.style.top = e.pageY - this.offsetTop + "px";
        var maskStyleDefault = {
            width: 100,
            height: 100,
            position: "absolute",
            background: "black",
            opacity: 0.8,
            cursor: "move"
        };
        setGroupCss(oMask, maskStyleDefault);
        setGroupCss(oMask, coverStyle);
        this.appendChild(oMask);

        //创建放大区域
        oZoom.style.width = zoomWidth * oMask.offsetWidth / this.offsetWidth + "px";
        oZoom.style.height = zoomHeight * oMask.offsetHeight / this.offsetHeight + "px";
        var zoomStyleDefault = {
            position: "absolute",
            left: getCss(ele, "width") + 10,
            top: 0,
            background: "url(" + zoomImg + ")"
        };
        setGroupCss(oZoom, zoomStyleDefault);
        setGroupCss(oZoom, zoomStyle);
        this.appendChild(oZoom);
    };
    ele.onmousemove = function (e) {
        var leftVal = e.pageX - this.offsetLeft - oMask.offsetWidth / 2;
        var topVal = e.pageY - this.offsetTop - oMask.offsetHeight / 2;
        if (leftVal <= 0) {
            oMask.style.left = 0;
        } else if (leftVal >= (this.offsetWidth - oMask.offsetWidth)) {
            oMask.style.left = this.offsetWidth - oMask.offsetWidth + "px";
        } else {
            oMask.style.left = leftVal + "px";
        }
        if (topVal <= 0) {
            oMask.style.top = 0;
        } else if (topVal >= this.offsetHeight - oMask.offsetHeight) {
            oMask.style.top = this.offsetHeight - oMask.offsetHeight + "px";
        } else {
            oMask.style.top = topVal + "px";
        }
        oZoom.style.backgroundPosition = -1 * (oMask.offsetLeft / this.offsetWidth * zoomWidth) + "px -" + (oMask.offsetTop / this.offsetHeight * zoomHeight) + "px ";
    };
    ele.onmouseleave = function (e) {
        this.removeChild(oMask);
        this.removeChild(oZoom);
    };
}
//遮罩/小图=放大区域/大图
//遮罩/小图*大图=放大区域
//遮罩大小是固定，小图大小是固定的,放大区也是可固定：算出来的