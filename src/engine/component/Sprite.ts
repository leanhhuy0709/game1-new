import Camera from '../camera/Camera'
import GameObject from '../game-objects/GameObject'
import Loader from '../loader/Loader'
import Canvas from '../renderer/canvas/Canvas'
import RenderComponent from './RenderComponent'

class Sprite extends RenderComponent {
    protected images: HTMLImageElement[]
    protected idx: number
    protected delay: number
    protected spriteChangeInterval: number

    public constructor(
        obj: GameObject,
        imageHrefs: string[],
        spriteChangeInterval: number,
        depth = 1
    ) {
        super(obj, depth)
        this.images = []
        for (let i = 0; i < imageHrefs.length; i++) {
            this.images.push(Loader.getImage(imageHrefs[i]))
        }

        this.idx = 0
        this.delay = 0
        this.spriteChangeInterval = spriteChangeInterval
    }

    public getCurrent(): HTMLImageElement {
        return this.images[this.idx]
    }

    public goToNext(deltaTime: number): void {
        this.delay += deltaTime

        if (this.delay > this.spriteChangeInterval) {
            this.idx++
            this.delay = 0
        }

        this.idx %= this.images.length
    }

    public setIdx(idx: number): void {
        this.idx = idx % this.images.length
    }

    public getLength(): number {
        return this.images.length
    }

    public getIdx(): number {
        return this.idx
    }

    public render(camera = new Camera()): void {
        if (!this.isActive) return

        Canvas.ctx?.drawImage(
            this.getCurrent(),
            this.parent.getX() - camera.getX(),
            this.parent.getY() - camera.getY(),
            this.parent.getWidth(),
            this.parent.getHeight()
        )
    }

    public setDelay(delay: number): void {
        this.delay = delay
    }

    public update(deltaTime: number) {
        this.goToNext(deltaTime)
        //render
    }
}

export default Sprite
