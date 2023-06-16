import Obstacle from './Obstacle'
import Cactus from './Cactus'
import FlyDino from './FlyDino'
import TRex from './TRex'
import Random from '../engine/math/Random'
import Camera from '../engine/camera/Camera'
import CollisionManager from '../engine/component/physics/CollisionManager'

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager {
    private obstacles: Obstacle[]
    public constructor() {
        this.obstacles = []
        const randNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        Random.shuffle(randNum)
        for (let i = 0; i < 10; i++) {
            if (randNum[i] % 2 == 1) this.obstacles.push(new Cactus(0))
            else this.obstacles.push(new FlyDino(0))
        }
        this.reset()
    }
    public reset() {
        let tmp = 500
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 1000) + 400 + tmp
            this.obstacles[i].reset(tmp)
        }
    }
    public update(deltaTime: number, camera: Camera) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update(deltaTime)
            if (this.obstacles[i].getX() + this.obstacles[i].getWidth() < camera.getX()) {
                listObstacleNeedToReset.push(i)
            }
        }

        let maxX = 0
        for (let i = 0; i < this.obstacles.length; i++)
            maxX = maxX > this.obstacles[i].getX() ? maxX : this.obstacles[i].getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 1000) + 400
            this.obstacles[j].reset(maxX)
        }
    }

    public render(): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].render()
        }
    }

    public checkCollision(tRex: TRex): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (CollisionManager.checkCollision(this.obstacles[i], tRex)) return true
        }
        return false
    }

    public getObstacles(): Obstacle[] {
        return this.obstacles
    }
}
