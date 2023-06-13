import Renderer from '../engine/Renderer'
import Size from './Size'

class Picture {
    private href: string
    private size: Size
    private image: HTMLImageElement

    public constructor(href = '', w = 0, h = 0) {
        this.href = href
        this.size = new Size(w, h)
        this.image = new Image(w, h)
        this.image.src = href
    }

    public getHref(): string {
        return this.href
    }

    public getSize(): Size {
        return this.size
    }

    public getImage(): HTMLImageElement {
        return this.image
    }

    public setHref(href: string): void {
        this.href = href
        this.image.src = href
    }

    public setSize(w: number, h: number): void {
        this.size.setWidth(w)
        this.size.setHeight(h)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(x: number, y: number, depth: number) {
        Renderer.ctx?.drawImage(this.image, x, y, this.size.getWidth(), this.size.getHeight())
        //Renderer.addToQueue(this, new Coord(x, y), depth)
    }
}

export default Picture
