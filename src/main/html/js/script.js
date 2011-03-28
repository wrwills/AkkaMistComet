
function addmsg(type, msg){
    $("#messages").append(
        "<div class='msg "+ type +"'>"+ msg +"</div>"
    );
}

function waitForMsg(){
    $.ajax({
        type: 'GET',
        url: '/comet/',
        async: true, 
        cache: false,
        timeout:30000, 
        success: function(data){
            addmsg('new', data);
            setTimeout(
                'waitForMsg()',
                1000 /* ..after 1 seconds */
            );
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            addmsg('error', textStatus + ' (' + errorThrown + ')');
            setTimeout(
                'waitForMsg()', /* Try again after.. */
                '15000'); /* milliseconds (15seconds) */
        },
    });
};

$(document).ready(function(){ waitForMsg(); }); 