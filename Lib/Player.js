const Potion = require('../Lib/Potion');
const Character = require('./Character');


// jest.mock('../Lib/Potion');
// console.log(new Potion());

class Player extends Character  {
    constructor(name = '') {
        //call parent constructor here:
        super();
        this.inventory = [new Potion('health'), new Potion ()];
 
}
//inherit prototype methods from Character here:
// Player.prototype = Object.create(Character.prototype);


//returns an object with the various player properties
getStats() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
        };
}

    //returns the inventory array or false if empty
getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

addPotion(potion) {
        this.inventory.push(potion);
    }

usePotion(index) {
        const potion = this.inventory.splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strengh':
                this.strength += potion.value;
                break;
        }
    }
}
module.exports = Player;