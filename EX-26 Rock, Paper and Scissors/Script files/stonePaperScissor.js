                        /**                                            
                        *       Name of the challenge  : Stone, Paper and Scissor            *
                        *       Challenge No           : 26                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 20/06/2023      Ticket No:          *
                        *                                                                   **/

                        
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//Variable declaration
const action = ["Images/rock.png", "Images/paper.png", "Images/scissors.png"];
const chances = ["Rock", "Paper", "Scissor"];
const computerPlay = () => parseInt(Math.random() * 3);

let userScore = 0;
let computerScore = 0;
let tied = 0;
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

btnContainer.forEach(item => item.disabled = true);

function play(option){
    let computerOption = computerPlay();
    
    user.setAttribute("src", action[option]);
    computer.setAttribute("src", action[computerOption]);
    --remainingChances;
    if(chances[option] == chances[computerOption]){
        eachStatus.innerHTML = "Tied";
        ++tied;
    }
    else if(chances[option] == chances[0]){
        if(chances[computerOption] == chances[2]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }
    else if(chances[option] == chances[1]){
        if(chances[computerOption] == chances[0]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }
    else if(chances[option] == chances[2]){
        if(chances[computerOption] == chances[1]){
            eachStatus.innerHTML = "WON";
            ++userScore;
        }
        else{
            eachStatus.innerHTML = "LOSE";
            ++computerScore;
        }
    }
    userPoints.innerHTML = userScore;
    computerPoints.innerHTML = computerScore;
}

function start(){
    if(overLayer.classList == "overLayerBackground posAbsolute"){
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
        userPoints.innerHTML = userScore;
        computerPoints.innerHTML = computerScore;
        chanceOutput.innerHTML = remainingChances;
    }
    else{
        overLayer.classList.remove("rotateHide");
        statusResult.classList.remove("noneVisible");
        matchStart.innerHTML = "Play Again";
        won.innerHTML = userScore;
        lose.innerHTML = computerScore;
        tiePoints.innerHTML = tied;
        matchStatus.innerHTML = (userScore > computerScore) ? "You Won" : (userScore == computerScore) ? "Match Tie" : "Computer Won";
        userScore = computerScore = tied = 0;
        remainingChances = 10;
        btnContainer.forEach(item => item.disabled = true);
    }
}