import {FC} from 'react'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {orderType, videoDurationType} from '../../../../api/searchApi'
import {actionsYouTubeSearch} from '../../../../redux/SearchPageReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
  getAuthorizedUser,
  getDataRequest,
} from '../../../../redux/reduxSelectors/searchPageSelector'
import {youtubeRequestsType} from '../../../../types/types'
import {validateRequired} from '../../../../utility/validate'
import styles from './Search.module.css'

export const SaveSearchSelectorForm: FC<PropsType> = ({
  toggleEditMode,
  request,
}) => {
  type initialValuesTypes = typeof initialValues

  const validateQ = validateRequired()
  const validateTitle = validateRequired()
  const AuthorizedUser = useSelector(getAuthorizedUser)
  const dispatch: any = useDispatch()

  let getData = useSelector(getDataRequest)
  if (request) getData = request
  const initialValues = {
    title: getData.title ? getData.title : '',
    q: getData.q,
    maxResults: getData.maxResults,
    order: getData.order as orderType,
    videoDuration: getData.videoDuration as videoDurationType,
  }

  const onSubmit = (
    values: initialValuesTypes,
    {setSubmitting}: FormikHelpers<initialValuesTypes>,
  ) => {
    if (request && AuthorizedUser) {
      dispatch(
        actionsYouTubeSearch.refactorYoutubeRequests(
          {
            ...values,
            id: request.id,
          },
          AuthorizedUser.id,
        ),
      )
    } else if (AuthorizedUser) {
      dispatch(actionsYouTubeSearch.addNewSearch(values, AuthorizedUser.id))
    }
    toggleEditMode()
    setSubmitting(false)
  }
  return (
    <div className={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}>
        {({values, errors}) => (
          <Form>
            <div className={styles.AddToFavoritesForm}>
              <div className={styles.q}>
                <div className={styles.headerFilter}>
                  <h6>Название</h6>
                  <hr />
                </div>
                <Field
                  type="text"
                  name="title"
                  value={values.title}
                  autoFocus={true}
                  validate={validateTitle}
                  placeholder="Введите имя запроса"
                />
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>Запрос</h6>
                  <hr />
                </div>
                <Field
                  type="text"
                  name={request ? 'q' : ''}
                  value={values.q}
                  validate={validateQ}
                />
                {errors.q && <div>{errors.q}</div>}
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>Упорядочить</h6>
                  <hr />
                </div>
                <Field as="select" name={'order'} value={values.order}>
                  <option value="relevance">По релевантности</option>
                  <option value="date"> По дате</option>
                  <option value="rating">По рейтингу</option>
                  <option value="title"> По алфавиту</option>
                  <option value="viewCount">По просмотрам</option>
                </Field>
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>Длительность</h6>
                  <hr />
                </div>
                <Field
                  as="select"
                  name={'videoDuration'}
                  value={values.videoDuration}>
                  <option value="any">Все</option>
                  <option value="long"> Более 20 минут</option>
                  <option value="medium">От 4 до 20 минут</option>
                  <option value="short">Менее 4 минут</option>
                </Field>
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>Вернуть результатов: {values.maxResults}</h6>
                  <hr />
                </div>

                <Field
                  type="range"
                  name={'maxResults'}
                  min="1"
                  max="50"
                  value={values.maxResults}
                  step="1"
                />
              </div>
            </div>
            <div>
              <div className={styles.btn}>
                <button className="btn btn-dark" type="submit">
                  {request ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => toggleEditMode()}>
                  Отменить
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
type PropsType = {
  toggleEditMode: () => void
  request?: youtubeRequestsType
}
