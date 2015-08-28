var tabRender=(function(){
    var quHao=document.getElementById("quhao");
    var quHao1=document.getElementById("quhao1");
    var xuanX=document.getElementById("xuanxiang");
    return{
        //有关区号的一系列操作
        event:function(){
            document.body.onclick=function(e){
                e=e||window.event;
                var tar= e.target || e.srcElement;
                var tarId=tar.id;
                if(tarId==="quhao" || tarId==="quhao1" || tarId==="quhao2"){
                    xuanX.style.display=="block"?xuanX.style.display="none":xuanX.style.display="block";
                }else {
                    xuanX.style.display="none";
                }

            };
            var oLis=xuanX.getElementsByTagName("li");
            function changeColor(n){
                for(var i=1;i<oLis.length;i++){
                    oLis[i].classname="";
                }
                oLis[n].className="changyong";
            }
            for(var i=1;i<oLis.length;i++){
                oLis[i].n=i;
                oLis[i].onmouseover=function(){
                    changeColor(this.n);
                };
                oLis[i].onmouseleave=function(){
                    this.className="";
                };
                oLis[i].onclick=function(){
                    quHao1.innerHTML=this.innerHTML;
                }
            }

        },
        //6位验证码
        yanzhengma:function(){
            var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var str1="";
            for(var i=0;i<6;i++){
                var b=Math.round(Math.random()*61);
                str1+=str.charAt(b);
            }
            var yztp=document.getElementById("yztp");
            yztp.innerHTML=str1;


            yztp.onclick=function(){
                var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var str1="";
                for(var i=0;i<6;i++){
                    var b=Math.round(Math.random()*61);
                    str1+=str.charAt(b);
                }
                var yztp=document.getElementById("yztp");
                yztp.innerHTML=str1;

            }

        },
        //验证表单
        yzmInput:function(){
            String.prototype.myTrim = function () {
                return this.replace(/(^\s*|\s*$)/g, "");
            };
            var tel=document.getElementById("tel");
            var tel1=tel.getElementsByTagName("input")[0];
            var telErr=document.getElementById("telErr");
            tel1.onblur=function(){
                var telContent=tel1.value.myTrim();
                if(telContent===""){
                    telErr.innerHTML="请输入手机号码";
                    telErr.style.display="block";
                    tel.style.border="1px solid red";
                    return false;
                }
                var reg1=/^1\d{10}$/;
                if(!reg1.test(telContent)){
                    telErr.innerHTML="手机号码格式错误";
                    telErr.style.display="block";
                    tel.style.border="1px solid red";
                    return false;
                }else{
                    return true;
                }
            };
            var yzm=document.getElementById("yzm");
            var yzmInput=document.getElementById("yzmInput");
            var yzmErr=document.getElementById("yzmErr");
//;
            yzmInput.onblur=function(){
                var yzmInput1=yzmInput.value.myTrim();
                if(yzmInput1==""){
                    yzmErr.innerHTML="请输入图片验证码";
                    yzmErr.style.display="block";
                    yzm.style.display="1px solid red";
                    return false;
                }
                var yztp=document.getElementById("yztp");
                if(yzmInput1 !==yztp.innerHTML){
                    return false;
                }
                return true
            };
            var ljzc=document.getElementById("ljzc");
            ljzc.onclick=function(){
                var telFlag=tel1.onblur();
                var yzmFlag=yzmInput.onblur();
                if( telFlag && yzmFlag){
                    alert("你的信息已经提交，我们将稍后向您发送短信验证码");
                }

            }
        },
        init:function(){
             this.event();
            this.yanzhengma();
            this.yzmInput();
        }
    }

})();
tabRender.init();

































//
//var quHao=document.getElementById("quhao");
//var quHao1=document.getElementById("quhao1");
//var xuanX=document.getElementById("xuanxiang");
//
//document.body.onclick=function(e){
//    e=e||window.event;
//    var tar= e.target || e.srcElement;
//    var tarId=tar.id;
//    if(tarId==="quhao" || tarId==="quhao1" || tarId==="quhao2"){
//        xuanX.style.display=="block"?xuanX.style.display="none":xuanX.style.display="block";
//    }else {
//        xuanX.style.display="none";
//    }
//
//};
//var oLis=xuanX.getElementsByTagName("li");
//function changeColor(n){
//    for(var i=1;i<oLis.length;i++){
//        oLis[i].classname="";
//    }
//    oLis[n].className="changyong";
//}
//
//for(var i=1;i<oLis.length;i++){
//    oLis[i].n=i;
//    oLis[i].onmouseover=function(){
//        changeColor(this.n);
//    };
//    oLis[i].onmouseleave=function(){
//        this.className="";
//    };
//    oLis[i].onclick=function(){
//        quHao1.innerHTML=this.innerHTML;
//    }
//}