import Obstacle from './Obstacle'

const CACTUS = 'assets/Cactus/Cactus.png'

export default class Cactus extends Obstacle {
    public constructor(delay: number, x = 0, moveSpeed = 0) {
        super([CACTUS], delay, x)
        this.reset(x, moveSpeed)
    }
    public reset(x: number, moveSpeed = 0) {
        this.coord.setX(x)
        this.coord.setY(350)
        this.setSize(60, 80)
        this.moveSpeed = moveSpeed
    }
}
