import * as me from 'https://esm.run/melonjs@13';
import game from './../index.js';

class TreeEntity extends me.Entity {
    constructor(x, y, settings, question){
        super(x, y, settings);
        
        this.question = question

        this.alwaysUpdate = true;

        this.scale(0.5, 0.5)

        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.renderable = game.texture.createAnimationFromName([
            "obstacles/tree"
        ]);

        this.body.setStatic (true);
    }

}

export default TreeEntity;