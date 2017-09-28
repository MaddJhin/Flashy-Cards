const basicCard = require('./BasicCard.js');
const clozeCard = require('./ClozeCard.js');
const asker = require('inquirer');
const fs = require('fs');

var cardBank = [];
var cardIndex = 0;



Start();

//////////////////
//// Start ///////
/////////////////

// Start 
function Start(){
    asker.prompt({
        type: "list",
        name: "modeSelect",
        message: "What would you like to do?",
        choices: [
            "Take Quiz",
            "Make Cards"
        ]
    }).then(function(choice){
        if(choice.modeSelect == "Make Cards"){
            console.log("\n==================\n");
            ChoseCardType();
        }
        else if(choice.modeSelect == "Take Quiz"){
            console.log("\n==============================\n");
            TakeQuiz();
        }
    });
}

// Make cards from external files using BasicCard.js or ClozeCard.js 
function MakeBasicCards(){
    fs.readFile("./data/animal-basic.json", "utf8", function (derp, data) {
        if(derp) throw derp;
        
        // Get Data from JSON File and Make Basic Cards
        var questions = JSON.parse(data).questions;
        for (var i = 0; i < questions.length; i++) {
           var card = new basicCard(questions[i].front, questions[i].back);
           cardBank.push(card);
        }
        console.log("\n==============================\n");        
        AskQuestions(cardBank);
    });
}

function MakeClozeCards(){
    fs.readFile("./data/animal-cloze.json", "utf8", function (derp, data) {
        if(derp) throw derp;
        
        // Get Data from JSON File and Make Basic Cards
        var questions = JSON.parse(data).questions;
        for (var i = 0; i < questions.length; i++) {
           var card = new clozeCard(questions[i].front, questions[i].back);
           var prompt = card.getPartial();
           var newCard = basicCard(prompt, card.cloze);
           cardBank.push(newCard);
        }
        console.log("\n==============================\n");        
        AskQuestions(cardBank);
    });
}

// Taking the Quiz
function AskQuestions(questionsArray) {
    if(cardIndex < questionsArray.length){
        asker.prompt({
            type: "Input",
            message: questionsArray[cardIndex].question,
            name: "answer"
        }).then(function(answer){
            if(answer.answer == questionsArray[cardIndex].answer){
                console.log("\nThat's Correct!\n");
            }
            else
            {
                console.log("\nIncorrect. The correct answer was: "+ questionsArray[cardIndex].answer +"\n");
            }

            cardIndex++;
            AskQuestions(cardBank);
        });        
    }
}

function TakeQuiz(){
    asker.prompt({
        type: "list",
        message: "Take Quiz with Basic Cards or Cloze Cards?",
        name: "cardType",
        choices: ["Basic","Cloze"]
    }).then(function(answer){
        if(answer.cardType == "Basic")
            MakeBasicCards();
        else
            MakeClozeCards();
    });        
}



// For Adding the Ability to Make Question JSON Files
// TO DO: Add file writing ability

function ChoseCardType(){
    asker.prompt({
        type: "list",
        name: "cardChoice",
        message: "Make what kind of cards?",
        choices: [
            "Basic Card",
            "Cloze Card"
        ]
    }).then(function(choice){
        if(choice.cardChoice == "Basic Card"){
            console.log("\n==============================\n");
            MakeBasicCard();
        }
        else if(choice.cardChoice == "Cloze Card"){
            console.log("\n==============================\n");
            MakeClozeCard();
        }
    });
}


function MakeBasicCard(){
    asker.prompt([
        {
            type: "Input",
            name: "question",
            message:"What's the question?"
        },
        {
            type: "Input",
            name: "answer",
            message:"What's the answer?"
        },
        {
            type: "confirm",
            name: "continue",
            message:"Make another card?",
            default: true
        }
    ]).then(function(answers){ 
        var question = { front: answers.question, back: answers.answer};
        cardBank.push(question);
        if(answers.continue){
            console.log("\n==============================\n");            
            MakeBasicCard();
        }
        else{
            console.log("\nQuestions Entered!\n");
            var questionBank = {questions: cardBank};
            PrintQuestions(questionBank);
        }
    });
}

function MakeClozeCard() {
    asker.prompt([
        {
            type: "Input",
            name: "question",
            message:"What's the full text?"
        },
        {
            type: "Input",
            name: "answer",
            message:"What's getting removed?"
        },
        {
            type: "confirm",
            name: "continue",
            message:"Make another card?",
            default: true
        }
    ]).then(function(answers){
        var newCloze = clozeCard(answers.question, answers.answer);
        var prompt = newCloze.getPartial();
        var newCard = basicCard(prompt, newCloze.cloze);
        cardBank.push(newCard);
        if(answers.continue){
            console.log("\n==============================\n");            
            MakeClozeCard();
        }
        else{
            console.log("\nQuestions Entered!\n");
            PrintQuestions(JSON.parse(cardBank));
        }
     });
}

function PrintQuestions(questionBank) {
    fs.writeFile("./data/questions.json", questionBank, (derp) => {
        if(derp) throw derp;

        console.log("Questions Saved", questionBank);
    });
}