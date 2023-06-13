import InputHandler from './InputHandler'

class Scene {
    protected input: InputHandler
    protected name: string

    public constructor(name: string) {
        this.input = new InputHandler()
        this.name = name
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(deltaTime: number): void {
        //
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(): void {
        //
    }

    public clear(): void {
        this.input.clear()
    }

    public getName(): string {
        return this.name
    }
}

export default Scene
