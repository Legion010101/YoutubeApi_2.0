import {InferActionType, ThankTypeCreator} from './reduxStore'
import {loginType} from '../types/types'
import {hashHelper} from '../utility/hashHelper'
import {Users, UserType} from '../Backend/UsersData'
import {getTokens} from '../utility/tokenUtility'

const initialState = {
  accessToken: null as string | null,
  authorizedUser: null as UserType | null,
  initialization: false,
}

const authReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'auth/SET-ACCESS-SUCCESSFUL': {
      return {
        ...state,
        accessToken: action.token,
      }
    }
    case 'auth/SET-AUTHORIZED-USER-SUCCESSFUL': {
      return {
        ...state,
        authorizedUser: action.user,
      }
    }
    case 'auth/SET-INITIALIZATION': {
      return {
        ...state,
        initialization: action.initialization,
      }
    }
    default:
      return state
  }
}
const actionsAuth = {
  setAccessToken: (token: string | null) =>
    ({
      type: 'auth/SET-ACCESS-SUCCESSFUL',
      token,
    } as const),
  setAuthorizedUser: (user: UserType | null) =>
    ({
      type: 'auth/SET-AUTHORIZED-USER-SUCCESSFUL',
      user,
    } as const),
  setInitialization: (initialization: boolean) =>
    ({
      type: 'auth/SET-INITIALIZATION',
      initialization,
    } as const),
}

export const loginUser =
  (
    dataUser: loginType,
    setStatus: (message: Array<string>) => void,
  ): ThankType =>
  async (dispatch) => {
    hashHelper(dataUser.password).then((hash) => {
      const authorizedUser = Users.filter(
        (user) => user.login === dataUser.login && user.passwordHash === hash,
      )
      if (authorizedUser.length) {
        const user = authorizedUser[0]
        const userString = JSON.stringify(user)
        const {accessToken} = getTokens(user.login)
        dispatch(actionsAuth.setAuthorizedUser(user))
        dispatch(actionsAuth.setAccessToken(accessToken))
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('authorizedUser', userString)
      } else {
        return setStatus(['Неправильный логин или пароль'])
      }
    })
  }
export const logoutUser = (): ThankType => async (dispatch) => {
  dispatch(actionsAuth.setAuthorizedUser(null))
  dispatch(actionsAuth.setAccessToken(null))
  localStorage.removeItem('accessToken')
  localStorage.removeItem('authorizedUser')
}
export const initializationing = (): ThankType => async (dispatch) => {
  let accessToken =
    localStorage.getItem('accessToken') && localStorage.getItem('accessToken')
  let authorizedUserLS =
    localStorage.getItem('authorizedUser') &&
    localStorage.getItem('authorizedUser')

  if (accessToken && authorizedUserLS) {
    const authorizedUser = JSON.parse(authorizedUserLS)
    dispatch(actionsAuth.setAuthorizedUser(authorizedUser))
    dispatch(actionsAuth.setAccessToken(accessToken))
  }
  dispatch(actionsAuth.setInitialization(true))
}

export {authReducer}
type initialStateType = typeof initialState

export type ActionTypes = InferActionType<typeof actionsAuth>

export type ThankType = ThankTypeCreator<ActionTypes>
