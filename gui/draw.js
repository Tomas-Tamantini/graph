const DRAW_STYLE = {
  DEFAULT: 1,
  MOUSE_HOVER: 2,
  BEING_DRAGGED: 3,
}

function draw_node(node, style = DRAW_STYLE.DEFAULT) {
  push()
  translate(node.position.x, node.position.y)
  let radius = 18
  switch (style) {
    case DRAW_STYLE.MOUSE_HOVER:
      radius = 20
      break
    case DRAW_STYLE.BEING_DRAGGED:
      fill(0, 255, 0)
      break
    default:
      break
  }
  ellipse(0, 0, radius)

  fill(0)
  let lbl = node.label + ""
  let off_y = radius / 4.5
  let off_x = lbl.length == 1 ? -radius / 5.2 : -radius / 2.6
  text(lbl, off_x, off_y)
  pop()
}

function draw_edge(edge, style = DRAW_STYLE.DEFAULT) {
  push()
  switch (style) {
    default:
      break
  }
  let n_a = edge.node_a.position
  let n_b = edge.node_b.position
  line(n_a.x, n_a.y, n_b.x, n_b.y)
  pop()
}

function draw_graph(graph, mouse_handler) {
  mouse_handler.update_node_position()
  for (let edge of graph.edges) draw_edge(edge)
  for (let node of graph.nodes) {
    let style = DRAW_STYLE.DEFAULT
    if (mouse_handler.node_being_dragged) {
      if (node === mouse_handler.node_being_dragged) {
        style = DRAW_STYLE.BEING_DRAGGED
      }
    } else {
      if (node === mouse_handler.node_with_mouse_over()) {
        style = DRAW_STYLE.MOUSE_HOVER
      }
    }
    draw_node(node, style)
  }
}
