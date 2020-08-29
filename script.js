var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started= false;
var level=0;
$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(e){
  var userChosenColor =e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var ran = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[ran];
  gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}



function playSound(name){
  var audio=new Audio("sounds/"+ name+ ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
function startover(){
  level=0;
  gamePattern=[];
  started=false;
}
