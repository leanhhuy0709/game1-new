export default class Loader {
    private static imageMap: { [key: string]: HTMLImageElement } = {}
    private static audioMap: { [key: string]: HTMLAudioElement } = {}
    private static count = 0
    private static Length = 0

    public static getImage(key: string) {
        if (!Loader.imageMap[key]) {
            Loader.imageMap[key] = new Image()
            Loader.imageMap[key].src = key
        }
        return Loader.imageMap[key]
    }

    public static loadAllImages(imagePath: string[]) {
        Loader.Length = imagePath.length
        for (let i = 0; i < imagePath.length; i++) {
            this.imageMap[imagePath[i]] = new Image()
            this.imageMap[imagePath[i]].src = imagePath[i]
        }

        for (let i = 0; i < imagePath.length; i++) {
            this.imageMap[imagePath[i]].onload = () => {
                Loader.count++
                //console.log(`${Loader.count}/${Loader.Length}`)
            }
        }
    }

    public static isLoadComplete() {
        return Loader.count == Loader.Length - 1//fix it
    }
}
