var newArrivals =(function(){
    var phone = document.getElementById("phone");
    var num = document.getElementById("num");
    var oP = num.getElementsByTagName("p")[0];
    var trueNum = document.getElementById("trueNum");
    var btn = document.getElementById("btn");
    var yz = document.getElementById("yz");
    var tan = document.getElementById("tan");
    var oLis = tan.getElementsByTagName("li");
    var tN = trueNum.getElementsByTagName("p")[0];

    var price = document.getElementById("price");
    var obj = {
        recharge : function(){
            price.onmouseover = function(){
                tan.style.display = "block";
                for (var i = 0; i < oLis.length; i++) {
                    oLis[i].index = i;
                    oLis[i].onclick = function () {
                        if (this.index===0) {
                            oP.innerHTML = 30+"元";
                            console.log(oP.innerHTML);
                            tN.innerHTML = 29.55;
                            console.log(tN.innerHTML);
                            tan.style.display = "none";
                        }
                        else if (this.index===1) {
                            oP.innerHTML =50 + "元"
                            tN.innerHTML = 49.2;
                            tan.style.display = "none";
                        }
                        else if (this.index===2) {
                            oP.innerHTML = 100 + "元"
                            tN.innerHTML = 98.4;
                            tan.style.display = "none";
                        }
                    }
                }
            }
            price.onmouseout = function () {
                tan.style.display = "none";
            };
            var flag=0;
            var reg = /^1\d{10}$/g;
            phone.onblur = function () {
                var s = phone.value;
                if(reg.test(s)){
                    yz.style.display = "none";
                    btn.className="btn1";
                    flag=1;
                }
                else{
                    yz.style.display = "block";
                    btn.className="btn";
                    flag=0;
                }
            };
            btn.onclick=function(){
                if(flag){
                    var val = phone.value;
                    alert("您输入的手机是:" + val + "，我们已经为您充值成功！");
                }
            }
        }
        };
     return obj;
})();
newArrivals.recharge();


/*
function recharge() {
    price.onmouseover = function () {
        tan.style.display = "block";
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].index = i;
            oLis[i].onclick = function () {
                if (this.index===0) {
                    op.innerHTML = 30+"元";
                    tN.innerHTML = 29.55 + "元";
                    tan.style.display = "none";
                }
                else if (this.index===1) {
                    op.innerHTML =50 + "元"
                    tN.innerHTML = 49.2 + "元";
                    tan.style.display = "none";
                }
                else if (this.index===2) {
                    op.innerHTML = 100 + "元"
                    tN.innerHTML = 98.4 + "元";
                    tan.style.display = "none";
                }
            }
        }
    };
/!*
}
recharge();*!/
*/
