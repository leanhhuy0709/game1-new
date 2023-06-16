import GameObject from "../game-objects/GameObject"
import InputHandler from "../input/InputHandler"
import Renderer from "../renderer/Renderer"


class Scene {
    protected input: InputHandler
    protected name: string
    protected renderer: Renderer
    protected gameObjects: GameObject[]

    public constructor(name: string, cameraSpeed = 0) {
        this.input = new InputHandler()
        this.name = name
        this.renderer = new Renderer(cameraSpeed)
        this.gameObjects = []
    }
    
    public update(deltaTime: number): void {
        for (let i = 0; i < this.gameObjects.length; i++)
            this.gameObjects[i].update(deltaTime)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(): void {
        this.renderer.sortQueue()
        this.renderer.renderAll()
    }

    public clear(): void {
        //
    }

    public getName(): string {
        return this.name
    }

    public addObjectToRenderQueue(obj: GameObject)
    {
        this.renderer.addToQueue(obj)
    }

    public addObject(obj: GameObject)
    {
        this.gameObjects.push(obj)
    }
}

export default Scene
