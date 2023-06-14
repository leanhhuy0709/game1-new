import Canvas from '../renderer/canvas/Canvas'
import Loader from '../resources/Loader'

class Sprite {
    private images: HTMLImageElement[]
    private idx: number
    private delay: number
    private spriteChangeInterval: number

    public constructor(imageHrefs: string[], spriteChangeInterval: number) {
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

    public goToNext(deltaTime: number, coeff = 1): void {
        this.delay += deltaTime * coeff

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

    public render(x: number, y: number, w: number, h: number): void {
        Canvas.ctx?.drawImage(this.getCurrent(), x, y, w, h)
    }

    public setDelay(delay: number): void {
        this.delay = delay
    }
}

export default Sprite
