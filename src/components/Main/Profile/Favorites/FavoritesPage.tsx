import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAccessToken,
  getAuthorizedUser,
  getFavoriteSearchSelector,
} from '../../../../redux/reduxSelectors/searchPageSelector'
import {SearchCart} from './SearchCart'
import {actionsYouTubeSearch} from '../../../../redux/SearchPageReducer'
import {Navigate} from 'react-router-dom'
import styles from './Favorite.module.css'

export const FavoritesPage = () => {
  const favoriteSearch = useSelector(getFavoriteSearchSelector)
  const accessToken = useSelector(getAccessToken)
  const AuthorizedUser = useSelector(getAuthorizedUser)

  const dispatch: any = useDispatch()

  useEffect(() => {
    AuthorizedUser &&
      dispatch(actionsYouTubeSearch.setYoutubeRequests(AuthorizedUser.id))
  }, [])

  if (!accessToken) {
    return <Navigate to={'/YoutubeApi_2.0/login'} />
  } else {
    return (
      <>
        {!favoriteSearch.length ? (
          <div className={styles.container}>
            <h1>Добавте любимый поиск</h1>
          </div>
        ) : (
          <div className={styles.container}>
            {favoriteSearch.map((request) => {
              return (
                <div key={`${request.title}${request.id}`}>
                  <SearchCart request={request} />
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }
}
