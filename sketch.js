function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight / 2)
  canvas.doubleClicked(mouseDoubleClicked)

  graph = adjacent_primes(5)
  mouse_handler = new MouseHandler(graph)
}

function draw() {
  background(51, 56, 66)
  draw_graph(graph, mouse_handler)
}

function mousePressed() {
  mouse_handler.mouse_pressed()
}

function mouseReleased() {
  mouse_handler.mouse_released()
}

function mouseDoubleClicked() {
  console.log("mouse double clicked", mouseX, mouseY)
}
