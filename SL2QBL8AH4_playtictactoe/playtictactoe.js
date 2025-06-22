let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnInfo = document.querySelector("#turn-info");

let turno = true; // true -> O, false -> X
let count = 1;

const winningpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turno = true;
    count = 1;
    enableBoxes();
    msgcontainer.classList.add("hide");
    turnInfo.innerText = "Turn: O";
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "#edf2f4"; // Reset text color
    }
};

const showWinner = (value) => {
    msg.innerText = `🎉 Congratulations! Winner is ${value}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const draw = () => {
    msg.innerText = "🤝 Game is Drawn!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningpatterns) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
            if (posval1 === posval2 && posval2 === posval3) {
                showWinner(posval1);
                return true;
            }
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
            box.style.color = "#da2c38";
            turno = false;
            turnInfo.innerText = "Turn: X";
        } else {
            box.innerText = "X";
            box.style.color = "#06d6a0";
            turno = true;
            turnInfo.innerText = "Turn: O";
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 10 && !isWinner) {
            draw();
        }
    });
});

newbtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);