import Obstacle from './Obstacle'

const FLYDINO_1 = 'assets/fly-dinosaur/3.png'
const FLYDINO_2 = 'assets/fly-dinosaur/4.png'
const FLYDINO_3 = 'assets/fly-dinosaur/5.png'

export default class FlyDino extends Obstacle {
    public constructor(delay: number, x = 0, moveSpeed = 1) {
        super([FLYDINO_1, FLYDINO_2, FLYDINO_3], delay, x)
        this.reset(x, moveSpeed)
    }
    public reset(x: number, moveSpeed = 1) {
        this.coord.setX(x)
        this.coord.setY(200)
        this.setSize(90, 80)
        this.moveSpeed = moveSpeed
    }
}
