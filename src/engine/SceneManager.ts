import Scene from './Scene'

class SceneManager {
    scene: Scene
    private static nextSceneName: string
    public constructor(scene: Scene) {
        this.scene = scene
        SceneManager.nextSceneName = this.scene.getName()
    }

    public update(deltaTime: number): void {
        this.scene.update(deltaTime)
    }

    public render(): void {
        this.scene.render()
    }

    public setNewScene(scene: Scene): void {
        this.scene.clear()
        this.scene = scene
    }

    public isNeedToChangeScene(): boolean {
        return SceneManager.nextSceneName !== this.scene.getName()
    }

    public static setNextScene(sceneName: string): void {
        SceneManager.nextSceneName = sceneName
    }

    public static getNextScene(): string {
        return SceneManager.nextSceneName
    }
}

export default SceneManager
