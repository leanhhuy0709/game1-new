import GameObject from '../engine/GameObject'

class Obstacle extends GameObject {
    protected moveSpeed: number
    public constructor(sprites: string[], delay: number, x = 0, y = 0, w = 0, h = 0) {
        super(sprites, delay, x, y, w, h)
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render() {
        super.render()
    }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    public reset(x: number) {
        //
    }

    public getMoveSpeed() {
        return this.moveSpeed
    }
}

export default Obstacle
