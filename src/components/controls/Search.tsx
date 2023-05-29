import { ChangeEvent, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from 'actions'
import SearchRow from 'components/controls/atoms/SearchRow'
import { Event } from 'store/types'

type SearchProps = ReturnType<typeof mapDispatchToProps> & {
  queryString: string
  events: Event[]
}

type SearchState = {
  isFolded: boolean
}

type SearchAttribute = 'description' | 'location' | 'category' | 'date'
const searchAttributes: SearchAttribute[] = [
  'description',
  'location',
  'category',
  'date'
]

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)

    this.state = {
      isFolded: true
    }
    this.onButtonClick = this.onButtonClick.bind(this)
    this.updateSearchQuery = this.updateSearchQuery.bind(this)
  }

  onButtonClick() {
    this.setState(prevState => {
      return { isFolded: !prevState.isFolded }
    })
  }

  updateSearchQuery(e: ChangeEvent<HTMLInputElement>) {
    const queryString = e.target.value
    this.props.actions.updateSearchQuery(queryString)
  }

  render() {
    let searchResults

    if (!this.props.queryString) {
      searchResults = []
    } else {
      searchResults = this.props.events.filter(event =>
        searchAttributes.some((attribute: SearchAttribute) => {
          const value = event[attribute].toLowerCase()

          return value.includes(this.props.queryString.toLowerCase())
        })
      )
    }

    return (
      <div
        className={
          'search-outer-container' +
          (this.props.narrative ? ' narrative-mode ' : '')
        }
      >
        <div id="search-bar-icon-container" onClick={this.onButtonClick}>
          <i className="material-icons">search</i>
        </div>
        <div
          className={
            'search-bar-overlay' + (this.state.isFolded ? ' folded' : '')
          }
        >
          <div className="search-input-container">
            <input
              className="search-bar-input"
              onChange={this.updateSearchQuery}
              type="text"
            />
            <i
              id="close-search-overlay"
              className="material-icons"
              onClick={this.onButtonClick}
            >
              close
            </i>
          </div>
          <div className="search-results">
            {searchResults.map(result => (
              <SearchRow
                onSearchRowClick={this.props.onSearchRowClick}
                eventObj={result}
                query={this.props.queryString}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(Search)
