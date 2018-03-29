$(document).ready(function(){
  var list=[];
  var playlist=[];
  var inter;  
  var timeout;
  var num;
  var key;
  var on=0;
  var loops=0;
  var seq=0;
  var loop;
  var crazy=0;
  var gsd=new Audio("../sounds/simonSound1.mp3");
  var rsd=new Audio("../sounds/simonSound2.mp3");
  var ysd=new Audio("../sounds/simonSound3.mp3");
  var bsd=new Audio("../sounds/simonSound4.mp3");
 //random 
  function getRandom(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
 //glow
  function glow(btn){
    $(btn).css({"-webkit-filter": "brightness(250%)", 
    "filter": "brightness(250%)"}); 
  }
   //fade
    function fadeout(btn){
   $(btn).css({"-webkit-filter": "brightness(100%)", 
    "filter": "brightness(100%)"});  
  }
    //shine then fade
  function blink(btn){
    glow(btn);
    timeout=setTimeout(function(){
      fadeout(btn);
    }, 600);
  }
 //random list 
  function randomlist(loops){
    list=[];
    var ran;
    for(var i=0; i<loops; i++){
    ran=getRandom(1,5);
    list.push(ran);}
  }
  //simon says
  function simonsay(key){
      if(key==1){
        gsd.play();
        blink("#greenb");
      }else if(key==2){
        rsd.play();
        blink("#redb");
      }else if(key==3){ 
        ysd.play();
        blink("#yellowb");
      }else if(key==4){
        bsd.play();
        blink("#blueb");
      }
       }
//continous simon say
  function simon(){
    $("h3").html(loop);
    var i=0;
    inter=setInterval(function(){
      key=list[i];
      simonsay(key);
      i++;
      if(i==list.length){
        clearInterval(inter);
      }
    },1000);
  }
//click colorclick  
  function buttonclick(btn,snd){
    $(btn).click(function(){
    var kk=btn+"b";
        blink(kk);
        snd.play();
      if(kk=="#greenb"){
        num=1;
      }else if(kk=="#redb"){
        num=2;
      }else if(kk=="#yellowb"){
        num=3;
      }else if(kk=="#blueb"){
        num=4;
      }
  if(num==list[seq]){
      seq++;
      playlist.push(num);
      if(playlist.length==list.length){
        seq=0;
        loops++;
        playlist=[];
        loop=("0"+loops).slice(-2);  
        $("h3").html(loop);
        randomlist(loops);
        setTimeout(function(){
          simon();}, 500);
      if(loops>12){
         reset();
           on=1;
        $("#modal").css("display","block");
        $("button").click(function(){
          $("h3").html("01");
          $("#modal").css("display","none");
            loops=1;
         startclick();
        })      
      }
      }
   }else{if(crazy===0){
   wrong();
     clearInterval(inter);
     playlist=[];
     seq=0;
     setTimeout(function(){
     simon();
    }, 1600);}
else{wrong();
  reset();
  loops=1;
  startclick();
  }
   }
})
}
  //turn on*/
$(".slider").click(function(){
  if(on===0){
    $(this).animate({left: "20px"}, "fast");
    $("h3").css("display","block");
    $("#light").css({"-webkit-filter": "brightness(300%)", 
    "filter": "brightness(300%)",
    "background-color": "#ed4337","-webkit-filter": "contrast(300%)", 
    "filter": "contrast(300%)"}); 
    on=1;
    loops=1;
    startclick();
    craclick();
}else{
    $(this).animate({left: "2px"}, "fast");
    on=0;
    reset();
  $("h3").html("&mdash;&mdash;");
  $("h3").css("display","none");
    $("#light").css({"-webkit-filter": "brightness(100%)", 
    "filter": "brightness(100%)",
    "background-color": "#bfbfbf","-webkit-filter": "contrast(100%)", 
    "filter": "contrast(100%)"}); 
  $("#light2").css({"-webkit-filter": "brightness(100%)", 
    "filter": "brightness(100%)",
    "background-color": "#bfbfbf","-webkit-filter": "contrast(100%)", 
    "filter": "contrast(100%)"}); 
  crazy=0;
  $("#crazy").unbind();
  }
})
  
//reset
function reset(){
    list=[];
    playlist=[];
  clearInterval(inter);
    $("#green").unbind();
    $("#red").unbind();
    $("#yellow").unbind();
    $("#blue").unbind();
    $("#start").unbind();
  loops=0;
  seq=0;
}
 
  //!!wrong
  function wrong(){
    var j=0;
    $("h3").html("! !");
    var wr=setInterval(function(){
      $("h3").toggle();
      j++;
      if(j==4){
        clearInterval(wr);
      }
  },300);
  }
//startclick
  function startclick(){
    $("#start").click(function(){
    clearInterval(inter);
    loop=("0"+loops).slice(-2);  
    randomlist(loops);
    simon();
    seq=0;  
    playlist=[];  
    buttonclick("#green",gsd);
    buttonclick("#red",rsd);
    buttonclick("#yellow",ysd);
    buttonclick("#blue",bsd);
    })
  }
 //crazy
  function craclick(){
 $("#crazy").click(function(){
   if(crazy===0){
     crazy=1;
      $("#light2").css({"-webkit-filter": "brightness(300%)", 
    "filter": "brightness(300%)",
    "background-color": "#ed4337","-webkit-filter": "contrast(300%)", 
    "filter": "contrast(300%)"}); 
   }else{
     crazy=0;
     $("#light2").css({"-webkit-filter": "brightness(100%)", 
    "filter": "brightness(100%)",
    "background-color": "white","-webkit-filter": "contrast(100%)", 
    "filter": "contrast(100%)"}); 
   }
 })
  }
//button1  
  $("#button1").click(function(){
    $("#modal1").css("display","none");
    })
   
})