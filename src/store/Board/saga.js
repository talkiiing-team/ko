import { all, takeLatest, call, put } from 'redux-saga/effects'
import { getToken } from '../../helpers/session'
import {
  SINGLE_HELP,
  MAP_HELP,
  SCORES_WINNER,
  GET_SCORES_WINNER,
  GET_SCORES_SUPERIOR,
} from './types'
import {
  helpBestMoves,
  helpShowBest,
  helpHeatmapFull,
  helpHeatmapZone,
  scoresWinner,
  scoresSuperiority,
  helpBestMovesEnemy,
} from '../../api/board'
import { HintTypes } from './decl'
import { HelpTypes } from '../../pages/GameBoard/components/Help/decl'

function* fetchGetHintBestMoves_saga(action) {
  const { payload } = action
  try {
    const res = yield call(
      helpBestMoves,
      getToken(),
      payload.game_id,
      payload.count
    )
    if (res.hint) {
      let newObj = {}
      res.hint.forEach((key, i) => {
        newObj[key.move] = i + 1
      })
      yield put({ type: SINGLE_HELP, payload: newObj })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintBestMovesEnemy_saga(action) {
  const { payload } = action
  try {
    const res = yield call(
      helpBestMovesEnemy,
      getToken(),
      payload.game_id,
      payload.count
    )
    if (res.hint) {
      let newObj = {}
      res.hint.forEach((key, i) => {
        newObj[key.move] = i + 1
      })
      yield put({ type: SINGLE_HELP, payload: newObj })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintShowBest_saga(action) {
  const { payload } = action
  try {
    const res = yield call(
      helpShowBest,
      getToken(),
      payload.game_id,
      payload.moves
    )
    if (res.hint) {
      const newObj = {}
      newObj[res.hint] = 'circle'
      yield put({ type: SINGLE_HELP, payload: newObj })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapFull_saga(action) {
  const { payload } = action
  try {
    const res = yield call(helpHeatmapFull, getToken(), payload.game_id)
    if (res.hint) {
      yield put({ type: MAP_HELP, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintHeatmapZone_saga(action) {
  const { payload } = action
  try {
    const res = yield call(
      helpHeatmapZone,
      getToken(),
      payload.game_id,
      payload.isQuarter
    )
    if (res.hint) {
      yield put({
        type: MAP_HELP,
        payload: { zone: res.hint, isQuarter: payload.isQuarter },
      })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintScoresSuperior_saga(action) {
  const { payload } = action
  try {
    const res = yield call(scoresSuperiority, getToken(), payload.game_id)
    if (res.hint) {
      yield put({ type: GET_SCORES_SUPERIOR, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

function* fetchGetHintScoresWinner_saga(action) {
  const { payload } = action
  try {
    const res = yield call(scoresWinner, getToken(), payload.game_id)
    if (res.hint) {
      yield put({ type: GET_SCORES_WINNER, payload: res.hint })
    }
  } catch (e) {
    //throw e;
  }
}

export function* boardSaga() {
  yield all([
    takeLatest(HintTypes.GET_HINT_BEST_MOVES, fetchGetHintBestMoves_saga),
    takeLatest(HintTypes.GET_HINT_SHOW_BEST, fetchGetHintShowBest_saga),
    takeLatest(HintTypes.GET_HINT_HEATMAP_FULL, fetchGetHintHeatmapFull_saga),
    takeLatest(HintTypes.GET_HINT_HEATMAP_ZONE, fetchGetHintHeatmapZone_saga),
    takeLatest(HintTypes.GET_HINT_SHOW_WINNER, fetchGetHintScoresWinner_saga),
    takeLatest(
      HintTypes.GET_HINT_SHOW_SUPERIOR,
      fetchGetHintScoresSuperior_saga
    ),
    takeLatest(
      HintTypes.GET_HINT_BEST_MOVES_ENEMY,
      fetchGetHintBestMovesEnemy_saga
    )
  ])
}
