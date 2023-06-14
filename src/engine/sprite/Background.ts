import Size from '../component/Size'
import Renderable from '../renderer/Renderable'
import Canvas from '../renderer/canvas/Canvas'
import Loader from '../resources/Loader'

class Background extends Renderable {
    private images: HTMLImageElement[]
    private size: Size
    private idx: number
    private speed: number
    private position: number
    public constructor(imageHrefs: string[], speed: number, w: number, h: number) {
        super()
        this.images = []
        for (let i = 0; i < imageHrefs.length; i++) {
            this.images.push(Loader.getImage(imageHrefs[i]))
        }
        this.idx = 0
        this.speed = speed
        this.position = 0
        this.size = new Size(w, h)
    }

    public update(deltaTime: number): void {
        this.position -= deltaTime * this.speed
        if (this.position < -this.size.getWidth()) {
            this.position += this.size.getWidth()
            this.goToNext()
        }
    }

    public getCurrent(): HTMLImageElement {
        return this.images[this.idx]
    }

    public getNext(): HTMLImageElement {
        return this.images[(this.idx + 1) % this.images.length]
    }

    public goToNext(): void {
        this.idx = (this.idx + 1) % this.images.length
    }

    public render(): void {
        Canvas.ctx?.drawImage(
            this.getCurrent(),
            this.position,
            0,
            this.size.getWidth(),
            this.size.getHeight()
        )
        Canvas.ctx?.drawImage(
            this.getCurrent(),
            this.position + this.size.getWidth(),
            0,
            this.size.getWidth(),
            this.size.getHeight()
        )
    }
}

export default Background
