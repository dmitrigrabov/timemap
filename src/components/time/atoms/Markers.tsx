import { primaryHighlight } from 'common/global'
import hash from 'object-hash'
import { getEventCategories, isLatitude, isLongitude } from 'common/utilities'
import { AVAILABLE_SHAPES } from 'common/constants'
import { FC, ReactElement } from 'react'
import { Dimensions, Event } from 'store/types'
import { CSSProperties } from 'styled-components'

type TimelineMarkersProps = {
  dims: Dimensions
  selected: Event[]
  getEventX: (event: Event) => number
  getEventY: (event: Event) => number
  categories: string[]
  transitionDuration: number
  styles: CSSProperties
  eventRadius: number
}

const TimelineMarkers: FC<TimelineMarkersProps> = ({
  styles,
  eventRadius,
  getEventX,
  getEventY,
  categories,
  transitionDuration,
  selected,
  dims
}) => {
  return (
    <g clipPath="url(#clip)">
      {selected.reduce<ReactElement[]>((acc, event) => {
        const isDot = isLatitude(event.latitude) && isLongitude(event.longitude)
        //  || (features.GRAPH_NONLOCATED && event.projectOffset !== -1)

        const evShadows = getEventCategories(event, categories).map(category =>
          getEventY({ ...event, category })
        )

        if (evShadows.length > 0) {
          evShadows.forEach(y => {
            acc.push(
              renderMarkerForEvent({
                y,
                event,
                isDot,
                styles,
                dims,
                transitionDuration,
                getEventX,
                eventRadius
              })
            )
          })
        } else {
          acc.push(
            renderMarkerForEvent({
              y: getEventY(event),
              event,
              isDot,
              styles,
              dims,
              transitionDuration,
              getEventX,
              eventRadius
            })
          )
        }
        return acc
      }, [])}
    </g>
  )
}

export default TimelineMarkers

type RenderMarkerForEventArgs = {
  y: number
  event: Event
  isDot: boolean
  styles: CSSProperties
  dims: Dimensions
  transitionDuration: number
  getEventX: (event: Event) => number
  eventRadius: number
}

const renderMarkerForEvent = ({
  y,
  event,
  isDot,
  styles,
  dims,
  transitionDuration,
  getEventX,
  eventRadius
}: RenderMarkerForEventArgs) => {
  switch (event.shape) {
    case 'circle':
    case AVAILABLE_SHAPES.DIAMOND:
    case AVAILABLE_SHAPES.STAR:
      return (
        <Circle
          y={y}
          event={event}
          styles={styles}
          transitionDuration={transitionDuration}
          getEventX={getEventX}
          eventRadius={eventRadius}
        />
      )

    case AVAILABLE_SHAPES.BAR:
      return (
        <Bar
          event={event}
          dims={dims}
          styles={styles}
          eventRadius={eventRadius}
          getEventX={getEventX}
        />
      )

    default:
      return isDot ? (
        <Circle
          y={y}
          event={event}
          styles={styles}
          transitionDuration={transitionDuration}
          getEventX={getEventX}
          eventRadius={eventRadius}
        />
      ) : (
        <Bar
          event={event}
          dims={dims}
          styles={styles}
          eventRadius={eventRadius}
          getEventX={getEventX}
        />
      )
  }
}

type BarProps = {
  dims: Dimensions
  eventRadius: number
  styles: CSSProperties
  getEventX: (event: Event) => number
  event: Event
}

const Bar: FC<BarProps> = ({ dims, eventRadius, styles, getEventX, event }) => (
  <rect
    className="timeline-marker"
    x={0}
    y={dims.marginTop}
    width={eventRadius / 1.5}
    height={dims.contentHeight - 55}
    stroke={styles ? styles.stroke : primaryHighlight}
    strokeOpacity="1"
    strokeWidth={styles ? styles.strokeWidth : 1}
    strokeDasharray={styles ? styles.strokeDasharray : '2,2'}
    style={{
      transform: `translate(${getEventX(event)}px)`,
      opacity: 0.7
    }}
  />
)

type CircleProps = {
  y: number
  transitionDuration: number
  event: Event
  styles: CSSProperties
  getEventX: (event: Event) => number
  eventRadius: number
}

const Circle: FC<CircleProps> = ({
  y,
  transitionDuration,
  event,
  styles,
  getEventX,
  eventRadius
}) => (
  <circle
    key={hash(event)}
    className="timeline-marker"
    cx={0}
    cy={0}
    stroke={styles ? styles.stroke : primaryHighlight}
    strokeOpacity="1"
    strokeWidth={styles ? styles.strokeWidth : 1}
    strokeLinejoin="round"
    strokeDasharray={styles ? styles.strokeDasharray : '2,2'}
    style={{
      transform: `translate(${getEventX(event)}px, ${y}px)`,
      WebkitTransition: `transform ${transitionDuration / 1000}s ease`,
      MozTransition: 'none',
      opacity: 1
    }}
    r={eventRadius * 2}
  />
)
