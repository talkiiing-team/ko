import React from 'react'
import Players from '../GameInfo/components/Players/Players'
import { HelpTypes } from './decl'
import classNames from 'classnames'
/*
const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  background: ${(props) => (props.active ? '#D8AD63' : '#f6f6f6')};
  padding: 10px;
  cursor: pointer;
`*/

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
  return (
    <div className="w-full mt-8">
      <div className="flex flex-row flex-wrap justify-between items-stretch overflow-y-scroll overflow-x-hidden">
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES, count: 1 })
          }
        >
          Лучший ход
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_2_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'single', id: HelpTypes.BEST_2_MOVES, count: 2 })
          }
        >
          Два лучших хода
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_3_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'single', id: HelpTypes.BEST_3_MOVES, count: 3 })
          }
        >
          Три лучших хода
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_4_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'single', id: HelpTypes.BEST_4_MOVES, count: 4 })
          }
        >
          Четыре лучших хода
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_MOVES_ENEMY}
          onClick={() =>
            scores &&
            handleHelp({
              type: 'single',
              id: HelpTypes.BEST_MOVES_ENEMY,
              count: 1,
            })
          }
        >
          Лучший ход соперника
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_2_MOVES_ENEMY}
          onClick={() =>
            scores &&
            handleHelp({
              type: 'single',
              id: HelpTypes.BEST_2_MOVES_ENEMY,
              count: 2,
            })
          }
        >
          Два лучших хода соперника
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_3_MOVES_ENEMY}
          onClick={() =>
            scores &&
            handleHelp({
              type: 'single',
              id: HelpTypes.BEST_3_MOVES_ENEMY,
              count: 3,
            })
          }
        >
          Три лучших хода соперника
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.BEST_4_MOVES_ENEMY}
          onClick={() =>
            scores &&
            handleHelp({
              type: 'single',
              id: HelpTypes.BEST_4_MOVES_ENEMY,
              count: 4,
            })
          }
        >
          Четыре лучших хода соперника
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.SELECT_BEST_MOVES}
          onClick={() =>
            scores &&
            handleHelp({
              type: 'multiple',
              multipleHandleCount: 4,
              id: HelpTypes.SELECT_BEST_MOVES,
            })
          }
        >
          Показать лучший из заданных 3 ходов
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores &&
            handleHelp({ type: 'map', id: HelpTypes.HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.PRED_SUPERIOR}
          onClick={() =>
            scores && handleHelp({ type: 'score', id: HelpTypes.PRED_SUPERIOR })
          }
        >
          Какой разрыв в очках?
        </HelpButton>
        <HelpButton
          active={activeHelpId === HelpTypes.PRED_WINNER}
          onClick={() =>
            scores && handleHelp({ type: 'score', id: HelpTypes.PRED_WINNER })
          }
        >
          Кто побеждает?
        </HelpButton>
      </div>
    </div>
  )
}

export default Help
