import Cloud from './Cloud'
import TRexScore from './TRexScore'

class CloudManager {
    private clouds: Cloud[]
    public constructor() {
        this.clouds = []
        for (let i = 0; i < 10; i++) {
            this.clouds.push(new Cloud(0))
        }
        this.reset()
    }
    public reset() {
        let tmp = 0,
            tmp2 = 0
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 400) + 500 + tmp
            tmp2 = Math.floor(Math.random() * 100) + 100
            this.clouds[i].reset(tmp, tmp2)
        }
    }
    public update(deltaTime: number) {
        const listObstacleNeedToReset = []
        for (let i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].getCoord().getX() <= 1000)
                this.clouds[i]
                    .getCoord()
                    .setX(
                        this.clouds[i].getCoord().getX() - this.clouds[i].getMoveSpeed() * deltaTime
                    )

            this.clouds[i]
                .getCoord()
                .setX(this.clouds[i].getCoord().getX() - (TRexScore.getGameSpeed() / 5) * deltaTime)
            if (this.clouds[i].getCoord().getX() < -this.clouds[i].getSize().getWidth()) {
                listObstacleNeedToReset.push(i)
            }
        }

        let maxX = 0,
            tmp2 = 0
        for (let i = 0; i < this.clouds.length; i++)
            maxX = maxX > this.clouds[i].getCoord().getX() ? maxX : this.clouds[i].getCoord().getX()
        for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
            j = listObstacleNeedToReset[i]
            maxX += Math.floor(Math.random() * 400) + 500
            tmp2 = Math.floor(Math.random() * 100) + 80
            this.clouds[j].getCoord().setX(maxX)
            this.clouds[j].getCoord().setY(tmp2)
        }
    }

    public render() {
        for (let i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].getCoord().getX() <= 1000) {
                this.clouds[i].render()
            }
        }
    }
}
export default CloudManager
