/*
 * The graph below was created to solve a puzzle proposed by Matt Parker in his video:
 * MPMP: Prime Pairs Puzzle (https://www.youtube.com/watch?v=AXfl_e33Gt4)
 */

/**
 * Function to generate a graph of all numbers from 1 to max_num given
 * There are edges between two numbers if they sum to a perfect square
 * @param {*} max_num
 */
function square_pairs(max_num) {
  return ordered_nodes(max_num, (na, nb) => {
    let sum = na.label + nb.label
    return is_perfect_square(sum)
  })
}

function is_perfect_square(number) {
  if (number === 0) return true
  for (let i = 1; i <= number; i++) {
    if (i * i === number) return true
    if (i * i > number) return false
  }
  return false
}
