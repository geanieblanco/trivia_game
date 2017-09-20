var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who married Lyanna Stark and Rhaegar Targaryen?", "Who was Lyanna Mormont’s mother?", "Which of the following is TRUE?", "How did Mag the Mighty die?", "Who was Cersei Lannister intended to marry?", "Where is Melisandre from?", "Which dragon was called 'The Black Dread'?", "Who took in Daenarys and Viserys after they fled Dragonstone?"];
var answerArray = [["Archmaester Ebrose", "Maester Maynard", "Maester Helliweg", "Maester Lewin"], ["Dania Mormont","Annalys Mormont","Thalina Mormont","Maege Mormont"], ["Bran Stark is a Greenseer but not a warg", "Bran Stark is a warg but not a Greenseer", "Bran Stark is both a warg AND a Greenseer", "Bran Stark is neither a warg or a Greenseer"], ["Shot in the back with a ballista bolt","Shot through the eye by Ramsey Bolton","Left behind at Hardhome","He is still alive"], ["Rhaegar Targaryen","Petyr Baelish","Stannis Baratheon","Oberyn Martell"], ["Volantis", "Braavos", "Naath", "Asshai"], ["Drogon","Balerion","Meraxes","Vhagar"], ["Lord Varys","Pyat Pree", "Illyrio Mopatis", "Xaro Xhoan Daxos"]];
var imageArray = ["<img class='center-block img-right answerimgs' src='images/question1.jpg'>", "<img class='center-block img-right' src='images/question2.jpg'>", "<img class='center-block img-right' src='images/question3.jpg'>", "<img class='center-block img-right' src='images/question4.jpg'>", "<img class='center-block img-right' src='images/question5.jpg'>", "<img class='center-block img-right' src='images/question6.jpg'>", "<img class='center-block img-right' src='images/question7.jpg'>", "<img class='center-block img-right' src='images/question8.png'>"];
var correctAnswers = ["B. Maester Maynard", "D. Maege Mormont", "C. Bran Stark is both a warg AND a Greenseer", "A. Shot in the back with a ballista bolt", "A. Rhaegar Targaryen", "D. Asshai", "B. Balerion", "C. Illyrio Mopatis"];
var questionCounter = 0;
var selecterAnswer;
var questionTimer;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

$(document).ready(function() {

function loadScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block startbutton' href='#' role='button'>Start Quiz</a></p>";
	$(".gameSpace").html(startScreen);
}

loadScreen();

$("body").on("click", ".startbutton", function(event){
	event.preventDefault();
	generateHTML();
	timerWrapper();

});

$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(questionTimer);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(questionTimer);
		generateLoss();
	}
});

$("body").on("click", ".resetbutton", function(event){
	clickSound.play();
	resetGame();
});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Winter has come!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Thank the gods! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Seven hells! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".gameSpace").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	questionTimer = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(questionTimer);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>And now your watch has ended" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

