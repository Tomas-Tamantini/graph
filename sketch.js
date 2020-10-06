function setup() {
  canvas = createCanvas(windowWidth, (windowHeight * 3) / 5)
  canvas.parent("sketch-holder")
  canvas.doubleClicked(mouseDoubleClicked)

  input_handler = new InputHandler(change_max_number)
  let graph = prime_pairs(9)
  graph_ui = new GraphUI(graph)
}

function draw() {
  background(51, 56, 66)
  graph_ui.draw()
  input_handler.prompt_input()
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

function change_max_number() {
  let value = input_handler.max_number
  let graph = prime_pairs(value)
  graph_ui = new GraphUI(graph)
}
