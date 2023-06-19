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
    public reset(camera: Camera = new Camera()) {
        let tmp = 1000
        for (let i = 0; i < this.obstacles.length; i++) {
            //tmp = Math.floor(Math.random() * 1000) + 550 + tmp
            tmp = 550 + tmp

            const v = -this.obstacles[i]
                .getComponent<Movement>(Movement)[0]
                .getVelocity()
                .getMagnitudeX()
            //console.log(v, camera.getSpeed())
            if (v > 0)
                this.obstacles[i].reset(((tmp - camera.getX() + 550) / camera.getSpeed()) * v + tmp)
            else this.obstacles[i].reset(((tmp - camera.getX()) / camera.getSpeed()) * v + tmp)
            //console.log(tmp, this.obstacles[i].getX())
        }
    }
    public update(deltaTime: number, camera: Camera = new Camera()) {
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
            //maxX += Math.floor(Math.random() * 1000) + 550
            maxX += 550

            //if (maxX % 4000 <= 100) maxX += 100

            const v = -this.obstacles[j]
                .getComponent<Movement>(Movement)[0]
                .getVelocity()
                .getMagnitudeX()

            this.obstacles[j].reset(((maxX - camera.getX()) / camera.getSpeed()) * v + maxX)
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
