import styles from './App.module.css'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {YouTubeSearchPage} from './components/Main/Profile/Search/SearchContainer'
import React, {FC, useEffect, useState} from 'react'
import {ActionTypes, initializationing} from './redux/authReducer'
import {AppStateType} from './redux/reduxStore'
import {ThunkDispatch} from 'redux-thunk'
import type {MenuProps} from 'antd'
import {Breadcrumb, Layout, theme} from 'antd'
import {SideBar} from './components/SideBar/SideBar'
import {FavoritesPage} from './components/Main/Profile/Favorites/FavoritesPage'
import {Header} from './components/Header/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getInitialization} from './redux/reduxSelectors/searchPageSelector'
import {Preloader} from './common/preloader/Preloader'

const Login = React.lazy(() => import('./components/Main/Login/Login'))

const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number]

export const App: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: {colorBgContainer},
  } = theme.useToken()
  const initialization = useSelector(getInitialization)

  const dispatch: any = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(initializationing())
  }, [])

  if (!initialization) {
    return <Preloader toggle={true} />
  } else {
    return (
      <Layout className={styles.mainLayer}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          {!collapsed && <h2 className={styles.headerLogo}>YouTube</h2>}
          <SideBar location={location.pathname} />
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content className={styles.content}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}>
              <Routes>
                <Route
                  path="/YoutubeApi_2.0"
                  element={<Navigate to={'/YoutubeApi_2.0/search'} />}
                />
                <Route
                  path="/YoutubeApi_2.0/search/"
                  element={<YouTubeSearchPage />}
                />
                <Route
                  path="/YoutubeApi_2.0/featuredQueries"
                  element={<FavoritesPage />}
                />
                <Route path="/YoutubeApi_2.0/login" element={<Login />} />

                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Production of Danil</Footer>
        </Layout>
      </Layout>
    )
  }
}

type appDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
