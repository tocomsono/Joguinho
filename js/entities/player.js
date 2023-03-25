import * as me from 'https://esm.run/melonjs@13';
import game from './../index.js';

class PlayerEntity extends me.Entity {
    constructor(x, y, settings, HUD, container) {
        // call the constructor (x e y precisam ser numeros e settings precisa ser um objeto)
        super(x, y, settings);

        this.container = container

        this.HUD = HUD;
        
        this.questions = ["Long tone on B note", "Long tone on A note", "Long tone on G note", "Bem-te-vi with B and A", "Bem-te-vi with A and G", "Hot Cross Buns starting on B", "Long tone on F note", "“Hot Cross Buns” starting on A", "Long tone on E note", "Long tone on B flat", "Long tone on middle C note", "Descending scale from middle C to low E", "Mary Had a Little Lamb", "Fireflies", "Cuckoo", "Ascending F Major scale (from F to C)", "Ascending F Major Arpeggio","Lightly Row", "Long tones - take a big breath", "Short tones in sequence", "Long tones on closed headjoint", "Short tones on closed headjoint", "Finger slide tone"]

        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.scale(0.5, 0.5);

        // player can exit the viewport (jumping, falling into a hole, etc.)
        this.alwaysUpdate = true;

        // walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        this.dying = false;

        this.multipleJump = 1;

        // set the viewport to follow this renderable on both axis, and enable damping
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.S,     "down");

        //me.input.registerPointerEvent("pointerdown", this, this.onCollision.bind(this));
        //me.input.bindPointer(me.input.pointer.RIGHT, me.input.KEY.LEFT);

       //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.UP);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_2}, me.input.KEY.UP);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.DOWN}, me.input.KEY.DOWN);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_3}, me.input.KEY.DOWN);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.DOWN);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.LEFT}, me.input.KEY.LEFT);
        //me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.RIGHT}, me.input.KEY.RIGHT);

        // map axes
        //me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: -0.5}, me.input.KEY.LEFT);
        //me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: 0.5}, me.input.KEY.RIGHT);
        //me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LY, threshold: -0.5}, me.input.KEY.UP);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "player/personagemstill", "player/personagemrun1", "player/personagemrunelbow"
        ]);

        // define a basic walking animatin
        this.renderable.addAnimation ("walk",  [{ name: "player/personagemstill", delay: 100 }, { name: "player/personagemrun1", delay: 100 }, { name: "player/personagemrunelbow", delay: 100 }]);
        // set as default
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    }

    /**
     ** update the force applied
     */
    update(dt) {

        var moved = false

        if (me.input.isKeyPressed("left"))    {
            this.renderable.flipX(true);
            if (this.pos.x<100){
                game.data.containerMove = 3;
                moved = true
            }
            else {
                this.body.force.x = -this.body.maxVel.x;
            }
        } else if (me.input.isKeyPressed("right")) {
            this.renderable.flipX(false);
            if (this.pos.x>1000){
                game.data.containerMove = -3;
                moved = true
            }
            else {
                this.body.force.x = this.body.maxVel.x;
            }
        }

        if (me.input.isKeyPressed("jump")) {
            this.body.jumping = true;
            if (this.multipleJump <= 2) {
                // easy "math" for double jump
                this.body.force.y = -this.body.maxVel.y * this.multipleJump++;
                //me.audio.stop("jump");
                //me.audio.play("jump", false);
            }
        } else {
            if (!this.body.falling && !this.body.jumping) {
                // reset the multipleJump flag if on the ground
                this.multipleJump = 1;
            }
            else if (this.body.falling && this.multipleJump < 2) {
                // reset the multipleJump flag if falling
                this.multipleJump = 2;
            }
        }

        // check if we fell into a hole
       // if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())) {
            // if yes reset the game
         //   me.game.world.removeChild(this);
           // me.game.viewport.fadeIn("#fff", 150, function(){
             //   me.level.reload();
               // me.game.viewport.fadeOut("#fff", 150);
            //});
            //return true;
        //}

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering() || moved)
        ) {
            super.update(dt);
            return true;
        }
        return false;
    }


    /**
     * colision handler
     */
    onCollision(response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
            
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                

                // Custom collision response for slopes
                //else if (other.type === "slope") {
                    // Always adjust the collision response upward
                //    response.overlapV.y = Math.abs(response.overlap);
                    //response.overlapV.x = 0;

                    // Respond to the slope (it is solid)
                  //  return true;
                //}
                break;

            case me.collision.types.ENEMY_OBJECT:
            
            this.HUD.balloon.setOpacity(1);
            this.HUD.button.setOpacity(1);
            this.HUD.question.setOpacity(1);
                
                game.data.question = this.questions[game.data.score%this.questions.length]
                            
                break;

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }

    /**
     * ouch
     */
    hurt() {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });

            // flash the screen
            me.game.viewport.fadeIn("#FFFFFF", 75);
            //me.audio.play("die", false);
        }
    }
};

export default PlayerEntity;
