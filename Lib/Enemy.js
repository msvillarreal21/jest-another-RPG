const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {
        //call parent constructor here:
        super(name);
        
   
    this.weapon = weapon;
    this.potion = new Potion;
    // Enemy.prototype = Object.create(Character.prototype);
}


getDescription() {
    return `A ${this.name} holding a ${this.weapon} has appeard!`;
};
}
module.exports = Enemy;