var login = (function () {
    var oA = document.getElementById("qq");
    var oAther = document.getElementById("other");
    var register = document.getElementById("register");
    var oMa = document.getElementById("ma");
    var oLayer = document.getElementById("Layer");
    var oBox = document.getElementById("box");
    var close = document.getElementById("close");
    var count = 0;
    var obj = {
        register: function () {
            oA.onclick = function () {
                count++;
                if (count % 2 === 1) {
                    oAther.style.display = "block";
                    register.style.display = "none";
                }
                else {
                    oAther.style.display = "none";
                    register.style.display = "block";
                }
            };
            oMa.onclick = function () {
                oLayer.style.display = "block";
                oBox.style.display = "block";
            };
            close.onclick = function () {
                oLayer.style.display = "none";
                oBox.style.display = "none";
            };
        }
    };
    return obj;
})();
login.register();