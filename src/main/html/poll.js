var errCnt = 1;
var maxErrCnt = 10;
var wait = 5000;
var listen = "/comet/";
var ASYNC = true;
var CACHE = false;
var reTry = 100;

function init(){
	$("#messages").append(
		"<div >Allow "+ maxErrCnt + " timeout errors<br>" +
		"Wait "+ wait/1000 + " seconds for response<br>" +
		"Listen at http://localhost:9998"+ listen +
		"<br>ASYNC = "+ ASYNC +
		"<br>CACHE = "+ CACHE +
		"<br>Retry every = "+ reTry/1000 + " seconds"
		+"</div>"
    );
	waitForMsg();
}
	
function addmsg(type, msg){
	COLOR = 'black';
	if (type == "error") {
		msg = msg+"  "+errCnt + " of " + maxErrCnt;
		COLOR = 'red';
	} else
		msg = '<b>recieved: "' +msg + '"</b>'; 
    $("#messages").append(
		"<div class='msg "+ type +"'><font color='"+COLOR+"'>"+ msg +"</font></div>"
    );
}


function waitForMsg(){
	//Alert("wait");
    $.ajax({
        type: 'GET',
        url: listen,
        async: ASYNC, 
        cache: CACHE,
        timeout:wait, 
        success: function(data){
			//alert(" data  "+data);
            addmsg('new', data);
            setTimeout(
                'waitForMsg()',
                reTry 
            );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert('error', textStatus + ' (' + errorThrown + ')');
            addmsg('error', textStatus + ' (' + errorThrown + ')');
			if (errCnt++ >= maxErrCnt)
				reload();
			else	
				setTimeout(
					'waitForMsg()', /* Try again after.. */
					reTry); 
        },
    });
};

function reload(){
	window.location = "http://localhost:9998";
}

$(document).ready(function(){ init(); }); 
