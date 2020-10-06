/*
 * The graph below was created to solve a puzzle proposed by Matt Parker in his video:
 * MPMP: Prime Pairs Puzzle (https://www.youtube.com/watch?v=AXfl_e33Gt4)
 */

/**
 * Function to generate a graph of all numbers from 1 to max_num given
 * There are edges between two numbers if they sum to a prime
 * @param {*} max_num
 */
function prime_pairs(max_num) {
  return ordered_nodes(max_num, (na, nb) => {
    let sum = na.label + nb.label
    return is_prime(sum)
  })
}

function is_prime(number) {
  if (number < 2) return false
  if (number === 2) return true
  if (number % 2 === 0) return false
  for (let divisor = 3; divisor < number; divisor += 2) {
    if (number % divisor === 0) return false
    if (divisor * divisor > number) break
  }
  return true
}
