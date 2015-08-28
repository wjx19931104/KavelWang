function buffer(ele,attr,target,fnCallback){
    window.clearTimeout(ele.timer);
    _buffer();
    function _buffer(){
        var cur=getCss(ele,attr);
        var nSpeed=(target-cur)/10;//速度
        nSpeed=nSpeed>0?Math.ceil(nSpeed):Math.floor(nSpeed);
        ele.style[attr]=cur+nSpeed+"px";
        if(nSpeed) {
            ele.timer = window.setTimeout(_buffer, 30);
            //console.log(nSpeed);
        }
        else{
            //changeColor();
            if(typeof fnCallback=="function"){
                fnCallback.call(ele);
            }
            ele.timer=null;
        }
    }
}
function getCss(ele,attr){
    if(window.getComputedStyle){//===>if(typeof getComputedStyle)
        return parseFloat(getComputedStyle(ele,null)[attr]);
    }else{
        return parseFloat(ele.currentStyle[attr]);
    }
}

