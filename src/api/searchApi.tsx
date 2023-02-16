import {instance} from './api'

export const youTubeApi = {
  getVideo(
    q: string,
    maxResults = 5,
    order: orderType = 'relevance',
    videoDuration: videoDurationType = 'any',
  ) {
    return instance
      .get(
        `?type=video&videoEmbeddable=true&videoLicense=youtube&videoSyndicated=true&q=${q}&order=${order}&maxResults=${maxResults}&videoDuration=${videoDuration}`,
      )
      .then((data) => {
        return data.data.items
      })
  },
}
export type orderType = 'relevance' | 'date' | 'rating' | 'title' | 'viewCount'
export type videoDurationType = 'any' | 'long' | 'medium' | 'short'
