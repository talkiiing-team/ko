import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'

import { client, token } from '../../../../socket.js'
import { clearGameId } from '../../../../store/GameCreate/actions'
import { Input } from '../../../../components/InputCustom'
import { useTranslation } from 'react-i18next'

const Text = styled.p`
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 58px;
  text-align: center;
`

const Spinner = styled.div`
  margin: 0 auto;
  width: 64px;
  margin-bottom: 46px;
`

export const LoadingGame = ({
  text,
  setSearchType,
  setOpponent,
  searchType,
  gameId,
}) => {
  const dispatch = useDispatch()
  const user_id = useSelector((state) => state.profile.userProfile.user.id)
  const codeGame = useSelector((state) => state.createGame.code)
  const { t } = useTranslation()
  useEffect(() => {
    if (gameId) {
      client.send(JSON.stringify([5, 'go/game']))
      client.send(
        JSON.stringify([
          7,
          'go/game',
          {
            command: 'auth',
            token: localStorage.getItem('GoGameToken'),
            game_id: gameId,
          },
        ])
      )

      client.onmessage = function (e) {
        if (typeof e.data === 'string') {
          let jsonData = JSON.parse(e.data)
          if (jsonData.payload) {
            if (jsonData.payload.type === 'userConnected') {
              if (String(jsonData.payload.userId) !== String(user_id)) {
                setOpponent(jsonData.payload.player)
                if (searchType === 'Random') {
                  setSearchType('ConnectRandom')
                }
                if (searchType === 'CodeEnter') {
                  setSearchType('ConnectCode')
                }
              }
            }
          }
        }
      }
    }
  }, [gameId])

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
  const codeBlock = () => {
    if (codeGame) {
      return (
        <Input
          value={codeGame || t('common.wait')}
          textAlign="center"
          disabled
          mt={40}
          mb={30}
        />
      )
    }
  }

  return (
    <>
      <Spinner>
        <Loader type="Grid" color="#3b3b3b" height={64} width={64} />
      </Spinner>
      <Text>{text}</Text>
      {codeBlock()}
      <ButtonCustom onClick={() => cancelGame()}>
        {t('common.cancel')}
      </ButtonCustom>
    </>
  )
}
