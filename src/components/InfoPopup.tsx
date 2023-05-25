import Popup from 'components/atoms/Popup'
import copy from 'common/data/copy.json'
import { Language } from 'store/types'
import { CSSProperties, FC } from 'react'

type InfopopupProps = {
  isOpen: boolean
  onClose: () => void
  language: Language
  styles: CSSProperties
}

const Infopopup: FC<InfopopupProps> = ({
  isOpen,
  onClose,
  language,
  styles
}) => (
  <Popup
    title={copy[language].legend.default.header}
    content={copy[language].legend.default.intro}
    onClose={onClose}
    isOpen={isOpen}
    styles={styles}
  />
)

export default Infopopup
