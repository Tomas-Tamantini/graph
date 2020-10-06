function ordered_nodes(max_num, connection_criteria) {
  let nodes = radial_nodes(max_num)
  let edges = form_connections(nodes, connection_criteria)
  return new Graph(nodes, edges)
}

function radial_nodes(max_num) {
  let numbers_array = [...Array(max_num).keys()]
  return numbers_array.map(num => {
    let angle = (-1 / 2 + (2 * num) / max_num) * Math.PI
    let radius = Math.min(width / 3, height / 3)
    let position = {
      x: radius * Math.cos(angle) + width / 2,
      y: radius * Math.sin(angle) + height / 2,
    }
    return new Node(num + 1, position)
  })
}

function form_connections(nodes, connection_criteria) {
  let edges = []
  for (let i = 0; i < nodes.length - 1; i++) {
    let na = nodes[i]
    for (let j = i + 1; j < nodes.length; j++) {
      let nb = nodes[j]
      if (connection_criteria(na, nb)) edges.push(new Edge(na, nb))
    }
  }
  return edges
}
