import Coord from '../component/Coord'
import Picture from '../component/Picture'
import Size from '../component/Size'
import Sprite from './Sprite'

class GameObject {
    protected coord: Coord
    protected size: Size
    protected sprite: Sprite

    public constructor(sprites: string[], delay: number, x = 0, y = 0, w = 0, h = 0) {
        const tmp = []
        for (let i = 0; i < sprites.length; i++) {
            tmp.push(new Picture(sprites[i], w, h))
        }
        this.sprite = new Sprite(tmp, delay)

        this.coord = new Coord(x, y)
        this.size = new Size(w, h)
    }

    public render(depth = 5) {
        const heightPicture = this.sprite.getCurrent().getSize().getHeight()
        this.sprite.render(this.coord.getX(), this.coord.getY() - heightPicture, depth)
    }

    public getCoord(): Coord {
        return this.coord
    }

    public getSize(): Size {
        return this.size
    }

    public getSprite(): Sprite {
        return this.sprite
    }

    public setCoord(coord: Coord): void {
        this.coord = coord
    }

    public setSize(w: number, h: number): void {
        this.size.setSize(w, h)
        this.sprite.setSize(w, h)
    }
}

export default GameObject
