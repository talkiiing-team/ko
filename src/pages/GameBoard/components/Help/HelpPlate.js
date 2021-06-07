import { ButtonCustom } from '../../../../components/ButtonCustom'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const HelpPlate = ({
  setHint,
  hint,
  setResign,
  setPass,
  viewPass,
  view,
}) => {
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-row items-stretch justify-between gap-x-2 text-lg lg:text-2xl px-1">
      <ButtonCustom
        onClick={() => setHint(!hint)}
        active={hint || false}
        disabled={!view}
        className="px-4"
      >
        {t('game.btn.takeHint')}
      </ButtonCustom>
      <ButtonCustom
        onClick={() => setPass()}
        disabled={!viewPass}
        className="px-4"
      >
        {t('game.btn.pass')}
      </ButtonCustom>
      <ButtonCustom onClick={() => setResign()} className="px-4">
        {t('game.btn.giveUp')}
      </ButtonCustom>
    </div>
  )
}
