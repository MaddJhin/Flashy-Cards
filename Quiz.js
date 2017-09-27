var basicCard = require('./BasicCard.js');
var clozeCard = require('./ClozeCard.js');
var asker = require('inquirer');

var cardBank = [];
var cardIndex = 0;

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
        var newCard = basicCard(answers.question, answers.answer);
        cardBank.push(newCard);
        if(answers.continue){
            console.log("\n==============================\n");            
            MakeBasicCard();
        }
        else{
            console.log("\nAnswer the Following Questions\n");
            AskQuestions(cardBank);            
        }
    });
}

function MakeClozeCard() {
    asker.prompt().then(function(){ });
}

function AskQuestions(questionsArray) {
    if(cardIndex < questionsArray.length){
        asker.prompt({
            type: "Input",
            message: questionsArray[cardIndex].question,
            name: "answer"
        }).then(function(answer){
            if(answer.answer == questionsArray[cardIndex].answer){
                console.log("That's Correct!");
            }
            else
            {
                console.log("Incorrect. The correct answer was: "+ questionsArray[cardIndex].answer);
            }

            cardIndex++;
            AskQuestions(cardBank);
        });        
    }
}