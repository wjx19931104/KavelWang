$(function(){
	var url_show = "http://a.lagou.com/show";
	function postoA(params){
	  $.ajax({
	      url: url_show,
	      data:params,
	      dataType: 'jsonp',
	      success: function(rs){},
	      error: function(rs){ console.log('aerror');}
	  });
	}
});

var currUrl = encodeURIComponent( document.URL );//当前url
var z = Math.random();//随机数
var v = $('#version').val();//版本号
//t=hot;t=recommend;t=suit;t=collection;t=new;t=search;t=similar;t=like;t=delivermore;t=cposition;t=cpositionlist;t=talent
function initHotJob(t,tag,tag_attr){
	var hotJob = tag.find('li');
	var tag_dl = tag.children('dl');
	var hotJobArray = [];
	var tag_dl_array = [];
	hotJob.each(function(i){
		var meId = $(this).attr(tag_attr);
		if(meId == undefined){
			return;
		}
		hotJobArray.push(meId);
	});
	tag_dl.each(function(){
		var meId = $(this).attr(tag_attr);
		tag_dl_array.push(meId);
	})
	if(hotJobArray == ""){
		var hotIdString = tag_dl_array.join(',');
	}else{
		var hotIdString = hotJobArray.join(',');
	}
	var jids = hotIdString;	
    	var params = {
       		v:v,
        	t:t,
        	dl:currUrl,
        	jids:jids,
        	z:z
    	}
	postoA(params);
}
