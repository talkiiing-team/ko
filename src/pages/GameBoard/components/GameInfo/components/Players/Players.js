import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { DateTime } from 'luxon'

let timesPlayerOneCall = null
let timesPlayerTwoCall = null

const Card = ({
  yourColor,
  you,
  opponent,
  enemyPass,
  scores,
  timerParseOne,
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
        `flex w-1/2 px-2 py-2 relative rounded-xl gap-x-4 transform transition-all duration-200 border-2 border-gray-50`,
        {
          'shadow-md bg-gray-50': stepColor !== cardColor,
          'shadow-xl scale-105': stepColor === cardColor,
        }
      )}
    >
      <img
        alt="avatar"
        src={yourColor === cardColor ? you.avatar : opponent.avatar}
        className="rounded-full w-24 h-24"
      />
      <div className="absolute top-2 left-28">
        <div className="font-bold text-xl">
          {yourColor === cardColor ? you.nickname : opponent.nickname}
        </div>
        <div className="text-gray-500 text-sm">
          {yourColor === cardColor ? you.pts : opponent.pts}/
          {yourColor === cardColor
            ? you.position + 'th'
            : opponent.position + 'th'}
        </div>
        {scores && scores.winner === 'B' && <div>+ {scores.score}</div>}
      </div>
      {enemyPass && yourColor !== cardColor && (
        <div className="absolute bottom-0 left-28 bottom-2">Пас</div>
      )}
      <div className="absolute right-4 bottom-8">{timerParseOne}</div>
      <div className="absolute right-4 bottom-2">{stepMain}</div>
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
          DateTime.fromSeconds(t, { zone: 'utc' }).toFormat('HH:mm:ss')
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
          DateTime.fromSeconds(t, { zone: 'utc' }).toFormat('HH:mm:ss')
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
    <div className="flex gap-x-4">
      <Card
        yourColor={yourColor}
        you={you}
        opponent={opponent}
        enemyPass={enemyPass}
        scores={scores}
        timerParseOne={timerParseOne}
        stepMain={stepMain}
        stepColor={stepColor}
        cardColor={'black'}
      />
      <Card
        yourColor={yourColor}
        you={you}
        opponent={opponent}
        enemyPass={enemyPass}
        scores={scores}
        timerParseOne={timerParseTwo}
        stepMain={stepTwo}
        stepColor={stepColor}
        cardColor={'white'}
      />
    </div>
  )
}

export default Players
