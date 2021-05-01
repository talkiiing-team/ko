import {
  SINGLE_HELP,
  MARKERS_CLEAR,
  MULTIPLE_HELP,
  WINNER_USER,
  LOSER_USER,
  SET_BLOCKED,
  MAP_STONES,
  GET_SCORES_WINNER,
} from './types'
import { HintTypes } from './decl'

export const hintHeatmapFull = (game_id) => ({
  type: HintTypes.GET_HINT_HEATMAP_FULL,
  payload: { game_id: game_id },
})

export const singleHelp = () => ({
  type: SINGLE_HELP,
})

export const multipleHelp = () => ({
  type: MULTIPLE_HELP,
})

export const markersClear = () => ({
  type: MARKERS_CLEAR,
})

export const setWinnerUser = (winner) => ({
  type: WINNER_USER,
  payload: winner,
})

export const setLoserUser = (loser) => ({
  type: LOSER_USER,
  payload: loser,
})

export const setBlocked = (blocked) => ({
  type: SET_BLOCKED,
  payload: blocked,
})

export const setMapStones = (stones) => ({
  type: MAP_STONES,
  payload: stones,
})

export const setScoresWinner = (game_id) => ({
  type: HintTypes.GET_HINT_SHOW_WINNER,
  payload: { game_id },
})

export const setScoresSuperior = (game_id) => ({
  type: HintTypes.GET_HINT_SHOW_SUPERIOR,
  payload: { game_id },
})

export const hintBestMoves = (game_id, count) => ({
  type: HintTypes.GET_HINT_BEST_MOVES,
  payload: { game_id: game_id, count: count },
})

export const hintBestMovesEnemy = (game_id, count) => ({
  type: HintTypes.GET_HINT_BEST_MOVES_ENEMY,
  payload: { game_id: game_id, count: count },
})

export const hintShowBest = (game_id, moves) => ({
  type: HintTypes.GET_HINT_SHOW_BEST,
  payload: { game_id: game_id, moves: moves },
})

export const hintShowBestEnemy = (game_id, moves) => ({
  type: HintTypes.GET_HINT_SHOW_BEST,
  payload: { game_id: game_id, moves: moves },
})

export const hintHeatmap = (game_id) => ({
  type: HintTypes.GET_HINT_HEATMAP,
  payload: { game_id: game_id },
})

export const hintHeatmapZone = (game_id, isQuarter) => ({
  type: HintTypes.GET_HINT_HEATMAP_ZONE,
  payload: { game_id: game_id, isQuarter },
})
