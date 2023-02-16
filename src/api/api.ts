import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
  params: {key: 'AIzaSyCXfybcsDRQCLnWGcRdkxuAYSGTKmCJF1I'},
})
