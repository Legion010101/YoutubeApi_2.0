import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {
  getAccessToken,
  getVideosFromYouTubeSelector,
} from '../../../../redux/reduxSelectors/searchPageSelector'
import {VideoCart} from './VideoCart'
import {VideoSelectorForm} from './SearchForm'
import {SaveSearchSelectorForm} from './SaveSearchForm'
import {Navigate} from 'react-router-dom'
import styles from './Search.module.css'

export const YouTubeSearchPage = () => {
  const [saveMode, setSaveMode] = useState(false)
  const videos = useSelector(getVideosFromYouTubeSelector)
  const accessToken = useSelector(getAccessToken)

  const turnOnTheSaveMode = () => {
    setSaveMode(true)
  }
  const turnOffTheSaveMode = () => {
    setSaveMode(false)
  }
  if (!accessToken) {
    return <Navigate to={'/login'} />
  } else {
    return (
      <div className={styles.containerSearchPage}>
        <VideoSelectorForm saveMode={saveMode} />
        {saveMode && (
          <div>
            <SaveSearchSelectorForm toggleEditMode={turnOffTheSaveMode} />
          </div>
        )}
        {!videos.length ? (
          <h1>Начните поиск</h1>
        ) : (
          <div>
            {!saveMode && (
              <button className="btn btn-dark" onClick={turnOnTheSaveMode}>
                Сохранить запрос
              </button>
            )}
            <div className={styles.container}>
              {videos.map((video) => {
                return (
                  <div key={video.id.videoId} className={styles.item}>
                    <VideoCart video={video.id.videoId} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}
