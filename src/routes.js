import React from 'react'
import { Redirect, Router, Switch } from 'react-router-dom'
import history from './history'
import Auth from './pages/Auth/Auth'
import Main from './pages/Main/Main'
import GameBoard from './pages/GameBoard/GameBoard'
import Profile from './pages/Profile/Profile'
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute'
import LoginRoute from './components/Routes/LoginRoute/LoginRoute'
import Leaders from './pages/Leaders/Leaders'
import {
  AUTH_URL,
  GAME_URL,
  MAIN_URL,
  PROFILE_URL,
  LEADERS,
} from './constants/routes'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <LoginRoute exact path={AUTH_URL} component={Auth} />
      <PrivateRoute exact path={MAIN_URL} component={Main} />
      <PrivateRoute exact path={GAME_URL} component={GameBoard} />
      <PrivateRoute exact path={PROFILE_URL} component={Profile} />
      <PrivateRoute exact path={LEADERS} component={Leaders} />
      <Redirect to={AUTH_URL} />
    </Switch>
  </Router>
)

export default Routes
