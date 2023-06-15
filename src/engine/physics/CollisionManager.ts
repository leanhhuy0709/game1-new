import Coord from '../component/Coord'
import GameObject from '../game-objects/GameObject'
import Circle from '../shape/Circle'
import Rectangle from '../shape/Rectangle'

export default class CollisionManager {
    private objectList: GameObject[]

    public constructor() {
        this.objectList = []
    }

    public add(object: GameObject): void {
        this.objectList.push(object)
    }

    public handleCollision(): void {
        for (let i = 0; i < this.objectList.length; i++) {
            for (let j = i + 1; j < this.objectList.length; j++) {
                //do something
                CollisionManager.checkCollision(this.objectList[i], this.objectList[j])
            }
        }
    }

    public static checkCollision(o1: GameObject, o2: GameObject): boolean {
        //do something
        let check = false
        if (o1.getShape() instanceof Rectangle) {
            const rect1 = o1.getShape() as Rectangle
            if (o2.getShape() instanceof Rectangle) {
                const rect2 = o2.getShape() as Rectangle
                const x1 = rect1.getCoord().getX()
                const y1 = rect1.getCoord().getY()
                const w1 = rect1.getSize().getWidth()
                const h1 = rect1.getSize().getHeight()
                const x2 = rect2.getCoord().getX()
                const y2 = rect2.getCoord().getY()
                const w2 = rect2.getSize().getWidth()
                const h2 = rect2.getSize().getHeight()

                if (x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + h1 >= y2 && y2 + h2 >= y1) {
                    //4 case
                    //o1 in front of o2
                    if (y1 < y2) {
                        const k = y1 + h1 - y2
                        o1.setY(y1 - k / 2)
                        o2.setY(y2 + k / 2)
                    }
                    else if (y1 > y2) {
                        const k = y2 + h2 - y1
                        o1.setY(y1 + k / 2)
                        o2.setY(y2 - k / 2)
                    }

                    if (x1 < x2) {
                        const k = x1 + w1 - x2
                        o1.setX(x1 - k / 2)
                        o2.setX(x2 + k / 2)
                    }
                    else if (x1 > x2) {
                        const k = x2 + w2 - x1
                        o1.setX(x1 + k / 2)
                        o2.setX(x2 - k / 2)
                    }
                    check = true
                }
            }
        }
        else if (o1.getShape() instanceof Circle) {
            const cir1 = o1.getShape() as Circle
            if (o2.getShape() instanceof Circle) {
                const cir2 = o2.getShape() as Circle
                const x1 = cir1.getCoord().getX()
                const y1 = cir1.getCoord().getY()
                const x2 = cir2.getCoord().getX()
                const y2 = cir2.getCoord().getY()
                const r1 = cir1.getRadius()
                const r2 = cir2.getRadius()

                if (Coord.distance(x1, y1, x2, y2) < r1 + r2)
                {
                    const k = r1 + r2 - Coord.distance(x1, y1, x2, y2)
                    const dx = x2 - x1
                    const dy = y2 - y1
                    const d = Math.sqrt(dx * dx + dy * dy)
                    const nx = dx / d
                    const ny = dy / d

                    o1.setX(x1 - nx * k / 2)
                    o1.setY(y1 - ny * k / 2 + 1)
                    o2.setX(x2 + nx * k / 2)
                    o2.setY(y2 + ny * k / 2 + 1)
                }

                check = true
            }
        }

        return check
    }
}
