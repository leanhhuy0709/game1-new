import Picture from '../component/Picture'
import Size from '../component/Size'
import Renderer from '../engine/Renderer'
import TRexScore, { GAME_SPEED_DEFAULT } from './TRexScore'

class Background {
    private pictures: Picture[]
    private idx: number
    private speed: number
    private size: Size
    private position: number
    public constructor(pictures: string[], speed: number, w: number, h: number) {
        this.pictures = []
        for (let i = 0; i < pictures.length; i++) {
            this.pictures.push(new Picture(pictures[i], w, h))
        }
        this.idx = 0
        this.speed = speed
        this.size = new Size(w, h)
        this.position = 0
    }

    public update(deltaTime: number): void {
        this.position -= deltaTime * (this.speed + TRexScore.getGameSpeed() / GAME_SPEED_DEFAULT)
        if (this.position < -this.size.getWidth()) {
            this.position += this.size.getWidth()
            this.goToNext()
        }
    }

    public getCurrent(): Picture {
        return this.pictures[this.idx]
    }

    public getNext(): Picture {
        return this.pictures[(this.idx + 1) % this.pictures.length]
    }

    public goToNext(): void {
        this.idx = (this.idx + 1) % this.pictures.length
    }

    public render(): void {
        const pic = this.getCurrent()
        pic.render(this.position, 0, 0)

        if (this.size.getWidth() + this.position < Renderer.canvas.width) {
            const pic2 = this.getNext()
            pic2.render(this.position + this.size.getWidth(), 0, 0)
        }
    }
}

export default Background