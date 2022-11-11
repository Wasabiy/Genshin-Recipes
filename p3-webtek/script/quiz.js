let svar = [
{ 0: {
        1: "Georges Bizet - Carmen Habanera",
        2: "Donizetti - La fille du régiment",
        3: "Luciano Pavarotti - Nessun Dorma"}
},
{ 1: {
        1: "Georges Bizet - Carmen Habanera",
        2: "Mozart - Queen of the Night Aria",
        3: "Donizetti - La fille du régiment"}
},
{ 2: {
        1: "Luciano Pavarotti - Nessun dorma",
        2: "Donizetti - La fille du régiment",
        3: "Georges Bizet - Carmen Habanera"}
},
{ 3: {
        1: "Puccini - O Mio Babbino",
        2: "Donizetti - La fille du régiment",
        3: "Luciano Pavarotti - Nessun Dorma"}
},
{ 4: {
        1: "Georges Bizet - Carmen Habanera",
        2: "Puccini - O Mio Babbino",
        3: "Luciano Pavarotti - Nessun Dorma"},
    }
]

const habanera = new Audio("quiz-lydfiler/habanera.mp3");
const donizetti = new Audio("quiz-lydfiler/donizetti.mp3");
const luciano = new Audio("quiz-lydfiler/luciano.mp3");
const magicFlute = new Audio("quiz-lydfiler/magic-flute.mp3");
const puccini = new Audio("quiz-lydfiler/puccini.mp3");

let svarknapp = document.getElementById("svarknapp");
let audioBtn = document.getElementById("audio-btn");
let playlist = [habanera, donizetti, luciano, magicFlute, puccini];
var sum = 0;
var endaEnSum = 0;
var dineSvar = [];
var riktigSvar = ["Georges", "Mozart", "Luciano", "Donizetti", "Puccini"]

function playSong(numb) {
    if (playlist[numb].paused){
        playlist[numb].play();
        audioBtn.className = "play";
    } else{
        playlist[numb].pause();
        audioBtn.className = "paused";

    }
}

function getSlide(num) {
    let svarAlternativ = document.getElementById("svarAlternativ");
    for (i = 1; i < 4; i++) {
        var svarAlternativer = document.createElement("p");
        svarAlternativer.innerHTML = "<input type='radio' class= 'radio-input' value=" + svar[num][num][i] + " name = " + "samme" +" id = svarAlt" + i +"> "+ svar[num][num][i] +" <br>";
        svarAlternativ.appendChild(svarAlternativer);
    }
}

document.addEventListener("click", function onClick(e){
    if(e.target == audioBtn){
        audioBtn.addEventListener("click", playSong(sum));   
    }
    if(e.target == svarknapp){
        audioBtn.className = 'paused';
        playlist[sum].pause();
        for(i = 1; i < 4; i++) {
            svarAlt = document.getElementById("svarAlt"+i)
            if(svarAlt.checked){
                dineSvar.push(svarAlt.value);
                playlist[sum].pause();
            sum += 1;
            svarAlternativ.innerHTML = "";
            if(sum<5){
                getSlide(sum);
            }
            else{
            
                for(i=0; i<riktigSvar.length;i++){
                        if(dineSvar[i] == riktigSvar[i]){
                            endaEnSum += 1;
                        }
                    }
                    var svarAlternativer = document.createElement("p");
                    svarAlternativer.innerHTML = "Du fikk" +"  "+ endaEnSum + "/" + riktigSvar.length + "  "+ "riktige svar!";
                    audioBtn.remove();
                    svarknapp.innerHTML = "Prøv igjen!"

                    svarknapp.onclick = () => {
                        window.location.reload()
                    }
                    svarAlternativ.appendChild(svarAlternativer, svarknapp);
                }

            }

        } 
    
        }if(e.target == svarknapp && svarAlt.checked == false){
            alertUser = document.getElementById("alert");
            alertUser.innerHTML = "Du må velge et svar først!"
        }
        else if(svarAlt.checked){
            alertUser.innerHTML = "";
        }

    });
getSlide(0);
