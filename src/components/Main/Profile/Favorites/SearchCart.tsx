import {FC, useState} from 'react'
import {youtubeRequestsType} from '../../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {
  actionsYouTubeSearch,
  getVideoFromYouTube,
} from '../../../../redux/SearchPageReducer'
import {useNavigate} from 'react-router'
import {SaveSearchSelectorForm} from '../Search/SaveSearchForm'
import {getAuthorizedUser} from '../../../../redux/reduxSelectors/searchPageSelector'
import styles from './Favorite.module.sass'
import {
  DeleteOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {Button} from 'antd'

export const SearchCart: FC<propsType> = ({request}) => {
  const dispatch: any = useDispatch()
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const AuthorizedUser = useSelector(getAuthorizedUser)

  const turnOnTheSaveMode = () => {
    setEditMode(true)
  }
  const turnOffTheSaveMode = () => {
    setEditMode(false)
  }
  const deleteRequest = () => {
    AuthorizedUser &&
      dispatch(
        actionsYouTubeSearch.deleteYoutubeRequests(request, AuthorizedUser.id),
      )
  }

  const {q, maxResults, order, videoDuration} = request

  const SearchVideo = () => {
    dispatch(getVideoFromYouTube(q, maxResults, order, videoDuration))
    navigate('/search')
  }

  return (
    <div className={styles.containerCart}>
      <div className={styles.nameForm}>
        <div className={styles.name}>{request.title}</div>
        <hr />
      </div>
      <div className={styles.btn}>
        <Button onClick={SearchVideo} type="dashed" icon={<SearchOutlined />}>
          Поиск
        </Button>
        <Button
          onClick={turnOnTheSaveMode}
          type="dashed"
          icon={<SettingOutlined />}>
          Редактировать
        </Button>
        <Button onClick={deleteRequest} type="dashed" icon={<DeleteOutlined />}>
          Удалить
        </Button>
      </div>
      {editMode && (
        <div>
          <SaveSearchSelectorForm
            request={request}
            toggleEditMode={turnOffTheSaveMode}
          />
        </div>
      )}
    </div>
  )
}
type propsType = {
  request: youtubeRequestsType
}
