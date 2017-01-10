var cx,sets,tab_listed,store,usage,divfac,data_txt;
var cl=function(rt){};//console.log;
cx={};
sets=null;
tab_listed=false;
store=null;
var firsttime=true;
//console.log(self);
self.port.on("show",function(store_var)
{

console.log("showing ui.js",store_var);
store=store_var.store;
//console.log("store loaded",store);
init1();
//console.log(usage,"usage");
});




function init1()
{

//console.log(store,"init1");

usage=store.data_count;
if(usage==null){
	cx={};
}
else{
	cx=usage;
}
	
	console.log("cx",cx);

sets=store.settings;
		
		
var d=new Date();
if(d.getMonth()!=get_pref("cur_month")){
			set_pref("cur_month",d.getMonth());					 
		 resetmonth();
	 }
if(d.getDay()!=get_pref("cur_day"))
	   {
			set_pref("cur_day",d.getDay());
			resetday();
	   }
		
		if(get_pref("ismb")==0)
		{
			divfac=1024*1024*1024;
			data_txt="GB";
		}
		else{
			divfac=1024*1024;
			data_txt="MB";
		}
 		
		 $('#month_val').text(""+(cx.bytesinmonth/divfac).toFixed(2)+" "+data_txt);
				$('#day_val').text(""+ (cx.bytesinday/divfac).toFixed(2)+" "+data_txt);			
console.log(cx,"setc oiunter");
		addeventhandler();



		if(get_pref("ison")==false)
		{

				if($('#knoble').hasClass('knob-off')==false)
				{
					$('#knoble').toggleClass('knob-on');
					$('#knoble').toggleClass('knob-off');
				}
		
		}
		else{
		if($('#knoble').hasClass('knob-off')==true)
				{
					$('#knoble').toggleClass('knob-on');
					$('#knoble').toggleClass('knob-off');
				}
		
		
		
		
		}
		if(get_pref("ismb")==1)
		{
				if($('#knoble_mb').hasClass('knob-off')==false)
				{
					$('#knoble_mb').toggleClass('knob-on');
					$('#knoble_mb').toggleClass('knob-off');
				}
		}
		else{
		
		
		if($('#knoble_mb').hasClass('knob-off')==true)
				{
					$('#knoble_mb').toggleClass('knob-on');
					$('#knoble_mb').toggleClass('knob-off');
				}
		
		
		
		
		}
 
					  

}
function addeventhandler()
{
//cl("add event handler");
var arr=null;
var i;
if(firsttime==true)
{	
	firsttime=false;



 arr=["#tb","#reset_month","#ton","#reset_day",'#tab1',"#tab2","#tab3","#advanced_report"];
for(i=0;i<arr.length;i++)
{
sa=arr[i];
//cl(sa);
$(sa).off('click');

}

//self.port.emit("tmb");
$('#tmb').click(toggle_mb);
		$('#reset_month').click(resetmonth);   
		$('#ton').click(toggle_power);
		$('#reset_day').click(resetday);
		$('#tab1').click(function(){select_tab(1)});
		$('#tab2').click(function(){select_tab(2)});
		$('#tab3').click(function(){select_tab(3)});
		$('#advanced_report').click(function(){  

		self.port.emit("loaddata");
		
		});
		}
}
function resetmonth()
{
		console.log("reset month done");

	store.data_count={bytesinmonth:0,bytesinday:cx.bytesinday};
self.port.emit("resetmonth");
	cx.bytesinmonth=0;
	display_counts(1);


	
}
function resetday()
{
	
	console.log("reset day done");
	cx.bytesinday=0;
	self.port.emit("resetday");
	
	store.data_count={bytesinmonth:cx.bytesinmonth,bytesinday:0};
	display_counts(0);

}

function display_counts(d)
{
	 		num_pr=0;
			if(get_pref("ismb")==0)
			{

			divfac=1024*1024*1024;
			data_txt="GB";
				num_pr=3;

			}
			else{
			divfac=1024*1024;
				num_pr=2;
				data_txt="MB";
			}

			 $('#month_val').text(""+(d?0:cx.bytesinmonth/divfac).toFixed(num_pr)+" "+data_txt);

			$('#day_val').text(""+ (!d?0:cx.bytesinday/divfac).toFixed(num_pr)+" "+data_txt);		

}
function get_pref(str)
{
 
         return sets[str];

}


function set_pref(key,value)
{
	sets[key]=value;
	store.settings=sets;
	
}



function toggle_mb(){
	//console.log("mb toggleed");
	
cl($('#knoble_mb').attr('class'));
	$('#knoble_mb').toggleClass('knob-on');
	$('#knoble_mb').toggleClass('knob-off');
	set_pref("ismb",(get_pref("ismb")+1)%2);
	self.port.emit("tmb");
	
	var num_pr,divfac,data_txt;
	num_pr=0;
	
		if(get_pref("ismb")==0)
		{	
			divfac=1024.0*1024.0*1024.0;
			data_txt="GB";
			num_pr=3;
		}
		else{
		divfac=1024.0*1024.0;
			data_txt="MB";
			num_pr=2;
		} 																				
		$('#month_val').text(""+(cx.bytesinmonth/divfac).toFixed(num_pr)+" "+data_txt);
		$('#day_val').text(""+ (cx.bytesinday/divfac).toFixed(num_pr)+" "+data_txt);	
}

function select_tab(tab)
{		if(tab==2)
		{
		var stt,arr,t,url,i,j,maxx,len,num_pr,stat;
			//tab_listed=true;
			stat=store.stat;

			if(stat=={}){return;}
	
			stt=stat;
			arr=[]
			for(url in stt){
			if(stat.hasOwnProperty(url))
			{
				arr.push({u:url,b:stt[url]});
			}	
		}
	if (arr.length==0){return;					  }
	for(i=0;i<arr.length;i++)
	{
		for(j=i+1;j<arr.length;j++)
		{
			if(arr[j].b>arr[i].b)
			{
					t=arr[i];
					arr[i]=arr[j];
					arr[j]=t;

			}

		}

	}
		maxx=arr[0].b;
		len=10>arr.length?arr.length:10;
		
				$('#stats').html('');
	for( i=0;i<len;i++){

				$('#stats').append("<div class=\"stat-item\"><div class=\"stat-url\" >"+arr[i].u+"</div><div class=\"stat-mb\">"+(arr[i].b/(1024*1024)).toFixed(2)+" MB</div><div style=\"height:12px;position:absolute;margin-top:22px;margin-left:15px;transform:skewX(-20deg);background-color:#ff5722;width:"+parseInt(85*arr[i].b/maxx)+"%\"></div></div>");
 }}
 
 
	for( i=1;i<=3;i++){
		$('#tab'+i).removeClass('tab-selected');
		$('#tabc'+i).removeClass('tab-content-selected');
		$('#tabc'+i).addClass('tab-content-unselected');
	}
	$('#tabc'+tab).removeClass('tab-content-unselected');
	$('#tabc'+tab).addClass('tab-content-selected');
	$('#tab'+tab).addClass('tab-selected');

}
function toggle_power(){
cl($('#knoble').attr('class'));
$('#knoble').toggleClass('knob-on');
	$('#knoble').toggleClass('knob-off');
 
 self.port.emit("enabletoggle");
	


}


		


//addeventhandler();




