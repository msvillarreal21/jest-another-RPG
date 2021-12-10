const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    inquirer
    .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?',
    })
    // destructure name from teh prompt object
    .then(({ name }) => {
        this.player = new Player(name);

        this.startNewBattle();

        //test the object creation
        console.log(this.startNewBattle());
    });

};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    console.log('Your stats are as follows');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
};

//If player turn: 
//prompt user to attack or use a Potion
//If using potion: display list of potion objects to user
//Apply selected potion effect to player.
//If attacking: subtrack health from the enemy based on player attack value
//If enemy turn: subtract health from the player based on enemy attack value

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        //player propmts will go here
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then (({ action }) => {
                if (action === 'Use potion') {
                    //follow-up prompt will go here 
                    if (!this.player.getInventory()) {
                        console.log('You dont have any potions!');
                        return;
                    }
                    inquirer
                    .prompt({
                        type:'list',
                        message: 'Which potion would you like to use?',
                        name: 'action',
                        choices: this.player.getInventory().map((item, index) =>  `${index + 1}: ${item.name}`)
                    });
                
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log('You attacked the ${this.currentEnemy.name}');
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log('You were attacked by ${this.currentEnemy.name}');
        console.log(this.player.getHealth());
    }
};
module.exports = Game;