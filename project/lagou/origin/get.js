
var fs=require("fs");

fs.readFile("l.html","utf-8",function(err,data){
	var o={};

	var arr=data.split("menu_box");
	for(var i=1;i<arr.length;i++){
		var cur=arr[i];
		var title="";
		var sub=cur.split("menu_sub");
		sub[0].replace(/<h2>([^h]*)<\/h2>/,function(){
			title=arguments[1];
			title=title.replace(/(<[^>]+>)|\s/g,function(){
				return "";
			});
			o[title]={};
		});
		var ssub=sub[1].split("reset");
		for(var j=1;j<ssub.length;j++){
			var ttitle="";
			var ccur=ssub[j].split("/dt");
			ccur[0].replace(/<a[^>]*>([^<]+)<\/a>/,function(){
				ttitle=arguments[1];
				ttitle=ttitle.replace(/\s/g,function(){
					return "";
				});
				o[title][ttitle]=[];
			})
			ccur[1].replace(/<a[^>]*>([^<]*)<\/a>/g,function(){
			//	console.log(arguments[1]);
				o[title][ttitle].push(arguments[1]);
			});

		}

	}
	console.log(o);
	
	/*
	var o={};

	data=data.replace(/\t/g,function(){
		return "";
	});

	
	
	data=data.replace(/<div\s+class="menu_main"[^>]*>/g,function(){
	//	console.log(arguments[0]);
		return "hahaha";
	});
	
	var arr=data.split("hahaha");
	console.log(arr.length);

	for(var i=0;i<arr.length-1;i++){
		var cur=arr[i];
		cur=cur.replace(/h2>([^<]+)<\/h2/ig,function(){
		//	o[arguments[1]]={};
		console.log(arguments[1]);
		});
	}

	console.log(o);
*/

});
