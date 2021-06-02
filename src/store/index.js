import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { authReducer } from './Auth/reducers'
import { storyStart } from '../store/sagas'
import { boardReducer } from './Board/reducers'
import { profileReducer } from './Profile/reducers'
import { createGameReducer } from './GameCreate/reducers'

const createReduxStore = () => {

  const reducer = combineReducers({
    auth: authReducer,
    board: boardReducer,
    profile: profileReducer,
    createGame: createGameReducer,
  })
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  );

  const store = createStore(reducer, enhancer)
  sagaMiddleware.run(storyStart)
  return store
}

const store = createReduxStore()

export default store
