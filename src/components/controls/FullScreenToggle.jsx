import { Component } from 'react'
import screenfull from 'screenfull'
import { ToolbarButton } from 'component/atoms/ToolbarButton'
import copy from 'common/data/copy.json'

export class FullscreenToggle extends Component {
  constructor(props) {
    super(props)

    this.onFullscreenStateChange = this.onFullscreenStateChange.bind(this)

    this.state = {
      isFullscreen: screenfull.isFullscreen
    }
  }

  componentDidMount() {
    screenfull.on('change', this.onFullscreenStateChange)
  }

  componentWillUnmount() {
    screenfull.off('change', this.onFullscreenStateChange)
  }

  onFullscreenStateChange() {
    this.setState({ isFullscreen: screenfull.isFullscreen })
  }

  onToggleFullscreen() {
    screenfull.toggle().catch(console.warn)
  }

  render() {
    if (!screenfull.isEnabled) {
      return null
    }

    const { language } = this.props
    const { isFullscreen } = this.state

    return (
      <ToolbarButton
        isActive={isFullscreen}
        label={
          isFullscreen
            ? copy[language].toolbar.fullscreen_exit
            : copy[language].toolbar.fullscreen_enter
        }
        iconKey={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
        onClick={() => this.onToggleFullscreen()}
      />
    )
  }
}
