//Global variables//
var time;
var timeCount;
var started = false;
var responded = false;
var currentQuestion= 0;
var userAnswer;
var score = 0;
var correct = 0;
var incorrect = 0;

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
    $("#stopwatch").html("<h2>Time Remaining: " + timeCount + " seconds </h2>")
    responded = true;
    time = setInterval(timer,1000)
};

function timer (){
    if (timeCount >= 1){
    timeCount--
    $("#stopwatch").html("<h2>Time Remaining: " + timeCount + " seconds </h2>")
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
$(".gif").empty()

    $(".question").html("<h3>" + trivias[currentQuestion].question + "</h3>")
   
    for (var i=0; i<4; i++){
        var list = $("<div>")
        list.html("<p>" + trivias[currentQuestion].choices[i] + "</P>")
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
    $(".response").html("<h3>You are correct</h3>")
    $(".gif").html("<img src = 'assets/images/goal.gif'>")
    score++
    correct++
    }else if ((userAnswer !== correctAnswer) && (responded == true) ){
    $(".response").html("<h3> You are Wrong" + "<br>" + "Correct Answer : " + correctAnswerDisplay + "</h3>") 
    $(".gif").html("<img src = 'assets/images/push.gif'>")
    incorrect++
    }else {
    $(".response").html("<h3> You ran out of time" + "<br>" + "Correct Answer : " + correctAnswerDisplay + "</h3>" )
    $(".gif").html("<img src = 'assets/images/miss.gif'>")
    }

	if(currentQuestion == (trivias.length-1)){
		setTimeout(displayScore, 3200)
	} else{
		currentQuestion++;
		setTimeout(postQuestion, 3500);
	}	


   
};

//Display score and button to restart
function displayScore () {
    $(".response").empty()
    $(".question").empty()
    $(".choices").empty()

    $("#stopwatch").empty()
    $(".end").html("<h3> End of trivia. " + "<br>" + "Your score: " + score + "/10" + "<br>" + "Correct: " + correct + "<br>" + "Incorrect: " + incorrect + "<br" + "Restart Trivia?</h3>");
    $(".gif").html("<img src = 'assets/images/goal.gif'>")
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
	correct = 0;
	incorrect = 0;

    $(".response").empty()
    $(".question").empty()
    $(".choices").empty()
    $(".end").empty()

    $(this).hide()
    started = true
    postQuestion()
})



