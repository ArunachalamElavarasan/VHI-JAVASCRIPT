                        /**                                            
                        *       Name of the challenge  : Stop Watch                          *
                        *       Challenge No           : 25                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 19/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

const beginValue = 0;
const maxHour = 1;
const maxMinute = 60;
const maxMillie = 100;
let millie = 0;
let seconds = 0;
let secValue = 0;
let minutes = 0;
let hour = 0;
let id;


//Input details from DOM assigned to variables
const outputMilliSeconds = document.getElementById('millieSeconds');
const outputSeconds = document.getElementById('seconds');
const secTotal = document.getElementById('secTotal');
const outputMinutes = document.getElementById('minutes');
const hours = document.getElementById('hours');
const resetAction = document.getElementById('resetIcon');
const playPause = document.getElementById('playIcon');

hours.innerHTML = hour;
outputMinutes.innerHTML = minutes;
outputSeconds.innerHTML = seconds;
outputMilliSeconds.innerHTML = millie;

function action(){
    if(playPause.classList == "fa-solid fa-play"){
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        
        id = setInterval(() => {
            ++millie;
            if(millie > 99){
                millie = 0;
                ++seconds;
                if(seconds > 59){
                    seconds = seconds;
                    ++minutes;
                    if(minutes > 59){
                        minutes = 0;
                        ++hour;
                        if(hour > 23){
                            hour = 0;
                        }
                        hour = (hour < 10) ? `${beginValue}${hour}` : hour;
                        hours.innerHTML = hour;
                    }
                    minutes = (minutes < 10) ? `${beginValue}${minutes}` : minutes;
                    outputMinutes.innerHTML = minutes;
                }
                ++secValue;
                secTotal.innerHTML = secValue;
                seconds = (seconds < 10) ? `${beginValue}${seconds}` : seconds;
                outputSeconds.innerHTML = seconds;
            }
            millie = (millie < 10) ? `${beginValue}${millie}` : millie;
            outputMilliSeconds.innerHTML = millie;
        }, 10);
    }
    else{
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        clearInterval(id);
    }
}

function reset(){
   resetAction.classList.toggle("rotate");
   millie = seconds = secValue = minutes = hour = 0;
   hours.innerHTML = hour;
   outputMinutes.innerHTML = minutes;
   outputSeconds.innerHTML = seconds;
   outputMilliSeconds.innerHTML = millie;
   secTotal.innerHTML = secValue;
}