function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2)
  let na = new Node(1, createVector(100, 200))
  let nb = new Node("a", createVector(200, 100))
  let e = new Edge(na, nb)
  g = new Graph([na, nb], [e])
}

function draw() {
  background(51, 56, 66)
  draw_graph(g)
}
