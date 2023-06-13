import Coord from '../component/Coord'
import Renderer from './Renderer'

class InputHandler {
    private keyStates: { [key: string]: boolean }
    private mouseState: { [button: number]: boolean }
    private checkMouseDown: boolean
    private coord: Coord
    private coordHover: Coord

    public constructor() {
        this.keyStates = {}
        this.mouseState = {}
        this.checkMouseDown = false
        this.coord = new Coord(0, 0)
        this.coordHover = new Coord(0, 0)

        // Gắn các bộ lắng nghe sự kiện vào canvas
        Renderer.canvas.addEventListener('keydown', this.handleKeyDown.bind(this))
        Renderer.canvas.addEventListener('keyup', this.handleKeyUp.bind(this))
        Renderer.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
        Renderer.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
        Renderer.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
    }

    private handleKeyDown(event: KeyboardEvent) {
        this.keyStates[event.code] = true
    }

    private handleKeyUp(event: KeyboardEvent) {
        this.keyStates[event.code] = false
    }

    private handleMouseDown(event: MouseEvent) {
        const rect = Renderer.canvas.getBoundingClientRect()
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
        const rect = Renderer.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.coordHover.setCoord(x, y)
    }

    public clear() {
        Renderer.canvas.removeEventListener('keydown', this.handleKeyDown.bind(this))
        Renderer.canvas.removeEventListener('keyup', this.handleKeyUp.bind(this))
        Renderer.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this))
        Renderer.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    public isKeyDown(key: string): boolean {
        return this.keyStates[key]
    }

    public isKeyUp(key: string): boolean {
        return !this.keyStates[key]
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
}

export default InputHandler
