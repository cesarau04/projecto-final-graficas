function getNextPosition(velocity, angle, h, x, gravity) {
    let radians = angle * (Math.PI / 180)
    let v_x = velocity * Math.cos(radians)
    let v_y = velocity * Math.sin(radians)

    let horizontalDistance = v_x * x
    let verticalDistance = h + v_y * x - gravity * Math.pow(x, 2)  / 2

    console.log("Horizontal distanace" + horizontalDistance);
    console.log("Vertical distanace" + verticalDistance);

    return [horizontalDistance, verticalDistance]
}