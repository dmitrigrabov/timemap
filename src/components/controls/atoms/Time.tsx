import copy from 'common/data/copy.json'
import { isNotNullNorUndefined } from 'common/utilities'
import { FC } from 'react'
import { Language } from 'store/types'

type CardTimeProps = {
  title?: string
  timelabel: string
  language: Language
  precision?: string
}

const CardTime: FC<CardTimeProps> = ({
  title = 'Timestamp',
  timelabel,
  language,
  precision
}) => {
  const unknownLang = copy[language].cardstack.unknown_time

  if (isNotNullNorUndefined(timelabel)) {
    return (
      <div className="card-cell">
        {/* <i className="material-icons left">today</i> */}
        <h4>{title}</h4>
        {timelabel}
        {precision && precision !== '' ? ` - ${precision}` : null}
      </div>
    )
  } else {
    return (
      <div className="card-cell">
        {/* <i className="material-icons left">today</i> */}
        <h4>{title}</h4>
        {unknownLang}
      </div>
    )
  }
}

export default CardTime
