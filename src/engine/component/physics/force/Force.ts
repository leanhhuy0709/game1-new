import ForceVector from './ForceVector'

export default class Force {
    private forceVector: ForceVector

    public constructor(magnitude: number, x: number, y: number) {
        this.forceVector = new ForceVector(magnitude, x, y)
    }

    public getForceVector(): ForceVector {
        return this.forceVector
    }

    public static calculateTotalForce(forces: Force[]): Force {
        let totalForceX = 0
        let totalForceY = 0

        for (const force of forces) {
            totalForceX += force.forceVector.getMagnitudeX()
            totalForceY += force.forceVector.getMagnitudeY()
        }

        const totalMagnitude = Math.sqrt(totalForceX ** 2 + totalForceY ** 2)
        if (totalMagnitude == 0) {
            return new Force(0, 0, 0)
        } else
            return new Force(
                totalMagnitude,
                totalForceX / totalMagnitude,
                totalForceY / totalMagnitude
            )
    }
}

export const GRAVITY = new Force(0.005, 0, 1)
export const MASS = 1
