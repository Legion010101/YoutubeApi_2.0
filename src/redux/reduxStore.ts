import {combineReducers, applyMiddleware, Action} from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from '@reduxjs/toolkit'
import SearchPageReducer from './SearchPageReducer'
import sidebarReducer from './sidebarReducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {authReducer} from './authReducer'
import {compose} from 'redux'

let rootReducer = combineReducers({
  searchPage: SearchPageReducer,
  navig: sidebarReducer,
  auth: authReducer,
})
type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

export type ThankTypeCreator<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  any,
  A
>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export {store}
