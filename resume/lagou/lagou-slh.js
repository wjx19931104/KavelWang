initGallery();
function initGallery(){
   var text=[{
           "title":"小恩爱",
           "des":"全球用户最多的情侣保密应用"
       },
       {
           "title":"蘑菇公寓",
           "des":"成为每个都市租住客的首选"
       },
       {
           "title":"公牛炒股",
           "des":"炒股神器"
       },
       {
           "title":"找煤网",
           "des":"致力于打造国内标准第三方煤炭电子交易平台"
       },
       {
           "title":"大搜车",
           "des":"中国最大的二手车O2O平台"
       },
       {
           "title":"云农场",
           "des":"农业互联网高科技综合服务商"
       }
   ];
   var container=document.getElementById("gallery");
   container.innerHTML="";
   var imgs=["img/slide0.png","img/slide1.jpg","img/slide2.png","img/slide3.jpg","img/slide4.png","img/slide5.jpg"];
   var ul=document.createElement("ul");
   for(var i=0;i<imgs.length;i++){
       var li=document.createElement("li");
       var ls=li.style;
       if(i==1){
           ls.margin="0 14px";
       }else if(i>2){
           ls.marginLeft="13px";
       }
       var img=new Image;
       img.src=imgs[i];
       var is=img.style;
       li.appendChild(img);
       var div=document.createElement("div");
       div.className="test";
       var h4=document.createElement("h4");
       h4.innerHTML=text[i]['title'];
       var span=document.createElement("span");
       span.innerHTML=text[i]['des'];
       div.appendChild(h4);
       div.appendChild(span);
       li.appendChild(div);
       ul.appendChild(li);
   }
   container.appendChild(ul);
   bindGalleryEvent(ul);
}
function bindGalleryEvent(ul){
   var lis=ul.getElementsByTagName('li');
   for(var i=0;i<lis.length;i++){
       lis[i].onmouseenter=function(e){
           var div=this.getElementsByTagName("div")[0];
           var w = this.offsetWidth;
           var h = this.offsetHeight;
           var e=e || window.event;
           var pX=e.pageX || e.clientX+utils.getWin("scrollTop");
           var pY=e.pageY || e.clientY+utils.getWin("scrollLeft");
           var x = (pX - utils.offset(this)['left'] - (w / 2)) * (w > h ? (h / w) : 1);
           var y = (pY - utils.offset(this)['top'] - (h / 2)) * (h > w ? (w / h) : 1);
           var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
           if(direction==0){
               div.style.top="-100%";
               div.style.left=0;
               // slide(div,'top',0);
               slide({
                   "element":div,
                   "attr":"top",
                   "target":0
               });
           }else if(direction==1){
               div.style.top=0;
               div.style.left="100%";
               // slide(div,'left',0);
               slide({
                   "element":div,
                   "attr":"left",
                   "target":0
               });
           }else if(direction==2){
               div.style.top="100%";
               div.style.left=0;
               // slide(div,'top',0);
               slide({
                   "element":div,
                   "attr":"top",
                   "target":0
               });
           }else{
               div.style.top=0;
               div.style.left="-100%";
               // slide(div,'left',0);
               slide({
                   "element":div,
                   "attr":"left",
                   "target":0
               });
           }
       }
       lis[i].onmouseleave=function(e){
           var div=this.getElementsByTagName("div")[0];
           var w = this.offsetWidth;
           var h = this.offsetHeight;
           var e=e || window.event;
           var pX=e.pageX || e.clientX+utils.getWin("scrollTop");
           var pY=e.pageY || e.clientY+utils.getWin("scrollLeft");
           var x = (pX - utils.offset(this)['left'] - (w / 2)) * (w > h ? (h / w) : 1);
           var y = (pY - utils.offset(this)['top'] - (h / 2)) * (h > w ? (w / h) : 1);
           var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
           if(direction==0){
               // slide(div,'top',-113);
               slide({
                   "element":div,
                   "attr":"top",
                   "target":-113
               });
           }else if(direction==1){
               // slide(div,'left',113);
               slide({
                   "element":div,
                   "attr":"left",
                   target:113
               });
           }else if(direction==2){
               // slide(div,'top',113);
               slide({
                   "element":div,
                   "attr":"top",
                   "target":113
               });
           }else{
               // slide(div,'left',-113);
               slide({
                   "element":div,
                   "attr":"left",
                   "target":-113
               });
           }
           // slide(div,'left',-113);
       }
   }
}
function slide(config){
   var ele=config['element'];
   var duration=config['duration'] || 200;
   var interval=config['interval'] || 10;
   var target=config['target'];
   var attr=config['attr'];
   var callback=config['callback']||(function(){});
   var cur=utils.getCss(ele,attr);
   var step=(target-cur)/(duration/interval);
   var unit=attr=="opacity"?"":"px";
   _slide();
   function _slide(){
       window.clearTimeout(ele.timer);
       cur=utils.getCss(ele,attr);
       if(cur>target){
           if(cur+step<=target){
               ele.style[attr]=target+unit;
               window.clearTimeout(ele.timer);
               callback();
               return;
           }
           ele.style[attr]=cur+step+unit;
       }else if(cur<target){
           if(cur+step>=target){
               ele.style[attr]=target+unit;
               window.clearTimeout(ele.timer);
               callback();
               return;
           }
           ele.style[attr]=cur+step+unit;
       }else{
           return;
       }
       ele.timer=window.setTimeout(_slide,interval);
   }
}
var listData={
   "热门职位":[
       {
           "title":"前端讲师",
           "location":"北京",
           "update":"13:47",
           "company":"北京珠峰培训",
           "salary":"30K-50K",
           "requirement":"前端水平出众，人长得帅/美",
           "welfare":"公司包早餐（一个包子）",
           "status":"天使轮",
           "tags":["当总经理","任CEO","娶白富美"]
       },
       {
           "title":"社区产品经理",
           "location":"北京",
           "update":"13:27",
           "company":"天弘基金",
           "salary":"12K-16K",
           "requirement":"经验3-5年 / 本科",
           "welfare":"福利待遇好，发展前景大，团队建设佳",
           "status":"金融 / 成长型(不需要融资)",
           "tags":["互联网金融","带薪年假","岗位晋升"]
       },
       {
           "title":"销售经理",
           "location":"杭州",
           "update":"13:27",
           "company":"波奇网",
           "salary":"3K-5K",
           "requirement":"经验1-3年 / 大专",
           "welfare":"五险一金、公司环境好、年终奖、每月聚餐",
           "status":"电子商务 · O2O / 成长型(B轮)",
           "tags":["绩效奖金","年底双薪","带薪年假"]
       },
       {
           "title":"产品经理",
           "location":"上海",
           "update":"13:27",
           "company":"美婚照照",
           "salary":"10K-20K",
           "requirement":"经验3-5年 / 大专",
           "welfare":"薪资有竞争力、行业发展好、职位空间大",
           "status":"移动互联网 · O2O / 成长型(A轮)",
           "tags":["年底双薪","节日礼物","绩效奖金"]
       },
       {
           "title":"电话销售",
           "location":"北京",
           "update":"13:27",
           "company":"窝窝商城（中国）有限公司",
           "salary":"5K-6K",
           "requirement":"经验1-3年 / 大专",
           "welfare":"高额提成+五险一金",
           "status":"电子商务 / 上市公司",
           "tags":["节日礼物","技能培训","带薪年假"]
       }
   ],
   "最新职位":[
       {
           "title":"产品经理",
           "location":"上海",
           "update":"13:27",
           "company":"美婚照照",
           "salary":"10K-20K",
           "requirement":"经验3-5年 / 大专",
           "welfare":"薪资有竞争力、行业发展好、职位空间大",
           "status":"移动互联网 · O2O / 成长型(A轮)",
           "tags":["年底双薪","节日礼物","绩效奖金"]
       },
       {
           "title":"电话销售",
           "location":"北京",
           "update":"13:27",
           "company":"窝窝商城（中国）有限公司",
           "salary":"5K-6K",
           "requirement":"经验1-3年 / 大专",
           "welfare":"高额提成+五险一金",
           "status":"电子商务 / 上市公司",
           "tags":["节日礼物","技能培训","带薪年假"]
       },
       {
           "title":"前端讲师",
           "location":"北京",
           "update":"13:47",
           "company":"北京珠峰培训",
           "salary":"30K-50K",
           "requirement":"前端水平出众，人长得帅/美",
           "welfare":"公司包早餐（一个包子）",
           "status":"天使轮",
           "tags":["当总经理","任CEO","娶白富美"]
       },
       {
           "title":"社区产品经理",
           "location":"北京",
           "update":"13:27",
           "company":"天弘基金",
           "salary":"12K-16K",
           "requirement":"经验3-5年 / 本科",
           "welfare":"福利待遇好，发展前景大，团队建设佳",
           "status":"金融 / 成长型(不需要融资)",
           "tags":["互联网金融","带薪年假","岗位晋升"]
       },
       {
           "title":"销售经理",
           "location":"杭州",
           "update":"13:27",
           "company":"波奇网",
           "salary":"3K-5K",
           "requirement":"经验1-3年 / 大专",
           "welfare":"五险一金、公司环境好、年终奖、每月聚餐",
           "status":"电子商务 · O2O / 成长型(B轮)",
           "tags":["绩效奖金","年底双薪","带薪年假"]
       }
   ]
};
initList();
function initList(){
   var container=document.getElementById("list");
   container.innerHTML="";
   var colName=["热门职位","最新职位"];
   var nav=document.createElement("ul");
   nav.className="nav";
   var content=document.createElement("ul");
   content.className="list-detail";
   for(var i=0;i<colName.length;i++){
       var li=document.createElement("li");
       var ld=document.createElement("li");
       var curData=listData[colName[i]];
       var lin=document.createElement("a");
       lin.onclick=function(i){
           return function(){
               swictchMenu(i,nav,content);
           }
       }(i);
       if(i==0){
           li.className="active";
           ld.className="active";
       }
       lin.href="javascript:;";
       lin.innerHTML=colName[i];
       li.appendChild(lin);
       nav.appendChild(li);
       // alert(curData[0]['title'])
       var tpl="<table><tr><td><h4><a href='#'>{title}</a>&nbsp;<span class=\"title\">[ {location} ]</span><span class=\"update\">{update}发布</span></h4></td><td><span class=\"company\"><a href='#'>{company}</a></span></td></tr><tr><td><span class=\"salary\">{salary}</span><span class=\"requirement\">{requirement}</span></td><td><span class=\"status\">{status}</span></td></tr><tr><td><span class=\"welfare\">\"{welfare}\"</span></td><td class=\"tags\">{tags}</td></tr></table>";
       for(var j=0;j<curData.length;j++){
           var single=document.createElement("div");
           single.innerHTML=tpl.replace(/{(\w+)}/g,function(){
               if(arguments[1] != "tags"){
                   return curData[j][arguments[1]];
               }else{
                   var tempList=curData[j]['tags'];
                   var r="";
                   for(var t=0;t<tempList.length;t++){
                       r+="<span>"+tempList[t]+"</span>";
                   }
                   return r;
               }
           });
           ld.appendChild(single);
           content.appendChild(ld);
       }
   }
   container.appendChild(nav);
   container.appendChild(content);
   var moreBtn=document.createElement("a");
   moreBtn.href="http://www.lagou.com/zhaopin/";
   moreBtn.className="moreBtn";
   moreBtn.innerHTML="查看更多";
   container.appendChild(moreBtn);
}
function swictchMenu(i,nav,content){
   var navList=nav.getElementsByTagName("li");
   var contentList=content.getElementsByTagName("li");
   for(var j=0;j<navList.length;j++){
       utils.removeClass(navList[j],"active");
       utils.removeClass(contentList[j],"active");
   }
   utils.addClass(navList[i],"active");
   utils.addClass(contentList[i],"active");
}
initFooter();
function initFooter(){
   var container=document.getElementById("footer");
   container.innerHTML="";
   var fixAd=document.createElement("div");
   fixAd.className="fixAd";
   fixAd.id="fixAd";
   var building=document.createElement("span");
   building.className="building";
   building.style.left=(utils.getWin("clientWidth")-1024)/2-95+"px";
   fixAd.appendChild(building);
   var btmLogo=document.createElement("div");
   btmLogo.className="btmLogo";
   btmLogo.style.left=(utils.getWin("clientWidth")-1024)/2-95+"px";
   fixAd.appendChild(btmLogo);
   // var cc=document.createElement("div");
   var btmLogin=document.createElement("div");
   btmLogin.className="btmLogin";
   btmLoginImg=new Image;
   btmLoginImg.src="img/footbar_login.png";
   btmLogin.appendChild(btmLoginImg);
   fixAd.appendChild(btmLogin);
   var btmReg=document.createElement("div");
   btmReg.className="btmReg";
   btmRegImg=new Image;
   btmRegImg.src="img/footbar_register.png";
   btmReg.appendChild(btmRegImg);
   fixAd.appendChild(btmReg);
   var copyright=document.createElement("div");
   copyright.className="copyright";
   var copyRightIn=document.createElement("div");
   copyRightIn.className="copyRightIn";
   copyright.appendChild(copyRightIn);
   var tempText=["拉勾微博","拉勾微信","帮助中心","联系我们：400-605-9900"];
   var tempUl=document.createElement("ul");
   for(var t=0;t<tempText.length;t++){
       var tli=document.createElement("li");
       var ta=document.createElement("a");
       ta.href="javascript:;";
       ta.innerHTML=tempText[t];
       tli.appendChild(ta);
       if(t==1){
           tli.style.position="relative";
           var wxcode=document.createElement("div");
           wxcode.id="weixin";
           var wxImg=new Image;
           wxImg.src="img/qrcode.jpg";
           wxcode.appendChild(wxImg);
           tli.appendChild(wxcode);
           tli.onmouseover=function(){
               showWX(wxcode,true);
           };
           tli.onmouseout=function(){
               showWX(wxcode,false);
           }
       }
       tempUl.appendChild(tli);
   }
   var beian=document.createElement("div");
   beian.className="beian";
   beian.id="beian";
   beian.innerHTML="©2015 Lagou 京ICP备<a href='javascript:;'>14023790号-2</a> 京公网安备11010802017116号";
   copyRightIn.appendChild(tempUl);
   copyRightIn.appendChild(beian);
   container.appendChild(fixAd);
   container.appendChild(copyright);
}
function showWX(ele,flag){
   if(flag){
       ele.style.opacity=0;
       ele.style.display="block";
       // slide(ele,"opacity",1,function(){},500);
       // console.log("show");
       slide({
           "element":ele,
           "attr":"opacity",
           "target":1,
           "duration":500
       });
   }else{
       // slide(ele,"opacity",0,function(){
       //     ele.style.display="none";
       // },500);
       slide({
           "element":ele,
           "attr":"opacity",
           "target":0,
           "callback":function(){ele.style.display="none";},
           "duration":500
       });
   }
}

utils.addHandler(window,"scroll",function(){
   var fixAd=document.getElementById("fixAd");
   var beian=document.getElementById("beian");
   if(utils.offset(beian)['top'] <= (utils.getWin("scrollTop")+utils.getWin("clientHeight"))){
       fixAd.style.position="relative";
       // fixAd.style.bottom="37px";
       // alert("test");
   }else{
       fixAd.style.position="fixed";
       fixAd.style.bottom=0;
   }
   //
   var btn=document.getElementById("backTop");
   if(utils.getWin("scrollTop")>100){
       btn.style.display="block";
   }else{
       btn.style.display="none";
   }
});

initBackTop();
function initBackTop(){
   var btn=document.getElementById("backTop");
   btn.style.right=(utils.getWin("clientWidth")-1024)/2-45+"px";
   btn.onclick=function(){
       backTop();
   }
}
function backTop(){
   var duration=300;
   var interval=18;
   var step=utils.getWin("scrollTop")/(duration/interval);
   var timer=null;
   _back();
   function _back(){
       var s1=utils.getWin("scrollTop");
       document.body.scrollTop=s1-step;
       var s2=utils.getWin("scrollTop");
       if(s1==s2){
           window.clearTimeout(timer);
           timer=null;
           return;
       }
       window.setTimeout(_back,interval);
   }
}
var carouselData=[
   {
       "full":"img/carousel1.jpg",
       "min":"img/carousel1.min.jpg"
   },{
       "full":"img/carousel2.jpg",
       "min":"img/carousel2.min.jpg"
   },{
       "full":"img/carousel3.jpg",
       "min":"img/carousel3.min.jpg"
   }
];
initCarousel();
function initCarousel(){
   var container=document.getElementById("carousel");
   container.innerHTML="";
   var frag=document.createDocumentFragment();
   var full=document.createElement("div");
   full.className="full";
   var small=document.createElement("div");
   small.className="small";
   var pointer=new Image;
   pointer.src="img/control_current.png";
   pointer.className="pointer";
   small.appendChild(pointer);
   var fullInner=document.createElement("div");
   fullInner.className="fullInner";
   for(var i=0;i<carouselData.length;i++){
       var cur=carouselData[i];
       var img=new Image;
       img.src=cur['full'];
       fullInner.appendChild(img);
       var smallInner=document.createElement("div");
       smallInner.className="smallInner";
       if(i==1){
           smallInner.style.margin="5px 0";
       }
       var tinyImg=new Image;
       tinyImg.src=cur['min'];
       smallInner.appendChild(tinyImg);
       var cover=document.createElement("div");
       cover.className="cover";
       if(i==0){
           cover.style.backgroundColor="transparent";
       }
       smallInner.appendChild(cover);
       small.appendChild(smallInner);
   }
   full.appendChild(fullInner);
   frag.appendChild(full);
   frag.appendChild(small);
   container.appendChild(frag);
   bindCarouselEvent(full,small,pointer);
}
function bindCarouselEvent(full,small,pointer){
   var ctrlBox=utils.getElementsByClass("smallInner",small);
   var fullBox=full.getElementsByTagName("div")[0];
   var to=0;
   var timer=null;
   for(var i=0;i<ctrlBox.length;i++){
       var cur=ctrlBox[i];
       cur.index=i;
       cur.onmouseover=function(){
           to=this.index;
           moveTo();
       };
   };
   function _carousel(cur){
       for(var j=0;j<ctrlBox.length;j++){
           var tempEle=ctrlBox[j].getElementsByTagName("div")[0].style;
           tempEle.background="#646464";
           tempEle.opacity="0.3";
           tempEle.filter="alpha(opacity=30)";
       }
       ctrlBox[cur.index].getElementsByTagName("div")[0].style.backgroundColor="transparent";
       slide({
           "element":pointer,
           "attr":"top",
           "target":cur.index*55,
           "duration":150
       });
       slide({
           "element":fullBox,
           "attr":"top",
           "target":-cur.index*160,
           "duration":150
       });
   }
   function moveTo(){
       window.clearTimeout(timer);
       _carousel(ctrlBox[to]);
       to=(to+1)%3;
       timer=window.setTimeout(moveTo,2000);
   }
   moveTo();
}
initSearch();
function initSearch(){
   var container=document.getElementById("search");
   container.innerHTML="";
   var frag=document.createDocumentFragment();
   var form=document.createElement("form");
   var inputFrame=document.createElement("div");
   inputFrame.className="input-frame";
   var tips=document.createElement("div");
   tips.className="tips";
   tips.innerHTML="写面试评价赢好礼啦";
   inputFrame.appendChild(tips);
   var keywords=document.createElement("input");
   keywords.type="text";
   keywords.name="keywords";
   inputFrame.appendChild(keywords);
   keywords.onfocus=function(){
       if(this.value.myTrim() == ""){
           tips.innerHTML="请输入职位名称或公司名称";
           suggestions.style.display="none";
       }else{
           suggestions.style.display="block";
       }
   };
   keywords.onblur=function(){
           if(this.value.myTrim() == ""){
               tips.innerHTML="写面试评价赢好礼啦";
           }
           suggestions.style.display="none";
   };
   keywords.onkeydown=function(){
       tips.innerHTML="";
       if(this.value.myTrim() == ""){
           suggestions.style.display="none";
       }
   };
   var testCompanyData=[
       {
           "name":"北京珠峰培训",
           "count":25
       },
       {
           "name":"北京百度",
           "count":14
       },
       {
           "name":"中国新浪",
           "count":19
       },
       {
           "name":"深圳腾讯",
           "count":29
       }
   ];
   var testPositionData=[
       {
           "name":"产品经理",
           "count":250
       },
      {
          "name":"交互设计",
          "count":19
      },
         {
             "name":"CEO",
             "count":250
         },
        {
            "name":"运营总监",
            "count":12
        },
       {
           "name":"前端开发",
           "count":42
       }
   ];



   var submitBtn=document.createElement("input");
   submitBtn.type="button";
   submitBtn.value="搜索";
   submitBtn.name="submit";
   inputFrame.appendChild(submitBtn);
   var hotWords=document.createElement("div");
   hotWords.className="hot";
   hotWords.innerHTML="热门搜索：";
   var keyList=["!理财顾问","活动运营","MySQL","!HTML5","数据分析师","架构师",".NET","数据运营"];
   for(var i=0;i<keyList.length;i++){
       var tempSpan=document.createElement("span");
       var tempA=document.createElement("a");
       tempA.href="javascript:;";
       if(keyList[i].indexOf("!")>-1){
           tempSpan.className="important";
           tempA.innerHTML=keyList[i].split("!")[1];
       }else{
           tempA.innerHTML=keyList[i];
       }
       tempSpan.appendChild(tempA);
       hotWords.appendChild(tempSpan);
   }

   var suggestions=document.createElement("div");
   suggestions.className="suggestions";
   keywords.onkeyup=function(){
       suggestions.innerHTML="";
       suggestions.style.display="block";
       if(this.value.myTrim() != ""){
           if(testCompanyData){
               var suggestionsCompany=document.createElement("div");
               suggestionsCompany.className="sc";
               var suggestionsCompanyList=document.createElement("div");
               suggestionsCompanyList.className="sclist";
               var suggestionsCompanyLabel=document.createElement("div");
               suggestionsCompanyLabel.className="sclbl";
               suggestionsCompanyLabel.innerHTML="公司";
               for(var i=0;i<testCompanyData.length;i++){
                   var tempPanel=document.createElement("a");
                   var tempPanelName=document.createElement("span");
                   tempPanelName.className="name";
                   var tempPanelCount=document.createElement("span");
                   tempPanelCount.className="count";
                   tempPanelName.innerHTML=testCompanyData[i]['name'];
                   tempPanelCount.innerHTML="共"+testCompanyData[i]['count']+"个职位";
                   tempPanel.appendChild(tempPanelName);
                   tempPanel.appendChild(tempPanelCount);
                   suggestionsCompanyList.appendChild(tempPanel);
               }
               suggestionsCompany.appendChild(suggestionsCompanyList);
               suggestionsCompany.appendChild(suggestionsCompanyLabel);

               suggestions.appendChild(suggestionsCompany);
           }
           inputFrame.appendChild(suggestions);
       }else{
           suggestions.style.display="none";
           tips.innerHTML="请输入职位名称或公司名称";
       }
   };



   frag.appendChild(inputFrame);
   frag.appendChild(hotWords);
   container.appendChild(frag);
}
initAside();
function initAside(){
   var container=document.getElementById("aside");
   container.innerHTML="";
   var frag=document.createDocumentFragment();
   for(var title in titleHotList){
       if(titleHotList.hasOwnProperty(title)){
           var titleBox=document.createElement("div");
           titleBox.className="titleBox";
           var fixBox=document.createElement("div");
           fixBox.className="fixBox";
           var hiddenBox=document.createElement("div");
           hiddenBox.className="hiddenBox";
           var h4=document.createElement("h4");
           h4.innerHTML=title;
           fixBox.appendChild(h4);
           var fixBoxInner=document.createElement("ul");
           for(var j=0;j<titleHotList[title].length;j++){
               var tempLi=document.createElement("li");
               var tempA=document.createElement("a");
               tempA.href="javascript:;";
               tempA.innerHTML=titleHotList[title][j];
               tempLi.appendChild(tempA);
               fixBoxInner.appendChild(tempLi);
           }
           fixBox.appendChild(fixBoxInner);
           var tempData=titleList[title];
           for(var subTitle in tempData){
               if(tempData.hasOwnProperty(subTitle)){
                   var hiddenBoxInner=document.createElement("div");
                   var h5=document.createElement("h5");
                   h5.innerHTML=subTitle;
                   var rightPanel=document.createElement("ul");
                   for(var j=0;j<tempData[subTitle].length;j++){
                       var tempLi=document.createElement("li");
                       var tempA=document.createElement("a");
                       tempA.href="javascript:;";
                       tempA.innerHTML=tempData[subTitle][j];
                       tempLi.appendChild(tempA);
                       rightPanel.appendChild(tempLi);
                   }
                   hiddenBoxInner.appendChild(h5);
                   hiddenBoxInner.appendChild(rightPanel);
                   hiddenBox.appendChild(hiddenBoxInner);
               }
           }
           titleBox.appendChild(fixBox);
           titleBox.appendChild(hiddenBox);
           frag.appendChild(titleBox);
       }
   }
   var subscribe=document.createElement("div");
   subscribe.className="subscribe";
   subscribe.innerHTML="订阅职位";
   frag.appendChild(subscribe);
   container.appendChild(frag);
   bindAsideEvent(container);
}
function bindAsideEvent(container){
   var titleBoxes=utils.getElementsByClass("titleBox");
   var fixBoxes=utils.getElementsByClass("fixBox");
   var hiddenxBoxes=utils.getElementsByClass("hiddenBox");
   for(var i=0;i<titleBoxes.length;i++){
       titleBoxes[i].onmouseover=function(i){
           return function(){
               for(var j=0;j<titleBoxes.length;j++){
                   hiddenxBoxes[j].style.display="none";
                   utils.removeClass(fixBoxes[j],"active");
               }
               hiddenxBoxes[i].style.display="block";
               utils.addClass(fixBoxes[i],"active");
           };
       }(i);
       titleBoxes[i].onmouseout=function(i){
           return function(){
               hiddenxBoxes[i].style.display="none";
               utils.removeClass(fixBoxes[i],"active");
           };
       }(i);
   }
}
initHeader();
function initHeader(){
   var container=document.getElementById("header");
   container.innerHTML="";
   var frag=document.createDocumentFragment();
   var headerInner=document.createElement("div");
   headerInner.className="headerInner";
   var logo=document.createElement("a");
   logo.href="javascript:;";
   logo.className="logo";
   headerInner.appendChild(logo);
   var nav=document.createElement("ul");
   nav.className="navigator";
   var navText=["首页","公司","我的简历","发布职位","一拍"];
   for(var i=0;i<navText.length;i++){
       var tempLi=document.createElement("li");
       if(i==0){
           tempLi.className="current";
       }
       var tempA=document.createElement("a");
       tempA.innerHTML=navText[i];
       tempA.href="javascript:;";
       tempLi.appendChild(tempA);
       nav.appendChild(tempLi);
   }
   headerInner.appendChild(nav);
   var login=document.createElement("div");
   login.className="login";
   login.innerHTML="<span><a href='javascript:;'>登录</a></span><span>|</span><span><a href='javascript:;'>注册</a></span>";
   headerInner.appendChild(login);
   frag.appendChild(headerInner);
   container.appendChild(frag);
}
initBanner();
function initBanner(){
   var container=document.getElementById("banner");
   container.innerHTML="";
   var link=document.createElement("a");
}
