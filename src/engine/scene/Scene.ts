import CollisionManager from "../component/physics/CollisionManager"
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
        this.renderer.update(deltaTime)
        for (let i = 0; i + 1 < this.gameObjects.length; i++)
        {
            for (let j = i + 1; j < this.gameObjects.length; j++)
            {
                const obj1 = this.gameObjects[i]
                const obj2 = this.gameObjects[j]
                CollisionManager.checkCollision(obj1, obj2)
            }
        }
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

    public addObject(obj: GameObject)
    {
        this.gameObjects.push(obj)
        this.renderer.addToQueue(obj)
    }
}

export default Scene
