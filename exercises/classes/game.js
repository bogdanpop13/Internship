class TheGame {
  constructor() {
    this.player = document.getElementById("player");
    this.score = document.getElementById("score");
    this.currentColor = document.getElementById("current-color");
    this.spawnBtn = document.getElementById("point-btn");
    this.restartBtn = document.getElementById("restart-btn");
    this.points = document.getElementById("points");
  }

  currentScore = 0;

  startGame() {
    document.addEventListener("keydown", this.movePlayer);
    document.addEventListener("keydown", this.collision);
    this.spawnBtn.addEventListener("click", this.spawnPoint);
    this.restartBtn.addEventListener("click", this.restartGame);
    document.addEventListener("keydown", this.finishGame);
  }

  movePlayer = (e) => {
    let { top, left } = this.player.style;
    if (!top) {
      top = 0;
    }
    if (!left) {
      left = 0;
    }
    if (e.key === "ArrowDown") {
      this.player.style.top = `${parseInt(top) + 5}px`;
      if (this.player.style.top === "385px") {
        this.player.style.backgroundColor = this.changeColor();
        this.player.style.top = 0;
      }
    }
    if (e.key === "ArrowUp") {
      this.player.style.top = `${parseInt(top) - 5}px`;
      if (this.player.style.top === "-5px") {
        this.player.style.backgroundColor = this.changeColor();
        this.player.style.top = "380px";
      }
    }
    if (e.key === "ArrowRight") {
      this.player.style.left = `${parseInt(left) + 5}px`;
      if (this.player.style.left === "585px") {
        this.player.style.backgroundColor = this.changeColor();
        this.player.style.left = 0;
      }
    }
    if (e.key === "ArrowLeft") {
      this.player.style.left = `${parseInt(left) - 5}px`;
      if (this.player.style.left === "-5px") {
        this.player.style.backgroundColor = this.changeColor();
        this.player.style.left = "580px";
      }
    }
  };

  collision = (e) => {
    let { top, left, height, width } = this.player.style;
    top = parseInt(top);
    left = parseInt(left);
    height = parseInt(height);
    width = parseInt(width);
    if (!height && !width) {
      height = 20;
      width = 20;
    }
    for (const point of this.points.children) {
      const pointTop = parseInt(point.style.top);
      const pointLeft = parseInt(point.style.left);
      if (
        top >= pointTop - 10 &&
        top <= pointTop + 10 &&
        left >= pointLeft - 10 &&
        left <= pointLeft + 10
      ) {
        console.log(this.points.children);
        this.points.removeChild(point);
        this.currentScore += 1;
        this.score.innerHTML = this.currentScore;
        this.player.style.height = `${height + 5}px`;
        this.player.style.width = `${width + 5}px`;
        console.log(this.player.style);
      }
    }
  };

  finishGame = (e) => {
    const { height, width } = this.player.style;
    if (height === "100px" && width === "100px") {
      alert("You won. Click restart to play again!");
    }
  };

  changeColor() {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    this.currentColor.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
    return `rgb(${red}, ${blue}, ${green})`;
  }

  spawnPoint = (e) => {
    let newTop = `${Math.floor(Math.random() * 380)}px`;
    let newLeft = `${Math.floor(Math.random() * 580)}px`;
    let point = document.createElement("div");
    point.classList.add("point");
    point.style.top = newTop;
    point.style.left = newLeft;
    this.points.appendChild(point);
  };

  restartGame = (e) => {
    this.player.style.top = 0;
    this.player.style.left = 0;
    this.player.style.height = "20px";
    this.player.style.width = "20px";
    this.currentScore = 0;
    this.score.innerHTML = 0;
    while (this.points.firstChild) {
      this.points.removeChild(this.points.firstChild);
    }
  };
}

const game = new TheGame();
game.startGame();
