import {Formik, Field, Form, FormikHelpers} from 'formik'
import {validateRequired} from '../../../utility/validate'
import {Navigate} from 'react-router-dom'
import React, {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/reduxStore'
import style from './Login.module.css'
import {ActionTypes, loginUser} from '../../../redux/authReducer'
import {loginType} from '../../../types/types'
import {getAccessToken} from '../../../redux/reduxSelectors/searchPageSelector'

const Login: FC = () => {
  const accessToken = useSelector(getAccessToken)
  if (accessToken) {
    return <Navigate to={'/YoutubeApi_2.0/search'} />
  }
  return (
    <div className={style.loginContainer}>
      <h1>Вход в YouTube API</h1>
      <div className={style.loginFormContainer}>
        <LoginForm />
      </div>
    </div>
  )
}

export const LoginForm: FC = () => {
  type loginDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
  const dispatch: loginDispatch = useDispatch()

  const validateEmail = validateRequired()
  const validatePassword = validateRequired()
  const initialValues = {
    login: '',
    password: '',
  }
  const onSubmit = (
    values: loginType,
    {setSubmitting, setStatus}: FormikHelpers<loginType>,
  ) => {
    dispatch(loginUser(values, setStatus))
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validateOnBlur onSubmit={onSubmit}>
      {({values, status}) => (
        <Form>
          <div>
            <div className={style.loginForm}>
              <div>Логин:</div>
              <div>
                <Field
                  type="text"
                  name="login"
                  value={values.login}
                  validate={validateEmail}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={style.loginForm}>
              <div>Пароль:</div>
              <div>
                <Field
                  type="password"
                  name="password"
                  value={values.password}
                  validate={validatePassword}
                />
              </div>
            </div>
          </div>
          <div className={style.item}>{status}</div>

          <div className={style.item}>
            <button className="btn btn-primary" type="submit">
              Войти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default Login
