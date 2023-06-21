                        /**                                            
                        *       Name of the challenge  : Stone, Paper and Scissor            *
                        *       Challenge No           : 26                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 20/06/2023      Ticket No:          *
                        *                                                                   **/
//Date and Time Declaration                    
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//Variable declaration
const action = ["Images/rock.png", "Images/paper.png", "Images/scissors.png"];
const chances = ["Rock", "Paper", "Scissor"];
const beginValue = 0;
let userScore = beginValue;
let computerScore = beginValue;
let tied = beginValue;
let remainingChances = 10;

//Input details from DOM assigned to variables
const computer = document.getElementById('computer');
const user = document.getElementById('user');
const overLayer = document.getElementById('overLayer');
const intro = document.getElementById('intro');
const statusResult = document.getElementById('statusResult');
const matchStatus = document.getElementById('matchStatus');
const matchStart = document.getElementById("matchStart");
const userPoints = document.getElementById('playerPoints');
const computerPoints = document.getElementById('computerPoints');
const won = document.getElementById('won');
const lose = document.getElementById('Lose');
const tiePoints = document.getElementById('tied');
const chanceOutput = document.getElementById('chance');
const eachStatus = document.getElementById('eachStatus');
const btnContainer = document.querySelectorAll('.btn');

const computerPlay = () => parseInt(Math.random() * 3);                     //this function is used to generate computer choice
btnContainer.forEach(item => item.disabled = true);                        //this is used to disable all buttons before match start

//this function execute when user clicks buttons
function play(option){
    const computerOption = computerPlay();
    
    user.setAttribute("src", action[option]);
    computer.setAttribute("src", action[computerOption]);
    --remainingChances

    if(chances[option] == chances[computerOption]){                     //this block will execute when both player option become true
        eachStatus.innerHTML = "Tied";
        ++tied;
    }
    else if(chances[option] == chances[0]){                             //this block will execute when user select rock
        if(chances[computerOption] == chances[2]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }
    else if(chances[option] == chances[1]){                            //this block will execute when user selects paper
        if(chances[computerOption] == chances[0]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }
    else if(chances[option] == chances[2]){                           //this block will execute when user clicks scissor
        if(chances[computerOption] == chances[1]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }

    if(remainingChances == beginValue){                             //this block will execute when user played given chances
        start();
    }

    userPoints.innerHTML = userScore;
    computerPoints.innerHTML = computerScore;
    chanceOutput.innerHTML = remainingChances;
}
//this function is used to remove over layered content and reset all values to begining
function start(){
    if(overLayer.classList == "overLayerBackground posAbsolute"){   //this block will execute and allows user to play game
        overLayer.classList.add("rotateHide");
        intro.classList.add("noneVisible");
        let index = 3
        let countDown;
        countDown = setInterval(() => {
            if(index == 0){
                clearInterval(countDown);
                eachStatus.innerHTML = "Start";
                btnContainer.forEach(item => item.disabled = false);
            }
            else{
            eachStatus.innerHTML = index;
            }
            --index;
        }, 1000);
        computer.setAttribute("src", "");
        user.setAttribute("src", "");
        remainingChances = 10;
        userPoints.innerHTML = userScore;
        computerPoints.innerHTML = computerScore;
        chanceOutput.innerHTML = remainingChances;
    }
    else{                                                        //this block will execute when user played given chances successfully and show the result to user
        overLayer.classList.remove("rotateHide");
        statusResult.classList.remove("noneVisible");
        matchStart.innerHTML = "Play Again";
        won.innerHTML = userScore;
        lose.innerHTML = computerScore;
        tiePoints.innerHTML = tied;
        matchStatus.innerHTML = (userScore > computerScore) ? "You Won" : (userScore == computerScore) ? "Match Tied" : "Computer Won";
        userScore = computerScore = tied = beginValue;
        btnContainer.forEach(item => item.disabled = true);
    }
}