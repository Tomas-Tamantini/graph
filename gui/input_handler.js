class InputHandler {
  constructor(sel_changed_callback) {
    this._input_position = { x: windowWidth / 50, y: windowHeight / 20 }
    this._text_size = 16
    this._sel = createSelect()
    this._sel.position(
      this._input_position.x + this._prompt_width() + 30,
      this._input_position.y - 6
    )
    for (let i = 5; i <= 30; i++) this._sel.option(i)
    this._sel.selected(9)
    this._sel.changed(sel_changed_callback)
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
}
