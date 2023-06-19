import GameObject from '../../game-objects/GameObject'
import Collider from './Collider'
import Movement from './Movement'

export default class CollisionManager {
    public static checkCollision(object1: GameObject, object2: GameObject): boolean {
        const c1 = object1.getComponent<Collider>(Collider)
        const c2 = object2.getComponent<Collider>(Collider)

        if (c1.length == 0 || c2.length == 0) return false
        const x1 = object1.getX(),
            y1 = object1.getY(),
            x2 = object2.getX(),
            y2 = object2.getY(),
            w1 = object1.getWidth(),
            h1 = object1.getHeight(),
            w2 = object2.getWidth(),
            h2 = object2.getHeight()

        if (x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + h1 >= y2 && y1 <= y2 + h2) {
            CollisionManager.resolveCollision(object1, object2)
            return true
        }
        return false
    }

    public static resolveCollision(object1: GameObject, object2: GameObject) {
        const x1 = object1.getX(),
            y1 = object1.getY(),
            x2 = object2.getX(),
            y2 = object2.getY(),
            w1 = object1.getWidth(),
            h1 = object1.getHeight(),
            w2 = object2.getWidth(),
            h2 = object2.getHeight()

        //take component body from object1
        const moves1 = object1.getComponent<Movement>(Movement)
        const moves2 = object2.getComponent<Movement>(Movement)
        let move1: Movement | null, move2: Movement | null
        if (moves1.length > 0) move1 = moves1[0]
        else move1 = null
        if (moves2.length > 0) move2 = moves2[0]
        else move2 = null
        //check va cham x or y

        const deltaX = x2 + w2 - (x1 + w1),
            deltaY = y2 + h2 - (y1 + h1)

        let check = Math.abs(deltaX) > Math.abs(deltaY)
        const oldCheck = check

        if (check) {
            if (move1) {
                const temp = move1.getVelocity().getDirection().getY()
                if (y1 < y2) {
                    if (temp < 0) check = !oldCheck
                } else if (y1 > y2) {
                    if (temp > 0) check = !oldCheck
                }
            } else if (move2) {
                const temp = move2.getVelocity().getDirection().getY()
                if (y1 < y2) {
                    if (temp > 0) check = !oldCheck
                } else if (y1 > y2) {
                    if (temp < 0) check = !oldCheck
                }
            }
        } else {
            if (move1) {
                const temp = move1.getVelocity().getDirection().getX()
                if (x1 < x2) {
                    if (temp < 0) check = !oldCheck
                } else if (x1 > x2) {
                    if (temp > 0) check = !oldCheck
                }
            } else if (move2) {
                const temp = move2.getVelocity().getDirection().getX()
                if (x1 < x2) {
                    if (temp > 0) check = !oldCheck
                } else if (x1 > x2) {
                    if (temp < 0) check = !oldCheck
                }
            }
        }

        if (check) {
            if (move1)
                move1.setVelocity(
                    move1.getVelocity().getMagnitudeX(),
                    move1.getVelocity().getDirection().getX(),
                    0
                )
            if (move2)
                move2.setVelocity(
                    move2.getVelocity().getMagnitudeX(),
                    move2.getVelocity().getDirection().getX(),
                    0
                )
            if (y1 < y2) {
                const k = y1 + h1 - y2
                let a = -k / 2
                let b = k / 2
                if (!move1) {
                    a = 0
                    b *= 2
                }
                if (!move2) {
                    a *= 2
                    b = 0
                }
                object1.setY(y1 + a)
                object2.setY(y2 + b)
            } else if (y1 > y2) {
                const k = y2 + h2 - y1
                let a = +k / 2
                let b = -k / 2
                if (!move1) {
                    a = 0
                    b *= 2
                }
                if (!move2) {
                    a *= 2
                    b = 0
                }
                object1.setY(y1 + a)
                object2.setY(y2 + b)
            }
        } else {
            if (move1)
                move1.setVelocity(
                    move1.getVelocity().getMagnitudeY(),
                    0,
                    move1.getVelocity().getDirection().getY()
                )

            if (move2)
                move2.setVelocity(
                    move2.getVelocity().getMagnitudeY(),
                    0,
                    move2.getVelocity().getDirection().getY()
                )

            if (x1 < x2) {
                const k = x1 + w1 - x2
                let a = -k / 2
                let b = k / 2
                if (!move1) {
                    a = 0
                    b *= 2
                }
                if (!move2) {
                    a *= 2
                    b = 0
                }
                object1.setX(x1 + a)
                object2.setX(x2 + b)
            } else if (x1 > x2) {
                const k = x2 + w2 - x1
                let a = k / 2
                let b = -k / 2
                if (!move1) {
                    a = 0
                    b *= 2
                }
                if (!move2) {
                    a *= 2
                    b = 0
                }
                object1.setX(x1 + a)
                object2.setX(x2 + b)
            }
        }
    }
}
