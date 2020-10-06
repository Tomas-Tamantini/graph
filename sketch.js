function setup() {
  canvas = createCanvas(windowWidth, (windowHeight * 2) / 3)
  canvas.parent("sketch-holder")
  canvas.doubleClicked(mouseDoubleClicked)

  let graph = prime_pairs(8)
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
