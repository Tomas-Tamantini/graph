function setup() {
  canvas = createCanvas(windowWidth, (windowHeight * 3) / 5)
  canvas.parent("sketch-holder")
  canvas.doubleClicked(mouseDoubleClicked)

  input_handler = new InputHandler(reset_graph_options)
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

function reset_graph_options() {
  let max_num = input_handler.max_number
  let option = input_handler.radio_value
  let graph
  switch (option) {
    case OPTIONS.SQUARE_PAIRS:
      graph = square_pairs(max_num)
      break

    default:
      graph = prime_pairs(max_num)
      break
  }
  graph_ui = new GraphUI(graph)
}
