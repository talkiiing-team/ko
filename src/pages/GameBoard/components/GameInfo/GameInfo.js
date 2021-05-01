import React from 'react'
import styled from 'styled-components'
import Players from './components/Players/Players'
import Info from './components/Info/Info'

const GameInfo = ({
  stepColor,
  enemyPass,
  yourColor,
  you,
  opponent,
  turns,
  stepMain,
  stepTwo,
  times,
}) => {
  return (
    <div className="w-full">
      <Info turns={turns} />
    </div>
  )
}

export default GameInfo
