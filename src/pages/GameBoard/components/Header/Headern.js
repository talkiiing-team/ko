import React, { useEffect, useState } from 'react'
import Logo from '../../../../assets/img/mindgame.png'
import { MAIN_URL, PROFILE_URL } from '../../../../constants/routes'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { Input } from '../../../../components/InputCustom'
import { HomeIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

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
  return (
    <div className="fixed bg-white opacity-95 backdrop-filter backdrop-blur-lg z-50 top-0 left-0 w-full h-32 flex justify-between gap-x-4 items-center p-6">
      <a href={MAIN_URL}>
        <img className="w-auto max-w-xl h-16" alt="Mind Games" src={Logo} />
      </a>
      <div className="w-full flex flex-row justify-between">
        <div>
          <div className="flex flex-row gap-x-4 text-2xl ml-4">
            {viewPass && (
              <ButtonCustom onClick={() => setPass()}>Пас</ButtonCustom>
            )}
            <ButtonCustom onClick={() => setResign()}>Сдаться</ButtonCustom>
            {view && (
              <ButtonCustom onClick={() => setHint(!hint)} active={hint || false}>
                Взять подсказку
              </ButtonCustom>
            )}
          </div>
        </div>
        <p className="text-xl my-2">ID игры: {gameId}</p>
      </div>
    </div>
  )
}