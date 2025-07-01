let userscore = 0;

let compscore = 0;

let choises = document.querySelectorAll(".choise");
const msg1 = document.querySelector("#msg1");
const us = document.querySelector("#user-score");
const cs = document.querySelector("#comp-score");
const resetbtm = document.querySelector("#rst")

const getcomchoise= () =>{
    const options = ["rock", "paper", "scissor"];
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
}

const rst = () =>{
    userscore = 0;
    compscore = 0;
    us.innerHTML = userscore;
    cs.innerHTML = compscore;
    msg1.innerHTML = "Play your move";
    msg1.style.backgroundColor = "#ffff"; // reset to default

}

const  drawgame=() =>{
    console.log("DRAW");
    msg1.innerHTML = "Game Draw!!!!!!!";
    msg1.style.backgroundColor = "#2196F3"; // blue for draw
}
const showwinner = (userwin) =>{
    if(userwin){
    console.log("use win!!!!!!!!");
    msg1.innerHTML = "user win";
    msg1.style.backgroundColor = "#4CAF50"; // green for win
    }
    else {
        console.log("comp win");
        msg1.innerHTML = "comp win";
        msg1.style.backgroundColor = "#f44336"; // red for defeat
    }
}

const playagame = (userchoise) =>{
    console.log("user choise", userchoise);
    const compchoise = getcomchoise();
    console.log("comp " , compchoise)
    if(userchoise === compchoise){
        drawgame();
    }
    else{
        let userwin = true;
        if(userchoise === "rock"){
            //compchoise == paper or scissor
            userwin = compchoise === "paper" ? false : true;
        }
        else if(userchoise === "paper"){
            userwin = compchoise === "scissor" ?false : true;
        }
        else {
            userwin = compchoise === "rock" ? false : true ;
        }
        showwinner(userwin);

        if (userwin ){
            userscore++;
            us.innerHTML = userscore;
        }
        else {
            compscore++;
            cs.innerHTML = compscore;
        }
    }

    
}

choises.forEach((choise) => {
    console.log(choise);
    choise.addEventListener("click" , () =>{
         
    const userchoise = choise.getAttribute("id");
    playagame(userchoise);

    

    })
    
});
resetbtm.addEventListener("click" ,rst);

