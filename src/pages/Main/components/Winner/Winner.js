import React, { useEffect, useState } from 'react'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export const Winner = ({ setSearchType }) => {
  const [player, setPlayer] = useState({})

  const { t } = useTranslation()
  const userId = useSelector((state) => state.profile.userProfile.user.id)
  const { winner, loser } = useSelector((state) => state.board)

  if (!winner) {
    setSearchType('')
  }

  useEffect(() => {
    if (winner?.id !== userId) {
      setPlayer(winner)
    } else {
      setPlayer(loser)
    }
  }, [winner, loser])

  return (
    <>
      <p className="text-5xl font-extrabold mx-auto mb-0 leading-tight">
        {winner?.id === userId ? t('winner.win') : t('winner.lose')}
      </p>
      <p className="text-3xl font-medium mx-auto mb-8 leading-tight">
        {winner?.id === userId ? t('winner.youWon') : t('winner.winner')}
      </p>
      <div className="mx-auto flex flex-col items-center justify-center gap-y-3">
        <img className="rounded-full w-40" alt="avatar" src={player?.avatar} />
        <p className="text-4xl font-bold">{player?.nickname}</p>
        <p className="text-xl text-gray-500">
          {player?.pts}
          {' \\ '}
          {player?.position + 'th'}
        </p>
      </div>
      <div className="text-2xl font-medium">
        {t('winner.score')}:{' '}
        <p className="inline border-b-4 border-yellow-500">
          {player?.finalScore}
        </p>
      </div>
      <div className="text-2xl font-medium">
        {t('winner.scoreHints')}:{' '}
        <p className="inline border-b-4 border-yellow-500">
          {player?.hintScore}
        </p>
      </div>
      <div className="text-2xl font-medium">
        {t('winner.totalScore')}:{' '}
        <p className="inline border-b-4 border-yellow-500">{player?.rpScore}</p>
      </div>
      <ButtonCustom className="mt-16" onClick={() => setSearchType('')}>
        {t('common.exit')}
      </ButtonCustom>
    </>
  )
}
