
const preloaded_melodies_name = ['Before Winter Ends', 'weird song'];
const preloaded_melodies_music = ['41.50,46.25,46.25,41.25,41.25,46.25,48.5,46.25,45.5,46,50,48.25,50.25,51.25,55.25,53,50.125,51.125,53.25,51.25,51.25,50.25,48.5,46.125,48.125,50.25,51.25,50.25,48.25,46.5,46.125,48.125,50.25,46.25,46.25,43.25,46.25,46.25,48.25,48.5,46',
                                    '50, 41.5'];

function updateMusicSheet(music_notes, tempo){
    if (music_notes == ""){
        if (getCookie("melodySource_Agris") == "Customized"){
            document.getElementById("tune-up").style = "display: none";
            document.getElementById("tune-down").style = "display: none";
            document.getElementById("remove").style = "display: none";
            document.getElementById("start-over").style = "display: none";
        } else {
            document.getElementById("tune-up-preloaded").style = "display: none";
            document.getElementById("tune-down-preloaded").style = "display: none";
        }
        
    } else {
        if (music_notes.split(",").length >= 256){
            document.getElementById("add").style = "display: none";
        } else {
            document.getElementById("add").style = "display: inline; padding-right: 30px";
        }
        
        let a = music_notes.split(",");
        let highest_note = 0;
        let lowest_note = 87;
        for (let i=0 ; i < a.length; i++){
            let integer = Math.floor(parseFloat(a[i]));
            if (integer > highest_note){
                highest_note = integer;
            }
            if (integer < lowest_note){
                lowest_note = integer;
            }
        }
        // ensure highest note is still within range
        if (highest_note < 87){
            if (getCookie("melodySource_Agris") == "Customized"){
                document.getElementById("tune-up").style = "display: inline; padding-right: 30px;";
            } else {
                document.getElementById("tune-up-preloaded").style = "display: inline;";
            }
        } else {
            if (getCookie("melodySource_Agris") == "Customized"){
                document.getElementById("tune-up").style = "display: none";
            } else {
                document.getElementById("tune-up-preloaded").style = "display: none";
            }
        }
        // ensure lowest note is still within range
        if (highest_note > 0){
            if (getCookie("melodySource_Agris") == "Customized"){
                document.getElementById("tune-down").style = "display: inline; padding-right: 30px;";
            } else {
                document.getElementById("tune-down-preloaded").style = "display: inline;";
            }
        } else {
            if (getCookie("melodySource_Agris") == "Customized"){
                document.getElementById("tune-down").style = "display: none";
            } else {
                document.getElementById("tune-down-preloaded").style = "display: none";
            }
        }
        
        document.getElementById("remove").style = "display: inline; padding-right: 30px";
        document.getElementById("start-over").style = "display: inline;";
        
    }
    
    submitted_melody.value = music_notes;
    music_sheet.innerHTML = "";
    if (music_notes != ""){
        let music_note_array = music_notes.split(",");
        // show the melody on music sheet
        for (let j=0; j<music_note_array.length; j++){
            
            // convert number to note
            let note = document.createElement('div');
            note.classList.add('note');
            let note_info = parseFloat(music_note_array[j]);
            let integer = Math.floor(note_info);
            let decimal = parseFloat(1000*(note_info - integer));
            
            //get duration
            switch (decimal){
                case 0:
                    note.classList.add('whole');
                    break;
                
                case 125:
                    note.classList.add('eighth');
                    break;

                case 250:
                    note.classList.add('quarter');
                    break;

                case 500:
                    note.classList.add('half');
                    break;
            }
            
            // get note 
            let note_name = note_label_array[integer%12];
            // get octave
            if (integer<3){
                note_name += '0';
                // note.classList.add('0');
                // or we can add weird note here
            } else {
                note_name += (Math.floor((integer - 3) / 12)+1).toString();
            }
            note.classList.add(note_name);
            music_sheet.appendChild(note);
            
        }
        
    }
    let note = document.createElement('div'); 
    note.classList.add('bar');
    music_sheet.appendChild(note);
    note = document.createElement('div'); 
    note.classList.add('bar');
    note.classList.add('end');
    music_sheet.appendChild(note);
    document.getElementById("melody-info").innerHTML = "Note count: " + getMelodyNoteCount(music_notes) + " Melody length: " + getMelodyDuration(music_notes, tempo);
}

function updatePreloadedMusicSheet(){
    updateMusicSheet(selector.value, document.getElementById("tempo").value);
}
function chooseNote(selected_value){
    let octave_selector = document.getElementById("customized_melody_octave");
    // only octave 0-7 for A, Bb, B
    if (selected_value == 0 || selected_value == 1 || selected_value == 2) {
        let selected_octave = octave_selector.value;
        octave_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note Octave";
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        if (selected_octave == "" || selected_octave == 8){
            option.selected = true;
        }
        octave_selector.appendChild(option);
        for (let i=0; i<=7; i++){
            let option = document.createElement('option');
            option.value = i.toString();
            option.innerHTML = i.toString();
            if (selected_octave == option.value){
                option.selected = true;
            }
            octave_selector.appendChild(option);
        }
    
    // octave 1-8 for C
    } else if (selected_value == 3){
        let selected_octave = octave_selector.value;
        octave_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note Octave";
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        if (selected_octave == "" || selected_octave == 0){
            option.selected = true;
        }
        octave_selector.appendChild(option);
        for (let i=1; i<=8; i++){
            let option = document.createElement('option');
            option.value = i.toString();
            if (selected_octave == option.value){
                option.selected = true;
            }
            option.innerHTML = i.toString();
            octave_selector.appendChild(option);
        }
        
    // octave 1-7 for the rest
    } else {
        let selected_octave = octave_selector.value;
        octave_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note Octave";
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        if (selected_octave == "" || selected_octave == 0 || selected_octave == 8){
            option.selected = true;
        }
        octave_selector.appendChild(option);
        for (let i=1; i<=7; i++){
            let option = document.createElement('option');
            option.value = i.toString();
            if (selected_octave == option.value){
                option.selected = true;
            }
            option.innerHTML = i.toString();
            octave_selector.appendChild(option);
        }
        
    }
}

function chooseOctave(selected_value){
    let note_selector = document.getElementById("customized_melody_note");
    // only A, Bb, B for octave 0
    if (selected_value == 0){
        let selected_note = note_selector.value;
        note_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note";
        option.selected = true;
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        note_selector.appendChild(option);
        if (selected_note == "" || selected_note > 2){
            option.selected = true;
        }
        note_selector.appendChild(option);

        for (let i=0; i<=2; i++){
            let option = document.createElement('option');
            option.value = i.toString();
            if (selected_note == option.value){
                option.selected = true;
            }
            option.innerHTML = note_full_label_array[i];
            note_selector.appendChild(option);
        }
    // only C for octave 8
    } else if (selected_value == 8){
        let selected_note = note_selector.value;
        note_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note";
        option.selected = true;
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        note_selector.appendChild(option);
        if (selected_note == "" || selected_note != 8){
            option.selected = true;
        }
        note_selector.appendChild(option);

        option = document.createElement('option');
        option.value = "3";
        if (selected_note == option.value){
            option.selected = true;
        }
        option.innerHTML = note_full_label_array[3];
        note_selector.appendChild(option);
    } else {
        let selected_note = note_selector.value;
        note_selector.innerHTML = "";
        let option = document.createElement('option');
        option.value = "";
        option.innerHTML = "Note";
        option.selected = true;
        option.disabled = true;
        option.hidden = 'hidden';
        option.style = "display: none";
        note_selector.appendChild(option);
        if (selected_note == ""){
            option.selected = true;
        }
        note_selector.appendChild(option);

        for (let i=0; i<=11; i++){
            let option = document.createElement('option');
            option.value = i.toString();
            if (selected_note == option.value){
                option.selected = true;
            }
            option.innerHTML = note_full_label_array[i];
            note_selector.appendChild(option);
        }
    }
}

function toneUpPreloaded(){
    let tuned_music = "";
    let note_array = submitted_melody.value.split(",");
    for (let i=0; i < note_array.length; i++){
        tuned_music += (parseFloat(note_array[i]) + 1).toString() + "," ;
    }
    submitted_melody.value = tuned_music.slice(0, -1);
    updateMusicSheet(submitted_melody.value, document.getElementById("tempo").value);
}

function toneDownPreloaded(){
    let tuned_music = "";
    let note_array = submitted_melody.value.split(",");
    for (let i=0; i < note_array.length; i++){
        tuned_music += (parseFloat(note_array[i]) - 1).toString() + "," ;
    }
    submitted_melody.value = tuned_music.slice(0, -1);
    updateMusicSheet(submitted_melody.value, document.getElementById("tempo").value);
}

function toneUp(){
    let tuned_music = "";
    let note_array = customized_melody_music.split(",");
    for (let i=0; i < note_array.length; i++){
        tuned_music += (parseFloat(note_array[i]) + 1).toString() + "," ;
    }
    customized_melody_music = tuned_music.slice(0, -1);
    updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
}

function toneDown(){
    let tuned_music = "";
    let note_array = customized_melody_music.split(",");
    for (let i=0; i < note_array.length; i++){
        tuned_music += (parseFloat(note_array[i]) - 1).toString() + "," ;
    }
    customized_melody_music = tuned_music.slice(0, -1);
    updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
}

function addNote(){
    let a = document.getElementById("customized_melody_note").value;
    let b = document.getElementById("customized_melody_octave").value;
    let c = document.getElementById("customized_melody_duration").value;
    if (a != "" && b != "" && c != ""){
        let integer;
        if (parseInt(b) == 0){
            integer = parseInt(a);
        } else {
            integer = parseInt(a) + 12*parseInt(b-1);
        }
        let decimal = parseFloat(c);
        if (decimal == 1){
            decimal = 0;
        }
        
        if (customized_melody_music == ""){
            customized_melody_music += (integer+decimal).toString();
        } else {
            customized_melody_music += "," + (integer+decimal).toString();
        }
        updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
    }
}

function removeNote(){
    // remove last note
    let index_last_colon;
    for (index_last_colon=customized_melody_music.length - 1; index_last_colon>=0; index_last_colon--){
        if (customized_melody_music[index_last_colon] == ","){
            break;
        }
    }
    
    if ( index_last_colon == -1){
        customized_melody_music = '';
    } else {
        customized_melody_music = customized_melody_music.substring(0, index_last_colon);
    }
    updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
}

function startOverNote(){
    customized_melody_music = '';
    updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
}

function getMelodyNoteCount(melody){
    if (melody == ""){
        return "0 note";
    } else {
        let count = melody.split(",").length;
        if (count > 1){
            return count.toString() + " notes.";
        } else {
            return count.toString() + " note.";
        }
    }
}

function getMelodyDuration(melody, tempo){
    if (melody == ""){
        return "0 second.";
    } else {
        let duration = 0;
        let melody_array;
        melody_array = melody.split(",");
        for (let i=0; i< melody_array.length; i++){
            let decimal = parseFloat(melody_array[i]) - Math.floor(parseFloat(melody_array[i]));
            duration += decimal;
        }
        let duration_second = (60/tempo*duration).toFixed(2);
        if (duration_second > 1){
            return duration_second.toString() + " seconds.";
        } else {
            return duration_second.toString() + " second.";
        }
    }
}

function updateMelodyLength(){
    if (getCookie("melodySource_Agris") == "Customized"){
        updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
    } else {
        updateMusicSheet(selector.value, document.getElementById("tempo").value);
    }
}


function toggleApplyChange() {
    var x = document.getElementById("apply-change");
    var y = document.getElementById("submit-btn");
    if (x.value == "no"){
        x.value = "yes";
        y.value = "APPLY CHANGE";
    } else {
        x.value = "no";
        y.value = "PLAY MELODY";
    }

}
function showPreloaded(){
    if (getCookie("screenMode_Agris") == "DarkMode"){
        document.getElementById("preloaded-melody-title").style = "background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    } else {
        document.getElementById("preloaded-melody-title").style = "background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.8)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    }
    document.getElementById("customized-melody-title").style = "background-image: none";
    
    document.getElementById("introduction").innerHTML = "Choose 1 of below melodies for the alarm sound. More melodies will be added in the future";
    setCookie('melodySource_Agris', "Preloaded", 1);
    var preloaded_selector = document.getElementsByClassName("entire_preloaded_melody_selector");
    for (var i=0; i< preloaded_selector.length; i++){
        preloaded_selector[i].style="display: flex; justify-content: center;";
    }
    
    var customized_selectors = document.getElementsByClassName("entire_customized_melody_selector");
    for (var i=0; i< customized_selectors.length; i++){
        customized_selectors[i].style="display: none";
    }
    updateMusicSheet(selector.value, document.getElementById("tempo").value);
    
}

function showCustomized(){
    if (getCookie("screenMode_Agris") == "DarkMode"){
        document.getElementById("customized-melody-title").style = "background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    } else {
        document.getElementById("customized-melody-title").style = "background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.8)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    }
    document.getElementById("preloaded-melody-title").style = "background-image: none";
    document.getElementById("introduction").innerHTML = "Build your own melody";
    setCookie('melodySource_Agris', "Customized", 1);
    var preloaded_selector = document.getElementsByClassName("entire_preloaded_melody_selector");
    for (var i=0; i< preloaded_selector.length; i++){
        preloaded_selector[i].style="display: none";
    }

    var customized_selectors = document.getElementsByClassName("entire_customized_melody_selector");
    for (var i=0; i< customized_selectors.length; i++){
        customized_selectors[i].style="display: flex; justify-content: center;";
    }
    updateMusicSheet(customized_melody_music, document.getElementById("tempo").value);
}

function toggleMelodySource() {
    var source_element = event.srcElement;
    if (source_element.id == "preloaded-melody-title" || source_element.parentElement.id == "preloaded-melody-title"){
        showPreloaded();
    } else if (source_element.id == "customized-melody-title" || source_element.parentElement.id == "customized-melody-title"){
    showCustomized();
    }
}

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




var melody_source_Agris = getCookie("melodySource_Agris");
if (melody_source_Agris == "Preloaded"){
    showPreloaded();
} else if (melody_source_Agris == "Customized"){
    showCustomized();
} else {
    setCookie('melodySource_Agris', "Preloaded", 1);
    showPreloaded();
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
    if (getCookie("melodySource_Agris") == "Customized"){
        document.getElementById("customized-melody-title").style = "background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.8)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    } else {
        document.getElementById("preloaded-melody-title").style = "background-image: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.8)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    }
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
    if (getCookie("melodySource_Agris") == "Customized"){
        document.getElementById("customized-melody-title").style = "background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    } else {
        document.getElementById("preloaded-melody-title").style = "background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://drive.google.com/uc?export=view&id=1S2Vz16B5M46dWtDsirKE0TB_9H8g4xk_'); background-size: cover";
    }
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

var win = navigator.platform.indexOf('Win') > -1;
if (win && document.querySelector('#sidenav-scrollbar')) {
var options = {
    damping: '0.5'
}
Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
}

var screenMode_Agris = getCookie("screenMode_Agris");
if (screenMode_Agris == "LightMode"){
    LightMode();
} else if (screenMode_Agris == "DarkMode"){
    DarkMode();
} else {
    setCookie('screenMode_Agris', "LightMode", 1);
    LightMode();
}
