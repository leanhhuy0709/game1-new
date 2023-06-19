import Obstacle from './Obstacle'
import TRex from './TRex'
import Camera from '../engine/camera/Camera'
import CollisionManager from '../engine/component/physics/CollisionManager'
import GameObject from '../engine/game-objects/GameObject'
import Movement from '../engine/component/physics/Movement'

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager extends GameObject {
    private obstacles: Obstacle[]
    public constructor() {
        super(0, 0, 0, 0)
        this.obstacles = []
    }
    public reset() {
        let tmp = 1000
        for (let i = 0; i < this.obstacles.length; i++) {
            tmp = Math.floor(Math.random() * 1000) + 550 + tmp
            this.obstacles[i].reset(tmp)
        }
    }
    public update(deltaTime: number, camera: Camera = new Camera()) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].getX() < camera.getX() + 700)
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
            maxX += Math.floor(Math.random() * 1000) + 550

            if (this.obstacles[j].getComponent<Movement>(Movement).length > 0) {
                const v = this.obstacles[j].getComponent<Movement>(Movement)[0].getVelocity().getMagnitudeX()
                this.obstacles[j].reset(maxX + Math.abs(400 * v))
            } else this.obstacles[j].reset(maxX)
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

    public add(obj: Obstacle): void {
        this.obstacles.push(obj)
    }
}
