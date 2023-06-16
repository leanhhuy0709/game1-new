import Obstacle from './Obstacle'
import Cactus from './Cactus'
import FlyDino from './FlyDino'
import TRex from './TRex'
import Random from '../engine/math/Random'

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager {
    private obstacles: Obstacle[]
    public constructor() {
        this.obstacles = []
        const randNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        Random.shuffle(randNum)
        for (let i = 0; i < 10; i++) {
            if (randNum[i] % 2 == 1) this.obstacles.push(new Cactus(0, 0, 0, 0))
            else 
            this.obstacles.push(new FlyDino(30))
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
    public update(deltaTime: number, isStop = false) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.obstacles.length; i++) {
            if (!isStop) {
                if (this.obstacles[i].getShape().getCoord().getX() <= 900)
                    this.obstacles[i]
                    .getShape()
                        .getCoord()
                        .setX(
                            this.obstacles[i].getShape().getCoord().getX() -
                                (deltaTime *
                                    (Speed.getSpeed() + this.obstacles[i].getMoveSpeed())) /
                                    Speed.getDefaultSpeed()
                        )
                else
                    this.obstacles[i]
                    .getShape().getCoord()
                        .setX(
                            this.obstacles[i].getShape().getCoord().getX() -
                                (deltaTime * Speed.getSpeed()) / Speed.getDefaultSpeed()
                        )

                if (
                    this.obstacles[i].getShape().getHighestX() < 0 &&
                    !isStop
                ) {
                    listObstacleNeedToReset.push(i)
                }
                this.obstacles[i].getSprite().goToNext(deltaTime)
            }
        }
        if (isStop) return

        let maxX = 0
        for (let i = 0; i < this.obstacles.length; i++)
            maxX =
                maxX > this.obstacles[i].getShape().getCoord().getX()
                    ? maxX
                    : this.obstacles[i].getShape().getCoord().getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 1000) + 400
            this.obstacles[j].getShape().getCoord().setX(maxX)
        }
    }

    public render(): void {
        for (let i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].render()
        }
    }

    public checkCollision(tRex: TRex): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (CollisionManager.checkCollision(this.obstacles[i], tRex))
                return true
        }
        return false
    }

    public getObstacles(): Obstacle[]
    {
        return this.obstacles
    }
}
