import Renderable from '../renderer/Renderable'
import Circle from '../shape/Circle'
import Rectangle from '../shape/Rectangle'
import Shape from '../shape/Shape'
import Sprite from '../sprite/Sprite'

export default class GameObject extends Renderable {
    private shape: Shape
    private sprite: Sprite

    public constructor(shape: Shape, imageHrefs: string[] = [], spriteChangeInterval = 1) {
        super()
        this.shape = shape
        this.sprite = new Sprite(imageHrefs, spriteChangeInterval)
    }

    public getShape(): Shape {
        return this.shape
    }

    public setShape(shape: Shape): void {
        this.shape = shape
    }

    public render(): void {
        this.shape.render()

        if (this.sprite.getLength() == 0) return

        if (this.shape instanceof Rectangle) {
            const rectangle = this.shape as Rectangle
            this.sprite.render(
                rectangle.getCoord().getX(),
                rectangle.getCoord().getY(),
                rectangle.getSize().getWidth(),
                rectangle.getSize().getHeight()
            )
        } else if (this.shape instanceof Circle) {
            const circle = this.shape as Circle
            this.sprite.render(
                circle.getCoord().getX() - circle.getRadius(),
                circle.getCoord().getY() - circle.getRadius(),
                circle.getRadius() * 2,
                circle.getRadius() * 2
            )
        }
    }

    public setX(x: number): void
    {
        this.shape.getCoord().setX(x)
    }

    public setY(y: number): void
    {
        this.shape.getCoord().setY(y)
    }
}
