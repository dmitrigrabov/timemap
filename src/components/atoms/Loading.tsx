import copy from 'common/data/copy.json'
import { FC } from 'react'
import { Language } from 'store/types'

type LoadingOverlayProps = {
  isLoading: boolean
  language: Language
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading, language }) => {
  let classes = 'loading-overlay'
  classes += !isLoading ? ' hidden' : ''

  return (
    <div id="loading-overlay" className={classes}>
      <div className="loading-wrapper">
        <span id="loading-text" className="text">
          {copy[language].loading}
        </span>
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
