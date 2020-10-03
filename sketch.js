function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight / 2)
  cnv.doubleClicked(mouseDoubleClicked)
  g = adjacent_primes(5)
}

function draw() {
  background(51, 56, 66)
  draw_graph(g)
}

function mousePressed() {
  console.log("mouse pressed", mouseX, mouseY)
}

function mouseReleased() {
  console.log("mouse released", mouseX, mouseY)
}

function mouseDoubleClicked() {
  console.log("mouse double clicked", mouseX, mouseY)
}
