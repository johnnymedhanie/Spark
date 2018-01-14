//var input;
//var cursor;
//var hiddenInput;
//var content = [];
//var lastContent = "", targetContent = "";
//var inputLock = false;
////var autoWriteTimer;
//
////    input = document.getElementById('input');
////
////    hiddenInput = document.getElementById('hiddenInput');
////    //hiddenInput.focus();
////
////    inputContainer = document.getElementById('container');
////    inputContainer.onclick = function(){
////        hiddenInput.focus();
////    }
////
////    cursor = document.createElement('cursor');
////    cursor.setAttribute('class', 'blink');
////    cursor.innerHTML = "|";
////
////    input.appendChild(cursor);
//
//    function refresh() {
//
//        inputLock = true;
//
//        if (targetContent.length - lastContent.length == 0) return;
//
//        var v = targetContent.substring(0, lastContent.length + 1);
//
//        content = [];
//
//        var blinkPadding = false;
//
//        for (var i = 0; i < v.length; i++) {
//            var l = v.charAt(i);
//
//            var d = document.createElement('div');
//            d.setAttribute('class', 'letterContainer');
//
//            var d2 = document.createElement('div');
//
//            var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';
//
//            var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;
//
//            if (letterClass != 'letterStatic') blinkPadding = true;
//
//            d2.setAttribute('class', letterClass);
//
//            d.appendChild(d2);
//
//            d2.innerHTML = l;
//            content.push(d);
//        }
//
//        input.innerHTML = '';
//
//        for (var i = 0; i < content.length; i++) {
//            input.appendChild(content[i]);
//        }
//
//        cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';
//
//        input.appendChild(cursor);
//
//        if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
//        else inputLock = false;
//
//        lastContent = v;
//    }
//
//    if (document.addEventListener) {
//
//        document.addEventListener('touchstart', function(e) {
//            //clearInterval(autoWriteTimer);
//            targetContent = lastContent;
//        }, false);
//
////        document.addEventListener('click', function(e) {
////            clearInterval(autoWriteTimer);
////            targetContent = lastContent;
////            hiddenInput.focus();
////        }, false);
//
//        hiddenInput.addEventListener('input', function(e) {
//            e.preventDefault();
//            targetContent = hiddenInput.value;
//            if (!inputLock) refresh();
//        }, false);
//
//    }
//
//    hiddenInput.value = "";
//
//    autoWriteTimer = setTimeout(function() {
//        if (lastContent != "") return;
//        targetContent = "enter fav keijo episode here..";
//        refresh();
//        targetContent = "enter fav keijo plss";
//        lastContent = "me too";
//    }, 1000);
//
//
//function reset() {
//    targetContent = "did I really fix the input";
//    lastContent = "or did i tho";
//    console.log("used reset func");
//}

var $orbs = $('.orbs span');
$('.end-right').css('left' , '-10%');
$('.end-left').css('left', '110%');
$orbs.velocity({'top': '-300px', scaleX: '.2', scaleY: '.2', color: '#990000'},0);
var orb = 0;
var numOrbs = $orbs.length;

$('.end-right').velocity({left : '50%'}, 'easeOutExpo', 1200);
$('.end-left').velocity({left : '50%'}, 'easeOutExpo',  1200);


dropOrbs = function(){
  $orbs.eq(orb).velocity({top: '70px'}, 400).velocity({scaleX: 1, scaleY: 1, color: '#fff'}, 1000).css('position', 'relative');
  orb = orb + 1;
  if(orb < numOrbs){
    setTimeout(dropOrbs, 100);
  }
  else{
    setTimeout(function(){$('.glow').velocity({opacity: 1}, 1200);}, 1200);

  }
  
}

setTimeout(dropOrbs, 400);