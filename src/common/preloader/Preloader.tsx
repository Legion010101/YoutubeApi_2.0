import style from './Preloader.module.css'
import preloader from '../../accept/preloaderSvg/SVGFetch.svg'

export const Preloader = ({toggle}: {toggle: boolean}) => {
  return (
    <img className={!toggle ? style.preloader : ''} src={preloader} alt="" />
  )
}
