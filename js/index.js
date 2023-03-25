
import * as me from 'https://esm.run/melonjs@13';
//import game from './game.js';
import PlayScreen from './screens/play.js';


var resources = [
    { name : "sprites", type : "json", src : "data/img/sprites.json" },
    { name : "sprites", type : "image", src : "data/img/sprites.png" }
];

/* Game namespace */
var game = {

    data : {
        // score
        score : 0
    },

    // a reference to the texture atlas
    texture : null,

    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init(1380, 625, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO})){
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

me.loader.preload([
    {name: "button", type: "image", src: "data/img/button.png"},
    {name: "balloon", type: "image", src: "data/img/balloon.png"},
    {name: "coin", type: "image", src: "data/img/assets/collectables/coin.png"},
    {name: "PressStart2P", type: "binary", src:"data/fnt/PressStart2P.fnt"},
    {name: "PressStart2P", type: "image", src:"data/fnt/PressStart2P.png"},
])

        // set all ressources to be loaded
        me.loader.preload(resources, () => {
            // load the texture atlas file
            this.texture = new me.TextureAtlas(
                me.loader.getJSON("sprites"),
                me.loader.getImage("sprites")
            );

            me.state.set(me.state.PLAY, new PlayScreen());

            // Start the game.
            me.state.change(me.state.PLAY);
        });
    }
};

export default game;
