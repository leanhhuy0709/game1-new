import Picture from '../engine/component/Picture'
import { DEPTH } from './depth'
import Obstacle from './Obstacle'
import { CACTUS } from './const'
import Body from '../engine/component/physics/Body'

export default class Cactus extends Obstacle {
    public constructor(x: number) {
        super(x, 0, 0, 0)
        this.addComponent(new Picture(this, CACTUS, DEPTH.OBJECT_MEDIUM))
        this.addComponent(new Body(this, 0, 0, 0))
        this.reset(x)
    }
    public reset(x: number) {
        this.setX(x)
        //this.setY(270)
        this.setY(100)
        this.setWidth(60)
        this.setHeight(80)
    }
}
