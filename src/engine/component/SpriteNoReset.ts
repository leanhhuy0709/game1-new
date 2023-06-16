import GameObject from '../game-objects/GameObject'
import Sprite from './Sprite'

export default class SpriteNoReset extends Sprite {
    public constructor(
        obj: GameObject,
        imageHrefs: string[],
        spriteChangeInterval: number,
        depth = 1
    ) {
        super(obj, imageHrefs, spriteChangeInterval, depth)
    }

    public goToNext(deltaTime: number): void {
        this.delay += deltaTime

        if (this.delay > this.spriteChangeInterval) {
            this.idx++
            this.delay = 0
        }
        if (this.idx > this.images.length) this.idx = this.images.length - 1
    }

    public setIdx(idx: number): void {
        this.idx = idx
        if (this.idx > this.images.length) this.idx = this.images.length - 1
        this.idx = this.images.length - 1
    }
}
