import {orderType, videoDurationType} from '../api/searchApi'

export type idType = {
  kind: string
  videoId: string
}
export type snippetType = {
  channelId: string
  channelTitle: string
  description: string
  liveBroadcastContent: string
  publishTime: string
  publishedAt: string
  title: string
  thumbnails: thumbnailsType
}
export type thumbnailsType = {
  default: thumbnailType
  medium: thumbnailType
  high: thumbnailType
}
export type thumbnailType = {
  url: string
  width: number
  height: number
}
export type youtubeRequestsType = {
  q: string
  maxResults: number
  order: orderType
  videoDuration: videoDurationType
  title?: string
  id?: string
}
export type loginType = {login: string; password: string}
