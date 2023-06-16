import GameObject from '../game-objects/GameObject'

export default abstract class Component {
    protected parent: GameObject

    public constructor(obj: GameObject) {
        this.parent = obj
    }

    public update(_deltaTime: number): void {
        //
    }
}
