import React from 'react'
import Players from '../GameInfo/components/Players/Players'
import { HelpTypes } from './decl'
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

const Help = ({
  enemyPass,
  stepColor,
  yourColor,
  you,
  opponent,
  stepMain,
  stepTwo,
  handleHelp,
  activeHelpId,
  scores,
  times,
}) => {
  return (
    <div className="w-full">
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
      <div>
        <div
          active={activeHelpId === HelpTypes.BEST_MOVES}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES, count: 1 })
          }
        >
          Лучший ход
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_2_MOVES}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_2_MOVES, count: 2 })
          }
        >
          Два лучших хода
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_3_MOVES}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_3_MOVES, count: 3 })
          }
        >
          Три лучших хода
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_4_MOVES}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_4_MOVES, count: 4 })
          }
        >
          Четыре лучших хода
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_MOVES_ENEMY}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES_ENEMY, count: 1 })
          }
        >
          Лучший ход соперника
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_2_MOVES_ENEMY}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_2_MOVES_ENEMY, count: 2 })
          }
        >
          Два лучших хода соперника
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_3_MOVES_ENEMY}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_3_MOVES_ENEMY, count: 3 })
          }
        >
          Три лучших хода соперника
        </div>
        <div
          active={activeHelpId === HelpTypes.BEST_4_MOVES_ENEMY}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_4_MOVES_ENEMY, count: 4 })
          }
        >
          Четыре лучших хода соперника
        </div>
        <div
          active={activeHelpId === HelpTypes.HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </div>
        <div
          active={activeHelpId === HelpTypes.SELECT_BEST_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'multiple', multipleHandleCount: 4, id: HelpTypes.SELECT_BEST_MOVES })
          }
        >
          Показать лучший из заданных 3 ходов
        </div>
        <div
          active={activeHelpId === HelpTypes.HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </div>
        <div
          active={activeHelpId === HelpTypes.PRED_SUPERIOR}
          onClick={() => scores && handleHelp({ type: 'score', id: HelpTypes.PRED_SUPERIOR })}
        >
          Кто лидирует?
        </div>
        <div
          active={activeHelpId === HelpTypes.PRED_WINNER}
          onClick={() => scores && handleHelp({ type: 'score', id: HelpTypes.PRED_WINNER })}
        >
          Кого можно назвать победителем сейчас?
        </div>
      </div>
    </div>
  )
}

export default Help
