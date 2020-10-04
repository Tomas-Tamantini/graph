function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight / 2)
  canvas.doubleClicked(mouseDoubleClicked)

  graph = adjacent_primes(5)
  graph_ui = new GraphUI(graph)
}

function draw() {
  background(51, 56, 66)
  graph_ui.draw()
}

function mousePressed() {
  graph_ui.mouse_pressed()
}

function mouseReleased() {
  graph_ui.mouse_released()
}

function mouseDoubleClicked() {
  graph_ui.mouse_double_clicked()
}
