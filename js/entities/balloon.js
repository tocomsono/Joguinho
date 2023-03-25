import * as me from 'https://esm.run/melonjs@13';

class MyRenderable extends me.Renderable {
    constructor(x, y, width, height) {
        // x, y, width, height
        super(x, y, width, height);

        // set the depth of the renderable
        this.z = 100;
    }

    update(dt) {
        // don't redraw this item
        return false;
    }

    draw(renderer) {
        renderer.setColor('#FFFFFF');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);

    }
};
export default MyRenderable;