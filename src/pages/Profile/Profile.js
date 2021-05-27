import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ButtonCustom } from '../../components/ButtonCustom'
import { MAIN_URL } from '../../constants/routes'
import { getProfile, getSgf, getFullLog } from '../../store/Profile/actions'
import { useTranslation } from 'react-i18next'

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  border-radius: 100px;
  width: 200px;
`
const Name = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`
const Pts = styled.p`
  color: #c8d7b5;
  font-size: 12px;
  line-height: 14px;
`
const Span = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.winner ? '#C8D7B5' : '#B69094')};
`
const ScoreLeft = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: ${(props) => (props.winner ? '#C8D7B5' : '#DD3F65')};
  margin-right: 5px;
`
const ScoreRight = styled.p`
  font-size: 24px;
  line-height: 28px;
  font-weight: bold;
  color: ${(props) => (props.winner ? '#86C13A' : '#B69094')};
  margin-left: 5px;
  margin-right: 16px;
`
const AvatarHistory = styled.img`
  width: 90px;
  margin-right: 15px;
`

const ButtonDownloadFile = styled.div`
  width: 90px;
  font-weight: 400;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  padding: 0;
  height: 20px;
  display: block;
  outline: none;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-color: #ffe3ba;
  color: #000;
  cursor: pointer;
  font-size: 18px;
  border: none;
  :first-child {
    margin-bottom: 15px;
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
`

const GameHistoryItem = styled.div`
  height: 117px;
  width: 100%;
  background: ${(props) => (props.winner ? '#efffda' : '#FFDADE')};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`

const InfoHistory = styled.div``

const TriangleLeft = styled.div`
  border: 20px solid transparent;
  border-right: 20px solid ${(props) => (props.winner ? '#C8D7B5' : '#DD3F65')};
  margin-right: 16px;
`
const TriangleRight = styled.div`
  border: 20px solid transparent;
  border-left: 20px solid ${(props) => (props.winner ? '#86C13A' : '#B69094')};
  margin-right: 16px;
`

const Profile = ({ history }) => {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const playerInfo = useSelector((state) => state.profile.userProfile.user)

  const gameHistoryItems = playerInfo?.games_history.map((item, i) => {
    return item.scoreOpponent <= item.score ? (
      <GameHistoryItem key={i} winner>
        <Left>
          <AvatarHistory alt="avatar" src={item.player.avatar} />
          <InfoHistory>
            <Name>{item.player.nickname}</Name>
            <Pts>
              {item.player.pts} / {item.player.position + 'th'}
            </Pts>
          </InfoHistory>
        </Left>
        <Right>
          <TriangleLeft winner />
          <ScoreLeft winner>{item.scoreOpponent}</ScoreLeft>
          <Span winner>/</Span>
          <ScoreRight winner>{item.score}</ScoreRight>
          <TriangleRight winner />
        </Right>
        <ButtonRow>
          <ButtonDownloadFile onClick={() => dispatch(getSgf(item.game_id))}>
            {t('profile.downloadFile')}
          </ButtonDownloadFile>
          <ButtonDownloadFile
            onClick={() => dispatch(getFullLog(item.game_id))}
          >
            {t('profile.logs')}
          </ButtonDownloadFile>
        </ButtonRow>
      </GameHistoryItem>
    ) : (
      <GameHistoryItem key={i}>
        <Left>
          <AvatarHistory alt="avatar" src={item.player.avatar} />
          <InfoHistory>
            <Name>{item.player.nickname}</Name>
            <Pts>
              {item.player.pts} / {item.player.position + 'th'}
            </Pts>
          </InfoHistory>
        </Left>
        <Right>
          <TriangleLeft />
          <ScoreLeft>{item.scoreOpponent}</ScoreLeft>
          <Span>/</Span>
          <ScoreRight>{item.score}</ScoreRight>
          <TriangleRight />
        </Right>
        <ButtonRow>
          <ButtonDownloadFile onClick={() => dispatch(getSgf(item.game_id))}>
            {t('profile.downloadFile')}
          </ButtonDownloadFile>
          <ButtonDownloadFile
            onClick={() => dispatch(getFullLog(item.game_id))}
          >
            {t('profile.logs')}
          </ButtonDownloadFile>
        </ButtonRow>
      </GameHistoryItem>
    )
  })

  return (
    <div className="flex flex-col w-full items-center max-w-2xl mx-auto pt-32 h-screen mb-24">
      <div className="flex flex-row gap-8 mb-4 p-4 w-full items-center">
        <Avatar alt="avatar" src={playerInfo?.avatar} />
        <div className="flex flex-col gap-4 flex-grow text-2xl">
          <div className="border-b-2">{playerInfo?.nickname}</div>
          <div className="border-b-2">{playerInfo?.email}</div>
          <div className="border-b-2">{playerInfo?.pts}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full overflow-hidden overflow-y-scroll mb-4 p-2 mx-4">
        {gameHistoryItems}
      </div>
      <ButtonCustom
        onClick={() => {
          history.push(MAIN_URL)
        }}
      >
        {t('common.toTheMenu')}
      </ButtonCustom>
    </div>
  )
}

export default Profile
