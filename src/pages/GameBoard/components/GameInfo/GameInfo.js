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
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <Info turns={turns} />
    </div>
  )
}

export default GameInfo
