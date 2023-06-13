import Obstacle from './Obstacle'
import Cactus from './Cactus'
import TRex from './TRex'
import TRexScore, { GAME_SPEED_DEFAULT } from './TRexScore'
import CollisionManager from '../engine/CollisionManager'

//delete it if complete
const BACKGROUND_WIDTH = 1000

//ObstacleManager: manage obstacle and handle collision
export default class ObstacleManager {
    private obstacles: Obstacle[]
    public constructor() {
        this.obstacles = []
        const randNum = [1, 2, 4, 4, 5, 6, 6, 8, 8, 10]
        randNum.sort(() => Math.random())
        for (let i = 0; i < 10; i++) {
            this.obstacles.push(new Cactus(0))
        }
        this.start()
    }
    public start() {
        let tmp = 0
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 1000) + 400 + tmp
            this.obstacles[i].reset(tmp)
        }
    }
    public update(deltaTime: number, isStop = false) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.obstacles.length; i++) {
            if (!isStop) {
                this.obstacles[i]
                    .getCoord()
                    .setX(
                        this.obstacles[i].getCoord().getX() -
                            (deltaTime * TRexScore.getGameSpeed()) / GAME_SPEED_DEFAULT
                    )
                if (
                    this.obstacles[i].getCoord().getX() < -this.obstacles[i].getSize().getWidth() &&
                    !isStop
                ) {
                    listObstacleNeedToReset.push(i)
                }
            }
        }
        if (isStop) return

        let maxX = 0
        for (let i = 0; i < this.obstacles.length; i++)
            maxX =
                maxX > this.obstacles[i].getCoord().getX()
                    ? maxX
                    : this.obstacles[i].getCoord().getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 1000) + 400
            this.obstacles[j].getCoord().setX(maxX)
        }
    }

    public render(): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].getCoord().getX() <= BACKGROUND_WIDTH) {
                this.obstacles[i].render()
            }
        }
    }

    public checkCollision(tRex: TRex): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (CollisionManager.check(tRex, this.obstacles[i])) return true
        }
        return false
    }
}
