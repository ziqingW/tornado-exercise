$(document).ready(function() {
    $("#mail-button").click(function(){
        $(".mail-background").css({"display": "block"});
    });
    $("#cancel-button").click(function(){
        $(".mail-background").css({"display": "none"});
    })
})
