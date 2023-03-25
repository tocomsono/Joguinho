import * as me from 'https://esm.run/melonjs@13';
import game from '../index.js';

/**
 * a basic control to toggle fullscreen on/off
 */
class FSControl extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            region : "shadedDark30.png"
        });
        this.setOpacity(0.5);
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (!me.device.isFullscreen()) {
            me.device.requestFullscreen();
        } else {
            me.device.exitFullscreen();
        }
        return false;
    }
};

/**
 * a basic control to toggle fullscreen on/off
 */
//class AudioControl extends me.GUI_Object {
    /**
     * constructor
     */
  //  constructor(x, y) {
    //    super(x, y, {
      //      image: game.texture,
        //    region : "shadedDark13.png" // ON by default
        //});
        //this.setOpacity(0.5);
        //this.isMute = false;
    //}

    /**
     * function called when the pointer is over the object
     */
  //  onOver(/* event */) {
    //    this.setOpacity(1.0);
    //}

    /**
     * function called when the pointer is leaving the object area
     */
    //onOut(/* event */) {
      //  this.setOpacity(0.5);
    //}

    /**
     * function called when the object is clicked on
     */
    //onClick(/* event */) {
      //  if (this.isMute) {
        //    me.audio.unmuteAll();
          //  this.setRegion(game.texture.getRegion("shadedDark13.png"));
            //this.isMute = false;
        //} else {
          //  me.audio.muteAll();
            //this.setRegion(game.texture.getRegion("shadedDark15.png"));
           // this.isMute = true;
        //}
        //return false;
    //}
//};

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the super constructor
        super(
            me.game.viewport.width  + x,
            me.game.viewport.height + y,
            {
                font : "PressStart2P",
                textAlign : "right",
                textBaseline : "bottom",
                text : "0"
            }
        );

        this.relative = new me.Vector2d(x, y);

        // local copy of the global score
        this.score = -1;

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, h, 0).add(this.relative);
        }).bind(this));
    }

    /**
     * update function
     */
    update( dt ) {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            this.setText(this.score);
            this.isDirty = true;
        }
        return super.update(dt);
    }
};

class Question extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(
            me.game.viewport.width  + x,
            me.game.viewport.height + y,
            {
                font : "PressStart2P",
                textAlign : "center",
                fillStyle : "#7C5934",
                textBaseline : "bottom",
                text : "0",
                lineWidth: 6
            }
           
        );

        this.relative = new me.Vector2d(x, y);

        // local copy of the global score
        this.question = "";

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, h, 0).add(this.relative);
        }).bind(this));
    }

    /**
     * update function
     */
    update( dt ) {
        if (this.question !== game.data.question) {
            this.question = game.data.question;
            this.setText(this.question);
            this.isDirty = true;
        }
        return super.update(dt);
    }
};

class EndOfGame extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the super constructor
        super(
            me.game.viewport.width  + x,
            me.game.viewport.height + y,
            {
                font : "PressStart2P",
                textAlign : "center",
                fillStyle : "#7C5934",
                textBaseline : "bottom",
                text : "0"
            }
        );

        this.relative = new me.Vector2d(x, y);

        // local copy of the global score
        this.setText("Good job! Press F5 to keep practicing")

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, h, 0).add(this.relative);
        }).bind(this));
    }

};

class ButtonUI extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y, name, label, balloon, question) {
        super(x, y, {
            image: name,
            
        });

        this.balloon = balloon
        this.question = question

        this.anchorPoint.set(0, 0);
        this.setOpacity(0.5);

        this.font = new me.Text(0, 0 ,{
            font: "kenpixel",
            size: 14,
            fillStyle: "white",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        this.label = label;

        // only the parent container is a floating object
        this.floating = false;
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(event) {
        game.data.score += 1;
        this.question.setOpacity(0)
        this.balloon.setOpacity(0)
        this.setOpacity(0)

        // don't propagate the event
        return false;
    }

    /**
     * function called when the pointer button is released
     */
    onRelease(/* event */) {
        // don't propagate the event
        return false;
    }

    draw(renderer) {
        super.draw(renderer);
        this.font.draw(renderer,
            this.label,
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
    }
};

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        this.enableChildBoundsUpdate = true;

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        this.balloon = new me.Sprite(695, 280, {image: "balloon"})
        
        this.coin = new me.Sprite (695, 280, {image: "coin"})

        this.addChild(this.balloon);

        this.addChild(this.coin);

        // add our child score object at position
        this.addChild(new ScoreItem(-10, -370));

        this.question = new Question(-me.game.viewport.width/2, -370);

        this.endofgame = new EndOfGame(-me.game.viewport.width/2, -530);

        this.button = new ButtonUI(1100, 400, "button", "OK", this.balloon, this.question);

        this.addChild(this.question)

        this.addChild(this.button)

        this.addChild(this.endofgame)

        this.button.setOpacity(0)
        this.balloon.setOpacity(0)
        this.question.setOpacity(0)
        this.coin.setOpacity(0)
        this.endofgame.setOpacity(0)

        // add our audio control object
        //this.addChild(new AudioControl(36, 56));

        //if (!me.device.isMobile) {
            // add our fullscreen control object
          //  this.addChild(new FSControl(36 + 10 + 48, 56));
        //}
    }
    
   update(dt){
    if (game.data.score >= 7){
    this.coin.setOpacity(1)
    this.endofgame.setOpacity(1)

    }
    return super.update(dt);
   }

};

export default UIContainer;
