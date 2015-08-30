
    var starTop=document.getElementById("starTop");
    var oA=starTop.getElementsByTagName("a");
    var starBottom=document.getElementById("starBottom");
    var starOuter=document.getElementById("starOuter");
    var flag=0;
    function animate11(ele,obj,duration){
        var oBegin={},oChange={},flag= 0,interval=13,times=0;
        for(var key in obj){
            var begin=utils.getCss(ele,key);
            var target=obj[key];
            var change=target-begin;
            if(change){
                oBegin[key]=begin;oChange[key]=change;
                flag++;
            }
        }
        if(flag==0)return;
        window.clearInterval(ele.timer);
        function step(){
            times+=interval;
            if(times>=duration){
                for(var key in obj){
                    ele.style[key]=target+"px";
                }
                clearInterval(ele.timer);
                ele.timer=null;
            }else{
                for(var key in obj){
                    var begin=oBegin[key];
                    var change=oChange[key];
                    ele.style[key]=times/duration*change+begin+"px";

                }
            }
        }
        ele.timer=window.setInterval(step,interval);
    }
    function moveLeft(){
        animate11(starOuter,{left:5},300);
    }
    function moveRight(){
        animate11(starOuter,{left:-1244},300);
    }
    oA[0].onclick=function(){
        if(flag==0){
            flag++;
            utils.removeClass(this,"c");
            utils.addClass(oA[flag],"c");
            moveRight();
            return false;
        }else{
            return false;
        }
    }
    oA[1].onclick=function(){
        if(flag==1){
            flag--;
            utils.removeClass(this,"c");
            utils.addClass(oA[flag],"c");
            moveLeft();
            return false;
        }else{
            return false;
        }

    }


