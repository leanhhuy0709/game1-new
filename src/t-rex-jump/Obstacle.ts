import GameObject from "../engine/game-objects/GameObject"
import Shape from "../engine/shape/Shape"

//Body
class Obstacle extends GameObject {
    protected moveSpeed: number
    public constructor(shape: Shape, imageHrefs: string[], spriteChangeInterval: number) {
        super(shape, imageHrefs, spriteChangeInterval)
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    public reset(x: number) {
        //
    }

    public getMoveSpeed() {
        return this.moveSpeed
    }

    public setMoveSpeed(moveSpeed: number) {
        this.moveSpeed = moveSpeed
    }
}

export default Obstacle
