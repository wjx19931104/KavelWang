//调取后台热搜词和热门搜索数据
(function(d){
		var s=d.createElement("script"),h=d.getElementsByTagName("head")[0];
		s.src="http://service.lagou.com/hotword?callback=reqHotwords";
		h.appendChild(s);
})(document);

var searchWrap = '';
//调取后台热搜词和热门搜索数据－执行函数
function reqHotwords(json){
	searchWrap = json;
	var oSearch = $('#search_input');
	var searchVal = oSearch.val();
	var isIndex = $('#isIndex').val();
	if(searchVal == oSearch.attr('placeholder')){
		searchVal = '';
	}
	//热门搜索词
	if(json.hotwords != ''){
		var hwHtml = '<dt>热门搜索：</dt>';
		for(var i=0; i<json.hotwords.length; i++){
			if(json.hotwords[i].isHighLight){
				hwHtml += '<dd><a href="'+json.hotwords[i].url+'" class="current">'+json.hotwords[i].text+'</a></dd>';
			}else{
				hwHtml += '<dd><a href="'+json.hotwords[i].url+'">'+json.hotwords[i].text+'</a></dd>';
			}
		}
		$('.hotSearch').html(hwHtml);
		//热门搜索词加参数
		$('.hotSearch a').click(function(e){//?labelWords=hot
			e.preventDefault();
			var me = $(this);
			var cur_href = me.attr('href');
			window.location.href = cur_href+"?labelWords=hot";
		})
	}
	//搜索框是否显示后台默认热搜词
	if(json.recommendSearchWord != '' && searchVal == '' && isIndex == 'true'){
		oSearch.css('color','#999').val(json.recommendSearchWord.text);
	}
	//搜索框绑定事件
	oSearch.bind('focus',function(){
		if(this.value == json.recommendSearchWord.text  && isIndex == 'true'){
			this.value = '';
			this.style.color = '#333';
		}
	}).bind('blur',function(){
		if(!this.value  && isIndex == 'true'){
			this.value = json.recommendSearchWord.text;
			this.style.color = '#999';
		}
	});
}

$(function(){
	$(window).resize(function() {
		 var left = $('#search_box').offset().left+96;
		 $('.ui-autocomplete').css("left",left);
	 });
	$('.ui-autocomplete').css("height","200px");

	$.widget( "custom.catcomplete", $.ui.autocomplete, {
		  _renderItem: function( ul, item ) {
			  var countRange = item.hotness >= 450 ? '大于':'共';
			  return $("<li></li>")
				  .data("item.autocomplete", item)
				  .append("<a><span class='fl'>" + item.cont + "</span><span class='fr'>"+countRange+"<i>" + (item.hotness >= 450 ? 450 : item.hotness) + "个</i>职位</span></a>")
				  .appendTo(ul);
		    },
		    _renderMenu: function(ul, items){

				var that = this;
				items=items[0];

				function renderItem(category,data){
					ul.append("<li class='ui-autocomplete-category'>"+category+"</li>")
					for (var i = 0, l = data.length; i < l; i++) {
						that._renderItemData(ul,data[i])
					}
				}

				if (items.POSITION && items.POSITION.length) {
					renderItem('职位',items.POSITION)
				}
				if (items.COMPANY && items.COMPANY.length) {
					renderItem('公司',items.COMPANY)
				}

				ul.find('.ui-autocomplete-category:not(:first-child)').next().css('borderTop', '1px dashed #e5e5e5');
				ul.find('.ui-autocomplete-category').first().css('borderTop', 'none');
		    }
	});

	var requestId = '';
	$('#search_input').catcomplete({
		minLength: 0,
        source: function( request, response ) {
        			if($.trim(request.term) != ''){
			            $.ajax({

							url: sctx + '/suggestion/mix',
							dataType: "jsonp",
							jsonp: "suggestback",
							data: {
								"input": request.term,             //用户的原始输入
								"type": 1,                 //1-职位，2-公司，3-学校，4-专业，5-期望职位
								"num": 10
							},
							success: function (data) {
								if (data) {
									//requestId = data.requestId;
									if (data.POSITION && data.POSITION.length || data.COMPANY && data.COMPANY.length) {
										var sourceData = [];
										sourceData.push(data);
										response(sourceData);
									} else {
										response('')
									}
								} else {
									response("")
								}
							}
			            });
        			}else{
        				response('');
        			}
        },
        focus: function( event, ui ) {
          //$( "#search_input" ).val( ui.item.name );
          return false;
        },
        select: function( event, ui ) {
			$('#suginput').val($( "#search_input" ).val());
			$( "#search_input" ).val(ui.item.cont);
			$('#labelWords').val('sug');
			$("#searchForm").trigger('submit');
          return false;
        }
     });

	$('#searchForm').bind('submit',function() {
		/*$('#submit').css('disabled',true);
		setTimeout(function(){
			$('#submit').css('disabled',false);
		},1000);*/
		//$('#search_input').val($('#search_input').val().replace(/[\'\\\/"%*\?]/g,''));
		var isIndex = $('#isIndex').val();
		//搜索框关键词
		var kw = $('#search_input').val();
		var reg =  /[\\\/]/g;
		kw = kw.replace(reg," ");
		if((kw == '' || searchWrap.recommendSearchWord.text == kw) && isIndex == 'true'){
			window.location.href = searchWrap.recommendSearchWord.url;
			return false;
		}else{
			kw = kw.replace(/.html$/,' html').replace(/.jsp$/,' jsp');
			kw = encodeURIComponent(kw);
			$(this).attr('action',ctx+'/jobs/list_'+ kw);
			return true;
		}
	});
	$('#search_input').on('keyup',function(){
        if(this.value.length>64){
            this.value=this.value.substring(0,64);
        }
    });

});