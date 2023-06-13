import GameObject from './GameObject'
//import TRexJump from '../t-rex-jump/TRexJump'

export const LAND = 350 // ??
export const GRAVITY = 0.007

class Body extends GameObject {
    private t: number
    private prevY: number
    private startSpeed: number
    public constructor(sprites: string[], delay: number, x = 0, y = 0, w = 0, h = 0) {
        super(sprites, delay, x, y, w, h)
        this.t = 0
        this.prevY = y
        this.startSpeed = 0
    }

    public update(deltaTime: number): void {
        if (!this.isJumpOrFall()) return

        if (this.getCoord().getY() > LAND) {
            this.t = 0
            this.getCoord().setY(LAND)
            this.prevY = this.getCoord().getY()
            this.startSpeed = 0
        } else {
            this.t += deltaTime

            this.getCoord().setY(
                this.prevY +
                    (1.0 / 2) * GRAVITY * this.t * this.t -
                    (this.startSpeed * this.t * 5) / 5
            )

            if (this.getCoord().getY() <= 100) {
                this.t = 0
                this.getCoord().setY(100)
                this.prevY = this.getCoord().getY()
                this.startSpeed = 0
            }
        }
    }

    public setStartSpeed(speed: number): void {
        if (this.startSpeed != speed) {
            this.t = 0
            this.prevY = this.getCoord().getY()
        }

        this.startSpeed = speed
    }

    public getStartSpeed(): number {
        return this.startSpeed
    }

    public isJumpOrFall(): boolean {
        return !(this.getCoord().getY() == LAND && this.startSpeed == 0)
    }

    public isJump(): boolean {
        return this.startSpeed != 0
    }

    public isFall(): boolean {
        return this.getCoord().getY() != LAND && this.startSpeed == 0
    }
}
export default Body
