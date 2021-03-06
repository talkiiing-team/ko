import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Board from './components/Board/Board'
import { Header } from './components/Header'
import Help from './components/Help/Help'
import {
  hintHeatmapFull,
  hintHeatmapZone,
  markersClear,
  multipleHelp,
  setWinnerUser,
  setLoserUser,
  setBlocked,
  hintShowBest,
  setScoresWinner,
  hintBestMoves,
  hintBestMovesEnemy,
  setScoresSuperior,
  clearSuperiority,
} from '../../store/Board/actions'

import { clearGameId } from '../../store/GameCreate/actions'
import { client, token } from '../../socket.js'
import { HelpTypes } from './components/Help/decl'
import LoaderPage from '../../components/Loader/LoaderPage'
import Players from './components/GameInfo/components/Players/Players'
import { Toast } from '../../components/Toast'
import GameInfo from './components/GameInfo/GameInfo'
import { useTranslation } from 'react-i18next'
import { HelpPlate } from './components/Help/HelpPlate'

const GameBoard = ({ history }) => {
  const game_id = useSelector((state) => state.createGame.id)
  const blocked = useSelector((state) => state.board.blocked)
  const mapStones = useSelector((state) => state.board.mapStones)

  const { t } = useTranslation()

  const [hint, setHint] = useState(false)
  const [enemyPass, setEnemyPass] = useState(false)
  const [lastMarkers, setLastMarkers] = useState(null)
  const [helpType, setHelpType] = useState('')
  const [activeHelpId, setActiveHelpId] = useState('')
  const [multipleType, setMultipleType] = useState(false)
  const [mapType, setMapType] = useState(false)
  const [multipleHint, setMultipleHint] = useState({})
  const [multipleCount, setMultipleCount] = useState([])
  const [turns, setTurns] = useState([])
  const [yourColor, setYourColor] = useState('white')
  const [coordinates, setCoordinates] = useState({})
  const [you, setYou] = useState({})
  const [opponent, setOpponent] = useState({})
  const [stepMain, setStepMain] = useState(0)
  const [stepTwo, setStepTwo] = useState(0)
  const [stepColor, setStepColor] = useState('white')
  const [classNames, setClassNames] = useState({})
  const dispatch = useDispatch()
  const [times, setTimes] = useState({ playerOne: 0, playerTwo: 0 })

  const superiority = useSelector((state) => state.board.superiority)
  const scoresWinner = useSelector((state) => state.board.scoresWinner)

  const [cunter, setCunter] = useState(0)

  useEffect(() => {
    setCunter(Object.keys(coordinates).length)
  }, [coordinates])

  useEffect(() => {
    if (Object.keys(multipleHint).length === multipleCount) {
      dispatch(multipleHelp())
      deleteCoordinates(multipleHint)
      setHelpType('')
      setMultipleHint({})
    }
  }, [multipleHint, multipleCount])

  if (game_id === null) {
    history.push('/')
  }

  useEffect(() => {
    if (game_id) {
      client.send(JSON.stringify([5, 'go/game']))
      client.send(
        JSON.stringify([
          7,
          'go/game',
          {
            command: 'auth',
            token: localStorage.getItem('GoGameToken'),
            game_id: game_id,
          },
        ])
      )
    }
    client.onmessage = function (e) {
      setEnemyPass(false)
      if (typeof e.data === 'string') {
        const jsonData = JSON.parse(e.data)

        if (jsonData.payload) {
          if (jsonData.payload.currentMap) {
            setCoordinates(mapMap(jsonData.payload.currentMap))
          }
          if (jsonData.payload.type === 'currentMap') {
            setYou(jsonData.payload.you)
            setOpponent(jsonData.payload.opponent)
          }
          if (jsonData.payload.player) {
            if (typeof jsonData.payload.player === 'string') {
              setYourColor(jsonData.payload.player === 'w' ? 'white' : 'black')
            }
          }
          if (jsonData.payload.type && jsonData.payload.type === 'endGame') {
            let winner = jsonData.payload.winnerPlayer
            let loser = jsonData.payload.loserPlayer
            winner.finalScore = jsonData.payload.finalScore
            dispatch(setWinnerUser(winner))
            dispatch(setLoserUser(loser))
            history.push('/', { from: 'Win' })
            dispatch(clearGameId())
          }
          if (jsonData.payload.turn) {
            setStepColor(jsonData.payload.turn)
          }
          if (jsonData.payload.move) {
            setTurns((turns) => [
              ...turns,
              {
                time: jsonData.time,
                text: jsonData.payload.move,
                place: jsonData.payload.place,
                turn: jsonData.payload.turn,
              },
            ])
          }
          if (jsonData.payload.type === 'newTurn') {
            setLastMarkers({ [jsonData.payload.place]: 'circle' })
          }
          if (jsonData.payload.moveType === 'pass') {
            if (stepColor !== yourColor) {
              setEnemyPass(true)
            }
          }
          if (
            jsonData.payload.turnBlackEndedAt &&
            jsonData.payload.turnWhiteEndedAt
          ) {
            setTimes({
              playerOne: Math.floor(
                (Number(jsonData.payload.turnBlackEndedAt) -
                  new Date().getTime()) /
                  1000
              ),
              playerTwo: Math.floor(
                (Number(jsonData.payload.turnWhiteEndedAt) -
                  new Date().getTime()) /
                  1000
              ),
            })
          }
        }
      }
      dispatch(setBlocked(false))
    }
  }, [])

  const mapMap = (map) => {
    let coords = {}
    let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
    map.map((row, rowId) =>
      row.map((cell, colId) => {
        if (cell !== 0) {
          let sign = alpha[rowId]
          coords[`${sign}${colId + 1}`] = cell === -1 ? 'white' : 'black'
        }
      })
    )
    let steMainTemp = 0
    let stepTwoTemp = 0
    Object.keys(coords).forEach((key) => {
      if (String(yourColor) === String(coords[key])) {
        steMainTemp += 1
      } else {
        stepTwoTemp += 1
      }
    })
    setStepMain(steMainTemp)
    setStepTwo(stepTwoTemp)
    return coords
  }

  const move = (coord) => {
    if (stepColor === yourColor) {
      console.log('move!')
      dispatch(markersClear())
      setActiveHelpId(null)
      setHelpType('')
      dispatch(setBlocked(true))
      client.send(
        JSON.stringify([
          7,
          'go/game',
          {
            command: 'move',
            token: token,
            place: coord.toString().toLowerCase(),
            game_id: game_id,
          },
        ])
      )
    }
  }

  const pass = () => {
    dispatch(markersClear())
    setActiveHelpId(null)
    setHelpType('')
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'pass', token: token, game_id: game_id },
      ])
    )
  }

  const resign = () => {
    dispatch(setBlocked(true))
    client.send(
      JSON.stringify([
        7,
        'go/game',
        { command: 'resign', token: token, game_id: game_id },
      ])
    )
  }

  const handleHelp = ({ type, multipleHandleCount, id, count }) => {
    dispatch(markersClear())
    setMultipleHint({})
    setActiveHelpId(id)

    if (type === 'single') {
      dispatch(setBlocked(true))
      setHelpType('single')
      switch (id) {
        case HelpTypes.BEST_MOVES:
        case HelpTypes.BEST_2_MOVES:
        case HelpTypes.BEST_3_MOVES:
        case HelpTypes.BEST_4_MOVES:
          dispatch(hintBestMoves(game_id, count))
          break
        case HelpTypes.BEST_MOVES_ENEMY:
        case HelpTypes.BEST_2_MOVES_ENEMY:
        case HelpTypes.BEST_3_MOVES_ENEMY:
        case HelpTypes.BEST_4_MOVES_ENEMY:
          dispatch(hintBestMovesEnemy(game_id, count))
          break
      }
    }
    if (type === 'multiple') {
      setHelpType('multiple')
      setMultipleType('multiple')
      setMultipleCount(multipleHandleCount)
    }
    if (type === 'map') {
      dispatch(setBlocked(true))
      setHelpType('map')
      setMapType('map')
      switch (id) {
        case HelpTypes.HEATMAP_FULL:
          dispatch(hintHeatmapFull(game_id))
          break
        case HelpTypes.HEATMAP_ZONE_QUARTER:
          dispatch(hintHeatmapZone(game_id, true))
          break
      }
    }
    if (type === 'score') {
      if (superiority) {
        // dispatch(clearSuperiority())
      }
      dispatch(setBlocked(true))
      switch (id) {
        case HelpTypes.PRED_WINNER:
          dispatch(setScoresWinner(game_id))
          break
        case HelpTypes.PRED_SUPERIOR:
          dispatch(setScoresSuperior(game_id))
          break
      }
    }
  }

  const deleteCoordinates = (hints) => {
    for (const key in coordinates) {
      for (const keyHint in hints) {
        if (key === keyHint) {
          delete coordinates[key]
        }
      }
    }
  }

  const setMultipleHintFunc = (val) => {
    if (Object.keys(mapStones).length === multipleCount - 2) {
      dispatch(markersClear())
      setActiveHelpId(null)
      setMultipleHint({})
      setHelpType('')
      dispatch(setBlocked(true))
      dispatch(
        hintShowBest(game_id, Object.keys({ ...mapStones, [val]: 'circle' }))
      )
    } else {
      setMultipleHint(mapStones)
    }
  }
  return (
    <>
      {blocked && <LoaderPage text={t('game.loader')} />}
      <Header gameId={game_id} />
      <Toast
        heading={t('game.superiority')}
        description={
          <>
            {t('game.sup.leads')}{' '}
            <span className="font-bold">
              {scoresWinner &&
                (scoresWinner === 'W' ? t('game.whites') : t('game.blacks'))}
            </span>{' '}
            {!!superiority && (
              <>
                {t('game.sup.gap')}{' '}
                <span className="font-bold">{superiority}</span>{' '}
                {t('game.sup.points')}!
              </>
            )}
          </>
        }
        show={!!scoresWinner}
        onClose={() => dispatch(clearSuperiority())}
      />

      <div className="flex flex-col lg:flex-row justify-between w-full items-stretch px-0 lg:px-8 mx-auto mt-20">
        <Board
          lastMarkers={lastMarkers}
          hint={hint}
          setHint={setHint}
          currentColor={stepColor}
          setCurrentColor={setStepColor}
          yourColor={yourColor}
          helpType={helpType}
          setMultipleHint={(val) => setMultipleHintFunc(val)}
          multipleHint={multipleHint}
          multipleCount={multipleCount}
          coordinates={coordinates}
          setStonePosition={move}
          setHelpType={setHelpType}
          setMapType={setMapType}
          setMultipleType={setMultipleType}
          setActiveHelpId={setActiveHelpId}
          className={classNames}
          mapStones={mapStones}
          gameId={game_id}
        />
        <div className="flex flex-col items-center mt-9 px-4 gap-y-8 w-full lg:w-1/2">
          <Players
            enemyPass={enemyPass}
            opponent={opponent}
            you={you}
            stepColor={stepColor}
            yourColor={yourColor}
            stepMain={stepMain}
            stepTwo={stepTwo}
            times={times}
          />
          <HelpPlate
            hint={hint}
            setPass={pass}
            viewPass={Object.keys(coordinates).length > 0}
            setHint={(e) => setHint(e)}
            setResign={resign}
            view={stepColor === yourColor}
          />
          {hint ? (
            <Help
              handleHelp={handleHelp}
              activeHelpId={activeHelpId}
              scores={stepColor === yourColor}
              counter={cunter}
            />
          ) : (
            <GameInfo
              enemyPass={enemyPass}
              opponent={opponent}
              you={you}
              stepColor={stepColor}
              yourColor={yourColor}
              stepMain={stepMain}
              stepTwo={stepTwo}
              times={times}
              turns={turns}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default GameBoard
