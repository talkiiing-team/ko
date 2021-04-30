import { GET } from './base'
const CENTAUR_TOKEN = 'Th6Ee0usghXv5btq'

// HINT MOVES

export const helpBestMoves = (token, game_id, count) => {
  return GET(
    `hints/best-moves?token=${token}&game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&count=${count}`,
    {},
    token
  )
}

export const helpBestMovesEnemy = (token, game_id, count) => {
  return GET(
    `hints/best-moves-enemy?token=${token}&game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&count=${count}`,
    {},
    token
  )
}

export const helpShowBest = (token, game_id, moves) => {
  return GET(
    `hints/show-best?game_id=${game_id}&moves=${moves}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const helpShowBestEnemy = (token, game_id, moves, move) => {
  return GET(
    `hints/show-best-enemy?game_id=${game_id}&move=${move}&moves=${moves}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

// HINT COMMON

export const helpShowNextMoves = (token, game_id, moves) => {
  return GET(
    `hints/future-moves?game_id=${game_id}&moves=${moves}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const helpShowWorstEnemyMove = (token, game_id, moves) => {
  return GET(
    `hints/worst-enemy-move?game_id=${game_id}&moves=${moves}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const scoresWinner = (token, game_id) => {
  return GET(
    `hints/winner?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const scoresSuperiority = (token, game_id) => {
  return GET(
    `hints/superiority?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

// HINT HEATMAP

export const helpHeatmapFull = (token, game_id) => {
  return GET(
    `hints/heatmap-full?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const helpHeatmapQuarter = (token, game_id, quarter) => {
  return GET(
    `hints/heatmap-quarter?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}&quarter=${quarter}`,
    {},
    token
  )
}

export const helpHeatmap = (token, game_id) => {
  return GET(
    `hints/heatmap?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}`,
    {},
    token
  )
}

export const helpHeatmap2Quarter = (token, game_id, quarters) => {
  return GET(
    `hints/heatmap-two-quarters?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}&quarters=${quarters}`,
    {},
    token
  )
}

export const helpHeatmapZone = (token, game_id, is_quarter) => {
  return GET(
    `hints/heatmap-best-move-zone?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}&is_quarter=${
      is_quarter ? 1 : 0
    }`,
    {},
    token
  )
}

export const helpHeatmapZoneEnemy = (token, game_id, is_quarter) => {
  return GET(
    `hints/heatmap-best-enemy-move-zone?game_id=${game_id}&centaur_token=${CENTAUR_TOKEN}&token=${token}&is_quarter=${
      is_quarter ? 1 : 0
    }`,
    {},
    token
  )
}
