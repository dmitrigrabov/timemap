import { marked } from 'marked'
import { Component } from 'react'

type MdProps = {
  path: string
  unloader?: JSX.Element
  loader?: JSX.Element
}

class Md extends Component<MdProps> {
  constructor(props: MdProps) {
    super(props)
    this.state = { md: null, error: null }
  }

  componentDidMount() {
    fetch(this.props.path)
      .then(resp => resp.text())
      .then(text => {
        if (text.length <= 0) {
          throw new Error()
        }

        this.setState({ md: marked(text) })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    if (this.state.md && !this.state.error) {
      return (
        <div
          className="md-container"
          dangerouslySetInnerHTML={{ __html: this.state.md }}
        />
      )
    } else if (this.state.error) {
      return this.props.unloader || <div>Error: couldn't load source</div>
    } else {
      return this.props.loader
    }
  }
}

export default Md
