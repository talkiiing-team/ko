import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Logo from '../../assets/img/mindgame.png'
import { ButtonCustom } from '../../components/ButtonCustom'
import { Input } from '../../components/InputCustom'
import { regSubmit, loginSubmit } from '../../store/Auth/actions'
import { useTranslation } from 'react-i18next'

const Form = styled.form``

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.p`
  cursor: pointer;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.active ? '#000000' : '#838383')};
  font-weight: 700;
`
const Span = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #838383;
  font-weight: 700;
  margin-left: 5px;
  margin-right: 5px;
`

const Auth = () => {
  const [activeTab, setActiveTab] = useState('reg')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleAuth = async (e) => {
    e.preventDefault()
    if (activeTab === 'reg') {
      if (!email || !nickname) {
        setError(t('auth.error.fillAll'))
      } else {
        setError('')
        await dispatch(regSubmit(nickname, email))
      }
    }
    if (activeTab === 'auth') {
      if (!email || !password) {
        setError(t('auth.error.fillAll'))
      } else {
        setError('')
        // setToken(register(email, nickname)
        await dispatch(loginSubmit(password, email))
      }
    }
  }

  return (
    <div className="flex flex-col items-center mt-28 px-6">
      <img className="w-auto max-w-xl my-6" alt="Mind Games" src={Logo} />
      <div className="w-full mx-auto max-w-xl mb-40">
        <Form onSubmit={handleAuth}>
          <Tabs className="mb-8">
            <Tab
              onClick={() => setActiveTab('reg')}
              active={activeTab === 'reg'}
            >
              {t('auth.register')}
            </Tab>
            <Span>\</Span>
            <Tab
              onClick={() => setActiveTab('auth')}
              active={activeTab === 'auth'}
            >
              {t('auth.signIn')}
            </Tab>
          </Tabs>
          <Input
            className="mb-4"
            mt={20}
            type="email"
            placeholder={t('auth.email')}
            onChange={setEmail}
            value={email}
            name="email"
          />
          {activeTab === 'reg' ? (
            <Input
              className="mb-4"
              mt={10}
              mb={30}
              placeholder={t('auth.nickname')}
              onChange={setNickname}
              value={nickname}
              errorMessage={error}
              name="nickname"
            />
          ) : (
            <Input
              mt={10}
              mb={30}
              className="mb-4"
              placeholder={t('auth.password')}
              onChange={setPassword}
              value={password}
              errorMessage={error}
              name="password"
              type="password"
            />
          )}
          <ButtonCustom className="w-full" type="submit">
            {t('auth.next')}
          </ButtonCustom>
        </Form>
      </div>
    </div>
  )
}

export default Auth
