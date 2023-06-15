import Coord from "../component/Coord"
import Canvas from "../renderer/canvas/Canvas"

class InputHandler {
    private keyStatesDown: { [key: string]: boolean }
    private keyStatesUp: { [key: string]: boolean }
    private checkMouseDown: boolean
    private coord: Coord
    private coordHover: Coord
    private coordTouch: Coord
    private directTouch: string

    public constructor() {
        this.keyStatesDown = {}
        this.keyStatesUp = {}
        this.checkMouseDown = false
        this.coord = new Coord(0, 0)
        this.coordHover = new Coord(0, 0)
        this.coordTouch = new Coord(-1, -1)
        this.directTouch = ''

        // Not syn
        // push to queue
        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        Canvas.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
        Canvas.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
        Canvas.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
        Canvas.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this))
        Canvas.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this))
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.keyStatesDown[event.code] = true
        this.keyStatesUp[event.code] = false
    }

    private handleKeyUp(event: KeyboardEvent) {
        this.keyStatesDown[event.code] = false
        this.keyStatesUp[event.code] = true
    }

    private handleMouseDown(event: MouseEvent) {
        const rect = Canvas.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        this.checkMouseDown = true
        this.coord.setCoord(x, y)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private handleMouseUp(event: MouseEvent) {
        this.checkMouseDown = false
        this.coord.setCoord(0, 0)
    }

    private handleMouseMove(event: MouseEvent) {
        const rect = Canvas.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.coordHover.setCoord(x, y)
    }

    private handleTouchStart(event: TouchEvent) {
        //this.resetAllKeyEvent()
        const rect = Canvas.canvas.getBoundingClientRect()
        const touch = event.touches[0]
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        this.coordTouch.setCoord(x, y)
    }

    private handleTouchEnd(event: TouchEvent) {
        //this.resetAllKeyEvent()
        const rect = Canvas.canvas.getBoundingClientRect()
        const touch = event.changedTouches[0]
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        const tmp = this.getDirection(this.coordTouch.getX(), this.coordTouch.getY(), x, y)
        this.directTouch = tmp
    }

    public resetTouch() {
        this.coordTouch.setCoord(-1, -1)
        this.directTouch = ''
    }
    //
    //type TouchDirection = 'U' | 'L' | 'R' | 'D' | 'N'
    private getDirection(x1: number, y1: number, x2: number, y2: number): string {
        const x = x2 - x1
        const y = y2 - y1
        if (x < 0 && y < 0) {
            if (Math.abs(x) < Math.abs(y)) return 'U'
            else return 'L'
        }
        if (x < 0 && y > 0) {
            if (Math.abs(x) < Math.abs(y)) return 'D'
            else return 'L'
        }
        if (x > 0 && y < 0) {
            if (Math.abs(x) < Math.abs(y)) return 'U'
            else return 'R'
        }
        if (x > 0 && y > 0) {
            if (Math.abs(x) < Math.abs(y)) return 'D'
            else return 'R'
        }
        return 'N'
    }

    public isKeyDown(key: string): boolean {
        return this.keyStatesDown[key]
    }

    public isKeyUp(key: string): boolean {
        return this.keyStatesUp[key]
    }

    public isMouseDown(): boolean {
        return this.checkMouseDown
    }

    public isMouseUp(): boolean {
        return !this.checkMouseDown
    }

    public getMouseCoord(): Coord {
        return this.coord
    }

    public getMouseHoverCoord(): Coord {
        return this.coordHover
    }

    public isTouchDown(): boolean {
        return this.directTouch != ''
    }

    public getDirectTouch(): string {
        return this.directTouch
    }

    public getTouchCoord(): Coord {
        return this.coordTouch
    }

    public resetAllKeyEvent(): void {
        this.keyStatesDown = {}
        this.keyStatesUp = {}
    }
}
// 
export default InputHandler
