import * as me from 'https://esm.run/melonjs@13';
import game from '../index.js';
//import VirtualJoypad from './../entities/controls.js';
import UIContainer from './../entities/HUD.js';
import PlayerEntity from '../entities/player.js';
import FloorEntity from '../entities/floor.js';
import RockEntity from '../entities/rock.js';
import TreeEntity from '../entities/tree.js';
import MyRenderable from '../entities/balloon.js';
import MyContainer from '../entities/container.js';

class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // reset the score
        game.data.score = 0;
        game.data.containerMove = 0;

        var w = me.game.viewport.width;
        var h = me.game.viewport.height;

        var balloon = new MyRenderable(w / 2, 300, 1000, 300);

        me.game.world.addChild(balloon, 3);

        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new UIContainer(balloon);
        }
        me.game.world.addChild(this.HUD, 5);

        // display if debugPanel is enabled or on mobile
       // if ((me.plugins.debugPanel && me.plugins.debugPanel.panel.visible) || me.device.touch) {
         //   if (typeof this.virtualJoypad === "undefined") {
           //     this.virtualJoypad = new VirtualJoypad();
            //}
            //me.game.world.addChild(this.virtualJoypad);
        //}


        // add the Background
        var background = game.texture.createSpriteFromName("bg/background");
        
        var clouds = game.texture.createSpriteFromName("bg/bgclouds");
        // set position to the middle of the viewport
        // as the sprite anchorPoint is (0.5, 0.5)
        background.pos.set(w / 2, h / 2, 1);
        // add to the scene
       
        me.game.world.addChild(background, 1);

        me.game.world.addChild(clouds, 1);

        var container = new MyContainer

        me.game.world.addChild(container)

        me.game.world.addChild(new FloorEntity(0, 450, {width : w, height : 400}), 2);

        container.addChild(new RockEntity (400, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new TreeEntity (900, 400, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (2000, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (2800, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new TreeEntity (2500, 400, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (1300, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-200, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new TreeEntity (-500, 400, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-1000, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-1400, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-1900, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new TreeEntity (-2300, 400, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-2800, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-3000, 450, {width : 100, height : 300}, "oioi"), 3);
        container.addChild(new RockEntity (-3200, 450, {width : 100, height : 300}, "oioi"), 3);

        me.game.world.addChild(new PlayerEntity(250, 0, {width : 100, height : 300}, this.HUD, this.container), 4);

        balloon.setOpacity(0);

        //button.setOpacity(0);
        }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {

        // remove the HUD from the game worlds
        me.game.world.removeChild(this.HUD);

    }
};

export default PlayScreen;