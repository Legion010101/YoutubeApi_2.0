import {AppStateType} from '../reduxStore'

export const getAccessToken = (state: AppStateType) => {
  return state.auth.accessToken
}
export const getAuthorizedUser = (state: AppStateType) => {
  return state.auth.authorizedUser
}
export const getInitialization = (state: AppStateType) => {
  return state.auth.initialization
}
export const getVideosFromYouTubeSelector = (state: AppStateType) => {
  return state.searchPage.videosFromYT
}
export const getFavoriteSearchSelector = (state: AppStateType) => {
  return state.searchPage.youtubeRequests
}
export const getDataRequest = (state: AppStateType) => {
  return state.searchPage.dataRequest
}
export const getNavList = (state: AppStateType) => {
  return state.navig.listNav
}
