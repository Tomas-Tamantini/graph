class DragHandler {
  constructor() {
    this._node_being_dragged = null
    this._drag_offset = null
  }

  get node_being_dragged() {
    return this._node_being_dragged
  }

  drag_node(node) {
    if (this.node_being_dragged !== null) return
    this._node_being_dragged = node
    this._drag_offset = this.node_being_dragged.get_offset({
      x: mouseX,
      y: mouseY,
    })
  }

  release_node() {
    this._node_being_dragged = null
  }

  update_node_position() {
    if (this.node_being_dragged === null) return
    let x = this._contain_in_canvas(mouseX + this._drag_offset.x, width)
    let y = this._contain_in_canvas(mouseY + this._drag_offset.y, height)

    this._node_being_dragged.position = { x, y }
  }

  _contain_in_canvas(value, max_dim) {
    if (value < 0) return 0
    if (value > max_dim) return max_dim
    return value
  }
}
