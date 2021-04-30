import React from 'react'
import styled from 'styled-components'
import Players from '../GameInfo/components/Players/Players'
import { HelpTypes } from './decl'

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`

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
`

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
    <Wrapper>
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
      <HelpWrapper>
        <HelpItem
          active={activeHelpId === HelpTypes.BEST_MOVES}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES, count: 1 })
          }
        >
          Лучший ход
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.BEST_MOVES_ENEMY}
          onClick={() =>
            scores && handleHelp({ type: 'single', id: HelpTypes.BEST_MOVES_ENEMY, count: 1 })
          }
        >
          Лучший ход соперника
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.HEATMAP_FULL}
          onClick={() =>
            scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_FULL })
          }
        >
          Тепловая карта всей доски. Детализированная
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.SELECT_BEST_MOVES}
          onClick={() =>
            scores &&
            handleHelp({ type: 'multiple', multipleHandleCount: 4, id: HelpTypes.SELECT_BEST_MOVES })
          }
        >
          Показать лучший из заданных 3 ходов
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.HEATMAP_ZONE_QUARTER}
          onClick={() =>
            scores && handleHelp({ type: 'map', id: HelpTypes.HEATMAP_ZONE_QUARTER })
          }
        >
          В какой четверти доски сейчас лучший ход?
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.PRED_SUPERIOR}
          onClick={() => scores && handleHelp({ type: 'score', id: HelpTypes.PRED_SUPERIOR })}
        >
          Кто лидирует?
        </HelpItem>
        <HelpItem
          active={activeHelpId === HelpTypes.PRED_WINNER}
          onClick={() => scores && handleHelp({ type: 'score', id: HelpTypes.PRED_WINNER })}
        >
          Кого можно назвать победителем сейчас?
        </HelpItem>
      </HelpWrapper>
    </Wrapper>
  )
}

export default Help
