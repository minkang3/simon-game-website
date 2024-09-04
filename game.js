var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameOver = false;

$(document).keydown(function(event) {
  console.log(event);
  if (level === 0) {
    isGameOver = false;
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColor = this.id;

  playSound(userChosenColor);
  animatePressed(this);

  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  if (isGameOver) return;
  userClickedPattern.length = 0;

  $("h1").text("Level " + ++level);

  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(index) {
  if (userClickedPattern.length > gamePattern.length || 
        userClickedPattern[index] !== gamePattern[index]) {
    isGameOver = true;
    gameOver();
  } else if (userClickedPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  level = 0;
  gamePattern.length        = 0;
  userClickedPattern.length = 0;

  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  new Audio("./sounds/wrong.mp3").play();
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function playSound(color) {
  var sound = new Audio("./sounds/" + color + ".mp3");
  sound.play();
}

function animatePressed(div) {
  div.classList.add("pressed");
  setTimeout(function() {
    div.classList.remove("pressed");
  }, 100);
}
