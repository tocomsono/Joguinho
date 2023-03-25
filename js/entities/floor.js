import * as me from 'https://esm.run/melonjs@13';
import game from './../index.js';

class FloorEntity extends me.Entity {
    constructor(x, y, settings){
        super(x, y, settings);
        
        this.body.collisionType = me.collision.types.WORLD_SHAPE;
        this.renderable = game.texture.createAnimationFromName([
            "bg/path"
        ]);

        this.anchorPoint.set(0.5, 0.3);

        this.body.setStatic (true);
    }

}

export default FloorEntity;