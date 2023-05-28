import { Component, RefObject, createRef } from 'react'
import { axisBottom, timeFormat, select, AxisScale, AxisDomain } from 'd3'
import { setD3Locale } from 'common/utilities'
import { Dimensions } from 'store/types'

const TEXT_HEIGHT = 15
setD3Locale()

type TimelineAxisProps<Domain extends AxisDomain> = {
  dims: Dimensions
  extent: number
  scaleX: AxisScale<Domain>
  ticks: number
}

type TimelineAxisState = {
  isInitialized: boolean
}

class TimelineAxis<Domain extends AxisDomain> extends Component<
  TimelineAxisProps<Domain>,
  TimelineAxisState
> {
  xAxis0Ref: RefObject<SVGGElement>
  xAxis1Ref: RefObject<SVGGElement>

  constructor(props: TimelineAxisProps<Domain>) {
    super(props)
    this.xAxis0Ref = createRef()
    this.xAxis1Ref = createRef()
    this.state = {
      isInitialized: false
    }
  }

  componentDidUpdate() {
    let fstFmt, sndFmt

    // 10yrs
    if (this.props.extent > 5256000) {
      fstFmt = '%Y'
      sndFmt = ''
      // 1yr
    } else if (this.props.extent > 43200) {
      sndFmt = '%d %b'
      fstFmt = ''
    } else {
      sndFmt = '%d %b'
      // fstFmt = "%H:%M";
      fstFmt = ''
    }

    const { marginTop, contentHeight } = this.props.dims
    if (this.props.scaleX) {
      this.x0 = axisBottom(this.props.scaleX)
        .ticks(this.props.ticks)
        .tickPadding(0)
        .tickSize(contentHeight - TEXT_HEIGHT - marginTop)
        .tickFormat(timeFormat(fstFmt))

      this.x1 = axisBottom(this.props.scaleX)
        .ticks(this.props.ticks)
        .tickPadding(marginTop)
        .tickSize(0)
        .tickFormat(timeFormat(sndFmt))

      if (!this.state.isInitialized) {
        this.setState({ isInitialized: true })
      }
    }

    if (this.state.isInitialized) {
      select(this.xAxis0Ref.current)
        .transition()
        .duration(this.props.transitionDuration)
        .call(this.x0)

      select(this.xAxis1Ref.current)
        .transition()
        .duration(this.props.transitionDuration)
        .call(this.x1)
    }
  }

  render() {
    return (
      <>
        <g
          ref={this.xAxis0Ref}
          transform={`translate(0, ${this.props.dims.marginTop})`}
          clipPath="url(#clip)"
          className="axis xAxis"
        />
        <g
          ref={this.xAxis1Ref}
          transform={`translate(0, ${this.props.dims.marginTop})`}
          clipPath="url(#clip)"
          className="axis xAxis"
        />
      </>
    )
  }
}

export default TimelineAxis
