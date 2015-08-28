var kavel_Show = (function () {
    var oShow = document.getElementById("kavel").getElementsByClassName("kavel-show")[0];
    var showData = kavelJsonData.show;
    var obj = {
        dataBinding: function () {
            var frg = document.createDocumentFragment();
            for (var i = 0; i < showData.length; i++) {
                var a = document.createElement("a");
                a.href = showData[i].href;
                if (i == showData.length - 1) {
                    a.className = "a-last";
                }
                var img = new Image;
                img.src = showData[i].src;
                img.alt = showData[i].alt;
                a.appendChild(img);
                frg.appendChild(a);
            }
            oShow.appendChild(frg);
        }
    };
    return obj;
})();
kavel_Show.dataBinding();

var kavel_Banner = (function () {
    var oBannerUl = document.getElementById("kavel").getElementsByClassName("kavel-banner")[0].getElementsByTagName("ul")[0];
    var bannerData = kavelJsonData.banner;
    var obj = {
        dataBinding: function () {
            var frg = document.createDocumentFragment();
            for (var i = 0; i < bannerData.length; i++) {
                var oLi = document.createElement("li");
                oLi.className = "banner-item";
                if (i == bannerData.length - 1) {
                    oLi.id = "last"
                }

                var aTitle = document.createElement("a");
                aTitle.href = bannerData[i].title.href;
                aTitle.innerHTML = bannerData[i].title.name;
                aTitle.className = "banner-title";
                oLi.appendChild(aTitle);

                var oDivLink = document.createElement("div");
                oDivLink.className = "links";
                for (var j = 0; j < bannerData[i].link.length; j++) {
                    var aLink = document.createElement("a");
                    aLink.href = bannerData[i].link[j].href;
                    aLink.innerHTML = bannerData[i].link[j].name;
                    oDivLink.appendChild(aLink);
                }
                oLi.appendChild(oDivLink);

                var oDivDetails = document.createElement("div");
                oDivDetails.className = "details";
                var oUlChildrenList = document.createElement("ul");
                oUlChildrenList.className = "children-list";
                for (var k = 0; k < bannerData[i].children.length; k++) {
                    var oLiChildrenList = document.createElement("li");
                    var aHref = document.createElement("a");
                    aHref.href = bannerData[i].children[k].href;
                    var img = new Image();
                    img.src = bannerData[i].children[k].src;
                    aHref.appendChild(img);
                    var span = document.createElement("span");
                    span.innerHTML = bannerData[i].children[k].name;
                    aHref.appendChild(span);
                    oLiChildrenList.appendChild(aHref);
                    oUlChildrenList.appendChild(oLiChildrenList);
                }
                oDivDetails.appendChild(oUlChildrenList);

                if (bannerData[i]["明星配件"]) {
                    var oDivSpecialSection = document.createElement("div");
                    oDivSpecialSection.className = "children-special-section";
                    var oH4SpecialSection = document.createElement("h4");
                    oH4SpecialSection.innerHTML = "明星配件";
                    oDivSpecialSection.appendChild(oH4SpecialSection);
                    var oUlSpecialSection = document.createElement("ul");
                    for (var l = 0; l < bannerData[i]["明星配件"].length; l++) {
                        var oLiSpecialSection = document.createElement("li");
                        var aSpecialSection = document.createElement("a");
                        aSpecialSection.href = bannerData[i]["明星配件"][l].href;
                        aSpecialSection.innerHTML = bannerData[i]["明星配件"][l].name;
                        oLiSpecialSection.appendChild(aSpecialSection);
                        oUlSpecialSection.appendChild(oLiSpecialSection);
                    }

                    oDivSpecialSection.appendChild(oUlSpecialSection);
                    oDivDetails.appendChild(oDivSpecialSection);
                }
                oLi.appendChild(oDivDetails);
                oLi.onmouseenter = function () {
                    var details = this.getElementsByClassName("details")[0];
                    details.style.display = "block";
                };
                oLi.onmouseleave = function () {
                    var details = this.getElementsByClassName("details")[0];
                    details.style.display = "none";
                };
                frg.appendChild(oLi);
            }
            oBannerUl.appendChild(frg);

            var oDetails = oBannerUl.getElementsByClassName("details");
            var oBannerUlHeight = oBannerUl.scrollHeight;
            for (var a = 0; a < oDetails.length; a++) {
                oDetails[a].style.display = "block";
                var step = Math.ceil(oDetails[a].scrollHeight / oBannerUlHeight);
                if (step > 1) {
                    (step > 4) ? step = 4 : void 0;
                    var oUlChildrenList = oDetails[a].getElementsByClassName("children-list")[0];
                    var oLiChildrenList = oUlChildrenList.getElementsByTagName("li");
                    oUlChildrenList.style.width = step * 247 + "px";
                    for (var b = 0; b < oLiChildrenList.length; b++) {
                        oLiChildrenList[b].style.float = "left";
                    }
                }
                var oDetailsHeight = oDetails[a].scrollHeight;
                if (a * 73 + oDetailsHeight > oBannerUlHeight) {
                    oDetails[a].style.top = oBannerUlHeight - oDetailsHeight - 1 + "px";
                } else {
                    oDetails[a].style.top = a * 73 + "px";
                }
                oDetails[a].style.display = "none";
            }
        }
    };
    obj.init = function () {
        obj.dataBinding();
    };
    return obj;
})();
kavel_Banner.init();

var kavel_Slider = (function () {
    var oSlider = document.getElementById("kavel").getElementsByClassName("kavel-slider")[0];
    var oSliderLi = oSlider.getElementsByClassName("kavel-slider-pagination")[0].getElementsByTagName("li");
    var oSliderContainer = oSlider.getElementsByClassName("kavel-slider-container")[0];
    var oSliderpPgination = oSlider.getElementsByClassName("kavel-slider-pagination")[0].getElementsByTagName("li");
    var oSliderStyle = oSliderContainer.getElementsByTagName("div");
    var prev = oSlider.getElementsByClassName("icon-slides kavel-slider-prev")[0];
    var next = oSlider.getElementsByClassName("icon-slides kavel-slider-next")[0];

    var sliderData = kavelJsonData.slider;

    var step = 0;
    var duration = 300;
    var curTime = 0;
    var interval = 13;
    var changeInterval = 3000;

    var timerTimeout = null;
    var timerInterval = null;
    var obj = {
        dataBinding: function () {
            var frg = document.createDocumentFragment();
            for (var i = 0; i < sliderData.length; i++) {
                var oDiv = document.createElement("div");
                oDiv.className = "slider-style";
                if (i == 0) {
                    oDiv.style.display = "block";
                }

                var aImg = document.createElement("a");
                aImg.href = sliderData[i].href;

                var img = new Image;
                img.src = sliderData[i].src;
                img.alt = sliderData[i].alt;

                aImg.appendChild(img);
                oDiv.appendChild(aImg);
                frg.appendChild(oDiv);
            }
            oSliderContainer.appendChild(frg);
        }
    };
    obj.divOnmouseover = function () {
        oSlider.onmouseenter = function () {
            prev.style.opacity = 0.6;
            next.style.opacity = 0.6;
            window.clearInterval(timerInterval);
        };
        oSlider.onmouseleave = function () {
            prev.style.opacity = 0;
            next.style.opacity = 0;
            timerInterval = window.setInterval(obj.show, changeInterval);
        }
    };
    obj.show = function () {
        var thisStep;
        step++;
        if (step >= oSliderStyle.length) {
            step = 0;
        } else if (step < 0) {
            step = oSliderStyle.length - 1;
        }
        for (var i = 0; i < oSliderStyle.length; i++) {
            oSliderpPgination[i].className = "";
            oSliderStyle[i].style.left = "0";
            if (oSliderStyle[i].style.display == "block") {
                thisStep = i;
            }
        }
        oSliderStyle[step].style.display = "block";
        oSliderpPgination[step].className = "selected";
        curTime = 0;

        obj.clearEvent();
        function show_() {
            curTime += interval;
            window.clearTimeout(timerTimeout);
            if (curTime >= duration) {
                curTime = duration;
                oSliderStyle[thisStep].style.display = "none";
                obj.eventBinding()
            } else {
                timerTimeout = window.setTimeout(show_, interval);
            }
            oSliderStyle[step].style.opacity = curTime / duration;
            oSliderStyle[thisStep].style.opacity = 1 - curTime / duration;
        }

        show_();
    };
    obj.aOnclick = function () {
        prev.onclick = function () {
            step -= 2;
            obj.show();
        };
        next.onclick = function () {
            obj.show();
        }
    };
    obj.move = function (thisIndex) {
        if (step > thisIndex) {
            oSliderStyle[thisIndex].style.left = "-992px";
            oSliderStyle[step].style.left = "0";
        } else if (step < thisIndex) {
            oSliderStyle[thisIndex].style.left = "992px";
            oSliderStyle[step].style.left = "0";
        } else {
            return;
        }
        oSliderStyle[thisIndex].style.opacity = 1;
        oSliderStyle[thisIndex].style.display = "block";
        curTime = 0;
        obj.clearEvent();
        function move_() {
            curTime += interval;
            window.clearTimeout(timerTimeout);
            if (curTime >= duration) {
                curTime = duration;
                oSliderStyle[step].style.opacity = 0;
                oSliderStyle[step].style.display = "none";
                oSliderStyle[thisIndex].style.left = "0";
                step = thisIndex;
                obj.eventBinding();
                return;
            } else {
                timerTimeout = window.setTimeout(move_, interval);
            }
            var target = curTime / duration * 922;
            if (step > thisIndex) {
                oSliderStyle[thisIndex].style.left = -922 + target + "px";
                oSliderStyle[step].style.left = target + "px";
            } else if (step < thisIndex) {
                oSliderStyle[thisIndex].style.left = 922 - target + "px";
                oSliderStyle[step].style.left = 0 - target + "px";
            }
        }

        move_();
    };
    obj.liOnclick = function () {
        for (var i = 0; i < oSliderLi.length; i++) {
            oSliderLi[i].onclick = function () {
                var thisIndex = this.innerHTML - 1;
                obj.move(thisIndex);
                for (var i = 0; i < oSliderLi.length; i++) {
                    oSliderLi[i].className = "";
                }
                this.className = "selected";
            }
        }
    };
    obj.clearEvent = function () {
        oSlider.onmouseover = null;
        oSlider.onmouseout = null;
        prev.onclick = null;
        next.onclick = null;
        for (var i = 0; i < oSliderLi.length; i++) {
            oSliderLi[i].onclick = null;
        }
    };
    obj.eventBinding = function () {
        obj.divOnmouseover();
        obj.aOnclick();
        obj.liOnclick();
    };
    obj.init = function () {
        obj.dataBinding();
        obj.eventBinding();
        timerInterval = window.setInterval(obj.show, changeInterval);
    };
    return obj;
})();
kavel_Slider.init();
