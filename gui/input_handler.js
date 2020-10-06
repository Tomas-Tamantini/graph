const OPTIONS = {
  PRIME_PAIRS: "1",
  SQUARE_PAIRS: "2",
}

class InputHandler {
  constructor(reset_graph_options) {
    this._input_position = { x: windowWidth / 50, y: windowHeight / 20 }
    this._text_size = 16
    this._sel = createSelect()
    this._sel.position(
      this._input_position.x + this._prompt_width() + 30,
      this._input_position.y - 6
    )
    for (let i = 5; i <= 30; i++) this._sel.option(i)
    this._sel.selected(9)
    this._sel.changed(reset_graph_options)

    this._radio = createRadio()
    this._radio.option("Prime pairs", OPTIONS.PRIME_PAIRS)
    this._radio.option("Perfect square pairs", OPTIONS.SQUARE_PAIRS)
    this._radio.position(
      this._input_position.x + 12,
      this._input_position.y + 30
    )
    this._radio.value("1")
    this._radio.changed(reset_graph_options)
  }

  _prompt_width() {
    push()
    textSize(this._text_size)
    let w = textWidth("Maximum number:")
    pop()
    return w
  }

  prompt_input() {
    push()
    fill(153, 168, 198)
    textSize(this._text_size)
    text("Maximum number:", this._input_position.x, this._input_position.y)
    pop()
  }

  get max_number() {
    return parseInt(this._sel.value())
  }

  get radio_value() {
    return this._radio.value()
  }
}
