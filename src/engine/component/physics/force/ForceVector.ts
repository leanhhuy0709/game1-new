import Coord from '../../Coord'

export default class ForceVector {
    private magnitude: number
    private direction: Coord

    public constructor(magnitude: number, x: number, y: number) {
        this.magnitude = magnitude
        this.direction = new Coord(x, y)
        this.setUpDirection()
    }

    public getMagnitude(): number {
        return this.magnitude
    }

    public getDirection(): Coord {
        return this.direction
    }

    public setMagnitude(magnitude: number): void {
        this.magnitude = magnitude
    }

    public setDirection(x: number, y: number): void {
        this.direction.setCoord(x, y)
        this.setUpDirection()
    }

    public getMagnitudeX(): number {
        return this.magnitude * this.direction.getX()
    }

    public getMagnitudeY(): number {
        return this.magnitude * this.direction.getY()
    }

    public setUpDirection(): void {
        const x = this.direction.getX(),
            y = this.direction.getY()
        const d = Math.sqrt(x * x + y * y)
        if (d == 0) {
            this.direction = new Coord(0, 0)
            this.magnitude = 0
        } else this.direction.setCoord(x / d, y / d)
    }
}
