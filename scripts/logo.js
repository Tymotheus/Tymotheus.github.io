export default class Logo{
    //Simple class representing a logo turtle drawing on a board
    constructor(x, y, angle){
        this.x_position = +x;
        this.y_position = +y;
        this.angle = +angle;
        this.keep_drawing = true;
    }

    forward(distance){
        const vector = [Math.cos(this.angle*Math.PI/180), Math.sin(this.angle*Math.PI/180) ]
        this.x_position += vector[0]*distance
        this.y_position += vector[1]*distance
        return [this.x_position,this.y_position]    

    }

    rotate_left(angle){
        this.angle -= +angle
        console.log(this.angle)
    }

    rotate_right(angle){
        this.angle += +angle
        console.log(this.angle)
    }

}