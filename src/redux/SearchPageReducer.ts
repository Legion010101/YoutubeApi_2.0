import {InferActionType, ThankTypeCreator} from './reduxStore'
import {orderType, videoDurationType, youTubeApi} from '../api/searchApi'
import {idType, snippetType, youtubeRequestsType} from '../types/types'
import {v1} from 'uuid'

const initialState = {
  videosFromYT: [] as videoFromYT[],
  youtubeRequests: [] as youtubeRequestsType[],
  dataRequest: {
    q: '',
    maxResults: 5,
    order: 'relevance',
    videoDuration: 'any',
  } as youtubeRequestsType,
}

export const actionsYouTubeSearch = {
  setVideosToShow: (videos: videoFromYT[] | null) =>
    ({
      type: 'searchPage/SET-VIDEO-TO-SHOW',
      videos,
    } as const),
  setDataRequest: (payload: youtubeRequestsType) =>
    ({
      type: 'searchPage/SET-DATA-REQUEST',
      payload,
    } as const),
  addNewSearch: (payload: youtubeRequestsType, userId: number) =>
    ({
      type: 'searchPage/ADD-NEW-SEARCH',
      payload,
      userId,
    } as const),
  setYoutubeRequests: (userId: number) =>
    ({
      type: 'searchPage/SET-YT-REQUEST',
      userId,
    } as const),
  refactorYoutubeRequests: (payload: youtubeRequestsType, userId: number) =>
    ({
      type: 'searchPage/REFACTOR-YT-REQUEST',
      payload,
      userId,
    } as const),
  deleteYoutubeRequests: (payload: youtubeRequestsType, userId: number) =>
    ({
      type: 'searchPage/DELETE-YT-REQUEST',
      payload,
      userId,
    } as const),
}

const SearchPageReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'searchPage/SET-VIDEO-TO-SHOW': {
      return {
        ...state,
        videosFromYT: action.videos ? [...action.videos] : [],
      }
    }
    case 'searchPage/SET-DATA-REQUEST': {
      return {
        ...state,
        dataRequest: {
          ...action.payload,
        },
      }
    }
    case 'searchPage/SET-YT-REQUEST': {
      const lsItem =
        localStorage.getItem(`${action.userId}`) &&
        localStorage.getItem(`${action.userId}`)
      let youtubeRequestsLS = []
      if (lsItem) {
        youtubeRequestsLS = JSON.parse(lsItem)
      }

      return {
        ...state,
        youtubeRequests: youtubeRequestsLS,
      }
    }
    case 'searchPage/REFACTOR-YT-REQUEST': {
      const newYoutubeRequests = state.youtubeRequests.map((request) => {
        if (request.id === action.payload.id) {
          return {...action.payload, id: action.payload.id}
        }
        return request
      })
      localStorage.removeItem(`${action.userId}`)
      const newYoutubeRequestsString = JSON.stringify(newYoutubeRequests)
      localStorage.setItem(`${action.userId}`, newYoutubeRequestsString)

      return {
        ...state,
        youtubeRequests: newYoutubeRequests,
      }
    }
    case 'searchPage/DELETE-YT-REQUEST': {
      const newYoutubeRequests = state.youtubeRequests.filter((request) => {
        return request?.id !== action.payload.id
      })
      localStorage.removeItem(`${action.userId}`)

      const newYoutubeRequestsString = JSON.stringify(newYoutubeRequests)
      localStorage.setItem(`${action.userId}`, newYoutubeRequestsString)

      return {
        ...state,
        youtubeRequests: newYoutubeRequests,
      }
    }
    case 'searchPage/ADD-NEW-SEARCH': {
      localStorage.removeItem(`${action.userId}`)
      const searchArray = JSON.stringify([
        ...state.youtubeRequests,
        {...action.payload, id: v1()},
      ])
      localStorage.setItem(`${action.userId}`, searchArray)

      return {
        ...state,
        youtubeRequests: [...state.youtubeRequests, action.payload],
      }
    }
    default:
      return state
  }
}
export const getVideoFromYouTube =
  (
    q: string,
    maxResults: number,
    order: orderType,
    videoDuration: videoDurationType,
  ): ThankType =>
  async (dispatch) => {
    const response = await youTubeApi.getVideo(
      q,
      maxResults,
      order,
      videoDuration,
    )
    dispatch(actionsYouTubeSearch.setVideosToShow(response))
    dispatch(
      actionsYouTubeSearch.setDataRequest({
        q,
        maxResults,
        order,
        videoDuration,
      }),
    )
  }

export default SearchPageReducer

type initialStateType = typeof initialState
type ActionTypes = InferActionType<typeof actionsYouTubeSearch>
export type ThankType = ThankTypeCreator<ActionTypes>
export type videoFromYT = {
  kind: string
  etag: string
  id: idType
  snippet: snippetType
}
