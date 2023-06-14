import Picture from './component/Picture'
import Size from './component/Size'

import Renderer from './Renderer'
import Score, { GAME_SPEED_DEFAULT } from './Score'

class Background {
    private pictures: Picture[]
    private idx: number
    private speed: number
    private size: Size
    private position: number
    public constructor(pictures: string[], speed: number, w: number, h: number) {
        this.pictures = []
        for (let i = 0; i < pictures.length; i++) {
            for (let j = 0; j < 20; j++) this.pictures.push(new Picture(pictures[i], 0, 0, w, h))
        }
        this.idx = 0
        this.speed = speed
        this.size = new Size(w, h)
        this.position = 0
    }

    public update(deltaTime: number): void {
        this.position -= deltaTime * (this.speed + Score.getGameSpeed() / GAME_SPEED_DEFAULT)
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
        pic.setCoord(this.position, 0)
        pic.render()

        if (this.size.getWidth() + this.position < Renderer.canvas.width) {
            const pic2 = this.getNext()
            pic2.setCoord(this.position + this.size.getWidth(), 0)
            pic2.render()
        }
    }
}

export default Background
