import Scene from './Scene'

class SceneManager {
    private scene: Scene
    private nextSceneName: string
    public constructor(scene: Scene) {
        this.scene = scene
        this.nextSceneName = this.scene.getName()
    }

    public getScene(): Scene
    {
        return this.scene
    }

    public setNewScene(scene: Scene): void {
        this.scene.clear()
        this.scene = scene
        this.nextSceneName = this.scene.getName()
    }

    public isNeedToChangeScene(): boolean {
        return this.nextSceneName !== this.scene.getName()
    }

    public setNextScene(sceneName: string): void {
        this.nextSceneName = sceneName
    }

    public getNextScene(): string {
        return this.nextSceneName
    }
}

export default SceneManager
