import Camera from '../camera/Camera'
import GameObject from '../game-objects/GameObject'
import Component from './Component'

export default class RenderComponent extends Component {
    protected depth: number
    protected isActive: boolean

    public constructor(obj: GameObject, depth: number) {
        super(obj)
        this.depth = depth
        this.isActive = true
    }

    public render(_camera = new Camera()): void {
        //
    }

    public setDepth(depth: number): void {
        this.depth = depth
    }

    public getDepth(): number {
        return this.depth
    }

    public getIsActive(): boolean {
        return this.isActive
    }

    public setIsAcitve(isActive: boolean): void {
        this.isActive = isActive
    }
}
