import * as me from 'https://esm.run/melonjs@13';
import game from './../index.js';

class MyContainer extends me.Container{
    constructor(){
        super();
        this.alwaysUpdate = true;
        
    }

    update(dt){
        if(game.data.containerMove !== 0){
            this.pos.x += game.data.containerMove;
            game.data.containerMove = 0
        }
        return super.update(dt)
    }
};

export default MyContainer;