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

    public render(): void {
        Canvas.ctx?.drawImage(
            this.image,
            this.parent.getX(),
            this.parent.getY(),
            this.parent.getWidth(),
            this.parent.getHeight()
        )
    }

    public update(_deltaTime: number) {
        //render
    }
}

export default Picture
