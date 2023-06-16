import Picture from '../engine/component/Picture'
import Collider from '../engine/component/physics/Collider'
import { DEPTH } from '../types/depth'
import Obstacle from './Obstacle'
import { CACTUS } from './const'

export default class Cactus extends Obstacle {
    public constructor(x: number) {
        super(x, 0, 0, 0)
        this.addComponent(new Collider(this))
        this.addComponent(new Picture(this, CACTUS, DEPTH.OBJECT_MEDIUM))
        this.reset(x)
    }
    public reset(x: number) {
        this.setX(x)
        this.setY(350)
        this.setWidth(60)
        this.setHeight(80)
    }
}
