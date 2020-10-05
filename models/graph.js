class Graph {
  constructor(nodes, edges) {
    this._nodes = nodes
    this._edges = edges
    this._path = []
  }

  get nodes() {
    return this._nodes
  }

  get edges() {
    return this._edges
  }

  get path_str() {
    let out = ""
    for (let node of this._path) {
      if (out.length > 0) out += "; "
      out += node.label + ""
    }
    return out
  }

  _are_connected(node_a, node_b) {
    for (let edge of this._edges) {
      if (edge.connects(node_a, node_b)) return true
    }
    return false
  }

  try_remove_from_path(node) {
    if (!this._path.includes(node))
      return { removed: false, msg: "New node is not on path" }

    let first_node = this._path[0]
    if (node === first_node) {
      this._path.shift()
      return { removed: true, new_path: [...this._path] }
    }

    let last_node = this._path[this._path.length - 1]
    if (node === last_node) {
      this._path.pop()
      return { removed: true, new_path: [...this._path] }
    }
    return { removed: false, msg: "New node is not on either edge of path" }
  }

  try_add_to_path(new_node, edge_node = null) {
    if (!this._nodes.includes(new_node))
      return { added: false, msg: "New node is not on graph" }

    if (this._path.length === 0) {
      this._path.push(new_node)
      return { added: true, new_path: [...this._path] }
    }

    if (this._path.includes(new_node))
      return { added: false, msg: "New node already on path" }

    let first_node
    let last_node = this._path[this._path.length - 1]
    let may_append_at_end = this._are_connected(new_node, last_node)

    if (may_append_at_end && edge_node === last_node) {
      this._path.push(new_node)
      return { added: true, new_path: [...this._path] }
    }

    let may_append_at_start = false
    if (this._path.length > 1) {
      first_node = this._path[0]
      may_append_at_start = this._are_connected(new_node, first_node)
    }

    if (may_append_at_start && edge_node === first_node) {
      this._path.unshift(new_node)
      return { added: true, new_path: [...this._path] }
    }

    if (may_append_at_end && !may_append_at_start) {
      this._path.push(new_node)
      return { added: true, new_path: [...this._path] }
    }

    if (may_append_at_start && !may_append_at_end) {
      this._path.unshift(new_node)
      return { added: true, new_path: [...this._path] }
    }

    if (!may_append_at_end && !may_append_at_start)
      return { added: false, msg: "Node doesn't connect to path" }

    return {
      added: false,
      msg: "Two possible connections",
      first_node,
      last_node,
    }
  }
}
