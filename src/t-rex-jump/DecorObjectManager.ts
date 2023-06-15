import Renderable from "../engine/renderer/Renderable"
import Speed from "../engine/score/Speed"
import Cloud from "./Cloud"
import Decor from "./Decor"
//import Stone from "./Stone"

export default class DecorObjectManager extends Renderable {
    private objs: Decor[]
    public constructor() {
        super()
        this.objs = []
        for (let i = 0; i < 10; i++) {
            this.objs.push(new Cloud(50, 50, 100, 100))
            //else this.objs.push(new Stone(50, 50, 50))
        }
        this.reset()
    }

    public reset() {
        console.log(this.objs)
        let tmp = 0
        for (let i = 0; i < 10; i++) {
            tmp = Math.floor(Math.random() * 500) + 100 + tmp
            this.objs[i].reset(tmp)
        }
    }

    public render(): void {
        for (let i = 0; i < 10; i++) {
            this.objs[i].render()
        }
    }

    public update(deltaTime: number): void 
    {
            const listObstacleNeedToReset = []
            for (let i = 0; i < this.objs.length; i++) {

                    if (this.objs[i].getShape().getCoord().getX() <= 900)
                        this.objs[i]
                        .getShape()
                            .getCoord()
                            .setX(
                                this.objs[i].getShape().getCoord().getX() -
                                    (deltaTime *
                                        (Speed.getSpeed() + this.objs[i].getMoveSpeed())) /
                                        Speed.getDefaultSpeed()
                            )
                    else
                        this.objs[i]
                        .getShape().getCoord()
                            .setX(
                                this.objs[i].getShape().getCoord().getX() -
                                    (deltaTime * Speed.getSpeed()) / Speed.getDefaultSpeed()
                            )
    
                    if (
                        this.objs[i].getShape().getHighestX() < 0 
                    ) {
                        listObstacleNeedToReset.push(i)
                    }
                    this.objs[i].getSprite().goToNext(deltaTime)
            }
    
            let maxX = 0
            for (let i = 0; i < this.objs.length; i++)
                maxX =
                    maxX > this.objs[i].getShape().getCoord().getX()
                        ? maxX
                        : this.objs[i].getShape().getCoord().getX()
            for (let i = 0, j = 0; i < listObstacleNeedToReset.length; i++) {
                j = listObstacleNeedToReset[i]
                maxX += Math.floor(Math.random() * 500) + 100
                this.objs[j].getShape().getCoord().setX(maxX)
            }
        
    }

    public getDecors(): Decor[]
    {
        return this.objs
    }

}