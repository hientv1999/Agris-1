// version 1.2
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function LightMode() {
    var el = document.getElementsByClassName("color-sensitive");
    for (var i = 0; i < el.length; i++) {
        el[i].style.color = "#6c757d";
    }
    var el2 = document.getElementsByClassName("color-sensitive2");
    for (var i = 0; i < el2.length; i++) {
        el2[i].style.backgroundColor = "#ffffff";
    }
    var el3 = document.getElementsByClassName("color-sensitive3");
    for (var i = 0; i < el3.length; i++) {
        el3[i].style.color = "#000000";
    }
    var el4 = document.getElementsByClassName("background-theme");
    for (var i = 0; i < el4.length; i++) {
        el4[i].style.backgroundColor = "#f8f9fa";
    }
    var el5 = document.getElementsByClassName("color-sensitive-text");
    for (var i = 0; i < el5.length; i++) {
        el5[i].style.Color = "black";
    }
    document.getElementById("colorpicker").style.backgroundColor="#353535";
    // var el3 = document.getElementsByClassName("color-sensitive-toggle");
    // for (var i = 0; i < el3.length; i++) {
    //   el3[i].style.background = "#000000";
    // }
    setCookie('screenMode_Agris', "LightMode", 1);
}

function DarkMode() {
    var el = document.getElementsByClassName("color-sensitive");
    for (var i = 0; i < el.length; i++) {
        el[i].style.color = "#f8f9fa";
    }
    var el2 = document.getElementsByClassName("color-sensitive2");
    for (var i = 0; i < el2.length; i++) {
        el2[i].style.backgroundColor = "#373c42";
    }
    var el3 = document.getElementsByClassName("color-sensitive3");
    for (var i = 0; i < el3.length; i++) {
        el3[i].style.color = "#f8f9fa";
    }
    var el4 = document.getElementsByClassName("background-theme");
    for (var i = 0; i < el4.length; i++) {
        el4[i].style.backgroundColor = "#6c757d";
    }
    var el5 = document.getElementsByClassName("color-sensitive-text");
    for (var i = 0; i < el5.length; i++) {
        el5[i].style.Color = "#f8f9fa";
    }
    document.getElementById("colorpicker").style.backgroundColor="#4d4c4c";
    // var el3 = document.getElementsByClassName("color-sensitive-toggle");
    // for (var i = 0; i < el3.length; i++) {
    //   el3[i].style.background = "#ffffff";
    // }
    setCookie('screenMode_Agris', "DarkMode", 1);
}



var date = new Date();
setCookie('timezone_Agris', String(date.getTimezoneOffset()/60), 1);

function googleTranslateElementInit() {       
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element');
}

function translateLanguage(lang) {
    googleTranslateElementInit();
    var $frame = $('.goog-te-menu-frame:first');
    if (!$frame.size()) {
        alert("Error: Could not find Google translate frame.");
        return false;
    }
    $frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
    return false;
}

$(function(){
    $('.selectpicker').selectpicker();
});

var screenMode_Agris = getCookie("screenMode_Agris");
if (screenMode_Agris == "LightMode"){
    LightMode();
} else if (screenMode_Agris == "DarkMode"){
    DarkMode();
} else {
    setCookie('screenMode_Agris', "LightMode", 1);
    LightMode();
}

function toggleSwitch(e){
    document.getElementById("submit-btn").style.display="inline";
    if (e.value == "ON"){
        e.value = "OFF";
        if (e.name == "status-indicator"){
            document.getElementById("status-indicator").innerHTML = "OFF";
        } else {
            document.getElementById("haptic-feedback").innerHTML = "OFF";
        }
    } else {
        e.value = "ON";
        if (e.name == "status-indicator"){
            document.getElementById("status-indicator").innerHTML = "ON";
        } else {
            document.getElementById("haptic-feedback").innerHTML = "ON";
        }
    }
}

function myFunction() {
    var x = document.getElementById("pw");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showSubmitButton(){
    document.getElementById("submit-btn").style.display="inline";
}
