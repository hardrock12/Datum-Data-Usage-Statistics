




browser.runtime.onMessage.addListener(function (mes){


console.log(mes);
	
	for(key in mes.perday)
	{
	
	if(mes.perday.hasOwnProperty(key))
	{
	
	
		$('#report_month').append("<tr><td>"+key+"</td><td>"+(mes.perday[key]/1024/1024.0).toFixed(2)+" MB</td></tr>");
	
	}
		
	
	}
//	websitelist=[];
	
	for(key in mes.persite)
	{
	
	if(mes.perday.hasOwnProperty(key))
	{
	

		$('#report_persite').append("<tr><td>"+key+"</td><td>"+(mes.persite[key]/1024/1024.0).toFixed(2)+" MB</td></tr>");
	
	}
	
	}
});
console.log("loaded content scritp");
browser.runtime.sendMessage({cmd:"loaddata"}).then(onE,onE);
function onE(d)
{
console.log(d);
}