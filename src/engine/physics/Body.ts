import Shape from '../shape/Shape'
import GameObject from '../game-objects/GameObject'
//import TRexJump from '../t-rex-jump/TRexJump'

export const LAND = 350 // ??
export const GRAVITY = 0.01
//export const GRAVITY = 0.001
//Fix gravity
//Behavior Design Pattern
//SOLID
//Velocity - huhu
class Body extends GameObject {
    private t: number
    private prevY: number
    private startSpeed: number
    public constructor(shape: Shape, imageHrefs: string[] = [], spriteChangeInterval = 1) {
        super(shape, imageHrefs, spriteChangeInterval)
        this.t = 0
        this.prevY = this.getShape().getCoord().getY()
        this.startSpeed = 0
    }

    public update(deltaTime: number): void {
        if (!this.isJumpOrFall()) return

        if (this.getShape().getHighestY() > LAND) {
            this.getShape().setHighestY(LAND)
            this.updatePrevY()
            this.startSpeed = 0
        } else {
            this.t += deltaTime

            this.getShape().getCoord().setY(
                this.prevY +
                    (1.0 / 2) * GRAVITY * this.t * this.t -
                    (this.startSpeed * this.t * 5) / 5
            )

            if (this.getShape().getHighestY() <= 100) {
                this.getShape().setHighestY(100)
                this.startSpeed = 0
                this.updatePrevY()
            }
        }
    }

    public updatePrevY(): void {
        this.t = 0
        this.prevY = this.getShape().getCoord().getY()
    }

    public setStartSpeed(speed: number): void {
        this.startSpeed = speed
    }

    public getStartSpeed(): number {
        return this.startSpeed
    }

    public isJumpOrFall(): boolean {
        return !(this.getShape().getHighestY() == LAND && this.startSpeed == 0)
    }

    public isJump(): boolean {
        return this.startSpeed != 0
    }

    public isFall(): boolean {
        return Math.floor(this.getShape().getHighestY()) != LAND && this.startSpeed == 0
    }

    public setY(y: number): void {
        this.getShape().getCoord().setY(y) //Mat trong luc
        this.updatePrevY()
    }
}
export default Body
