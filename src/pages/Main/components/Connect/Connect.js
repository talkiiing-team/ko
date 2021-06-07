import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import AvatarImage from '../../../../assets/img/avatar-2.png'
import { GAME_URL } from '../../../../constants/routes'
import { useTranslation } from 'react-i18next'

export const Connect = ({ text, history, opponent }) => {
  const [seconds, setSeconds] = useState(0)

  const { t } = useTranslation()
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (seconds === 1) {
      history.push(GAME_URL)
    }
  }, [seconds])

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full h-24"
            alt="Avatar"
            src={opponent.avatar}
          />
          <p className="text-3xl">{opponent.nickname}</p>
          <p className="text-xl">
            {opponent.pts}/{opponent.position + 'th'}
          </p>
        </div>
      </div>
      <p className="text-2xl text-center mb-4">{text}</p>
      <ButtonCustom disabled>
        {t('common.cancel')}
      </ButtonCustom>
    </>
  )
}
