class Edge {
  constructor(node_a, node_b) {
    this._node_a = node_a
    this._node_b = node_b
  }

  connects(node_1, node_2) {
    if (node_1 === this._node_a && node_2 === this._node_b) return true
    if (node_1 === this._node_b && node_2 === this._node_a) return true
    return false
  }

  get position() {
    let start = this._node_a.position
    let end = this._node_b.position
    return { start, end }
  }
}
