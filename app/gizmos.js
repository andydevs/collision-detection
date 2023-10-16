/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
export class Gizmo {
    constructor(expires) {
        this.expires = expires
    }

    draw(screen) {}
}

export class CollisionGizmo extends Gizmo {
    constructor(expires, position, incomingVelocity, reflectionLine, outgoingVelocity, radius=20) {
        super(expires)
        this.radius = radius
        this.position = position
        this.incomingVelocity = incomingVelocity
        this.outgoingVelocity = outgoingVelocity
        this.reflectionLine = reflectionLine
    }

    draw(screen) {
        screen.drawRay(this.position, this.incomingVelocity.unit, this.radius, '#f44') // Incoming velocity
        screen.drawRay(this.position, this.reflectionLine.unit, this.radius, '#44f')      // Reflection line
        screen.drawRay(this.position, this.outgoingVelocity.unit, this.radius, '#3f3', 1)    // New Velocity
    }
}

export class LineGizmo extends Gizmo {
    constructor(expires, start, end) {
        super(expires)
        this.start = start
        this.end = end
    }

    draw(screen) {
        screen.drawLine(this.start, this.end, '#bbbbbb')
    }
}

export class CircleGizmo extends Gizmo {
    constructor(expires, pos, radius, color='white') {
        super(expires)
        this.pos = pos
        this.radius = radius
        this.color = color
    }

    draw(screen) {
        screen.drawCircle(this.pos, this.radius, this.color)
    }
}

export class RectGizmo extends Gizmo {
    constructor(expires, rect, color='white') {
        super(expires)
        this.rect = rect
        this.color = color
    }

    draw(screen) {
        screen.drawRect(this.rect, this.color)
    }
}