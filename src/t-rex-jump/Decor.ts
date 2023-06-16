import GameObject from "../engine/game-objects/GameObject"

export default class Decor extends GameObject {
    
    public constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
    }
    
    public reset(_x: number)
    {
        //
    }
}