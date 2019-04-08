import React, { Component } from 'react'
import GridSquare from './grid-square'

import { moveDown } from '../actions'
import { shapes } from '../utils'

import { connect } from 'react-redux'

class GridBoard extends Component {

  constructor(props) {
    super(props)

    this.lastUpdateTime = 0
    this.progressTime = 0
  }

  componentDidMount() {
    window.requestAnimationFrame(this.update.bind(this))
  }

  update(time) {
    // If the game is is running we want to request a callback at the next animation frame.
    window.requestAnimationFrame(this.update.bind(this))
    if (!this.props.isRunning) {
      return
    }
  
    // If lastUpdateTime not been set, set it to the current time.
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = time
    }
  
    // Calculate delta time and progress time
    const deltaTime = time - this.lastUpdateTime
    this.progressTime += deltaTime
  
    // If the progress time is greater than speed move the block down
    if (this.progressTime > this.props.speed) {
      this.props.moveDown()
      this.progressTime = 0
    }
  
    // set the last update time.
    this.lastUpdateTime = time
  }

  makeGrid() {
    const { grid, shape, rotation, x, y } = this.props
    const block = shapes[shape][rotation]
    const blockColor = shape

    return grid.map((rowArray, row) => {
      return rowArray.map((square, col) => {
        const blockX = col - x
        const blockY = row - y
        let color = square
        if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
          color = block[blockY][blockX] === 0 ? color : blockColor
        }
        const k = row * grid[0].length + col;
        return ( <GridSquare
              key={k}
              square={square}
              color={color}>{square}
            </GridSquare> )
      })
    })




    // for (let row = 0; row < 18; row++ ) {
    //   grid.push([])
    //   for (let col = 0; col < 10; col++ ) {
    //     grid[row].push(<GridSquare key={`${col},${row}`} color="1" />)
    //   }
    // }

    // return grid
  }

  render() {
    return (
      <div className="grid-board">
        {this.makeGrid()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    grid: state.game.grid,
    shape: state.game.shape,
    rotation: state.game.rotation,
    x: state.game.x,
    y: state.game.y,
    speed: state.game.speed,
    isRunning: state.game.isRunning
  }
}

const mapDispatchToProps = () => {
  return{
    moveDown
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GridBoard)