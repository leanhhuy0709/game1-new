import GameObject from "../engine/game-objects/GameObject"
import Shape from "../engine/shape/Shape"

export default class Decor extends GameObject {
    protected moveSpeed: number
    
    public constructor(shape: Shape, imageHrefs: string[], spriteChangeIntervals: number, moveSpeed: number)
    {
        super(shape, imageHrefs, spriteChangeIntervals)
        this.moveSpeed = moveSpeed
    }
    
    public reset(_x: number)
    {
        //
    }

    public getMoveSpeed(): number {
        return this.moveSpeed
    }

}