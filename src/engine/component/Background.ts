import Camera from '../camera/Camera'
import GameObject from '../game-objects/GameObject'
import Loader from '../loader/Loader'
import Canvas from '../renderer/canvas/Canvas'
import RenderComponent from './RenderComponent'

export default class Background extends RenderComponent {
    private image: HTMLImageElement

    public constructor(obj: GameObject, imageHrefs: string, depth = 1) {
        super(obj, depth)
        this.image = Loader.getImage(imageHrefs)
    }

    public getBackground(): HTMLImageElement {
        return this.image
    }

    public render(camera = new Camera()): void {
        if (!this.isActive) return
        const w = Canvas.canvas.width
        const h = Canvas.canvas.height

        let x = this.parent.getX() - camera.getX()
        let y = this.parent.getY() - camera.getY()

        if (x + this.parent.getWidth() < 0) x += this.parent.getWidth()
        if (y + this.parent.getHeight() < 0) y += this.parent.getHeight()

        while (x < w) {
            while (y < h) {
                Canvas.ctx?.drawImage(
                    this.image,
                    x,
                    y,
                    this.parent.getWidth(),
                    this.parent.getHeight()
                )
                y += this.parent.getHeight()
            }
            y = this.parent.getY() - camera.getY()
            if (y + this.parent.getHeight() < 0) y += this.parent.getHeight()
            x += this.parent.getWidth()
        }
    }

    public update(_deltaTime: number) {
        //
    }
}
