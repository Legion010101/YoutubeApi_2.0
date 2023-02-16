import {FC, useState} from 'react'
import {FormikHelpers, Form, Formik, Field} from 'formik'
import {orderType, videoDurationType} from '../../../../api/searchApi'
import {
  actionsYouTubeSearch,
  getVideoFromYouTube,
} from '../../../../redux/SearchPageReducer'
import {useDispatch, useSelector} from 'react-redux'
import {getDataRequest} from '../../../../redux/reduxSelectors/searchPageSelector'
import {validateRequired} from '../../../../utility/validate'
import styles from './Search.module.css'
import {FilterOutlined, SearchOutlined} from '@ant-design/icons'
import classnames from 'classnames'

export const VideoSelectorForm: FC<{saveMode: boolean}> = ({saveMode}) => {
  const validateQ = validateRequired()

  type initialValuesTypes = typeof initialValues
  const dispatch: any = useDispatch()
  const getData = useSelector(getDataRequest)
  const [filterMode, setFilterMode] = useState(false)

  const initialValues = {
    q: getData.q,
    maxResults: getData.maxResults,
    order: getData.order as orderType,
    videoDuration: getData.videoDuration as videoDurationType,
  }

  const onSubmit = (
    values: initialValuesTypes,
    {setSubmitting}: FormikHelpers<initialValuesTypes>,
  ) => {
    dispatch(actionsYouTubeSearch.setVideosToShow([]))
    dispatch(
      getVideoFromYouTube(
        values.q,
        values.maxResults,
        values.order,
        values.videoDuration,
      ),
    )
    setSubmitting(false)
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmit}>
      {({values, errors, touched, status}) => (
        <Form>
          <div className={styles.searchForm}>
            <div className={styles.searchLine}>
              <Field
                placeholder="Введите запрос"
                type="text"
                name="q"
                value={values.q}
                validate={validateQ}
              />
              <SearchOutlined />
            </div>

            <div
              className={classnames(styles.filter, {
                [styles.activeFilter]: filterMode,
              })}
              onClick={() => setFilterMode((prev) => !prev)}>
              <div className={styles.icon}>
                <FilterOutlined />
              </div>
              <div>Фильтры</div>
            </div>
          </div>
          {filterMode && (
            <div className={styles.customizeSearch}>
              <div>
                <div className={styles.headerFilter}>
                  <h6>Упорядочить</h6>
                  <hr />
                </div>
                <Field as="select" name="order">
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
                <Field as="select" name="videoDuration">
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
                  name="maxResults"
                  min="1"
                  max="50"
                  value={values.maxResults}
                  step="1"
                />
              </div>
            </div>
          )}

          <button className="btn btn-dark" disabled={saveMode} type="submit">
            Поиск
          </button>
          <hr />
        </Form>
      )}
    </Formik>
  )
}
