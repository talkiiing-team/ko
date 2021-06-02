import {
  SINGLE_HELP,
  MARKERS_CLEAR,
  MULTIPLE_HELP,
  MAP_HELP,
  WINNER_USER,
  LOSER_USER,
  SET_BLOCKED,
  MAP_STONES,
  SCORES,
  GET_SCORES_WINNER,
  GET_SCORES_SUPERIOR,
} from './types'
import {
  MAP_HALF,
  MAP_QUARTERS,
} from '../../pages/GameBoard/components/Help/types'

const initialState = {
  markers: {},
  classNamesMapStones: {},
  mapStones: {},
  winner: null,
  loser: null,
  blocked: false,
  scores: null,
  scoresWinner: null,
  superiority: null,
}

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_HELP:
      return {
        ...state,
        markers: action.payload,
        blocked: false,
      }
    case SET_BLOCKED:
      return {
        ...state,
        blocked: action.payload,
      }
    case MULTIPLE_HELP:
      return {
        ...state,
        markers: {},
        blocked: false,
      }
    case MARKERS_CLEAR:
      return {
        ...state,
        markers: {},
        mapStones: {},
        classNamesMapStones: {},
        scores: null,
        scoresWinner: null,
      }
    case MAP_STONES:
      return {
        ...state,
        mapStones: action.payload,
        blocked: false,
      }
    case MAP_HELP: {
      console.log(action.payload)
      let _mapStones = {}
      let _classNamesMapStones = {}
      if (typeof action.payload.zone === 'number') {
        console.log('its number')
        const { mapStones, classNamesMapStones } = action.payload.isQuarter
          ? MAP_QUARTERS[action.payload.zone]
          : MAP_HALF[action.payload.zone]
        _mapStones = mapStones
        _classNamesMapStones = classNamesMapStones
      } else {
        let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
        action.payload.zone.map((row, rowId) => {
          row.map((cell, colId) => {
            if (parseInt(cell) !== 0) {
              let sign = alpha[rowId]
              let coord = `${sign}${colId + 1}`
              _mapStones[coord] = 'circle'
              _classNamesMapStones[coord] = `redstone size-${cell}`
            }
          })
        })

      }
      return {
        ...state,
        mapStones: _mapStones,
        classNamesMapStones: _classNamesMapStones,
        blocked: false,
      }
    }
    case WINNER_USER:
      return {
        ...state,
        winner: action.payload,
      }
    case LOSER_USER:
      return {
        ...state,
        loser: action.payload,
      }
    case SCORES:
      return {
        ...state,
        scores: action.payload,
        blocked: false,
      }
    case GET_SCORES_WINNER:
      return {
        ...state,
        scoresWinner: action.payload.winner,
        blocked: false,
      }
    case GET_SCORES_SUPERIOR:
      return {
        ...state,
        scoresWinner: action.payload.winner,
        superiority: action.payload.score,
        blocked: false,
      }
    default:
      return { ...state }
  }
}
