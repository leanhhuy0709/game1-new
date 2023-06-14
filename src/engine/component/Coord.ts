export default class Coord {
    private x: number
    private y: number

    public constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    public getX(): number {
        return this.x
    }

    public setX(x: number): void {
        this.x = x
    }

    public getY(): number {
        return this.y
    }

    public setY(y: number): void {
        this.y = y
    }

    public setCoord(x: number, y: number): void {
        this.x = x
        this.y = y
    }

    public static distance(x1: number, y1: number, x2: number, y2: number)
    {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    }
}
