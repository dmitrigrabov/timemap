import { FC } from 'react'

type CoverIconProps = {
  isActive: boolean
  isDisabled: boolean
  onClickHandler: () => void
}

const CoverIcon: FC<CoverIconProps> = ({
  isActive,
  isDisabled,
  onClickHandler
}) => {
  let classes = isActive ? 'action-button enabled' : 'action-button'

  if (isDisabled) {
    classes = 'action-button disabled'
  }

  return (
    <button className={classes} onClick={onClickHandler}>
      <i className="material-icons">home</i>
    </button>
  )
}

export default CoverIcon
