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

    stillvalid(clock) {
        return clock.time < this.expires
    }
}

export class RayGizmo extends Gizmo {
    constructor(expires, pos, dir, rad, color='white', linewidth=1) {
        super(expires)
        this.position = pos
        this.direction = dir
        this.radius = rad
        this.color = color
        this.linewidth = linewidth
    }

    draw(screen) {
        screen.drawRay(this.position, 
            this.direction.unit, this.radius, 
            this.color, this.linewidth)
    }
}

export class LineGizmo extends Gizmo {
    constructor(expires, start, end, color='white', linewidth=1) {
        super(expires)
        this.start = start
        this.end = end
        this.color = color
        this.linewidth = linewidth
    }

    draw(screen) {
        screen.drawLine(this.start, this.end, this.color)
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