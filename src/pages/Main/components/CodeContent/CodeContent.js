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


const CustomCodeContent = ({ setSearchType, setContentType }) => (
  <>
    <p className="text-4xl text-center">«Закрытая игра»</p>
    <ButtonCustom className="mt-12" onClick={() => setContentType('CreateGame')}>
      Создать игру
    </ButtonCustom>
    <ButtonCustom onClick={() => setContentType('JoinGame')}>
      Присоединиться
    </ButtonCustom>
    <ButtonCustom className="mt-8" onClick={() => setSearchType('')}>Отмена</ButtonCustom>
  </>
)

const CreateGame = ({ setSearchType, cancelGame, code }) => (
  <>
    <p className="text-4xl text-center">Код вашей игры:</p>
    <Input
      value={code || 'Ожидайте'}
      className={'text-center'}
      readonly
    />
    <ButtonCustom mb={30} onClick={() => setSearchType('CodeEnter')}>
      Начать игру
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>Отмена</ButtonCustom>
  </>
)

const JoinGame = ({ setSearchType, cancelGame, code, setCode }) => (
  <>
    <p className="text-4xl text-center">Укажите код игры:</p>
    <Input mt={30} mb={30} onChange={setCode} name="code" />
    <ButtonCustom
      mb={30}
      disabled={!code}
      onClick={() => code && setSearchType('CodeEnter')}
    >
      Присоединиться
    </ButtonCustom>
    <ButtonCustom onClick={() => cancelGame()}>Отмена</ButtonCustom>
  </>
)

export const CodeContent = ({ gameId, setSearchType }) => {
  const [code, setCode] = useState('')
  const [contentType, setContentType] = useState('')
  const dispatch = useDispatch()
  const codeGame = useSelector((state) => state.createGame.code)

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
