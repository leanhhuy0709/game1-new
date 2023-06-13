import GameObject from './GameObject'

class CollisionManager {
    public static check(o1: GameObject, o2: GameObject): boolean {
        const x1 = o1.getCoord().getX()
        const y1 = o1.getCoord().getY()
        const w1 = o1.getSize().getWidth() - 20
        const h1 = o1.getSize().getHeight() - 20
        const x2 = o2.getCoord().getX()
        const y2 = o2.getCoord().getY()
        const w2 = o2.getSize().getWidth() - 20
        const h2 = o2.getSize().getHeight() - 20
        // Reduce size
        return x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + h1 >= y2 && y2 + h2 >= y1
    }
}

export default CollisionManager
