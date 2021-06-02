import React, { useEffect, useState } from 'react'
import Logo from '../../../../assets/img/mindgame.png'
import { MAIN_URL, PROFILE_URL } from '../../../../constants/routes'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { useTranslation } from 'react-i18next'

export const Header = ({
  history,
  gameId,
  setHint,
  hint,
  setResign,
  helpType,
  setPass,
  viewPass,
  view,
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bg-white border-b-2 border-gray-100 bg-opacity-95 backdrop-filter backdrop-blur-lg z-50 top-0 left-0 w-full h-32 flex justify-between gap-x-4 items-center p-6">
      <a href={MAIN_URL}>
        <img className="w-auto max-w-xl h-16" alt="Mind Games" src={Logo} />
      </a>
      <div className="w-full flex flex-row justify-between">
        <div>
          <div className="flex flex-row gap-x-4 text-2xl ml-4">
            <ButtonCustom onClick={() => setPass()} disabled={!viewPass}>
              {t('game.btn.pass')}
            </ButtonCustom>
            <ButtonCustom onClick={() => setResign()}>
              {t('game.btn.giveUp')}
            </ButtonCustom>
            <ButtonCustom
              onClick={() => setHint(!hint)}
              active={hint || false}
              disabled={!view}
            >
              {t('game.btn.takeHint')}
            </ButtonCustom>
          </div>
        </div>
        <p className="text-lg my-2 text-gray-400">ID: {gameId}</p>
      </div>
    </div>
  )
}
