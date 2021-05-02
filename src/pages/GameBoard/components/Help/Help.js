import React from 'react'
import { HelpTypes } from './decl'
import classNames from 'classnames'

const HelpButton = ({ active, onClick, children }) => {
  return (
    <div className="group w-1/2 cursor-pointer " onClick={onClick}>
      <div
        className={classNames(
          'bg-gray-100 m-1 rounded-md group-hover:bg-gray-200 p-2',
          { 'bg-yellow-200': active }
        )}
      >
        {children}
      </div>
    </div>
  )
}

const Help = ({ handleHelp, activeHelpId, scores }) => {
  const helpersList = [
    {
      id: HelpTypes.BEST_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES, count: 1 }),
      text: 'Лучший ход',
    },
    {
      id: HelpTypes.BEST_2_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_2_MOVES, count: 2 }),
      text: 'Два лучших хода',
    },
    {
      id: HelpTypes.BEST_3_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_3_MOVES, count: 3 }),
      text: 'Три лучших хода',
    },
    {
      id: HelpTypes.BEST_4_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_4_MOVES, count: 4 }),
      text: 'Четыре лучших хода',
    },
    {
      id: HelpTypes.BEST_MOVES_ENEMY,
      handler: () =>
        scores &&
        handleHelp({
          type: 'single',
          id: HelpTypes.BEST_MOVES_ENEMY,
          count: 1,
        }),
      text: 'Лучший ход соперника',
    },
    {
      id: HelpTypes.BEST_2_MOVES_ENEMY,
      handler: () =>
        scores &&
        handleHelp({
          type: 'single',
          id: HelpTypes.BEST_2_MOVES_ENEMY,
          count: 2,
        }),
      text: 'Два лучших хода соперника',
    },
    {
      id: HelpTypes.BEST_3_MOVES_ENEMY,
      handler: () =>
        scores &&
        handleHelp({
          type: 'single',
          id: HelpTypes.BEST_3_MOVES_ENEMY,
          count: 3,
        }),
      text: 'Три лучших хода соперника',
    },
    {
      id: HelpTypes.BEST_4_MOVES_ENEMY,
      handler: () =>
        scores &&
        handleHelp({
          type: 'single',
          id: HelpTypes.BEST_4_MOVES_ENEMY,
          count: 4,
        }),
      text: 'Четыре лучших хода соперника',
    },
    {
      id: HelpTypes.HEATMAP_FULL,
      handler: () =>
        scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_FULL }),
      text: 'Тепловая карта детализированная',
    },
    {
      id: HelpTypes.SELECT_BEST_MOVES,
      handler: () =>
        scores &&
        handleHelp({
          type: 'multiple',
          id: HelpTypes.SELECT_BEST_MOVES,
          multipleHandleCount: 4,
        }),
      text: 'Выбрать лучший ход из трех',
    },
    {
      id: HelpTypes.HEATMAP_ZONE_QUARTER,
      handler: () =>
        scores &&
        handleHelp({
          type: 'map',
          id: HelpTypes.HEATMAP_ZONE_QUARTER,
        }),
      text: 'Выбор лучшей четверти для игры',
    },
    {
      id: HelpTypes.PRED_SUPERIOR,
      handler: () =>
        scores &&
        handleHelp({
          type: 'score',
          id: HelpTypes.PRED_SUPERIOR,
        }),
      text: 'Узнать разрыв в очках',
    },
    {
      id: HelpTypes.PRED_WINNER,
      handler: () =>
        scores &&
        handleHelp({
          type: 'score',
          id: HelpTypes.PRED_WINNER,
        }),
      text: 'Узнать превосходство',
    },
  ]

  return (
    <div className="w-full mt-8">
      <div className="flex flex-row flex-wrap justify-between items-stretch overflow-y-scroll overflow-x-hidden">
        {helpersList.map((v) => (
          <HelpButton active={activeHelpId === v.id} onClick={v.handler}>
            {v.text}
          </HelpButton>
        ))}
      </div>
    </div>
  )
}

export default Help
