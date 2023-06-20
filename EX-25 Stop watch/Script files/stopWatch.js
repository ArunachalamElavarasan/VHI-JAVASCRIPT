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

//Variable declaration
const beginValue = 0;
const maxHour = 23;
const maxMinute = 59;
const maxMillie = 99;
let millie, secValue, secOutput, minuteValue, hourValue, clockValue;
millie = secValue = secOutput = minuteValue = hourValue = beginValue;


//Input details from DOM assigned to variables
const outputMilliSeconds = document.getElementById('millieSeconds');
const outputSeconds = document.getElementById('seconds');
const secTotal = document.getElementById('secTotal');
const outputMinutes = document.getElementById('minutes');
const hours = document.getElementById('hours');
const resetAction = document.getElementById('resetIcon');
const playPause = document.getElementById('playIcon');

//this function is used to add zero before number whem number is less than 10
const numPattern = item => (item < 10) ? `${beginValue}${item}` : item;

hours.innerHTML = outputMinutes.innerHTML = outputSeconds.innerHTML = outputMilliSeconds.innerHTML = secTotal.innerHTML = "00";
//this function is used to start and stop watch
function action(){
    if(playPause.classList == "fa-solid fa-play"){          //this block will start time watch when given conditions become true
        playPause.classList.remove("fa-play");
        playPause.classList.add("fa-pause");
        
        clockValue = setInterval(() => {                    //this block will execute every single millie second
            ++millie;
            if(millie > maxMillie){                         //this block will execute when millie seconds goes upto 99
                millie = beginValue;
                ++secValue;
                ++secOutput;
                if(secValue > maxMinute){                   //this block will execute when seconds goes upto 59 and reset it to zero
                    secValue = beginValue;
                    ++minuteValue;
                    if(minuteValue > maxMinute){            //this block will execute when minutes goes upto 59 and reset it to zero
                        minuteValue = beginValue;
                        ++hourValue;
                        if(hourValue > maxHour){            //this block will execute when hour value goes upto 23 and reset it to zero
                            hourValue = beginValue;
                        }
                        hours.innerHTML = numPattern(hourValue);
                    }
                    outputMinutes.innerHTML = numPattern(minuteValue);
                }
                secTotal.innerHTML = numPattern(secOutput);
                outputSeconds.innerHTML = numPattern(secValue);
            }
            outputMilliSeconds.innerHTML = numPattern(millie);
        }, 10);
    }
    else{                                                                  //this block will pause timer when timer is running
        playPause.classList.remove("fa-pause");
        playPause.classList.add("fa-play");
        clearInterval(clockValue);
    }
}
//this function is used to reset stop watch
function reset(){
   resetAction.classList.toggle("rotate");
   millie = secValue = secOutput = minuteValue = hourValue = beginValue;
   hours.innerHTML = outputMinutes.innerHTML = outputSeconds.innerHTML = outputMilliSeconds.innerHTML = secTotal.innerHTML = "00";
}