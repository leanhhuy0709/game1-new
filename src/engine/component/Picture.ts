import Camera from '../camera/Camera'
import GameObject from '../game-objects/GameObject'
import Loader from '../loader/Loader'
import Canvas from '../renderer/canvas/Canvas'
import RenderComponent from './RenderComponent'

class Picture extends RenderComponent {
    private image: HTMLImageElement

    public constructor(obj: GameObject, imageHrefs: string, depth = 1) {
        super(obj, depth)
        this.image = Loader.getImage(imageHrefs)
    }

    public getPicture(): HTMLImageElement {
        return this.image
    }

    public render(camera = new Camera()): void {
        if (!this.isActive) return
        Canvas.ctx?.drawImage(
            this.image,
            this.parent.getX() - camera.getX(),
            this.parent.getY() - camera.getY(),
            this.parent.getWidth(),
            this.parent.getHeight()
        )
    }

    public update(_deltaTime: number) {
        //
    }
}

export default Picture
