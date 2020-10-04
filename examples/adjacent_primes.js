/*
 * The graph below was created to solve a puzzle proposed by Matt Parker in his video:
 * MPMP: Prime Pairs Puzzle (https://www.youtube.com/watch?v=AXfl_e33Gt4)
 */

/**
 * Function to generate a graph of all numbers from 1 to max_num given
 * There are edges between two numbers if they sum to a prime
 * @param {*} max_num
 */
function adjacent_primes(max_num) {
  let nodes = radial_nodes(max_num)
  let edges = form_prime_connections(nodes)
  return new Graph(nodes, edges)
}

function radial_nodes(max_num) {
  let numbers_array = [...Array(max_num).keys()]
  return numbers_array.map(num => {
    let angle = (-1 / 2 + (2 * num) / max_num) * Math.PI
    let radius = height / 3
    let position = {
      x: radius * Math.cos(angle) + width / 2,
      y: radius * Math.sin(angle) + height / 2,
    }
    return new Node(num + 1, position)
  })
}

function form_prime_connections(nodes) {
  let edges = []
  for (let i = 0; i < nodes.length - 1; i++) {
    let na = nodes[i]
    for (let j = i + 1; j < nodes.length; j++) {
      let nb = nodes[j]
      let sum = na.label + nb.label
      if (is_prime(sum)) edges.push(new Edge(na, nb))
    }
  }
  return edges
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
