import GameObject from '../../game-objects/GameObject'
import Component from '../Component'

export default class Collider extends Component {
    public constructor(obj: GameObject) {
        super(obj)
    }
}
