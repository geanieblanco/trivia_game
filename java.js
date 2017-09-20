$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".gameSpace").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".gameSpace").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
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
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
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

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who married Lyanna Stark and Rhaegar Targaryen?", "Who was Lyanna Mormont’s mother?", "Which of the following is TRUE?", "How did Mag the Mighty die?", "Who was Cersei Lannister intended to marry?", "Where is Melisandre from?", "Which dragon was called 'The Black Dread'?", "Who took in Daenarys and Viserys after they fled Dragonstone?"];
var answerArray = [["Archmaester Ebrose", "Maester Maynard", "Maester Helliweg", "Maester Lewin"], ["Dania Mormont","Annalys Mormont","Thalina Mormont","Maege Mormont"], ["Bran Stark is a Greenseer but not a warg", "Bran Stark is a warg but not a Greenseer", "Bran Stark is both a warg AND a Greenseer", "Bran Stark is neither a warg or a Greenseer"], ["Shot in the back with a ballista bolt","Shot through the eye by Ramsey Bolton","Left behind at Hardhome","He is still alive"], ["Rhaegar Targaryen","Petyr Baelish","Stannis Baratheon","Oberyn Martell"], ["Volantis", "Braavos", "Naath", "Asshai"], ["Drogon","Balerion","Meraxes","Vhagar"], ["Lord Varys","Pyat Pree", "Illyrio Mopatis", "Xaro Xhoan Daxos"]];
var imageArray = ["<img class='center-block img-right' src='images/question1.jpg'>", "<img class='center-block img-right' src='images/question2.jpg'>", "<img class='center-block img-right' src='images/question3.jpg'>", "<img class='center-block img-right' src='images/question4.jpg'>", "<img class='center-block img-right' src='images/question5.jpg'>", "<img class='center-block img-right' src='images/question6.jpg'>", "<img class='center-block img-right' src='images/question7.jpg'>", "<img class='center-block img-right' src='images/question8.png'>"];
var correctAnswers = ["B. Maester Maynard", "D. Maege Mormont", "C. Bran Stark is both a warg AND a Greenseer", "A. Shot in the back with a ballista bolt", "A. Rhaegar Targaryen", "D. Asshai", "B. Balerion", "C. Illyrio Mopatis"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;