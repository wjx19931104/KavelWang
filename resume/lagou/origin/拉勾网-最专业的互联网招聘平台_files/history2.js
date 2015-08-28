/**
 * 
 * @authors Your Name (ice@lagou.com)
 * @date    2015-06-16 11:49:28
 * @version $Id$
 */

	/**
	 * 最近浏览
	 */
(function(){
    $('body').on('click', '.position_list .position_list_item', function(e) {

        var srcElem = (e.target) ? e.target : e.srcElement;

        var me = $(this);
        var positionId = me.attr('data-positionId');

        var salary = me.attr('data-salary');

        var company = me.attr('data-company');

        var positionName = me.attr('data-positionName');
        if ($(srcElem).hasClass('position_link') || $(srcElem).parents('.position_link').hasClass('position_link')) {
           

            // 需要判断是否登录，如果没有登录存cookie
            // 
            if ( !IsLogin) {

                HistoryRecord(positionId , salary ,company ,positionName);
            	
            }
        }
        
    });
    function HistoryRecord( positionId ,salary , company , positionName ) {

        var historyPosition;
        var flag=false;
        var aCookie=[];
        var dataCount=5;
        linkname = positionId + "," + salary + "," + company + "," + positionName;

        address = "|";

        wlink = linkname +  address;

        old_info = $.cookie("HISTORY_POSITION");

        var insert = true;

        if( old_info == null || old_info == "undefined" ){

            insert = true;

        }else{
            insert = false;

        }
        if( insert ){
            
            // 第一次点击没有cookie
            $.cookie("HISTORY_POSITION" , wlink,{expires:7,path:'/'} );

        }else{

            
            aCookie=old_info.split('|');
            var reCookie='';
            for(var i=0,len=aCookie.length;i<len;i++){
                var temp=aCookie[i].split(',')[0];
                if(temp==positionId){
                    flag=true;
                    reCookie=temp;
                    break;
                }
            }

            // 已存在该数据则调至数据首位
            if(flag){
                var reg=new RegExp(reCookie+',.*?\\|')
                var res=reg.exec(old_info);
                wlink=old_info.replace(res,'');
                wlink=res+wlink;
            }else{
                //限制条数
                if(aCookie.length>=dataCount+1){
                    var lastIndex=old_info.lastIndexOf('|',old_info.length - 2);
                    old_info=old_info.substring(0,lastIndex+1);
                }
                wlink += old_info;
            }
            $.cookie("HISTORY_POSITION" , wlink,{expires:7,path:'/'} );
        }

    }
})();