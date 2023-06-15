import GameObject from '../game-objects/GameObject'
import Component from './Component'

export default class RenderComponent extends Component {
    protected depth: number

    public constructor(obj: GameObject, depth: number) {
        super(obj)
        this.depth = depth
    }

    public render(): void {
        //
    }

    public setDepth(depth: number): void {
        this.depth = depth
    }

    public getDepth(): number {
        return this.depth
    }
}
