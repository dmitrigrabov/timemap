import DatetimeBar from 'components/time/atoms/DatetimeBar'
// import DatetimeSquare from 'components/time/atoms/DatetimeSquare'
// import DatetimeStar from 'components/time/atoms/DatetimeStar'
// import DatetimeTriangle from 'components/time/atoms/DatetimeTriangle'
// import DatetimePentagon from 'components/time/atoms/DatetimePentagon'
// import Project from 'components/time/atoms/Project'
import ColoredMarkers from 'components/atoms/ColoredMarkers'
import {
  calcOpacity,
  getEventCategories,
  zipColorsToPercentages,
  calculateColorPercentages,
  isLatitude,
  isLongitude
} from 'common/utilities'
// import { AVAILABLE_SHAPES } from 'common/constants'
import {
  ColoringSet,
  Dimensions,
  Event,
  FeaturesState,
  Narrative
} from 'store/types'
import { FC, ReactElement } from 'react'
import { CSSProperties } from 'styled-components'

type RenderDotProps = {
  x: number
  y: number
  eventRadius: number
  onSelect: () => void
  filterColors: string[]
  coloringSet: ColoringSet
}

function renderDot(event: Event, styles: CSSProperties, props: RenderDotProps) {
  const colorPercentages = calculateColorPercentages([event], props.coloringSet)

  return (
    <g
      key={event.id}
      className="timeline-event"
      onClick={props.onSelect}
      transform={`translate(${props.x}, ${props.y})`}
    >
      <ColoredMarkers
        radius={props.eventRadius}
        colorPercentMap={zipColorsToPercentages(
          props.filterColors,
          colorPercentages
        )}
        styles={{
          ...styles
        }}
        className="event"
      />
    </g>
  )
}

type RenderBarProps = {
  x: number
  y: number
  styles: CSSProperties
  event: Event
  getDatetimeX: (value: Date) => number
  eventRadius: number
  onSelect: () => void
  dims: Dimensions
  features: FeaturesState
  filterColors: string[]
  coloringSet: ColoringSet
}

function renderBar(event: Event, styles: CSSProperties, props: RenderBarProps) {
  // const fillOpacity = props.features.GRAPH_NONLOCATED
  //   ? event.projectOffset >= 0
  //     ? styles.opacity
  //     : 0.5
  //   : calcOpacity(1)

  const fillOpacity = calcOpacity(1)

  return (
    <DatetimeBar
      onSelect={props.onSelect}
      category={event.category}
      events={[event]}
      x={props.x}
      y={props.dims.marginTop}
      width={props.eventRadius / 4}
      height={props.dims.trackHeight}
      styleProps={{ ...styles, fillOpacity }}
      // highlights={props.highlights}
    />
  )
}

// function renderDiamond(event: Event, styles, props) {
//   return (
//     <DatetimeSquare
//       onSelect={props.onSelect}
//       x={props.x}
//       y={props.y - props.eventRadius}
//       r={1.8 * props.eventRadius}
//       styleProps={styles}
//       transform={`rotate(45, ${props.x}, ${props.y})`}
//     />
//   )
// }

// function renderSquare(event: Event, styles, props) {
//   return (
//     <DatetimeSquare
//       onSelect={props.onSelect}
//       x={props.x}
//       y={props.y - (1.8 * props.eventRadius) / 2}
//       r={1.8 * props.eventRadius}
//       styleProps={styles}
//     />
//   )
// }

// function renderTriangle(event: Event, styles, props) {
//   return (
//     <DatetimeTriangle
//       onSelect={props.onSelect}
//       x={props.x}
//       y={props.y}
//       r={1.5 * props.eventRadius}
//       styleProps={styles}
//     />
//   )
// }

// function renderPentagon(event: Event, styles, props) {
//   return (
//     <DatetimePentagon
//       onSelect={props.onSelect}
//       x={props.x}
//       y={props.y}
//       r={1.5 * props.eventRadius}
//       styleProps={styles}
//     />
//   )
// }

// function renderStar(event: Event, styles, props) {
//   return (
//     <DatetimeStar
//       onSelect={props.onSelect}
//       x={props.x}
//       y={props.y}
//       r={1.5 * props.eventRadius}
//       styleProps={{ ...styles, fillRule: 'nonzero' }}
//     />
//   )
// }

type TimelineEventsProps = {
  events: Event[]
  categories: string[]
  narrative: Narrative
  getDatetimeX: (value: Date) => number
  getY: (event: Event) => number
  getCategoryColor: (categeory?: string) => string
  transitionDuration: number
  onSelect: (event: Event) => void
  dims: Dimensions
  features: FeaturesState
  eventRadius: number
  filterColors: string[]
  coloringSet: ColoringSet
}

const TimelineEvents: FC<TimelineEventsProps> = ({
  events,
  // projects,
  categories,
  narrative,
  getDatetimeX,
  getY,
  getCategoryColor,
  // getHighlights,
  onSelect,
  transitionDuration,
  dims,
  features,
  eventRadius,
  filterColors,
  coloringSet
}) => {
  const narIds = narrative ? narrative.steps.map(s => s.id) : []

  return (
    <g clipPath="url(#clip)">
      <>
        {events.reduce<ReactElement[]>((acc, event) => {
          if (narrative) {
            if (!narIds.includes(event.id)) {
              // return null
              return acc
            }
          }

          // if an event has multiple categories, it should be rendered on each of
          // those timelines: so we create as many event 'shadows' as there are
          // categories
          const evShadows = getEventCategories(event, categories).map(cat => {
            const y = getY({ ...event, category: cat })

            const colour = event.colour ? event.colour : getCategoryColor(cat)

            const styles = {
              fill: colour,
              fillOpacity: y > 0 ? calcOpacity(1) : 0,
              transition: `transform ${transitionDuration / 1000}s ease`
            }

            return { y, styles }
          })

          if (evShadows.length === 0) {
            acc.push(
              getRender({
                y: getY(event),
                styles: { fill: getCategoryColor() },
                event,
                getDatetimeX,
                eventRadius,
                onSelect,
                dims,
                features,
                coloringSet,
                filterColors
              })
            )
          } else {
            evShadows.forEach(evShadow => {
              acc.push(
                getRender({
                  y: evShadow.y,
                  styles: evShadow.styles,
                  event,
                  getDatetimeX,
                  eventRadius,
                  onSelect,
                  dims,
                  features,
                  filterColors,
                  coloringSet
                })
              )
            })
          }
          return acc
        }, [])}
      </>
    </g>
  )
}

export default TimelineEvents

type GetRenderArgs = {
  y: number
  styles: CSSProperties
  event: Event
  getDatetimeX: (value: Date) => number
  eventRadius: number
  onSelect: (event: Event) => void
  dims: Dimensions
  features: FeaturesState
  filterColors: string[]
  coloringSet: ColoringSet
}

const getRender = ({
  y,
  styles,
  event,
  getDatetimeX,
  eventRadius,
  onSelect,
  dims,
  features,
  filterColors,
  coloringSet
}: GetRenderArgs) => {
  const isDot = isLatitude(event.latitude) && isLongitude(event.longitude)

  // const { shape: eventShape } = event

  return isDot
    ? renderDot(event, styles, {
        x: getDatetimeX(event.datetime),
        y,
        eventRadius,
        onSelect: () => onSelect(event),
        filterColors,
        coloringSet
      })
    : renderBar(event, styles, {
        x: getDatetimeX(event.datetime),
        y,
        styles,
        event,
        getDatetimeX,
        eventRadius,
        onSelect: () => onSelect(event),
        dims,
        features,
        filterColors,
        coloringSet
      })

  // if (eventShape && eventShape.shape) {
  //   if (eventShape.shape === AVAILABLE_SHAPES.BAR) {
  //     renderShape = renderBar
  //   } else if (eventShape.shape === AVAILABLE_SHAPES.DIAMOND) {
  //     renderShape = renderDiamond
  //   } else if (eventShape.shape === AVAILABLE_SHAPES.STAR) {
  //     renderShape = renderStar
  //   } else if (eventShape.shape === AVAILABLE_SHAPES.TRIANGLE) {
  //     renderShape = renderTriangle
  //   } else if (eventShape.shape === AVAILABLE_SHAPES.PENTAGON) {
  //     renderShape = renderPentagon
  //   } else if (eventShape.shape === AVAILABLE_SHAPES.SQUARE) {
  //     renderShape = renderSquare
  //   } else {
  //     renderShape = renderDot
  //   }
  // }
}
