import { FC } from 'react'

type ButtonProps = {
  primary: boolean
  backgroundColor: string
  borderRadius: string
  size: 'small' | 'medium' | 'large'
  label: string
  onClick: () => void
  normalCursor: boolean
}

/**
 * Primary UI component for user interaction
 */
export const Button: FC<ButtonProps> = ({
  primary = false,
  backgroundColor = 'red',
  borderRadius = '0%',
  size = 'medium',
  label,
  normalCursor,
  ...props
}) => (
  <button
    type="button"
    className={[
      'button',
      `button--${size}`,
      primary ? 'button--primary' : 'button--secondary',
      normalCursor ? 'no-hover' : ''
    ].join(' ')}
    style={{ backgroundColor: backgroundColor, borderRadius: borderRadius }}
    {...props}
  >
    {label}
  </button>
)

const CardButton = ({
  text,
  color = '#000',
  onClick = () => {},
  normalCursor
}) => (
  <Button
    size={'small'}
    backgroundColor={color}
    borderRadius={'12px'}
    primary={false}
    label={text}
    onClick={onClick}
    normalCursor={normalCursor}
  />
)

export default CardButton
