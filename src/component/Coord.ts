class Coord {
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
}

export default Coord
