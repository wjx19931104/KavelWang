var header ={
    init:function(){
        this.cart = document.getElementById("cart");
        this.cartList = document.getElementById("cartList")
        this.navList = document.getElementById("navList")
        this.oLis =this.bindLisEvent(this.navList.getElementsByTagName("li"),/(^| )?has\-child( |$)?/g);
        this.oSearchInput = document.getElementById("searchInput");
        this.hotWords =document.getElementById("hotWords");
        this.keyWordList = document.getElementById("keyWordList");
        this.bindEvent();
    },
    bindLisEvent:function(oLis,reg){
        var ary=[];
        var thant = this;
        for(var i=0;i<oLis.length;i++){
            var cur = oLis[i];
            if(cur.className.indexOf("has-child")!=-1){
                ary.push(cur);
                !function(i){
                    //var a = oLis[i].getElementsByTagName("a")[0]
                    oLis[i].onmouseover=function(){thant.navLisMouseover(oLis[i])}
                    oLis[i].onmouseout=function(){thant.navLisMouseout(oLis[i])}
                }(i);
            }
        }
        return ary;
    },
    navLisMouseover:function(curEle){
        if(!curEle.on){
            curEle.on=true
            curEle.getElementsByTagName("a")[0].getElementsByTagName("span")[1].style.display="block";
            var oDiv = curEle.getElementsByTagName("div")[0];
            oDiv.style.display="block";
            oDiv.style.zIndex=3
            this.move(oDiv,200,1);
        }


    },
    navLisMouseout:function(curEle) {
        if(curEle.on){
            curEle.on=false
            var oDiv = curEle.getElementsByTagName("div")[0];
            oDiv.style.zIndex=2
            this.move(oDiv,200,-1);
            curEle.getElementsByTagName("a")[0].getElementsByTagName("span")[1].style.display="none";
        }

    },
    move:function(ele,time,direction){
        var interval=10,tar=200;
        var step =Math.floor((tar/time)*interval*direction);

      function _move(){
          window.clearTimeout(ele.timer);
          var cur = ele.offsetHeight;
          if(cur+step>=tar){
              ele.style.height=tar+"px";
              return
          }
          if(cur+step<=0){
              ele.style.height="0px";
              ele.style.display="none";
              return
          }
          ele.style.height=(cur+step)+"px";
          ele.timer = window.setTimeout(_move,interval);
      }
        _move()
    },
    bindEvent:function(){
        var thant = this
        this.cart.onmouseover=function(){thant.cartMouseover()};
        this.cart.onmouseout=function(){thant.cartMouseout()};
        this.oSearchInput.onfocus=function(){thant.searchInputFocus()}
        this.oSearchInput.onblur = function(){thant.searchInputBlur()}

    },
    searchInputFocus:function(){
        this.keyWordList.style.display="block";
        this.hotWords.style.display="none"
    },
    searchInputBlur:function(){
        this.keyWordList.style.display="none";
        this.hotWords.style.display="block"
    },
    cartMouseover:function(){
        this.cartList.style.display="block";
    },
    cartMouseout:function(){
        this.cartList.style.display="none";
    }
}
header.init()