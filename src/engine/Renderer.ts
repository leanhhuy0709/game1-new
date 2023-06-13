import Coord from '../component/Coord'
import Picture from '../component/Picture'
import Text from '../component/Text'

class Renderer {
    public static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game')
    public static ctx: CanvasRenderingContext2D | null = Renderer.canvas.getContext('2d')
    public static pictures: (Picture | Text)[] = []
    public static picCoords: Coord[] = []
    public static depths: number[] = []

    public static addToQueue(pic: Picture | Text, coord: Coord, depth: number) {
        Renderer.pictures.push(pic)
        Renderer.picCoords.push(coord)
        Renderer.depths.push(depth)

        for (let i = Renderer.pictures.length - 1; i > 0; i--) {
            if (Renderer.depths[i] < Renderer.depths[i - 1]) {
                const temp = Renderer.pictures[i]
                Renderer.pictures[i] = Renderer.pictures[i - 1]
                Renderer.pictures[i - 1] = temp

                const temp2 = Renderer.picCoords[i]
                Renderer.picCoords[i] = Renderer.picCoords[i - 1]
                Renderer.picCoords[i - 1] = temp2

                const temp3 = Renderer.depths[i]
                Renderer.depths[i] = Renderer.depths[i - 1]
                Renderer.depths[i - 1] = temp3
            } else break
        }
    }

    public static waitForAllImagesToLoadAndCallDraw() {
        let imageCount = 0
        for (let i = 0; i < Renderer.pictures.length; i++) {
            if (Renderer.pictures[i] instanceof Picture) {
                imageCount++
            }
        }

        let imagesLoaded = 0
        for (let i = 0; i < Renderer.pictures.length; i++) {
            if (Renderer.pictures[i] instanceof Picture) {
                const pic = Renderer.pictures[i] as Picture
                pic.getImage().onload = function () {
                    imagesLoaded++
                    if (imagesLoaded == imageCount) {
                        Renderer.drawAll()
                    }
                }
            }
        }
    }

    public static reset() {
        Renderer.pictures.length = 0
        Renderer.picCoords.length = 0
        Renderer.depths.length = 0
    }

    private static drawAll() {
        for (let i = 0; i < Renderer.pictures.length; i++) {
            if (Renderer.pictures[i] instanceof Picture) {
                const pic = Renderer.pictures[i] as Picture
                const coord = Renderer.picCoords[i]
                Renderer.ctx?.drawImage(
                    pic.getImage(),
                    coord.getX(),
                    coord.getY(),
                    pic.getSize().getWidth(),
                    pic.getSize().getHeight()
                )
            } else {
                const text = Renderer.pictures[i] as Text
                const coord = Renderer.picCoords[i]
                if (Renderer.ctx) {
                    Renderer.ctx.font = text.getFont()
                    Renderer.ctx.textAlign = text.getAlign()
                    Renderer.ctx.fillText(text.getContent(), coord.getX(), coord.getY())
                }
            }
        }

        Renderer.reset()
    }
}

export default Renderer
