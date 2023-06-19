import Camera from '../engine/camera/Camera'
import Decor from './Decor'

export default class DecorObjectManager {
    private objs: Decor[]
    public constructor() {
        this.objs = []
    }

    public reset() {
        let tmp = 0
        for (let i = 0; i < this.objs.length; i++) {
            tmp = Math.floor(Math.random() * 500) + 300 + tmp
            this.objs[i].reset(tmp)
        }
    }

    public render(): void {
        for (let i = 0; i < 10; i++) {
            this.objs[i].render()
        }
    }

    public update(deltaTime: number, camera: Camera): void {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.objs.length; i++) {
            this.objs[i].update(deltaTime)

            if (this.objs[i].getX() + this.objs[i].getWidth() < camera.getX()) {
                listObstacleNeedToReset.push(i)
            }
        }

        let maxX = 0
        for (let i = 0; i < this.objs.length; i++)
            maxX = maxX > this.objs[i].getX() ? maxX : this.objs[i].getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 500) + 300
            this.objs[j].reset(maxX)
        }
    }

    public getDecors(): Decor[] {
        return this.objs
    }

    public addDecor(decor: Decor): void {
        this.objs.push(decor)
    }
}
