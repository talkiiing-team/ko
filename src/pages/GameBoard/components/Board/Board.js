import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Goban } from 'react-goban'
import styled from 'styled-components'
import { markersClear, setMapStones } from '../../../../store/Board/actions'
import { client } from '../../../../socket'
import classNames from 'classnames'

const Board = ({
  lastMarkers,
  socket,
  setHint,
  currentColor,
  setCurrentColor,
  yourColor,
  helpType,
  setMultipleHint,
  multipleHint,
  coordinates,
  setCoordinates,
  setHelpType,
  setMultipleType,
  setActiveHelpId,
  setMapType,
  setStonePosition,
  className,
  mapStones,
  gameId,
}) => {
  const dispatch = useDispatch()
  const markers = useSelector((state) => state.board.markers)
  const classNamesMapStones = useSelector(
    (state) => state.board.classNamesMapStones
  )

  const handleTurn = (stonePosition) => {
    let valid = true
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false
      }
    }
    if (valid && currentColor === yourColor) {
      setStonePosition(stonePosition)
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
      setCurrentColor(currentColor === 'white' ? 'black' : 'white')
      setHint(false)
      dispatch(markersClear())
      setHelpType('')
      setActiveHelpId('')
      setMultipleType(false)
      setMapType(false)
    }
  }

  const handleMultipleTurn = (stonePosition) => {
    let valid = true
    for (const key in coordinates) {
      if (key === stonePosition) {
        valid = false
      }
    }
    if (valid) {
      dispatch(setMapStones({ ...mapStones, [stonePosition]: 'circle' }))
      setMultipleHint(stonePosition)
      //setCoordinates({ ...coordinates, [stonePosition]: currentColor });
    }
  }

  let classNameIn
  if (currentColor !== yourColor) {
    classNameIn = 'disabled'
  } else {
    classNameIn = ''
  }

  return (
    <div className={classNames(classNameIn, className, 'w-full lg:max-w-3xl')}>
      <Goban
        stones={coordinates}
        markers={markers}
        lastMarkers={lastMarkers}
        mapStones={mapStones}
        classNamesMapStones={classNamesMapStones}
        onIntersectionClick={
          helpType !== 'multiple' ? handleTurn : handleMultipleTurn
        }
        theme={'paper'}
        nextToPlay={yourColor}
      />
    </div>
  )
}

export default Board
