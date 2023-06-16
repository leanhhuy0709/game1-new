import GameObject from '../../game-objects/GameObject'
import Component from '../Component'

//Body can be affected by many forces
export default class Collider extends Component {
    //do nothing
    public constructor(obj: GameObject) {
        super(obj)
    }
}
