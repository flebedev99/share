const gameArea = document.getElementById("gamearea");
const ctx = gameArea.getContext("2d");
const dbtn = document.getElementById("nbtn");
const bbtn = document.getElementById("bbtn");
const sbtn = document.getElementById("sbtn");
const lbl = document.getElementById("lbl");
let currentPrice = 140;
let aPrice = Math.abs(currentPrice - gameArea.height);
let timeX = 1;
let yHave = 5;
let yMoney = 500;
let Prices = [currentPrice, currentPrice, currentPrice];
let Times = [timeX, 0, 0];
let min = -20;
let max = 20;
let randomint = 0;
let changeTimeBy = 20;
let moneySpent = 0;
let change = 0;

function updateValues() {
  randomint = getRandomInt(min, max);
  if (Math.random() > 0) {
    Prices[Prices.length] = Prices[Prices.length - 1] + randomint;
  }
  aPrice = Math.abs(currentPrice - gameArea.height);
  if (aPrice <= 0) {
    aPrice = 1;
  }
  currentPrice = Prices[Prices.length - 1];
  Times[Times.length] = Times[Times.length - 1] + changeTimeBy;
  change = Math.pow(
    Prices[Prices.length - 1] + randomint - gameArea.height,
    10000
  );
  console.log(change);
  if (Times[Times.length - 1] > 320) {
    Times[Times.length] = 1;
    Times[Times.length] = 1;
    drawLine();
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, gameArea.width, gameArea.height);
  }
  if (Prices[Prices.length - 1] < 50) {
    Prices[Prices.length - 1] = 50;
  }
  if (Prices[Prices.length - 1] > 150) {
    Prices[Prices.length - 1] = 150;
  }
}
function drawLine() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(Times[Times.length - 2], Prices[Prices.length - 2]);
  ctx.lineTo(Times[Times.length - 1], Prices[Prices.length - 1]);
  ctx.stroke();
}
dbtn.onclick = function nextDay() {
  let i = 0;
  while (i < 1) {
    yMoney -= Math.floor((100 * 5) / yMoney);
    if (yMoney < 0) {
      yMoney = 0;
    }
    drawLine();
    updateValues();
    updateLbl();
    i++;
  }
  dbtn.style.backgroundColor = "#767676";
  setTimeout(anim, 200);
};
function anim() {
  dbtn.style.backgroundColor = "#5f5f5f";
}
function getRandomInt(Max, Min) {
  return Math.floor(Math.random() * (Max - Min + 1) + Min);
}
dbtn.onmouseenter = function () {
  dbtn.style.borderRadius = "20px";
};
dbtn.onmouseleave = function () {
  dbtn.style.borderRadius = "0px";
};
bbtn.onmouseenter = function () {
  bbtn.style.borderStyle = "inset";
};
bbtn.onmouseleave = function () {
  bbtn.style.borderStyle = "outset";
};
sbtn.onmouseenter = function () {
  sbtn.style.borderStyle = "inset";
};
sbtn.onmouseleave = function () {
  sbtn.style.borderStyle = "outset";
};
function updateLbl() {
  lbl.innerHTML =
    "Cost: $" +
    aPrice +
    " &nbsp;Your-shares: " +
    yHave +
    " Your-money: $" +
    yMoney +
    " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Shares-bought-at: $" +
    moneySpent +
    " &nbsp;&nbsp;Change: " +
    change;
}
updateLbl();

bbtn.onclick = function () {
  if (yMoney >= Math.floor(aPrice)) {
    yMoney -= Math.floor(aPrice);
    yHave++;
    recordWhenBought();
    updateLbl();
  }
};
sbtn.onclick = function () {
  if (yHave >= 1) {
    yHave--;
    yMoney += Math.floor(aPrice);
    updateLbl();
  }
};
function recordWhenBought() {
  moneySpent = aPrice;
}
