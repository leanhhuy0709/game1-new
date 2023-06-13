import GameObject from '../engine/GameObject'

const CLOUD_1 = './assets/background/cloud1.webp'

class Cloud extends GameObject {
    private moveSpeed: number
    public constructor(x = 100, y = 100) {
        super([CLOUD_1], 0, x, y, 90, 80)
        this.reset(x, y)
    }
    public reset(x: number, y: number) {
        //console.log
        this.sprite.setIdx(0)
        this.coord.setCoord(x, y)
        this.size.setSize(90, 80)
        this.moveSpeed = (Math.random() * 10 - 5) / 10
    }

    public getMoveSpeed(): number {
        return this.moveSpeed
    }

    public setMoveSpeed(speed: number): void {
        this.moveSpeed = speed
    }
}

export default Cloud
