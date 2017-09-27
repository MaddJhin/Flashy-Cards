console.log("Basic Card Maker Loaded");

function BasicCard(front, back) {
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;    
    }
    else
    {
        return new BasicCard(front, back);
    }
}

BasicCard.prototype.printFront = function printFront() {
    console.log(this.front);
};

module.exports = BasicCard;