function setup() {
  createCanvas(windowWidth / 2, windowHeight / 2)
  na = new Node(1, createVector(100, 200))
  nb = new Node("a", createVector(200, 100))
  e = new Edge(na, nb)
}

function draw() {
  background(51, 56, 66)
  draw_edge(e)
  draw_node(na)
  draw_node(nb)
}
