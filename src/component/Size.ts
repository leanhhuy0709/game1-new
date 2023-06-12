class Size {
    width: number
    height: number

    public constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public setWidth(width: number): void {
        this.width = width
    }

    public setHeight(height: number): void {
        this.height = height
    }

    public setSize(width: number, height: number): void {
        this.width = width
        this.height = height
    }
}

export default Size
