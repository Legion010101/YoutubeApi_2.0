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
import styles from './Search.module.sass'

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
                  <h6>????????????????</h6>
                  <hr />
                </div>
                <Field
                  type="text"
                  name="title"
                  value={values.title}
                  autoFocus={true}
                  validate={validateTitle}
                  placeholder="?????????????? ?????? ??????????????"
                />
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>????????????</h6>
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
                  <h6>??????????????????????</h6>
                  <hr />
                </div>
                <Field as="select" name={'order'} value={values.order}>
                  <option value="relevance">???? ??????????????????????????</option>
                  <option value="date"> ???? ????????</option>
                  <option value="rating">???? ????????????????</option>
                  <option value="title"> ???? ????????????????</option>
                  <option value="viewCount">???? ????????????????????</option>
                </Field>
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>????????????????????????</h6>
                  <hr />
                </div>
                <Field
                  as="select"
                  name={'videoDuration'}
                  value={values.videoDuration}>
                  <option value="any">??????</option>
                  <option value="long"> ?????????? 20 ??????????</option>
                  <option value="medium">???? 4 ???? 20 ??????????</option>
                  <option value="short">?????????? 4 ??????????</option>
                </Field>
              </div>
              <div>
                <div className={styles.headerFilter}>
                  <h6>?????????????? ??????????????????????: {values.maxResults}</h6>
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
                  {request ? '??????????????????' : '????????????????'}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => toggleEditMode()}>
                  ????????????????
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
