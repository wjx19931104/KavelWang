var tabRender=(function(){
            var weixin = document.getElementById("weixin");
            var boxShadow = document.getElementById("boxshadow");
            var loginClose = document.getElementById("loginClose");
            var wxContent = document.getElementById("wxcontent");
            var weixinHeight = getCss(wxContent, "height");
            var ctH = document.documentElement.clientHeight || document.body.clientHeight;
            var t = (weixinHeight + ctH) / 2 + ctH;
   var obj= {
       event: function () {
           weixin.onclick = function (e) {
               e = e || window.event;
               boxShadow.style.display = "block";
               wxContent.style.display = "block";
               loginClose.style.display = "block";
               var t = (weixinHeight + ctH) / 2 + ctH;
               animate(wxContent, {top: 610}, 500);
               animate(loginClose, {top: 610}, 500);
           };
               loginClose.onclick = function (e) {
                   e = e || window.event;
                   boxShadow.style.display = "none";
                   wxContent.style.display = "none";
                   loginClose.style.display = "none";
               };
           function getCss(ele, attr) {
               if (window.getComputedStyle) {
                   return parseInt(window.getComputedStyle(ele, null)[attr]);
               } else {
                   return parseInt(ele.currentStyle[attr]);
               }
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

           function getWin(attr) {
               return parseFloat(document.docutmentElement[attr] || document.body[attr]);
           }
       }
   };
return obj;

   })();
tabRender. event();





