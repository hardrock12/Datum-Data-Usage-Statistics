var ss = require("sdk/simple-storage");
let {Cu,Ci,Cc}=require("chrome");
var tabs=require("sdk/tabs");
Cu.import('resource://gre/modules/Services.jsm');

var sets,crequest,stats,mstats,tabid,cdata;
sets=null;
crequest=null;
stats=null;
mstats=null;
tabid=0;
cdata=0; 

var httpRequestObserver = {
    observe: function(aSubject, aTopic, aData) {
      function geturlFromChannel(channel) {
     /* var tablib=require("sdk/tabs/utils");
      
    try {
        var noteCB= channel.notificationCallbacks ? channel.notificationCallbacks : channel.loadGroup.notificationCallbacks;

        if (!noteCB) { return ""; }

        var domWin = noteCB.getInterface(Ci.nsIDOMWindow);
        var mainWindow = noteCB.QueryInterface(Ci.nsIInterfaceRequestor)
                       .getInterface(Ci.nsIWebNavigation)
                       .QueryInterface(Ci.nsIDocShellTreeItem)
                       .rootTreeItem
                       .QueryInterface(Ci.nsIInterfaceRequestor)
                       .getInterface(Ci.nsIDOMWindow);
var u=aSubject.URI;


console.log(u);
return u;
    } catch (e) {
        dump(e + "\n");
        return "";
    }
    */
}
aSubject.QueryInterface(Ci.nsIChannel)
var urlparent=aSubject.URI;//geturlFromChannel(aSubject)
if(urlparent=="")
{
return;
}

        var newListener = new TracingListener(urlparent);

        aSubject.QueryInterface(Ci.nsITraceableChannel);
        newListener.originalListener = aSubject.setNewListener(newListener);
 
    }
  
}



 
function TracingListener(url) {

this.url=url.spec;
this.urlobj=url;
console.log("trace:"+this.url);


}
TracingListener.prototype=
{


onDataAvailable:function(request, context, inputStream, offset, count) {
        //console.log(this.url,count);
	  this.originalListener.onDataAvailable(request, context, inputStream, offset, count);
	try{
	var x=ss.storage.data_count;
	cdata=count;

	if(x==undefined){init();}
		
	var df=new Date();
	var day,month,year,tdate;
	day=df.getDate();
	month=df.getMonth()+1;
	year=df.getFullYear();
	tdate="" +day+"-"+month+"-"+year;
	//console.log(tdate);
	x.bytesinmonth+=cdata;
	x.bytesinday+=cdata;
	ss.storage.data_count=x;
	
	
	if(mstats[tdate]==null)
	{	mstats[tdate]=0; }
	else{	mstats[tdate]+=cdata;	} 
if(stats[gethost(this.url)]==null)
{stats[gethost(this.url)]=0;}
	else{	stats[gethost(this.url)]+=cdata;}  
	
	ss.storage.stat=stats;
	ss.storage.mstat=mstats;
		}
		catch(e)
		{
		
		
		
		}
      
    },
    onStartRequest: function(request, context) {
        this.originalListener.onStartRequest(request, context);
    },
    onStopRequest:function(request, context, statusCode) {
        this.originalListener.onStopRequest(request, context, statusCode);
    },
    QueryInterface: function(aIID) {
        if (aIID.equals(Ci.nsIStreamListener) || aIID.equals(Ci.nsISupports)) {
            return this;
        }
        throw Cr.NS_NOINTERFACE;
    }



};

 
    

function gethost(str){
var nop,res,index1,index;
nop=str.substr(str.indexOf("//")+2);
res=nop.substr(0,nop.indexOf("/"));
index1=res.lastIndexOf(".");
index=res.substr(0,index1).lastIndexOf(".");
return getDomainFromHostname(res);

}

         /* These are TLDs that have an SLD */
var tlds ={
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
  var domainParts = url.split(".");
  var cutOff =2;
  if (isSecondLevelDomainPresent(domainParts)) {
    cutOff=3;
  }
  
  return domainParts.slice(domainParts.length-cutOff, domainParts.length).join(".");
}





function registerhandle(){
console.log("handle registered");
Services.obs.addObserver(httpRequestObserver, "http-on-examine-response", false);
}
function removehandle(){
console.log("handle  unregistered");
Services.obs.removeObserver(httpRequestObserver, "http-on-examine-response");


}
function init(){

if(	ss.storage.init==null)
{
									var d=new Date();

	ss.storage.data_count={bytesinmonth:0,bytesinday:0};
		
	ss.storage.stat={};
	ss.storage.mstat={};

	mstats={};
	stats={};
	sets={ismb:1,ison:true,version:2.1,cur_day:d.getDay(),cur_month:d.getMonth()};
ss.storage.settings=sets;
}

													 
else{


sets=ss.storage.settings;
mstats=ss.storage.mstat;
stats=ss.storage.mstat
																										  
}

}

//browser.runtime.onMessage.addListener(notify);
function get_pref(str)
{
console.log(sets);
	return sets[str];
}
function set_pref(key,value)
{	
	sets[key]=value;
	//console.log(sets);
	ss.storage.settings=sets;
	//console.log(sets);
}


var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");







//console.log(self.data.url("screen.html"),self.data.url("ui.js"));
var button = ToggleButton({
  id: "datumpanel",
  label: "Datum: Data Usage and Statistics",
  icon: {
    "16": "./icons/icon16.png",
    "32": "./icons/icon32.png",
    "64": "./icons/icon64.png"
  },
  onChange: handleChange
});

var panel;
 panel= panels.Panel({
  contentURL:"./screen.html",  
  contentScriptFile:["./ui.js","./jquery-3.1.1.min.js"],  
  onHide: handleHide
  });
  var cs=function(ar){};//console.log;
  function codeforpanel () {
  cs("codepanelshowlistener");
            panel.port.emit("show",
                {
                    store:ss.storage
                });
                }
 panel.on("show", codeforpanel);
function handleChange(state) {
  if (state.checked) {
    panel.show({position: button,width:350,height:650});
  // codeforpanel();
  }
}


function handleHide() {
  button.state('window', {checked: false});
 
}
var popup;



panel.port.on("enabletoggle",function(){notify("enabletoggle")});
panel.port.on("loaddata",function(){notify("loaddata")});
panel.port.on("resetday",function(){notify("resetday")});
panel.port.on("resetmonth",function(){notify("resetmonth")});
panel.port.on("tmb",function(){notify("tmb")});


//popip


popup=panels.Panel({contentURL:"./popup.html",
				contentScriptFile:["./popup.js","./jquery-3.1.1.min.js"]
	
	
	
	});
	popup.on("show",function(){
	popup.port.emit("show",{perday:mstats,persite:stats});
	
	
	});
	
function notify(mess)
{
//console.log(mess);
	if(mess=="enabletoggle")
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
	else if(mess=="tmb")
	{
	
	set_pref("ismb",(get_pref("ismb")+1)%2);
	
	}
	else if(mess=="loaddata")
	{
	//tabs.open("http://www.google.com");
	
	
	popup.show({width:1200,height:800,});
	


	
	}
	else if(mess=="resetday")
	{
	
	
	
	stats=ss.storage.stat;
	stats.bytesinday=0;
	
	ss.storage.stat=stats;	
	
	/*
		browser.tabs.query({currentWindow: true,active: true}).then(function(d){tabid=d.id;}).catch(function(e){console.log(e);});
*/
	}
	else if(mess=="resetmonth")
	{
	
	stats=ss.storage.stat;
	stats.bytesinmonth=0;
	ss.storage.stat=stats;
	
	}

}

exports.onUnload = function (reason) {
removehandle();
};
init();
registerhandle();

