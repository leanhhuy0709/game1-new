import Camera from '../camera/Camera'
import GameObject from '../game-objects/GameObject'
import Canvas from '../renderer/canvas/Canvas'
import RenderComponent from './RenderComponent'
import Text from './Text'

export default class Button extends RenderComponent {
    private text: Text
    private isHover: boolean

    public constructor(obj: GameObject, depth = 1, content = '') {
        super(obj, depth)
        this.text = new Text(
            new GameObject(obj.getX() + obj.getWidth() / 2, obj.getY() + obj.getHeight() / 2, 0, 0),
            depth,
            content,
            `30px 'Montserrat', sans-serif`,
            'center',
            'white',
            'middle'
        )
        this.isHover = false
    }

    public getText(): Text {
        return this.text
    }

    public setContent(content: string): void {
        this.text.setContent(content)
    }

    public render(camera = new Camera()): void {
        super.render()
        if (Canvas.ctx) {
            Canvas.ctx.beginPath()
            Canvas.ctx.fillStyle = this.isHover ? '#ffffff' : '#0d63fd'
            Canvas.ctx.roundRect(
                this.parent.getX() - camera.getX(),
                this.parent.getY() - camera.getY(),
                this.parent.getWidth(),
                this.parent.getHeight(),
                10
            )
            Canvas.ctx.closePath()
            Canvas.ctx.fill()
            this.text.setColor(this.isHover ? '#0d63fd' : '#ffffff')
            this.text.render()
        }
    }

    public isClicked(x: number, y: number): boolean {
        return (
            x >= this.parent.getX() &&
            x <= this.parent.getX() + this.parent.getWidth() &&
            y >= this.parent.getY() &&
            y <= this.parent.getY() + this.parent.getHeight()
        )
    }

    public isHovered(x: number, y: number): boolean {
        this.isHover =
            x >= this.parent.getX() &&
            x <= this.parent.getX() + this.parent.getWidth() &&
            y >= this.parent.getY() &&
            y <= this.parent.getY() + this.parent.getHeight()
        return this.isHover
    }
}
