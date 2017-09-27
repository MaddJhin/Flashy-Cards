console.log("Cloze Card Maker Loaded");

function ClozeCard(text, cloze) {
    if(this instanceof ClozeCard){
        this.text = text;
        this.cloze = cloze;
    }
    else
    {
        return new ClozeCard(text, cloze);
    }
}

ClozeCard.prototype.getPartial = function getPartial() {
    var questionParts = this.text.split(this.cloze);
    if(questionParts.length == 1)
    {
        console.log("Error: "+ this.cloze + " does not appear in the text");
    }
    else
    {
        var partial = questionParts[0] + "_____" + questionParts[1];
        return partial;
    }
};

module.exports = ClozeCard;