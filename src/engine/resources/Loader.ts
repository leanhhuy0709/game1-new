export default class Loader {
    private static imageMap: { [key: string]: HTMLImageElement } = {}
    private static audioMap: { [key: string]: HTMLAudioElement } = {}
    private static count = 0
    private static Length = 0

    public static getImage(key: string)
    {
        return Loader.imageMap[key]
    }

    public static loadAllImages(imagePath: string[], audioPath: string[])
    {
        Loader.Length = imagePath.length + audioPath.length
        for (let i = 0; i < imagePath.length; i++)
        {
            this.imageMap[imagePath[i]] = new Image()
            this.imageMap[imagePath[i]].src = imagePath[i]
        }

        for (let i = 0; i < audioPath.length; i++)
        {
            //skip it
        }

        for (let i = 0; i < imagePath.length; i++)
        {
            this.imageMap[imagePath[i]].onload = () => {
                Loader.count++
            }
        }
    }

    public static isLoadComplete()
    {
        return Loader.count == Loader.Length
    }
}

