import Component from '../component/Component'
import Coord from '../component/Coord'
import Picture from '../component/Picture'
import Size from '../component/Size'
import Sprite from '../component/Sprite'

export default class GameObject {
    private coord: Coord
    private size: Size
    private components: Component[]

    public constructor(x: number, y: number, w: number, h: number) {
        this.coord = new Coord(x, y)
        this.size = new Size(w, h)
        this.components = []
    }

    public getX(): number {
        return this.coord.getX()
    }

    public getY(): number {
        return this.coord.getY()
    }

    public setX(x: number): void {
        this.coord.setX(x)
    }

    public setY(y: number): void {
        this.coord.setY(y)
    }

    public getWidth(): number {
        return this.size.getWidth()
    }

    public getHeight(): number {
        return this.size.getHeight()
    }

    public setWidth(w: number): void {
        this.size.setWidth(w)
    }

    public setHeight(h: number): void {
        this.size.setHeight(h)
    }

    public addComponent(comp: Component) {
        this.components.push(comp)
    }

    public update(deltaTime: number): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(deltaTime)
        }
    }

    public render(): void {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof Sprite) {
                const comp = this.components[i] as Sprite
                comp.render()
            }
            if (this.components[i] instanceof Picture) {
                const comp = this.components[i] as Picture
                comp.render()
            }
        }
    }
}
