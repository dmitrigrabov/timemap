import { isOdd } from 'common/utilities'
import { FC } from 'react'
import { CSSProperties } from 'styled-components'

function createStar(numPoints: number, r: number, x: number, y: number) {
  const innerRadius = r
  const outerRadius = (r * 2) / numPoints
  const angle = Math.PI / numPoints
  const points: string[] = []

  for (let i = 0; i < numPoints * 2; i++) {
    const radius = isOdd(i) ? innerRadius : outerRadius
    const coords = `${radius * Math.sin(i * angle) + x},${
      radius * Math.cos(i * angle) + y
    }`
    points.push(coords)
  }

  return points.join(' ')
}

type DatetimeStarProps = {
  x: number
  y: number
  r: number
  onSelect: () => void
  styleProps: CSSProperties
}

const DatetimeStar: FC<DatetimeStarProps> = ({
  x,
  y,
  r,
  onSelect,
  styleProps
}) => {
  return (
    <polygon
      onClick={onSelect}
      className="event"
      x={x}
      y={y}
      style={styleProps}
      points={createStar(5, r, x, y)}
    />
  )
}

export default DatetimeStar
