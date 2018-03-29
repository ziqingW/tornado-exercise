$(document).ready(function() {
  var li = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var xli = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var oli = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var sm;
  var s1=0;
  var s2=0;
  
  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  //winner?
  function winner(ll) {
    if (ll[0] == ll[1] && ll[0] == ll[2] && ll[0] > 0) {
      return true;
    } else if (ll[3] == ll[4] && ll[3] == ll[5] && ll[3] > 0) {
      return true;
    } else if (ll[6] == ll[7] && ll[6] == ll[8] && ll[6] > 0) {
      return true;
    } else if (ll[0] == ll[3] && ll[0] == ll[6] && ll[0] > 0) {
      return true;
    } else if (ll[1] == ll[4] && ll[1] == ll[7] && ll[1] > 0) {
      return true;
    } else if (ll[2] == ll[5] && ll[2] == ll[8] && ll[2] > 0) {
      return true;
    } else if (ll[0] == ll[4] && ll[0] == ll[8] && ll[0] > 0) {
      return true;
    } else if (ll[2] == ll[4] && ll[2] == ll[6] && ll[2] > 0) {
      return true;
    } else {
      return false;
    }
  }
  //picx
  function x1(btn, i) {
    if (li[i - 1] === 0) {
      $(btn).html(
        "<img id='xpic' src='/static/images/x23.png'>"
      );
      pos = pos.filter(function(value) {
        return value != i;
      });
      li[i - 1] = 1;
      xli[i - 1] = 1;
      $(btn).prop("disabled", true);
    }
  }
  //pico
  function o1(btn, i) {
    if (li[i - 1] === 0) {
      $(btn).html(
        "<img id='opic' src='/static/images/o10.png'>"
      );
      pos = pos.filter(function(value) {
        return value != i;
      });
      li[i - 1] = 2;
      oli[i - 1] = 2;
      $(btn).prop("disabled", true);
    }
  }
  //aipicx
  function aix1(btn, i) {
    if (li[i - 1] === 0) {
      $(btn).html(
        "<img id='xpicai' src='/static/images/x23.png'/>"
      );
      pos = pos.filter(function(value) {
        return value != i;
      });
      li[i - 1] = 1;
      xli[i - 1] = 1;
      $(btn).prop("disabled", true);
    }
  }
  //aipico
  function aio1(btn, i) {
    if (li[i - 1] === 0) {
      $(btn).html(
        "<img id='opicai' src='/static/images/o10.png'/>"
      );
      pos = pos.filter(function(value) {
        return value != i;
      });
      li[i - 1] = 2;
      oli[i - 1] = 2;
      $(btn).prop("disabled", true);
    }
  }
  //click x function
  function checkx(btn, i) {
    $(btn).click(function() {
      if ($(btn).prop("disabled")) {
        return false;
      } else {
        x1(btn, i);
       if (pos.length < 1) {
          $("#modal").css("display", "block");
          $("#yell").html("It's a Draw! Play again?");
        }
        judgex(i);
      }
    });
  }
  //click o function
  function checko(btn, i) {
    $(btn).click(function() {
      if ($(btn).prop("disabled")) {
        return false;
      } else {
        o1(btn, i);
        judgeo(i);
      }
    });
  }
  //judge x function
  function judgex(i) {
    if (winner(xli)) {
      $("#modal").css("display", "block");
      $("#yell").html("You Won! Play again?");
      s1++;
    } else {
      
      //insert smarter module
      if (smarter(oli)) {
        sm = smarter(oli);
      } else {
        if (smarter(xli)) {
          sm = smarter(xli);
        } else {
          var len;
          len = pos.length;
          var loc;
          loc = getRandom(0, len);
          sm = pos[loc];
        }
      }
      var tile = "#t" + sm;
      aio1(tile, sm);
      if (winner(oli)) {
        $("#modal").css("display", "block");
        $("#yell").html("You Lost! Play again?");
        s2++;
      }
    }
  }
  //judge o function
  function judgeo(i) {
    if (winner(oli)) {
      $("#modal").css("display", "block");
      $("#yell").html("You Win! Play again?");
      s1++;
    } else {
      //insert smarter module
      if (smarter(xli)) {
        sm = smarter(xli);
      } else {
        if (smarter(oli)) {
          sm = smarter(oli);
        }else{
      var len;
      len = pos.length;
      var loc;
      loc = getRandom(0, len);
      sm = pos[loc];
        }
      }
      var tile = "#t" + sm;
      aix1(tile, sm);
      if (winner(xli)) {
        $("#modal").css("display", "block");
        $("#yell").html("You Lost! Play again?");
        s2++;
      }
      if (pos.length < 1) {
          $("#modal").css("display", "block");
          $("#yell").html("It's a Draw! Play again?");}
    }
  }

  //choose x function
  $("#xx").click(function() {
    $("#modal").css("display", "none");
    reset();
    $("#s1").html(s1);
    $("#s2").html(s2);
    compare();
    checkx("#t1", 1);
    checkx("#t2", 2);
    checkx("#t3", 3);
    checkx("#t4", 4);
    checkx("#t5", 5);
    checkx("#t6", 6);
    checkx("#t7", 7);
    checkx("#t8", 8);
    checkx("#t9", 9);
  });
  //choose o function
  $("#oo").click(function() {
    $("#modal").css("display", "none");
    reset();
    $("#s1").html(s1);
    $("#s2").html(s2);
    compare();
    var len;
    len = pos.length;
    var loc;
    loc = getRandom(0, len);
    sm = pos[loc];
    var tile = "#t" + sm;
    aix1(tile, sm);
    checko("#t1", 1);
    checko("#t2", 2);
    checko("#t3", 3);
    checko("#t4", 4);
    checko("#t5", 5);
    checko("#t6", 6);
    checko("#t7", 7);
    checko("#t8", 8);
    checko("#t9", 9);
  });
  //reset function
  function reset() {
    $(".tile").empty();
    li = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    xli = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    oli = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    $(".tile").prop("disabled", false);
    $(".tile").unbind();
    
  }
  //call reset
  $("#reset").click(function() {
    reset();
    $("#modal").css("display", "block");
    $("#yell").empty();
    s1=0;
    s2=0;
  });
  //smarter module
  function smarter(al) {
    if (al[3] == al[4] && al[3] > 0 && li[5] === 0) {
      return 6;
    } else if (al[3] == al[5] && al[3] > 0 && li[4] === 0) {
      return 5;
    } else if (al[4] == al[5] && al[4] > 0 && li[3] === 0) {
      return 4;
    } else if (al[6] == al[7] && al[6] > 0 && li[8] === 0) {
      return 9;
    } else if (al[6] == al[8] && al[6] > 0 && li[7] === 0) {
      return 8;
    } else if (al[7] == al[8] && al[7] > 0 && li[6] === 0) {
      return 7;
    } else if (al[0] == al[3] && al[0] > 0 && li[6] === 0) {
      return 7;
    } else if (al[0] == al[6] && al[0] > 0 && li[3] === 0) {
      return 4;
    } else if (al[3] == al[6] && al[3] > 0 && li[0] === 0) {
      return 1;
    } else if (al[1] == al[4] && al[1] > 0 && li[7] === 0) {
      return 8;
    } else if (al[1] == al[7] && al[1] > 0 && li[4] === 0) {
      return 5;
    } else if (al[4] == al[7] && al[4] > 0 && li[1] === 0) {
      return 2;
    } else if (al[2] == al[5] && al[2] > 0 && li[8] === 0) {
      return 9;
    } else if (al[2] == al[8] && al[2] > 0 && li[5] === 0) {
      return 6;
    } else if (al[5] == al[8] && al[5] > 0 && li[2] === 0) {
      return 3;
    } else if (al[0] == al[4] && al[0] > 0 && li[8] === 0) {
      return 9;
    } else if (al[0] == al[8] && al[0] > 0 && li[4] === 0) {
      return 5;
    } else if (al[4] == al[8] && al[4] > 0 && li[0] === 0) {
      return 1;
    } else if (al[2] == al[4] && al[2] > 0 && li[6] === 0) {
      return 7;
    } else if (al[2] == al[6] && al[2] > 0 && li[4] === 0) {
      return 5;
    } else if (al[4] == al[6] && al[4] > 0 && li[2] === 0) {
      return 3;
    } else if (al[0] == al[1] && al[0] > 0 && li[2] === 0) {
      return 3;
    } else if (al[0] == al[2] && al[0] > 0 && li[1] === 0) {
      return 2;
    } else if (al[1] == al[2] && al[1] > 0 && li[0] === 0) {
      return 1;
    } else {
      return false;
    }
  }
 function compare(){
   if(s1<s2){
     $("#s1").css("color","red");
     $("#s2").css("color","green"); 
   }else if(s1==s2){ $("#s1").css("color","black");
     $("#s2").css("color","black"); }else{
        $("#s1").css("color","green");
     $("#s2").css("color","red"); 
     }
 }
  
  
});
