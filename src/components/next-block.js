import React, { Component } from 'react'
import GridSquare from './grid-square'
import { connect } from 'react-redux'

import { shapes } from '../utils'

class NextBlock extends Component {

  makeGrid() {
    const { shape } = this.props
    const block = shapes[shape][0]
    const box = shapes[0][0]
    return box.map((rowArray, row) => {
      return rowArray.map((square, col) => {
        const color = block[row][col] === 0 ? 0 : shape
        return(<GridSquare key={`${row},${col}`} color={color} />)
      })
    })
  }

  render() {
    return (
      <div className="next-block">
        {this.makeGrid()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    shape: state.game.nextShape
  }
}

export default connect(mapStateToProps)(NextBlock)