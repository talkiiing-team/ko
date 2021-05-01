import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { useSelector } from 'react-redux'

export const Winner = ({ setSearchType }) => {
  const [player, setPlayer] = useState({})

  const userId = useSelector((state) => state.profile.userProfile.user.id)
  const {winner, loser} = useSelector((state) => state.board)

  if (!winner) {
    setSearchType('')
  }

  useEffect(() => {
    if (winner?.id === userId) {
      setPlayer(winner)
    } else {
      setPlayer(loser)
    }
  }, [winner, loser])

  return (
    <>
      <p className="text-5xl font-extrabold mx-auto mb-8 leading-tight">{winner?.id === userId ? 'Победа!' : 'Поражение!'}</p>
      <div className="mx-auto flex flex-col items-center justify-center gap-y-3">
        <img className="rounded-full w-40" alt="avatar" src={player?.avatar} />
        <p className="text-5xl font-bold">{player?.nickname}</p>
        <p className="text-xl text-gray-500">
          {player?.pts}
          {' \\ '}
          {player?.position + 'th'}
        </p>
      </div>
      <div className="text-2xl font-medium">
        Счет: <p className="inline border-b-4 border-yellow-500">{player?.finalScore}</p>
      </div>
      <div className="text-2xl font-medium">
        Очки по подсказкам: <p className="inline border-b-4 border-yellow-500">{player?.hintScore}</p>
      </div>
      <div className="text-2xl font-medium">
        Итоговые очки: <p className="inline border-b-4 border-yellow-500">{player?.rpScore}</p>
      </div>
      <ButtonCustom className="mt-16" onClick={() => setSearchType('')}>Выйти</ButtonCustom>
    </>
  )
}
