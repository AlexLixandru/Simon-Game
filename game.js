var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];


//Start game
$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence()
    started=true;
  }

})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  console.log("user " + userClickedPattern);
  console.log("game " + gamePattern);
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(nextSequence(), 1000);
      userClickedPattern=[];
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
};
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
