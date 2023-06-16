                        /**                                            
                        *       Name of the challenge  : FLAMES                              *
                        *       Challenge No           : 24                                  *
                        *       Developed for          : VHITECH Training Program            *
                        *       Maintenance History                                          *
                        *       Developer              : Arunachalam                         *
                        *       Creation date          : 16/06/2023      Ticket No:          *
                        *                                                                   **/

//Date and Time
const dateAndTime = new Date();
document.getElementById('date').innerHTML = dateAndTime.toLocaleDateString();
document.getElementById('time').innerHTML = dateAndTime.toLocaleTimeString();

//Input details from DOM assigned to variables
const boyNameInput = document.getElementById('boyName');
const girlNameInput = document.getElementById('girlName');
const flamesResult = document.getElementById('resultField');

//Error Declaration
const NO_VAL_ERR = "Please fill both person name to check FLAMES";
const SAME_VAL_ERR = "Please try different name to check FLAMES";

//This function is used to show result to user
function checkFlames(){
    let boyName = (boyNameInput.value).replaceAll(" ", "").toLowerCase();
    let girlName = (girlNameInput.value).replaceAll(" ", "").toLowerCase();
    let flames = ["F", "L", "A", "M", "E", "S"];
    let flamesLen = flames.length;

    if(boyName && girlName){                                        //this block is used show a result to user when given condition become true
        boyName = boyName.split("");
        girlName = girlName.split("");
        let boyLen = boyName.length;
        let girlLen = girlName.length;
        for (let index = 0; index < boyLen; index++) {              //this loop is used to remove a same elemnent from both array
            for(let item = 0; item < girlLen; item++){
                if(boyName[index] === girlName[item]){
                    boyName.splice(index, 1);
                    girlName.splice(item, 1);
                    index -= 1;
                    break;
                }
            }
            boyLen = boyName.length;
            girlLen = girlName.length;
        }    
        const nameCount = (boyName.concat(girlName)).length;
        let count = nameCount;

        if(nameCount > 0){                                                                     
            while(flamesLen > 1){                                               //this while loop execute till array length become one
                if(count > flamesLen){
                    count = count % flamesLen;
                }
                if(count == 0){                                                 
                    flames.splice(flamesLen-1, 1);
                }
                else{
                    flames.splice(count-1, 1);
                }
                if(count > 0){
                    let pos = flames.splice(count - 1, (flamesLen - count));
        
                    for(let key = pos.length - 1; key >= 0; key--){
                        flames.unshift(pos[key]);
                    }
                }
                flamesLen = flames.length;
                count = nameCount;
            }
            switch(flames[0]){                                                  //this switch case is used to show a result user based on array element
                case "F":
                    flamesResult.value = "Friendship";
                    break;
                case "L":
                    flamesResult.value = "Love";
                    break;
                case "A":
                    flamesResult.value = "Affection";
                    break;
                case "M":
                    flamesResult.value = "Marriage";
                    break;
                case "E":
                    flamesResult.value = "Enmity";
                    break;
                case "S":
                    flamesResult.value = "Siblings";
                    break;
            }
        }
        else{
            alert(SAME_VAL_ERR);
            reset();
        }
    }
    else{
        alert(NO_VAL_ERR);
    }
}

//This function is used to 
function preventNumber(key){
    const keyValue = key.which;
    if(keyValue > 42 && keyValue < 65 || keyValue > 91 && keyValue < 96 || keyValue > 122 && keyValue < 126){key.preventDefault();}
}
//This function is used to reset all input fields
function reset(){
    boyName.value = girlName.value = flamesResult.value = "";
}