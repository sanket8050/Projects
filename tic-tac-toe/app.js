

let boxes = document.querySelectorAll(".box");
let resetbtm = document.querySelector("#rst-btn");
let newgame = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turnO =  true ;//player x. player o
let count = 0;

const winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click" ,() =>{
        console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        let iswiner = checkwinner();
        count++;
        if (count === 9 && !iswiner){
            gamedraw();
        }
    });
});

const gamedraw = () =>{
    msg.innerText = 'game is draw';
    msgcontainer.classList.remove("hide");
    disableboxes();
}
const resetgame = () =>{
    turnO = true;
    count = 0 ;
    enableboxes();
    msgcontainer.classList.add("hide");
};
const enableboxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
} 
const disableboxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
} 

const showwinner = (winner) =>{
    msg.innerText = `Congratulations ,winner is  ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}
const checkwinner = () =>{
    for(let  pattern of winpattern ){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos1 === pos2 && pos2 === pos3){
            console.log("winner", pos1);
            showwinner(pos1);
            return true; // Return true if winner found
        }
    }
    return false; // Return false if no winner
};

newgame.addEventListener("click" , resetgame);
resetbtm.addEventListener("click" ,resetgame);