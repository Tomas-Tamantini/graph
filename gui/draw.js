const DRAW_STYLE = {
  DEFAULT: 0,
}

function draw_node(node, style = DRAW_STYLE.DEFAULT) {
  push()
  translate(node.position.x, node.position.y)
  let radius
  switch (style) {
    default:
      radius = 18
      break
  }
  ellipse(0, 0, radius)

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

function draw_graph(graph) {
  for (let edge of graph.edges) draw_edge(edge)
  for (let node of graph.nodes) draw_node(node)
}
