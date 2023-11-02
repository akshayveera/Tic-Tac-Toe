

const msg = document.querySelector(".msg");
const cells = Array.from(document.querySelectorAll(".cell"));
const reset = document.querySelector(".reset");
const boxes = Array(9).fill(null);
let won = false;
let count = 0;

let currentPlayer = "X";

const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function startGame(){
    
    msg.innerHTML = "Its "+currentPlayer+"'s turn";

    cells.map((cell)=>{cell.addEventListener("click", handleClick)});
}

function handleClick(e){
    const id = e.target.id;

    if((boxes[id] === null) && (!won)){
        e.target.innerHTML = currentPlayer;
        boxes[id] = currentPlayer;
        count += 1;

        if(playerHasWon() !== false){
            
            const blocks = playerHasWon();
            blocks.map((block)=>{
                document.getElementById(block).classList.add("highlight");
            })
            
            reset.innerHTML = "Start New Game";

            msg.innerHTML = "Player "+currentPlayer+" has won";

            won = true;
        }
        else if(count === 9)
        {
            cells.map((cell) => {
                cell.classList.add("highlight");
            })

            msg.innerHTML = "Oops! It's a tie"

            reset.innerHTML = "Start New Game";
        }
        else{

            currentPlayer = currentPlayer == "X" ? "O" : "X";
            msg.innerHTML = "Its "+currentPlayer+"'s turn";
        }

    }  

    
}

startGame();

reset.addEventListener("click", resetBoxes);

function resetBoxes(){

    cells.map((cell)=>{
        cell.innerHTML = "";
        cell.classList.remove("highlight");
    });

    boxes.fill(null);

    currentPlayer = "X";
    msg.innerHTML = "Its "+currentPlayer+"'s turn";

    reset.innerHTML = "ReStart";    

    won = false;

    count = 0;
}

function playerHasWon(){


    for(const win of winningCondition)
    {
        let [a,b,c] = win;

        if(boxes[a] && ((boxes[a] == boxes[b]) && (boxes[a] == boxes[c])))
        {
            return [a, b, c];
        }
    }

    return false;    
}





