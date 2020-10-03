class MouseHandler {
  constructor(graph) {
    this.graph = graph
    this.node_being_dragged = null
    this.drag_offset = null
  }

  node_with_mouse_over() {
    let r_sq = 100
    for (let node of this.graph.nodes) {
      let dx = mouseX - node.position.x
      let dy = mouseY - node.position.y
      if (dx * dx + dy * dy <= r_sq) return node
    }
    return null
  }

  mouse_pressed() {
    if (this.node_being_dragged) return
    this.node_being_dragged = this.node_with_mouse_over()
    this.drag_offset = createVector(
      this.node_being_dragged.position.x - mouseX,
      this.node_being_dragged.position.y - mouseY
    )
  }

  mouse_released() {
    this.node_being_dragged = null
  }

  update_node_position() {
    if (!this.node_being_dragged) return
    let new_x = mouseX + this.drag_offset.x
    let new_y = mouseY + this.drag_offset.y
    if (new_x < 0) new_x = 0
    else if (new_x > width) new_x = width
    if (new_y < 0) new_y = 0
    else if (new_y > height) new_y = height
    this.node_being_dragged.position = createVector(new_x, new_y)
  }
}
