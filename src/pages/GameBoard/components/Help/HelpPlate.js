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
    <div>
      <div className="flex flex-row gap-x-2 text-lg lg:text-2xl ml-4">
        <ButtonCustom
          onClick={() => setHint(!hint)}
          active={hint || false}
          disabled={!view}
        >
          {t('game.btn.takeHint')}
        </ButtonCustom>
        <ButtonCustom onClick={() => setPass()} disabled={!viewPass}>
          {t('game.btn.pass')}
        </ButtonCustom>
        <ButtonCustom onClick={() => setResign()}>
          {t('game.btn.giveUp')}
        </ButtonCustom>
      </div>
    </div>
  )
}
