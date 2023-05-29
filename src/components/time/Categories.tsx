import { Component, RefObject, createRef } from 'react'
import { D3DragEvent, DraggedElementBaseType, drag as d3Drag, select } from 'd3'
import { Dimensions, FeaturesState } from 'store/types'

type TimelineCategoriesProps = {
  dims: Dimensions
  features: FeaturesState
  categories: string[]
  fallbackLabel: string
  getCategoryY: (cat: string) => number
  onDragStart<GElement extends DraggedElementBaseType, Datum, Subject>(
    event: D3DragEvent<GElement, Datum, Subject>
  ): void
  onDrag<GElement extends DraggedElementBaseType, Datum, Subject>(
    event: D3DragEvent<GElement, Datum, Subject>
  ): void
  onDragEnd<GElement extends DraggedElementBaseType, Datum, Subject>(
    event: D3DragEvent<GElement, Datum, Subject>
  ): void
}

type TimelineCategoriesState = {
  isInitialized: boolean
}

class TimelineCategories extends Component<
  TimelineCategoriesProps,
  TimelineCategoriesState
> {
  grabRef: RefObject<SVGRectElement>

  constructor(props: TimelineCategoriesProps) {
    super(props)
    this.grabRef = createRef()
    this.state = {
      isInitialized: false
    }
  }

  componentDidUpdate() {
    if (!this.state.isInitialized) {
      const drag = d3Drag()
        .on('start', this.props.onDragStart)
        .on('drag', this.props.onDrag)
        .on('end', this.props.onDragEnd)

      select(this.grabRef.current).call(drag)

      this.setState({ isInitialized: true })
    }
  }

  renderCategory(category: string) {
    const { dims } = this.props
    const strokeWidth = 1 // dims.trackHeight / (this.props.categories.length + 1)

    // if (
    //   features.GRAPH_NONLOCATED &&
    //   features.GRAPH_NONLOCATED.categories &&
    //   features.GRAPH_NONLOCATED.categories.includes(cat.title)
    // ) {
    //   return null
    // }

    return (
      <>
        <g
          className="tick"
          style={{ strokeWidth }}
          opacity="0.5"
          transform={`translate(0,${this.props.getCategoryY(category)})`}
        >
          <line x1={dims.marginLeft} x2={dims.width - dims.width_controls} />
        </g>
        <g
          className="tick"
          opacity="1"
          transform={`translate(0,${this.props.getCategoryY(category)})`}
        >
          <text x={dims.marginLeft - 5} dy="0.32em">
            {category}
          </text>
        </g>
      </>
    )
  }

  render() {
    const { dims, categories, fallbackLabel } = this.props
    const categoriesExist = categories && categories.length > 0
    const renderedCategories = categoriesExist
      ? categories.map(cat => this.renderCategory(cat))
      : this.renderCategory(fallbackLabel)

    return (
      <g className="yAxis">
        {renderedCategories}
        <rect
          ref={this.grabRef}
          className="drag-grabber"
          x={dims.marginLeft}
          y={dims.marginTop}
          width={Math.max(
            0,
            dims.width - dims.marginLeft - dims.width_controls
          )}
          height={dims.contentHeight}
        />
      </g>
    )
  }
}

export default TimelineCategories
