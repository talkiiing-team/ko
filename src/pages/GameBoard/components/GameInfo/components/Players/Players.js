import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Avatar1 from '../../../../../../assets/img/avatar.png'
import Avatar2 from '../../../../../../assets/img/avatar-2.png'
import { useSelector, useStore } from 'react-redux'

let timesPlayerOneCall = null
let timesPlayerTwoCall = null

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
        const time = t - 1
        const hours = Math.floor(t / 60 / 60)
        const minutes = Math.floor(t / 60) - hours * 60
        const seconds = Math.floor(t % 60)
        setTimerParseOne(
          `${
            hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''
          }${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        )
        if (start) {
          timesPlayerOne(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerOneCall)
    }
  }

  const timesPlayerTwo = (t, start) => {
    if (t >= 0) {
      timesPlayerTwoCall = setTimeout(() => {
        const time = t - 1
        const hours = Math.floor(t / 60 / 60)
        const minutes = Math.floor(t / 60) - hours * 60
        const seconds = Math.floor(t % 60)
        setTimerParseTwo(
          `${
            hours > 0 ? hours.toString().padStart(2, '0') + ':' : ''
          }${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        )
        if (start) {
          timesPlayerTwo(time, start)
        }
      }, 1000)
    } else {
      clearTimeout(timesPlayerTwoCall)
    }
  }

  /*
const Player = styled.div`
  display: flex;
  width: 50%;
  padding: 19px 10px;
  background: ${(props) => (props.active ? '#EDEDED' : '#F9F9F9')};
  border: ${(props) => (props.winner ? '4px solid green' : '0px')};
  position: relative;
`
const PlayerRight = styled(Player)`
  justify-content: flex-end;
`
const Avatar = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-right: 15px;
  border: 6px solid #000;
`
const AvatarRight = styled.img`
  border-radius: 100px;
  width: 95px;
  margin-left: 15px;
  border: 6px solid #fff;
`
const Info = styled.div``
const Name = styled.p`
  color: #5b5b5b;
  font-size: 24px;
`
const Pts = styled.p`
  color: #5b5b5b;
  font-size: 18px;
`
const Score = styled.p`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`
const ScoreRight = styled.p`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`
const Treangle = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  content: '';
  right: 0;
  top: 36px;
  border: 28px solid transparent;
  border-right: 38px solid #a4a4a4;
`
const TreangleRight = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
  position: absolute;
  content: '';
  left: 0;
  top: 36px;
  border: 28px solid transparent;
  border-left: 38px solid #a4a4a4;
`
const Scores = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
  color: green;
`

const Pass = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 10px;
  color: #aaaaaa;
`
const PassRight = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  padding-top: 10px;
  color: #aaaaaa;
`

const Time = styled.div`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  right: 50px;
`
const TimeRight = styled.p`
  color: #aaaaaa;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  left: 50px;

`*/

  return (
    <div className="flex">
      <div className={`flex w-1/2 px-8 py-4 relative`}>
        <img
          alt="avatar"
          src={yourColor === 'black' ? you.avatar : opponent.avatar}
          className='rounded-full w-28 h-28'
        />
        <div>
          <div>
            {yourColor === 'black' ? you.nickname : opponent.nickname}
          </div>
          <div>
            {yourColor === 'black' ? you.pts : opponent.pts}/
            {yourColor === 'black'
              ? you.position + 'th'
              : opponent.position + 'th'}
          </div>
          {scores && scores.winner === 'B' && <div>+ {scores.score}</div>}
        </div>
        {enemyPass && yourColor !== 'black' && <div>Пас</div>}
        <div>{timerParseOne}</div>
        <div>{stepMain}</div>
        <div active={stepColor === 'black'} />
      </div>
      <div className="flex w-1/2 px-8 py-4 relative">
        <div>
          <div>
            {yourColor !== 'white' ? opponent.nickname : you.nickname}
          </div>
          <div>
            {yourColor !== 'white' ? opponent.pts : you.pts}/
            {yourColor !== 'white'
              ? opponent.position + 'th'
              : you.position + 'th'}
          </div>
          {scores && scores.winner === 'W' && <div>+ {scores.score}</div>}
        </div>
        {enemyPass && yourColor !== 'white' && <div>Пас</div>}
        <div>{timerParseTwo}</div>
        <div>{stepTwo}</div>
        <img
          alt="avatar"
          src={yourColor !== 'white' ? opponent.avatar : you.avatar}
          className='rounded-full w-28 h-28'
        />
        <div active={stepColor === 'white'} />
      </div>
    </div>
  )
}

export default Players
