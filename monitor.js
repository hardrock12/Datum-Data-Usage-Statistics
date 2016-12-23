
sets=null;
crequest=null;
stats=null;
function requestwatcher(details){
	
crequest=details;
	data=details.responseHeaders.forEach(get_cl);
	
	browser.storage.local.get("data_count").then(onGot,onE);
	
	
	
	
}
function onE(e)
{

console.log("custom error:"+e);
}
function gethost(str){

nop=str.substr(str.indexOf("//")+2)

res=nop.substr(0,nop.indexOf("/"));
index1=res.lastIndexOf(".");
index=res.substr(0,index1).lastIndexOf(".");
	//console.log(res);
return getDomainFromHostname(res);


}

         /* These are TLDs that have an SLD */
var tlds = {
    "cy":true,
    "ro":true,
    "ke":true,
    "kh":true,
    "ki":true,
    "cr":true,
    "km":true,
    "kn":true,
    "kr":true,
    "ck":true,
    "cn":true,
    "kw":true,
    "rs":true,
    "ca":true,
    "kz":true,
    "rw":true,
    "ru":true,
    "za":true,
    "zm":true,
    "bz":true,
    "je":true,
    "uy":true,
    "bs":true,
    "br":true,
    "jo":true,
    "us":true,
    "bh":true,
    "bo":true,
    "bn":true,
    "bb":true,
    "ba":true,
    "ua":true,
    "eg":true,
    "ec":true,
    "et":true,
    "er":true,
    "es":true,
    "pl":true,
    "in":true,
    "ph":true,
    "il":true,
    "pe":true,
    "co":true,
    "pa":true,
    "id":true,
    "py":true,
    "ug":true,
    "ky":true,
    "ir":true,
    "pt":true,
    "pw":true,
    "iq":true,
    "it":true,
    "pr":true,
    "sh":true,
    "sl":true,
    "sn":true,
    "sa":true,
    "sb":true,
    "sc":true,
    "sd":true,
    "se":true,
    "hk":true,
    "sg":true,
    "sy":true,
    "sz":true,
    "st":true,
    "sv":true,
    "om":true,
    "th":true,
    "ve":true,
    "tz":true,
    "vn":true,
    "vi":true,
    "pk":true,
    "fk":true,
    "fj":true,
    "fr":true,
    "ni":true,
    "ng":true,
    "nf":true,
    "re":true,
    "na":true,
    "qa":true,
    "tw":true,
    "nr":true,
    "np":true,
    "ac":true,
    "af":true,
    "ae":true,
    "ao":true,
    "al":true,
    "yu":true,
    "ar":true,
    "tj":true,
    "at":true,
    "au":true,
    "ye":true,
    "mv":true,
    "mw":true,
    "mt":true,
    "mu":true,
    "tr":true,
    "mz":true,
    "tt":true,
    "mx":true,
    "my":true,
    "mg":true,
    "me":true,
    "mc":true,
    "ma":true,
    "mn":true,
    "mo":true,
    "ml":true,
    "mk":true,
    "do":true,
    "dz":true,
    "ps":true,
    "lr":true,
    "tn":true,
    "lv":true,
    "ly":true,
    "lb":true,
    "lk":true,
    "gg":true,
    "uk":true,
    "gn":true,
    "gh":true,
    "gt":true,
    "gu":true,
    "jp":true,
    "gr":true,
    "nz":true
}

function isSecondLevelDomainPresent(domainParts) {
    return typeof tlds[domainParts[domainParts.length-1]] != "undefined"&&typeof tlds[domainParts[domainParts.length-2]] != "undefined";
}
function getDomainFromHostname(url) {
  domainParts = url.split(".");
  var cutOff =2;
  if (isSecondLevelDomainPresent(domainParts)) {
    cutOff=3;
  }
  
  return domainParts.slice(domainParts.length-cutOff, domainParts.length).join(".");
}
function onGot(item){
	

if(item.data_count==undefined){init();
									  
									   }
	else{
x=item.data_count;
	}
	
	
	
	x.bytesinmonth+=cdata;
	x.bytesinday+=cdata;
	
	browser.storage.local.set({data_count:x})
	if(stats==null){//console.log("Stat is null");
		return ;}
	//console.log(crequest.originUrl+" "+ gethost(crequest.originUrl));
if(stats[gethost(crequest.originUrl)]==null)
{

stats[gethost(crequest.originUrl)]=0;
}
	else{
	
	stats[gethost(crequest.originUrl)]+=cdata;
	}

//console.log(stats);

browser.storage.local.set({stat:stats});
}
cdata=0;

function get_cl(item,index)
{	
	if(item.name=="Content-Length")
	{
		
		cdata=parseInt(item.value);
		
	}

}

function registerhandle(){
browser.webRequest.onCompleted.addListener(requestwatcher,{urls:["<all_urls>"]},["responseHeaders"]);
}
function removehandle(){

browser.webRequest.onCompleted.removeListener(requestwatcher);

}
function init(){
	
	
	//console.log("init values");
	
browser.storage.local.get("init").then(function(item){if( item==undefined||item.init==undefined){
var d=new Date();
browser.storage.local.set({data_count:{bytesinmonth:0,bytesinday:0},stat:{},settings:{ismb:1,version:1,cur_day:d.getDay(),cur_month:d.getMonth(),ison:true},init:{}});
	sets={data_count:{bytesinmonth:0,bytesinday:0},stat:{},settings:{ismb:1,version:1,cur_day:d.getDay(),cur_month:d.getMonth(),ison:true},init:{}};
	stats={};
	
}
													 
else{


browser.storage.local.get("settings").then(function (details){if(details.settings==undefined){init();}else{sets=details.settings;}}).catch(function(e){console.log(e);},onE);
browser.storage.local.get("stat").then(function (details){if(details.stat==undefined){console.log("stat is undefined");init();}else{stats=details.stat;}},onE);

}													 
													 
													 
													 
													 
													 
													 
													 
													 
													 }).catch(function(ds){var d=new Date();
console.log("error init "+ds);
browser.storage.local.set({data_count:{bytesinmonth:0,bytesinday:0},stat:{},settings:{ismb:1,version:1,cur_day:d.getDay(),cur_month:d.getMonth(),ison:true},init:{}});},onE);






}


browser.runtime.onMessage.addListener(notify);
function get_pref(str)
{
	console.log("get pref"+str);
return sets[str];
}
function set_pref(key,value)
{	
	sets[key]=value;
	console.log(sets);
	browser.storage.local.set({settings:sets});
	
}
function notify(mess)
{
	console.log("toggledone on");
 if(mess.cmd=="enabletoggle")
	{
if(get_pref("ison")==true)
{
removehandle();
	set_pref("ison",false);
}
		else{
	registerhandle();
			
	set_pref("ison",true);
		}
	}
	



}

init();
registerhandle();







