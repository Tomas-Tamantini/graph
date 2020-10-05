const DRAW_STYLE = {
  DEFAULT: 1,
  HOVER: 2,
  DRAG: 3,
}

class GraphUI {
  constructor(graph) {
    this._graph = graph
    this._nodes = []
    this._edges = []
    this._reset_path()
    this._drag_handler = new DragHandler()
    this._waiting_for_path_input = false
    this._path_str = this._graph.path_str
  }

  _get_node_obj(search_node) {
    for (let node_obj of this._nodes) {
      let { node } = node_obj
      if (node === search_node) return node_obj
    }
    return null
  }

  _get_edge_obj(node_a, node_b) {
    for (let edge_obj of this._edges) {
      let { edge } = edge_obj
      if (edge.connects(node_a, node_b)) return edge_obj
    }
    return null
  }

  _reset_path() {
    this._nodes = this._graph.nodes.map(node => ({ node, is_on_path: false }))
    this._edges = this._graph.edges.map(edge => ({ edge, is_on_path: false }))
  }

  _update_path(new_path) {
    this._remove_wait_path_input()
    this._reset_path()
    for (let i = 0; i < new_path.length; i++) {
      let current_node = new_path[i]
      let current_node_obj = this._get_node_obj(current_node)
      if (current_node_obj === null)
        throw "Unexpected error. Nodes in model and UI aren't in sync?"
      current_node_obj.is_on_path = true
      if (i === 0) continue
      let previous_node = new_path[i - 1]
      let edge = this._get_edge_obj(previous_node, current_node)
      if (edge === null)
        throw "Unexpected error. Nodes in model and UI aren't in sync?"
      edge.is_on_path = true
    }
    this._path_str = this._graph.path_str
  }

  _draw_node(node, options, style = DRAW_STYLE.DEFAULT) {
    let { is_on_path, is_possible_edge, waiting_for_path_input } = options

    push()
    stroke(0, 165, 255)
    fill("#ffae19")
    if (is_on_path) {
      strokeWeight(3)
      if (is_possible_edge) {
        stroke("#c724b1")
      } else stroke("#f5dd29")
    } else if (waiting_for_path_input) {
      stroke("#c724b1")
    }
    translate(node.position.x, node.position.y)
    let radius = 18
    switch (style) {
      case DRAW_STYLE.HOVER:
        radius = 20

        break
      case DRAW_STYLE.DRAG:
        fill("#34d81d")
        break
      default:
        break
    }
    ellipse(0, 0, radius)

    fill("#0a1172")
    stroke("#0a1172")
    strokeWeight(1)
    let lbl = node.label + ""
    let off_y = radius / 4.5
    let off_x = lbl.length == 1 ? -radius / 5.2 : -radius / 2.6
    text(lbl, off_x, off_y)
    pop()
  }

  _draw_edge(edge, options) {
    let { is_on_path } = options
    push()
    stroke(0, 165, 255)
    if (is_on_path) {
      strokeWeight(3)
      stroke("#f5dd29")
    }
    let { start, end } = edge.position

    line(start.x, start.y, end.x, end.y)
    pop()
  }

  _draw_nodes() {
    let special_node, special_node_style
    if (this._drag_handler.node_being_dragged) {
      special_node = this._drag_handler.node_being_dragged
      special_node_style = DRAW_STYLE.DRAG
    } else {
      special_node = this._node_mouse_over()
      special_node_style = DRAW_STYLE.HOVER
    }
    for (let node_obj of this._nodes) {
      let { node, ...options } = node_obj
      if (node === special_node) {
        this._draw_node(node, options, special_node_style)
      } else this._draw_node(node, options)
    }
  }

  _draw_edges() {
    for (let edge_obj of this._edges) {
      let { edge, ...options } = edge_obj
      this._draw_edge(edge, options)
    }
  }

  _write_path() {
    let txt = this._path_str
    let txt_width = textWidth(txt)

    push()
    stroke(220)
    fill(220)
    textSize(18)
    translate((width - txt_width) / 2, (height * 19) / 20)
    text(txt, 0, 0)
    pop()
  }

  draw() {
    this._drag_handler.update_node_position()
    this._draw_edges()
    this._draw_nodes()
    this._write_path()
  }

  _node_mouse_over() {
    let hover_radius = 10
    let r_sq = hover_radius * hover_radius
    for (let node_obj of this._nodes) {
      let { node } = node_obj
      let d_sq = node.dist_sq({ x: mouseX, y: mouseY })
      if (d_sq <= r_sq) return node
    }
    return null
  }
  _remove_wait_path_input() {
    this._waiting_for_path_input = false
    for (let node of this._nodes) {
      delete node.waiting_for_path_input
      delete node.is_possible_edge
    }
  }

  _add_disambiguated_path(edge_node) {
    let node_waiting_input
    for (let node_obj of this._nodes) {
      if (node_obj.waiting_for_path_input) {
        node_waiting_input = node_obj.node
        break
      }
    }
    let response = this._graph.try_add_to_path(node_waiting_input, edge_node)
    if (response.added) this._update_path(response.new_path)
  }

  mouse_pressed() {
    //TODO: Check if is waiting for path input here. Otherwise, it's a drag command, coded below
    let node
    if (this._waiting_for_path_input) {
      node = this._node_mouse_over()
      if (node !== null) {
        let node_obj = this._get_node_obj(node)
        if (node_obj.is_possible_edge) {
          this._add_disambiguated_path(node)
        }
      }
      this._remove_wait_path_input()
    }

    if (this._drag_handler.node_being_dragged !== null) return

    node = this._node_mouse_over()
    if (node === null) return
    this._drag_handler.drag_node(node)
  }

  mouse_released() {
    this._drag_handler.release_node()
  }

  mouse_double_clicked() {
    this._drag_handler.release_node()
    let node = this._node_mouse_over()
    if (node === null) return

    let node_obj = this._get_node_obj(node)

    if (node_obj.is_on_path) {
      let response = this._graph.try_remove_from_path(node)
      if (response.removed) this._update_path(response.new_path)
    } else {
      let response = this._graph.try_add_to_path(node)
      if (response.added) this._update_path(response.new_path)
      else {
        if (response.msg === "Two possible connections") {
          let { first_node, last_node } = response
          this._waiting_for_path_input = true
          node_obj.waiting_for_path_input = true
          let first_node_obj = this._get_node_obj(first_node)
          let second_node_obj = this._get_node_obj(last_node)

          first_node_obj.is_possible_edge = true
          second_node_obj.is_possible_edge = true
        }
      }
    }
  }
}
