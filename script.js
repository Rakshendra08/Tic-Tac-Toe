let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let count = 0;

let currPlayer = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const enableBoxes = function () {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = function () {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const gameDraw = function () {
  msg.innerText = `Draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = function () {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const showWinner = function (winner) {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = function () {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        console.log(`winner is ${pos1Val}`);
        showWinner(pos1Val);
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (count == 9) {
      gameDraw();
    }
    if (currPlayer) {
      box.innerHTML = "O";
      currPlayer = false;
    } else {
      box.innerHTML = "X";
      currPlayer = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
