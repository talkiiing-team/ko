import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Logo from '../../../assets/img/mindgame.png'
import { ButtonCustom } from '../../../components/ButtonCustom'
import { Input } from '../../../components/InputCustom'
import { regSubmit, loginSubmit } from '../../../store/Auth/actions'
import { Header } from '../../Main/components/Header'

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  padding: 230px 0;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  width: 513px;
  margin: 0 auto;
`

const Form = styled.form``

const Top = styled.div`
  display: flex;
  align-self: flex-start;
  margin-bottom: 49px;
  margin-left: 50px;
  position: absolute;
  top: 50px;
`

const Logotype = styled.img`
  height: auto;
  width: 405px;
  margin-right: 94px;
`

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

  const handleAuth = async (e) => {
    e.preventDefault()
    if (activeTab === 'reg') {
      if (!email || !nickname) {
        setError('Заполните все поля')
      } else {
        setError('')
        await dispatch(regSubmit(nickname, email))
      }
    }
    if (activeTab === 'auth') {
      if (!email || !password) {
        setError('Заполните все поля')
      } else {
        setError('')
        // setToken(register(email, nickname)
        await dispatch(loginSubmit(password, email))
      }
    }
  }

  return (
    <div className="flex flex-col items-center pt-80 px-6">
      {/*<div className="m-8 mb-48">*/}
      {/*  <img className="w-30 h-auto" alt="logo" src={Logo} />*/}
      {/*</div>*/}
      <Header onlyLogo />
      <div className="w-full mx-auto max-w-xl mb-40">
        <Form onSubmit={handleAuth}>
          <Tabs className="mb-8">
            <Tab
              onClick={() => setActiveTab('reg')}
              active={activeTab === 'reg'}
            >
              Зарегистрироваться
            </Tab>
            <Span>\</Span>
            <Tab
              onClick={() => setActiveTab('auth')}
              active={activeTab === 'auth'}
            >
              Войти
            </Tab>
          </Tabs>
          <Input
            className="mb-4"
            mt={20}
            type="email"
            placeholder="Email"
            onChange={setEmail}
            value={email}
            name="email"
          />
          {activeTab === 'reg' ? (
            <Input
              className="mb-4"
              mt={10}
              mb={30}
              placeholder="Nickname"
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
              placeholder="Password"
              onChange={setPassword}
              value={password}
              errorMessage={error}
              name="password"
              type="password"
            />
          )}
          <ButtonCustom className="w-full" type="submit">
            Далее
          </ButtonCustom>
        </Form>
      </div>
    </div>
  )
}

export default Auth
