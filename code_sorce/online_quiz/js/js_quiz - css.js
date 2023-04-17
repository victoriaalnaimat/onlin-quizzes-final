// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


// exam_data.js css.html

const currentSession = sessionStorage.getItem("users_log");
const currentSessionObj = JSON.parse(currentSession);

   if (currentSessionObj === null) {
    window.location.href="login.html";

   } 

  
// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
let get_answers = [];

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount); //obj currentIndex

      // Start CountDown
      countdown(60, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(60, qCount);

        // Show Results
        showResults(qCount);

        Printscore(theRightAnswer, qCount);
      };
    }
  };

  myRequest.open("GET", "exam_data - css.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;
  let count=1;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
    theBullet.textContent=count;
    count++;
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;

      console.log(theChoosenAnswer);


      // for (let i = 0; i < answers.length; i++) {
      let answer = { r_ans: rAnswer, u_ans: theChoosenAnswer };
      get_answers.push(answer);
      let store = window.localStorage.setItem("answer", JSON.stringify(get_answers));
      // }


    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }

}

function Printscore(rAnswer, count) {
  let answers = document.getElementsByName("question");

  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;

      // if(currentIndex === count){
      //console.log(theChoosenAnswer);
      // let score = document.querySelector(".score");
      // score.textContent = theChoosenAnswer;
      // }

    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }

}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<h2 class="good">Good</h2> ${rightAnswers} From ${count} <div>  keep going  </div>`;
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "MediumSeaGreen";
      resultsContainer.style.color = "white";
      // resultsContainer.style.opacity = "0.7";
      resultsContainer.style.marginLeft = "25%";
      resultsContainer.style.fontWeight = "600";
      resultsContainer.style.width = "50%";
      resultsContainer.style.textAlign = "center";
      resultsContainer.style.borderRadius = "10px";

      // create a button element
const myButton = document.createElement("button");

// set the button text
myButton.innerText = "Show Answer";
myButton.style.marginLeft="45%";
myButton.style.backgroundColor="#77bfe4"
myButton.style.padding="30px";
myButton.style.border="none";
myButton.style.color="white";
// myButton.style.width="50px";
myButton.style.borderRadius="15px"



// add an event listener to the button
myButton.addEventListener("click", () => {
  console.log("Button clicked!");
  // myButton.style.display="none"
  myButton.style.padding="16px";
  let get_storage = window.localStorage.getItem("answer");
  let obj_answer = JSON.parse(get_storage);

  if (obj_answer && obj_answer.length > 0) {
    for (let i = 0; i < obj_answer.length; i++) {
      let correct_answer = document.querySelector(`.correct_answer_${i + 1}`);
      let u_answer = document.querySelector(`.u_answer_${i + 1}`);
      let Q = document.querySelector(`.Q_${i + 1}`);
      

      Q.textContent = `Q${i + 1}:`;
      Q.style.fontWeight = "bold";
      Q.style.color = "black";
      Q.style.marginTop = "1px solid black";
      Q.style.textAlign="left"
      Q.style.marginTop="30px"
      Q.style.paddingTop="20px"
      Q.style.borderTop="1px solid black"
      Q.style.marginLeft="15px"


      correct_answer.textContent = ` The correct answer is: ${obj_answer[i].r_ans}  `; 
      correct_answer.style.fontSize = "20px";
      correct_answer.style.fontWeight = "bold";
      correct_answer.style.textAlign="lerf"
      correct_answer.style.marginLeft="20px"
      correct_answer.className="the-correct-answer"

      u_answer.textContent = `Your answer is: ${obj_answer[i].u_ans}`;
      u_answer.style.fontSize = "20px";
      // u_answer.style.borderBottom = "1px solid black";
      u_answer.style.textAlign="center"
      u_answer.style.marginLeft="20px"


      u_answer.style.marginTop = "1%";
      correct_answer.style.marginTop = "1%";

      let img = document.getElementById(`u_right_img_${i+1}`);

      if (obj_answer[i].r_ans === obj_answer[i].u_ans) {
        console.log("you got it!");
        
        // Change the image source
        img.src = "img/accept.png";
        // Change the alt text
        img.alt = "you answer is right";
        // Change the image size
        img.width = "20";
        img.height = "20";


      } else {
        img.src = "img/cross.png";

        // Change the alt text
        img.alt = "you answer is wrong";

         img.width = "20";
        img.height = "20";
      }
    }
  } else {
    console.log("Error: Unable to retrieve answer from localStorage");
  }
});

// add the button to the page
document.body.appendChild(myButton);


    } else if (rightAnswers === count) {
      theResults = `<h2 class="perfect">Perfect </h2> ${rightAnswers} From ${count} <div> stay in top </div>`;

      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "MediumSeaGreen";
      resultsContainer.style.color = "white";
      // resultsContainer.style.opacity = "0.7";
      resultsContainer.style.marginLeft = "25%";
      resultsContainer.style.fontWeight = "600";
      resultsContainer.style.width = "50%";
      resultsContainer.style.textAlign = "center";
      resultsContainer.style.ra = "center";
      resultsContainer.style.borderRadius = "10px";

      // create a button element
const myButton = document.createElement("button");

// set the button text
myButton.innerText = "Show Answer";
myButton.style.marginLeft="45%";
myButton.style.backgroundColor="#77bfe4"
myButton.style.padding="30px";
myButton.style.border="none";
myButton.style.color="white";
// myButton.style.width="50px";
myButton.style.borderRadius="15px"



// add an event listener to the button
myButton.addEventListener("click", () => {
  console.log("Button clicked!");
  // myButton.style.display="none"
  myButton.style.padding="16px";
  let get_storage = window.localStorage.getItem("answer");
  let obj_answer = JSON.parse(get_storage);

  if (obj_answer && obj_answer.length > 0) {
    for (let i = 0; i < obj_answer.length; i++) {
      let correct_answer = document.querySelector(`.correct_answer_${i + 1}`);
      let u_answer = document.querySelector(`.u_answer_${i + 1}`);
      let Q = document.querySelector(`.Q_${i + 1}`);
      

      Q.textContent = `Q${i + 1}:`;
      Q.style.fontWeight = "bold";
      Q.style.color = "black";
      Q.style.marginTop = "1px solid black";
      Q.style.textAlign="left"
      Q.style.marginTop="30px"
      Q.style.paddingTop="20px"
      Q.style.borderTop="1px solid black"
      Q.style.marginLeft="15px"


      correct_answer.textContent = ` The correct answer is: ${obj_answer[i].r_ans}  `; 
      correct_answer.style.fontSize = "20px";
      correct_answer.style.fontWeight = "bold";
      correct_answer.style.textAlign="lerf"
      correct_answer.style.marginLeft="20px"
      correct_answer.className="the-correct-answer"

      u_answer.textContent = `Your answer is: ${obj_answer[i].u_ans}`;
      u_answer.style.fontSize = "20px";
      // u_answer.style.borderBottom = "1px solid black";
      u_answer.style.textAlign="center"
      u_answer.style.marginLeft="20px"


      u_answer.style.marginTop = "1%";
      correct_answer.style.marginTop = "1%";

      let img = document.getElementById(`u_right_img_${i+1}`);

      if (obj_answer[i].r_ans === obj_answer[i].u_ans) {
        console.log("you got it!");
        
        // Change the image source
        img.src = "img/accept.png";
        // Change the alt text
        img.alt = "you answer is right";
        // Change the image size
        img.width = "20";
        img.height = "20";


      } else {
        img.src = "img/cross.png";

        // Change the alt text
        img.alt = "you answer is wrong";

         img.width = "20";
        img.height = "20";
      }
    }
  } else {
    console.log("Error: Unable to retrieve answer from localStorage");
  }
});

// add the button to the page
document.body.appendChild(myButton);


    } else {
      theResults = `<h2 class="bad">Bad</h2> ${rightAnswers} From ${count} <h3> never stop trying </h3>`;
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "red";
      resultsContainer.style.color = "black";
      resultsContainer.style.opacity = "0.7";
      resultsContainer.style.marginLeft = "25%";
      resultsContainer.style.fontWeight = "600";
      resultsContainer.style.width = "50%";
      resultsContainer.style.textAlign = "center";
      resultsContainer.style.borderRadius = "10px";

// create a button element
const myButton = document.createElement("button");

// set the button text
myButton.innerText = "Show Answer";
myButton.style.marginLeft="45%";
myButton.style.backgroundColor="#77bfe4"
myButton.style.padding="30px";
myButton.style.border="none";
myButton.style.color="white";
// myButton.style.width="50px";
myButton.style.borderRadius="15px"



// add an event listener to the button
myButton.addEventListener("click", () => {
  console.log("Button clicked!");
  // myButton.style.display="none"
  myButton.style.padding="16px";
  let get_storage = window.localStorage.getItem("answer");
  let obj_answer = JSON.parse(get_storage);

  if (obj_answer && obj_answer.length > 0) {
    for (let i = 0; i < obj_answer.length; i++) {
      let correct_answer = document.querySelector(`.correct_answer_${i + 1}`);
      let u_answer = document.querySelector(`.u_answer_${i + 1}`);
      let Q = document.querySelector(`.Q_${i + 1}`);
      

      Q.textContent = `Q${i + 1}:`;
      Q.style.fontWeight = "bold";
      Q.style.color = "black";
      Q.style.marginTop = "1px solid black";
      Q.style.textAlign="left"
      Q.style.marginTop="30px"
      Q.style.paddingTop="20px"
      Q.style.borderTop="1px solid black"
      Q.style.marginLeft="15px"


      correct_answer.textContent = ` The correct answer is: ${obj_answer[i].r_ans}  `; 
      correct_answer.style.fontSize = "20px";
      correct_answer.style.fontWeight = "bold";
      correct_answer.style.textAlign="lerf"
      correct_answer.style.marginLeft="20px"
      correct_answer.className="the-correct-answer"

      u_answer.textContent = `Your answer is: ${obj_answer[i].u_ans}`;
      u_answer.style.fontSize = "20px";
      // u_answer.style.borderBottom = "1px solid black";
      u_answer.style.textAlign="center"
      u_answer.style.marginLeft="20px"


      u_answer.style.marginTop = "1%";
      correct_answer.style.marginTop = "1%";

      let img = document.getElementById(`u_right_img_${i+1}`);

      if (obj_answer[i].r_ans === obj_answer[i].u_ans) {
        console.log("you got it!");
        
        // Change the image source
        img.src = "img/accept.png";
        // Change the alt text
        img.alt = "you answer is right";
        // Change the image size
        img.width = "20";
        img.height = "20";


      } else {
        img.src = "img/cross.png";

        // Change the alt text
        img.alt = "you answer is wrong";

         img.width = "20";
        img.height = "20";
      }
    }
  } else {
    console.log("Error: Unable to retrieve answer from localStorage");
  }
});

// add the button to the page
document.body.appendChild(myButton);

}

    }

  }



function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}

log_text.addEventListener("click", function () {
  window.sessionStorage.clear();
  window.open("index.html");
  if_dont_log.textContent = "plz log in to get the Quizez";

});