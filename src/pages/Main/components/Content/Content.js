import React, { useEffect, useState } from 'react'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { CodeContent } from '../CodeContent'
import { Connect } from '../Connect'
import { LoadingGame } from '../LoadingGame'
import { Winner } from '../Winner'
import { Error } from '../Error'
import { INFO_URL } from '../../../../constants/routes'
import {
  createRandomGame,
  createGameWithAi,
} from '../../../../store/GameCreate/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ContentMainBoard = (setSearchType, searchType, history, gameId) => {
  const [opponent, setOpponent] = useState({})
  const [code, setCode] = useState('')

  const { t } = useTranslation()

  switch (searchType) {
    case 'Code':
      return <CodeContent gameId={gameId} setSearchType={setSearchType} />

    case 'Random':
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          text={t('gameEnter.WaitingRandom')}
          setOpponent={setOpponent}
          searchType={searchType}
        />
      )

    case 'CodeEnter':
      return (
        <LoadingGame
          gameId={gameId}
          setSearchType={setSearchType}
          setOpponent={setOpponent}
          code={code}
          text={t('gameEnter.WaitingSecondPlayer')}
          searchType={searchType}
        />
      )

    case 'ConnectRandom':
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text={t('gameEnter.OpponentFound')}
        />
      )

    case 'ConnectCode':
      return (
        <Connect
          history={history}
          opponent={opponent}
          setSearchType={setSearchType}
          text={t('gameEnter.OpponentConnected')}
        />
      )

    case 'Win':
      return <Winner setSearchType={setSearchType} />

    case 'Error':
      return (
        <Error
          error={t('gameEnter.ErrorCantConnect')}
          setSearchType={setSearchType}
        />
      )

    default:
  }
}

export const Content = ({ history, searchType, setSearchType }) => {
  const dispatch = useDispatch()
  const gameId = useSelector((state) => state.createGame.id)

  const { t } = useTranslation()

  useEffect(() => {
    if (searchType === 'Random') dispatch(createRandomGame())
    if (searchType === 'WithAi') dispatch(createGameWithAi())
  }, [searchType])

  return (
    <div className="grid grid-flow-row gap-y-5 w-full max-w-xl mx-auto px-6">
      {!searchType ? (
        <>
          <ButtonCustom
            onClick={() => history.push('/gameBoard')}
            disabled={gameId === null}
          >
            {t('menu.continue')}
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setSearchType('Random')}
            disabled={gameId !== null}
          >
            {t('menu.playWithRandom')}
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setSearchType('WithAi')}
            disabled={gameId !== null}
          >
            {t('menu.playWithBot')}
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setSearchType('Code')}
            disabled={gameId !== null}
          >
            {t('menu.playPrivateGame')}
          </ButtonCustom>
          <ButtonCustom onClick={() => history.push('/liders')}>
            {t('menu.leaderboard')}
          </ButtonCustom>{' '}
        </>
      ) : null}
      {ContentMainBoard(setSearchType, searchType, history, gameId)}
    </div>
  )
}
