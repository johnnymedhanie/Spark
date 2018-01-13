var input;
var cursor;
var hiddenInput;
var content = [];
var lastContent = "", targetContent = "";
var inputLock = false;
var autoWriteTimer;

window.onload = function() {

    input = document.getElementById('input');

    hiddenInput = document.getElementById('hiddenInput');
    //hiddenInput.focus();

    inputContainer = document.getElementById('container');
    inputContainer.onclick = function(){
        hiddenInput.focus();
    }

    cursor = document.createElement('cursor');
    cursor.setAttribute('class', 'blink');
    cursor.innerHTML = "|";

    input.appendChild(cursor);

    function refresh() {

        inputLock = true;

        if (targetContent.length - lastContent.length == 0) return;

        var v = targetContent.substring(0, lastContent.length + 1);

        content = [];

        var blinkPadding = false;

        for (var i = 0; i < v.length; i++) {
            var l = v.charAt(i);

            var d = document.createElement('div');
            d.setAttribute('class', 'letterContainer');

            var d2 = document.createElement('div');

            var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';

            var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

            if (letterClass != 'letterStatic') blinkPadding = true;

            d2.setAttribute('class', letterClass);

            d.appendChild(d2);

            d2.innerHTML = l;
            content.push(d);
        }

        input.innerHTML = '';

        for (var i = 0; i < content.length; i++) {
            input.appendChild(content[i]);
        }

        cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

        input.appendChild(cursor);

        if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
        else inputLock = false;

        lastContent = v;
    }

    if (document.addEventListener) {

        document.addEventListener('touchstart', function(e) {
            //clearInterval(autoWriteTimer);
            targetContent = lastContent;
        }, false);

//        document.addEventListener('click', function(e) {
//            clearInterval(autoWriteTimer);
//            targetContent = lastContent;
//            hiddenInput.focus();
//        }, false);

        hiddenInput.addEventListener('input', function(e) {
            e.preventDefault();
            targetContent = hiddenInput.value;
            if (!inputLock) refresh();
        }, false);

    }

    hiddenInput.value = "";

    autoWriteTimer = setTimeout(function() {
        if (lastContent != "") return;
        targetContent = "enter fav keijo episode here..";
        refresh();
        targetContent = "enter fav keijo plss";
        lastContent = "me too";
    }, 1000);
}

function reset() {
    targetContent = "did I really fix the input";
    lastContent = "or did i tho";
    console.log("used reset func");
}
