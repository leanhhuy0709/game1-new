import Picture from '../engine/component/Picture'
import Collider from '../engine/component/physics/Collider'
import { DEPTH } from '../types/depth'
import Obstacle from './Obstacle'
import { CACTUS } from './const'

export default class Cactus extends Obstacle {
    public constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        this.addComponent(new Collider(this))
        this.addComponent(new Picture(this, CACTUS, DEPTH.OBJECT_MEDIUM))
    }
    public reset(x: number, moveSpeed = 0) {
        //
    }
}
