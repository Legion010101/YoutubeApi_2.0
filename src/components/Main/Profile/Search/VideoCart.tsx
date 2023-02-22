import {FC} from 'react'
import styles from './Search.module.sass'

export const VideoCart: FC<propsType> = ({video}) => {
  return (
    <iframe
      width="300"
      height="160"
      className={styles.item}
      src={`https://www.youtube.com/embed/${video}`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
  )
}
type propsType = {
  video: string
}
