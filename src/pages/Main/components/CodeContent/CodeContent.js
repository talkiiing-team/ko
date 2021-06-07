import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { Input } from '../../../../components/InputCustom'
import {
  clearGameId,
  createGameCode,
  joinGameWithCode,
} from '../../../../store/GameCreate/actions'
import { client, token } from '../../../../socket'
import { useTranslation } from 'react-i18next'

const CustomCodeContent = ({ setSearchType, setContentType }) => {
  const { t } = useTranslation()
  return (
    <>
      <p className="text-4xl text-center">«{t('games.privateGameLabel')}»</p>
      <ButtonCustom
        className="mt-12"
        onClick={() => setContentType('CreateGame')}
      >
        {t('games.createNewGame')}
      </ButtonCustom>
      <ButtonCustom onClick={() => setContentType('JoinGame')}>
        {t('games.joinGame')}
      </ButtonCustom>
      <ButtonCustom className="mt-8" onClick={() => setSearchType('')}>
        {t('common.cancel')}
      </ButtonCustom>
    </>
  )
}

const CreateGame = ({ setSearchType, cancelGame, code }) => {
  const { t } = useTranslation()
  return (
    <>
      <p className="text-4xl text-center">{t('games.yourGameCode')}:</p>
      <Input value={code || t('common.wait')} className={'text-center'} readonly />
      <ButtonCustom mb={30} onClick={() => setSearchType('CodeEnter')}>
        {t('games.startGame')}
      </ButtonCustom>
      <ButtonCustom onClick={() => cancelGame()}>
        {t('common.cancel')}
      </ButtonCustom>
    </>
  )
}

const JoinGame = ({ setSearchType, cancelGame, code, setCode }) => {
  const { t } = useTranslation()
  return (
    <>
      <p className="text-4xl text-center">{t('games.typeGameCode')}:</p>
      <Input className="uppercase" maxLength={6} onChange={setCode} name="code" />
      <ButtonCustom
        mb={30}
        disabled={!code}
        onClick={() => code && setSearchType('CodeEnter')}
      >
        {t('games.join')}
      </ButtonCustom>
      <ButtonCustom onClick={() => cancelGame()}>
        {t('common.cancel')}
      </ButtonCustom>
    </>
  )
}

export const CodeContent = ({ gameId, setSearchType }) => {
  const [code, setCode] = useState('')
  const [contentType, setContentType] = useState('')
  const dispatch = useDispatch()
  const codeGame = useSelector((state) => state.createGame.code)
  const { t } = useTranslation()
  useEffect(() => {
    if (contentType === 'CreateGame') {
      dispatch(createGameCode())
    }
  }, [contentType])

  const getGameId = async (val) => {
    if (val === 'CodeEnter') {
      if (code) {
        await dispatch(joinGameWithCode(code))
      }
    } else {
      setSearchType(val)
    }
  }

  const cancelGame = async () => {
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'resign', token: token, game_id: gameId },
      ])
    )
    await dispatch(clearGameId())
    setSearchType('')
  }

  return (
    <>
      {!contentType ? (
        <CustomCodeContent
          setSearchType={setSearchType}
          setContentType={setContentType}
        />
      ) : null}
      {contentType === 'CreateGame' ? (
        <CreateGame
          cancelGame={() => cancelGame()}
          setSearchType={setSearchType}
          code={codeGame}
        />
      ) : null}
      {contentType === 'JoinGame' ? (
        <JoinGame
          cancelGame={() => cancelGame()}
          setSearchType={(val) => getGameId(val)}
          code={code}
          setCode={(val) => setCode(val)}
        />
      ) : null}
    </>
  )
}
