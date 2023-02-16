import React, {FC} from 'react'
import style from './Header.module.css'
import {useDispatch, useSelector} from 'react-redux'

import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../redux/reduxStore'
import {Button} from 'antd'
import {
  getAccessToken,
  getAuthorizedUser,
} from '../../redux/reduxSelectors/searchPageSelector'
import {logoutUser} from '../../redux/authReducer'
import {ActionTypes} from '../../redux/SearchPageReducer'

import {actionsYouTubeSearch, videoFromYT} from '../../redux/SearchPageReducer'

const Header: FC = () => {
  const dispatchThunk: HeaderDispatch = useDispatch()
  const dispatch = useDispatch()

  const accessToken = useSelector(getAccessToken)
  const AuthorizedUser = useSelector(getAuthorizedUser)
  const logout = () => {
    dispatchThunk(logoutUser())
    dispatch(
      actionsYouTubeSearch.setDataRequest({
        q: '',
        maxResults: 5,
        order: 'relevance',
        videoDuration: 'any',
      }),
      // @ts-ignore
      dispatch(actionsYouTubeSearch.setVideosToShow(null)),
    )
  }

  return (
    <div className={style.hat}>
      <div className={style.container}>
        {accessToken ? (
          <div className={style.loginUser}>
            <div style={{color: 'white'}}>{AuthorizedUser?.login}</div>
            <Button type="primary" size="large" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export {Header}
export type HeaderDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
