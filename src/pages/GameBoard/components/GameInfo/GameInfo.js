import React from 'react'
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
