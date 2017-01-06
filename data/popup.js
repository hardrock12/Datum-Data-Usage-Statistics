


self.port.on("show",function (reports){


showdata(reports);
})

function showdata(mes){

	
	for(key in mes.perday)
	{
	
	if(mes.perday.hasOwnProperty(key))
	{
	
	
		$('#report_month').append("<tr><td>"+key+"</td><td>"+(mes.perday[key]/1024/1024.0).toFixed(2)+" MB</td></tr>");
	
	}
		
	
	}
websitelist=[];
	
	for(key in mes.persite)
	{
	
	if(mes.persite.hasOwnProperty(key)&&key!="")
	{
	
websitelist.push({site:key,use:mes.persite[key]});
	}
	
	}
	
	for(i=0;i<websitelist.length;i++)
	{
		for(j=i+1;j<websitelist.length;j++)
		{
 console.log(websitelist[i].use,websitelist[j]);
			if(websitelist[i].use<websitelist[j].use)
			{ 	
				t=websitelist[i];
				websitelist[i]=websitelist[j];
				websitelist[j]=t;
			
			}
		}
	
	}

	for(i=0;i<websitelist.length;i++)
	{
		$('#report_persite').append("<tr><td>"+websitelist[i].site+"</td><td>"+(websitelist[i].use/1024/1024.0).toFixed(2)+" MB</td></tr>");
	}
}


function onE(d)
{
console.log(d);
}
