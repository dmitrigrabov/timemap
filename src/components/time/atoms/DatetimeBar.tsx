import { CSSProperties, FC } from 'react'
import { Event } from 'store/types'

type DatetimeBarProps = {
  x: number
  y: number
  styleProps: CSSProperties
  width: number
  height: number
  category: string
  events: Event[]
  // getDatetimeX: (value: Date) => number
  // eventRadius: number
  onSelect: () => void
  // dims: Dimensions
  // features: FeaturesState
  // filterColors: string[]
  // coloringSet: ColoringSet
}

const DatetimeBar: FC<DatetimeBarProps> = ({
  // highlights,
  // events,
  x,
  y,
  width,
  height,
  onSelect,
  styleProps
  // extraRender
}) => {
  // if (highlights.length === 0) {
  return (
    <rect
      onClick={onSelect}
      className="event"
      x={x}
      y={y}
      style={styleProps}
      width={width}
      height={height}
    />
  )
  // }
  // const sectionHeight = height / highlights.length
  // return (
  //   <>
  //     {highlights.map((h, idx) => (
  //       <rect
  //         onClick={onSelect}
  //         className="event"
  //         x={x}
  //         y={y - sectionHeight + idx * sectionHeight + sectionHeight / 2}
  //         style={{ ...styleProps, opacity: h ? 0.3 : 0.1 }}
  //         width={width}
  //         height={sectionHeight}
  //       />
  //     ))}
  //   </>
  // )
}

export default DatetimeBar
