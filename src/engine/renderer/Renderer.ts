import Camera from "../camera/Camera"
import RenderComponent from "../component/RenderComponent"
import GameObject from "../game-objects/GameObject"

class Renderer {
    private renders: RenderComponent[]
    private camera: Camera

    public constructor(speed: number)
    {
        this.renders = []
        this.camera = new Camera(speed)
    }
    
    public addToQueue(obj: GameObject): void {
        const comps = obj.getComponents()
        //->GameObject[]
        for (let i = 0; i < comps.length; i++)
        {
            if (comps[i] instanceof RenderComponent)
            {
                this.renders.push(comps[i] as RenderComponent)
            }
        }
    }

    public sortQueue(): void
    {
        this.renders.sort((e1, e2) => e1.getDepth() - e2.getDepth())
    }

    public renderAll() {
        this.sortQueue()
        for (let i = 0; i < this.renders.length; i++)
        {
            this.renders[i].render(this.camera)
        }
    }

    public update(deltaTime: number)
    {
        this.camera.update(deltaTime)
    }
}

export default Renderer
