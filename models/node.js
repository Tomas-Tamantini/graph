class Node {
  constructor(label, position) {
    this._label = label
    this._position = position
  }

  get label() {
    return this._label
  }

  get position() {
    return this._position
  }

  set position(new_pos) {
    this._position = new_pos
  }

  get_offset(point) {
    return { x: this.position.x - point.x, y: this.position.y - point.y }
  }

  dist_sq(point) {
    let { x, y } = this.get_offset(point)
    return x * x + y * y
  }
}
