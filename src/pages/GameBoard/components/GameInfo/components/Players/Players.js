import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { DateTime } from 'luxon'
import { ellipsis } from '../../../../../../helpers/utils'

let timesPlayerOneCall = null
let timesPlayerTwoCall = null

const Card = ({
  yourColor,
  you,
  opponent,
  enemyPass,
  scores,
  timerParse,
  stepMain,
  stepColor,
  cardColor,
}) => {
  if (!you.nickname || !opponent.nickname)
    return (
      <div
        className={classNames(
          `flex w-1/2 h-24 px-2 py-2 relative rounded-xl gap-x-4 transform transition-all duration-200 border-2 border-gray-50 shadow-md bg-gray-50`
        )}
      />
    )

  return (
    <div
      className={classNames(
        `flex flex-col gap-y-2 w-full px-3 py-2 relative rounded-xl gap-x-4
         transform transition-all duration-200 border-2 border-gray-50
         overflow-hidden`,
        {
          'shadow-md bg-gray-50': stepColor !== cardColor,
          'shadow-xl scale-105': stepColor === cardColor,
        }
      )}
    >
      <div className="font-bold text-xl px-1 overflow-ellipsis">
        {ellipsis(
          yourColor === cardColor ? you.nickname : opponent.nickname,
          13
        )}
      </div>
      <div className="flex flex-row gap-x-4 w-full">
        <img
          alt="Player avatar"
          src={yourColor === cardColor ? you.avatar : opponent.avatar}
          className={classNames(
            'rounded-full w-12 h-12 border-4 shadow-md',
            cardColor === 'black' ? 'border-black' : 'border-white'
          )}
        />
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-x-2 justify-between w-full">
            <div className="text-gray-700 text-lg w-20">{timerParse}</div>
            <div className="text-gray-500 text-lg w-8 text-right">
              {stepMain}
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {yourColor === cardColor ? you.pts : opponent.pts}/
            {yourColor === cardColor
              ? you.position + 'th'
              : opponent.position + 'th'}
          </div>
        </div>
      </div>
    </div>
  )
}

const Players = ({
  yourColor,
  enemyPass,
  stepColor,
  you,
  opponent,
  stepMain,
  stepTwo,
  times,
}) => {
  const scores = useSelector((state) => state.board.scores)
  const winner = useSelector((state) => state.board.scoresWinner)

  const [timerParseOne, setTimerParseOne] = useState('')
  const [timerParseTwo, setTimerParseTwo] = useState('')

  useEffect(async () => {
    await clearTimeout(timesPlayerOneCall)
    await clearTimeout(timesPlayerTwoCall)
    timesPlayerOne(times.playerOne, stepColor === 'black')
    timesPlayerTwo(times.playerTwo, stepColor === 'white')
  }, [times])

  const timesPlayerOne = (t, start) => {
    if (t >= 0) {
      timesPlayerOneCall = setTimeout(() => {
        setTimerParseOne(
          DateTime.fromSeconds(t, { zone: 'utc' }).toFormat('mm:ss')
        )
        if (start) {
          timesPlayerOne(t - 1, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerOneCall)
    }
  }

  const timesPlayerTwo = (t, start) => {
    if (t >= 0) {
      timesPlayerTwoCall = setTimeout(() => {
        setTimerParseTwo(
          DateTime.fromSeconds(t, { zone: 'utc' }).toFormat('mm:ss')
        )
        if (start) {
          timesPlayerTwo(t - 1, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerTwoCall)
    }
  }

  return (
    <div className="w-full grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-y-4 sm:gap-x-4 lg:mt-6 px-4 lg:px-1">
      <Card
        yourColor={yourColor}
        you={you}
        opponent={opponent}
        enemyPass={enemyPass}
        scores={scores}
        timerParse={timerParseOne}
        stepMain={stepTwo}
        stepColor={stepColor}
        cardColor={'black'}
      />
      <Card
        yourColor={yourColor}
        you={you}
        opponent={opponent}
        enemyPass={enemyPass}
        scores={scores}
        timerParse={timerParseTwo}
        stepMain={stepMain}
        stepColor={stepColor}
        cardColor={'white'}
      />
    </div>
  )
}

export default Players
