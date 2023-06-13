import Renderer from '../engine/Renderer'
import Coord from './Coord'
import Renderable from './Renderable'
import Size from './Size'

class Picture extends Renderable {
    private href: string
    private size: Size
    private image: HTMLImageElement
    private coord: Coord

    public constructor(href = '', x = 100, y = 100, w = 50, h = 50) {
        super()
        this.href = href
        this.coord = new Coord(x, y)
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
        this.getImage().width = w
        this.getImage().height = h
    }

    public setCoord(x: number, y: number): void {
        this.coord.setX(x)
        this.coord.setY(y)
    }

    public getCoord(): Coord {
        return this.coord
    }

    public render() {
        Renderer.ctx?.drawImage(
            this.image,
            this.coord.getX(),
            this.coord.getY(),
            this.size.getWidth(),
            this.size.getHeight()
        )
        //Renderer.addToQueue(this, new Coord(x, y), depth)
    }
}

export default Picture
