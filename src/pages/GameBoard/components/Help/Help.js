import React, { useMemo, useState } from 'react'
import { GameStage, HelpTypes } from './decl'
import classNames from 'classnames'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

const HelpButton = ({ active, onClick, children }) => {
  return (
    <div className="group w-1/2 cursor-pointer " onClick={onClick}>
      <div
        className={classNames(
          'bg-gray-100 m-1 rounded-md group-hover:bg-gray-200 p-2 select-none',
          { 'bg-yellow-200': active }
        )}
      >
        {children}
      </div>
    </div>
  )
}

const Help = ({ handleHelp, activeHelpId, scores, counter }) => {
  const [hintShow, setHintShow] = useState(false)

  const { t } = useTranslation()
  const totalParts = 16
  const helpersList = [
    {
      id: HelpTypes.BEST_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES, count: 1 }),
      text: t('game.hints.bestOne'),
      stage: GameStage.SECOND,
      relevant: (i) => i >= totalParts * 0.6,
    },
    {
      id: HelpTypes.BEST_2_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_2_MOVES, count: 2 }),
      text: t('game.hints.bestTwo'),
      stage: GameStage.SECOND,
      relevant: (i) => i >= totalParts * 0.4 && i <= totalParts * 0.6,
    },
    {
      id: HelpTypes.BEST_3_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_3_MOVES, count: 3 }),
      text: t('game.hints.bestThree'),
      stage: GameStage.WIDE,
      relevant: (i) => i >= totalParts * 0.1 && i < totalParts * 0.4,
    },
    {
      id: HelpTypes.BEST_4_MOVES,
      handler: () =>
        scores &&
        handleHelp({ type: 'single', id: HelpTypes.BEST_4_MOVES, count: 4 }),
      text: t('game.hints.bestFour'),
      stage: GameStage.START,
      relevant: (i) => i <= totalParts * 0.4,
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
      text: t('game.hints.bestOneOp'),
      stage: GameStage.SECOND,
      relevant: (i) => i >= totalParts * 0.65,
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
      text: t('game.hints.bestTwoOp'),
      stage: GameStage.END,
      relevant: (i) => i >= totalParts * 0.3 && i <= totalParts * 0.7,
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
      text: t('game.hints.bestThreeOp'),
      stage: GameStage.WIDE,
      relevant: (i) => i >= totalParts * 0.1 && i <= totalParts * 0.5,
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
      text: t('game.hints.bestFourOp'),
      stage: GameStage.START,
      relevant: (i) => i <= totalParts * 0.3,
    },
    {
      id: HelpTypes.HEATMAP_FULL,
      handler: () =>
        scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_FULL }),
      text: t('game.hints.heatmapDetailed'),
      stage: GameStage.WIDE,
      relevant: (i) => i >= totalParts * 0.1 && i <= totalParts * 0.9,
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
      text: t('game.hints.bestOfThree'),
      stage: GameStage.SECOND,
      relevant: (i) => i >= totalParts * 0.5,
    },
    {
      id: HelpTypes.HEATMAP_ZONE_QUARTER,
      handler: () =>
        scores &&
        handleHelp({
          type: 'map',
          id: HelpTypes.HEATMAP_ZONE_QUARTER,
        }),
      text: t('game.hints.bestQuarter'),
      stage: GameStage.NOT_START,
      relevant: (i) => i >= totalParts * 0.2,
    },
    {
      id: HelpTypes.PRED_SUPERIOR,
      handler: () =>
        scores &&
        handleHelp({
          type: 'score',
          id: HelpTypes.PRED_SUPERIOR,
        }),
      text: t('game.hints.getGap'),
      stage: GameStage.NOT_START,
      relevant: (i) => i >= totalParts * 0.2,
    },
    {
      id: HelpTypes.PRED_WINNER,
      handler: () =>
        scores &&
        handleHelp({
          type: 'score',
          id: HelpTypes.PRED_WINNER,
        }),
      text: t('game.hints.getSuper'),
      stage: GameStage.SECOND,
      relevant: (i) => i >= totalParts * 0.4,
    },
  ]

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap justify-between items-stretch">
        <p className="w-full p-2 mb-2 text-2xl text-gray-700 font-bold select-none bg-transparent">
          {t('game.weRecommend')}{' '}
          <p className="inline text-sm font-light text-gray-500 ">
            {t('game.theyWillBeUseful')}
          </p>
        </p>
        {helpersList
          .filter((v) => v.relevant(counter))
          .map((v) => (
            <HelpButton
              active={activeHelpId === v.id}
              onClick={() => {
                v.handler()
                window.scroll(0, 0)
              }}
            >
              {v.text}
            </HelpButton>
          ))}
      </div>
      <div className="mt-4">
        <p
          className="w-full flex items-center gap-x-4 mb-2 text-xl text-gray-700 font-bold cursor-pointer
          select-none transition-all duration-100 p-2 hover:bg-gray-50"
          onClick={() => setHintShow((v) => !v)}
        >
          <ChevronDownIcon
            className={classNames(
              'w-5 h-5 inline transform transition-transform duration-150',
              { '-rotate-90': !hintShow }
            )}
          />{' '}
          {t('game.allHints')}
        </p>
        <div
          className={classNames(
            'transition-all duration-200 flex flex-row flex-wrap justify-between items-stretch overflow-y-hidden overflow-x-hidden',
            hintShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {helpersList
            .filter((v) => !v.relevant(counter))
            .map((v) => (
              <HelpButton
                active={activeHelpId === v.id}
                onClick={() => {
                  v.handler()
                  window.scroll(0, 0)
                }}
              >
                {v.text}
              </HelpButton>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Help
