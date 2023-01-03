

for (let i=0; i<preloaded_melodies_name.length; i++){
    let opt = document.createElement('option');
    opt.value = preloaded_melodies_music[i];
    opt.innerHTML = preloaded_melodies_name[i];
    if (opt.value == current_song_music){
        opt.selected = 'selected';
        preloaded_chosen = true;
        
    }
    selector.appendChild(opt);
}

if (!preloaded_chosen){
    let opt = document.createElement('option');
    opt.value = "";
    opt.innerHTML = "Pick a melody";
    opt.selected = true;
    opt.disabled = true;
    opt.hidden = 'hidden';
    opt.style = "display: none";
    selector.appendChild(opt);
}



function updateMusicSheet(music_notes, tempo){
    document.getElementById("submitted-melody").value = music_notes;
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
    updateMusicSheet(document.getElementById("preloaded_melody_selector").value, document.getElementById("tempo").value);
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
        updateMusicSheet(document.getElementById("preloaded_melody_selector").value, document.getElementById("tempo").value);
    }
}
