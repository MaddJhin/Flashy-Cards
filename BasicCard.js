console.log("Basic Card Maker Loaded");

function BasicCard(front, back) {
    if(this instanceof BasicCard){
        this.question = front;
        this.answer = back;    
    }
    else
    {
        return new BasicCard(front, back);
    }
}

BasicCard.prototype.printFront = function printFront() {
    console.log(this.question);
};

module.exports = BasicCard;