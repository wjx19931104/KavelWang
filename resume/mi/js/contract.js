
var contentAllCenterTopLeft=document.getElementById("contentAllCenterTopLeft");
var topLeftInnerLeft=document.getElementById("topLeftInnerLeft");
var topLeftInnerRight=document.getElementById("topLeftInnerRight");
contentAllCenterTopLeft.onmouseover=function(){
    topLeftInnerLeft.style.display="inline-block";
    topLeftInnerRight.style.display="inline-block";
}
contentAllCenterTopLeft.onmouseout=function(){
    topLeftInnerLeft.style.display="none";
    topLeftInnerRight.style.display="none";
}
topLeftInnerLeft.onmouseover=function(){
    topLeftInnerLeft.style.backgroundPositionX="0";
}
topLeftInnerRight.onmouseover=function(){
    topLeftInnerRight.style.backgroundPositionX="-42px";
}
topLeftInnerLeft.onmouseout=function(){
    topLeftInnerLeft.style.backgroundPositionX="";
}
topLeftInnerRight.onmouseout=function(){
    topLeftInnerRight.style.backgroundPositionX="";
}
var topLeftInner=document.getElementById("topLeftInner");
var oFirstDiv=topLeftInner.getElementsByTagName("div").item(0);
var oCopy=oFirstDiv.cloneNode(true);
topLeftInner.appendChild(oCopy);
topLeftInner.style.width=topLeftInner.offsetWidth+oFirstDiv.offsetWidth+"px";
var jStep=0;
var autoTimer=null;
function jMoveLeft(){
    jStep++;
    if(jStep==3){
        topLeftInner.style.left=0;
        jStep=0;
    }
    buffer(topLeftInner,"left",jStep*-992);
    autoTimer=window.setTimeout(jMoveLeft,5000);
}
jMoveLeft();
function jMoveRight(){
    jStep--;
    if(jStep==-1){
        topLeftInner.style.left=-1984+"px";
        jStep=2;
    }
    buffer(topLeftInner,"left",jStep*-992);
    autoTimer=window.setTimeout(jMoveRight,5000);
}

topLeftInnerLeft.onclick=function(){
    window.clearTimeout(autoTimer);
    jMoveLeft();
}
topLeftInnerRight.onclick=function(){
    window.clearTimeout(autoTimer);
    jMoveRight();
}
/*右侧输入框代码：*/
var contentAllCenterTopRight=document.getElementById("contentAllCenterTopRight");
var topRightInput1=document.getElementById("topRightInput1");
var oSpan=contentAllCenterTopRight.getElementsByTagName("span").item(0);
var  topRightDiv=document.getElementById("topRightDiv");
var oP=topRightDiv.getElementsByTagName("p").item(0);
var topRightInput2=document.getElementById("topRightInput2");
var phone=document.getElementById("phone");
var oLis=phone.getElementsByTagName("li");
var price=document.getElementById("price");
var priceSpan=price.getElementsByTagName("span")[0];
var oBtn=document.getElementById("btn");
topRightInput2.str=topRightInput2.getAttribute("forever");
topRightInput1.onfocus=function(){
    oSpan.innerHTML="输入手机号码！";
    oSpan.style.display="none";
    this.value="";
    this.style.color="black";
    utils.addClass(this,"borderColor");

}
topRightInput1.onblur=function(){
    var reg=/^1\d{10}$/;
    var str=this.value;
    console.log(str,1);
    utils.removeClass(this,"borderColor");
    if(str==""){
        this.value=this.getAttribute("trueValue");
        this.style.color="";
        oSpan.style.display="inline-block";
    }else {
        if (!reg.test(str)) {
            oSpan.style.display = "inline-block";
            oSpan.innerHTML = "请输入正确的手机号!";
        }
    }
}
topRightDiv.onmouseover=function(){
    this.style.height="105px";
    utils.addClass(oP,"triangle1");
    topRightInput2.value=topRightInput2.getAttribute("forever");
}
topRightDiv.onmouseout=function(){
    topRightInput2.value=topRightInput2.str;
    this.style.height="";
    utils.removeClass(oP,"triangle1");

}
topRightInput2.onmouseover=function(){
    utils.addClass(this,"bg");
}
topRightInput2.onmouseout=function(){
    utils.removeClass(this,"bg");
}
topRightInput2.onclick=function(){
    topRightInput2.value=topRightInput2.getAttribute("forever");
    topRightInput2.str=topRightInput2.value;
    var reg=/(\d{1,3})/;
    var ary=reg.exec(topRightInput2.str);
    priceSpan.innerHTML=ary[1]*0.984;
}
for(var i=0;i<oLis.length;i++){
    oLis[i].onmouseover=function(){
        utils.addClass(this,"bg");
    }
    oLis[i].onmouseout=function(){
        utils.removeClass(this,"bg");
    }
    oLis[i].onclick=function(){
        topRightInput2.value=this.innerHTML;
        topRightInput2.str=topRightInput2.value;
        topRightDiv.style.height="";
        var reg=/(\d{1,5})/;
        var ary=reg.exec(topRightInput2.str);
        priceSpan.innerHTML=ary[1]*0.984;
    }
}
oBtn.onclick=function(){

}


/*选项卡部分*/
~function(){
    var contentTab=document.getElementById("contentTab");
    var contentTabUl=document.getElementById("contentTabUl");
    var oTabLis=contentTabUl.getElementsByTagName("li");
    var oTabDivs=contentTab.getElementsByTagName("div");
    for(var i=0;i<oTabLis.length;i++){
            oTabLis[i].onclick=(function(i){
            return function(){
                console.log(1);
                for(var j=0;j<oTabLis.length;j++){
                    utils.removeClass(oTabLis[j],"liSelected");
                    utils.removeClass(oTabDivs[j],"selected");
                }
                utils.addClass(oTabLis[i],"liSelected");
                utils.addClass(oTabDivs[i],"selected");
            }
        })(i);
    }
}();

