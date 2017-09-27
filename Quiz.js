var basicCard = require('./BasicCard.js');
var clozeCard = require('./ClozeCard.js');

var asker = require('inquirer');

asker.prompt({
    type: "list",
    name: "cardChoice",
    message: "Make what kind of cards?",
    choices: [
        "Basic Card",
        "Cloze Card"
    ]
}).then(function(choice){
    if(choice.chardChoice == "Basic Card"){
        MakeBasicCard();
    }
    else if(choice.chardChoice == "Cloze Card"){
        MakeClozeCard();
    }
});

function MakeBasicCard(){

}

function MakeClozeCard() {
    
}