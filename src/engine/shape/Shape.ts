import Coord from '../component/Coord'

export default abstract class Shape {
    protected coord: Coord
    protected tag: string

    public constructor(x: number, y: number, tag: string) {
        this.coord = new Coord(x, y)
        this.tag = tag
    }

    public getCoord(): Coord {
        return this.coord
    }

    public setCoord(x: number, y: number): void {
        this.coord.setX(x)
        this.coord.setY(y)
    }

    public render(): void {
        //
    }

    public getTag(): string {
        return this.tag
    }

    public setTag(tag: string): void {
        this.tag = tag
    }

    public getHighestY(): number {
        return 0
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public setHighestY(y: number): void
    {
        //
    }
}
