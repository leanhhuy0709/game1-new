import Picture from '../component/Picture'

class Sprite {
    private pictures: Picture[]
    private idx: number
    private delay: number
    private spriteChangeInterval: number

    public constructor(pictures: Picture[], spriteChangeInterval: number) {
        this.pictures = pictures
        this.idx = 0
        this.delay = 0
        this.spriteChangeInterval = spriteChangeInterval
    }

    public getCurrent(): Picture {
        if (this.idx >= this.pictures.length) console.log('Error Sprites')
        return this.pictures[this.idx]
    }

    public goToNext(deltaTime: number, coeff = 1): void {
        this.delay += deltaTime * coeff

        if (this.delay > this.spriteChangeInterval) {
            this.idx++
            this.delay = 0
        }

        this.idx %= this.pictures.length
    }

    public setIdx(idx: number): void {
        this.idx = idx % this.pictures.length
    }

    public getLength(): number {
        return this.pictures.length
    }

    public getIdx(): number {
        return this.idx
    }

    public render(x: number, y: number, depth: number): void {
        this.getCurrent().render(x, y, depth)
    }

    public setSize(w: number, h: number) {
        for (let i = 0; i < this.pictures.length; i++) {
            this.pictures[i].setSize(w, h)
        }
    }

    public setDelay(delay: number): void {
        this.delay = delay
    }
}

export default Sprite
