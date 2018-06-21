//Global variables//
var time;
var timeCount;
var started = false;
var responded = false;
var currentQuestion= 0;
var userAnswer;
var score = 0;

// Trivia questions 
var trivias = [ 
    {question: "Who is the youngest player, at 19-years-old, selected for his national squad in the 2018 World Cup?",
    choices: ["Lucas Modric","Daniel Arzani","Neymar","Shinji Kagawa"],
    answer: 2},

    {question: "Which country is the host of the 2022 World Cup?",
    choices: ["Japan","Russia","Qatar","Canada"],
    answer: 2},

    {question: "Which Premier League club has the most players on the English national squad?",
    choices: ["Liverpool","Manchester City","Manchester United","Tottenham Hotspurs"],
    answer: 3},


    {question: "Which player is Argentina's all-time leading goalscorer and five-time winner of FIFA's player of the year?",
    choices: ["Diego Maradona","Lionel Messi","Angel DiMaria","Masherano"],
    answer: 1},

    {question: "Who won the 1998 World Cup?",
    choices: ["Columbia","Brazil","England","France"],
    answer: 3},

    {question: "Who score the winning goal against germany in the 2002 World Cup?",
    choices: ["Zidane","Roberto Carlos","Ronaldo Nazario Delima","Cafu"],
    answer: 2},

    {question: "Who is captain of the French national team?",
    choices: ["Pate Terrine","Paul Paugba","Hugo Lloris","Foie Gras"],
    answer: 2},

    {question: "Which country won the World Cup 5 times?",
    choices: ["Germany","Spain","Brazil","Netherlands"],
    answer: 2},

    {question: "Which of the following Asian teams is the first  to beaten a South American team in the World Cup",
    choices: ["Japan","Iran","South Korea","Tunisia"],
    answer: 0},

    {question: "Which team, currently ranked #3 on FIFA's list, is captained by Eden Hazard? ",
    choices: ["Morroco","Belgium","Denmark","Switzerland"],
    answer: 1},
]

//Stopwatch
function stopWatch(){
    timeCount = 10;
    $("#stopwatch").html("Time Remaining: " + timeCount + " seconds")
    responded = true;
    time = setInterval(timer,1000)
};

function timer (){
    if (timeCount >= 1){
    timeCount--
    $("#stopwatch").html("Time Remaining: " + timeCount + " seconds")
    }
  
    if (timeCount <= 0){
        responded = false;
        clearInterval(time);
        response()
    }
};

//Post questions
function postQuestion(){
$(".response").empty()
$(".question").empty()
$(".choices").empty()

    $(".question").html(trivias[currentQuestion].question)
   
    for (var i=0; i<4; i++){
        var list = $("<div>")
        list.html(trivias[currentQuestion].choices[i])
        list.attr("data-answerindex", i)
        list.addClass("answer")
        $(".choices").append(list)
    }
    stopWatch();

    $(".answer").click(function(){
       userAnswer = $(this).data("answerindex");
        clearInterval(time)
        response();
    })
};

//Evaluate response or non-response
function response () {
    $(".response").empty()
    $(".question").empty()
    $(".choices").empty()
    
var correctAnswer = (trivias[currentQuestion].answer)
var correctAnswerDisplay = trivias[currentQuestion].choices[correctAnswer]


    if ( (userAnswer == correctAnswer) && (responded == true)) {
    $(".response").html("You are correct")
    score++
    }else if ((userAnswer !== correctAnswer) && (responded == true) ){
    $(".response").html("You are Wrong" + "<br>" + "Correct Answer : " + correctAnswerDisplay) 
    }else {
    $(".response").html("You ran out of time")
    }

	if(currentQuestion == (trivias.length-1)){
		setTimeout(displayScore, 1800)
	} else{
		currentQuestion++;
		setTimeout(postQuestion, 1800);
	}	


   
};

//Display score and button to restart
function displayScore () {
    $(".response").empty()
    $(".question").empty()
    $(".choices").empty()

    $("#stopwatch").empty()
    $(".end").html("End of trivia. " + "Your score: " + score + "/10" + "<br>" + "Restart Trivia?");
    $("#start").show()
    
}



//Start and restart button
$("#start").click(function(){
    time;
    timeCount;
    started = false;
    responded = false;
    currentQuestion= 0;
    userAnswer;
    score = 0;

    $(".response").empty()
    $(".question").empty()
    $(".choices").empty()
    $(".end").empty()

    $(this).hide()
    started = true
    postQuestion()
})

