import { ChangeEvent, Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import actions from 'actions'
import SearchRow from 'components/controls/atoms/SearchRow'
import { Event, Narrative } from 'store/types'

type SearchProps = ReturnType<typeof mapDispatchToProps> & {
  queryString: string
  events: Event[]
  narrative: Narrative
  onSearchRowClick: (events: Event[]) => void
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
    const searchResults = !this.props.queryString
      ? this.props.events.filter(event => {
          return searchAttributes.some((attribute: SearchAttribute) => {
            const value = event[attribute].toLowerCase()

            return value.includes(this.props.queryString.toLowerCase())
          })
        })
      : []

    return (
      <div
        className={
          'search-outer-container' +
          (this.props.narrative ? ' narrative-mode ' : '')
        }
      >
        <div
          id="search-bar-icon-container"
          onClick={() => this.onButtonClick()}
        >
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
              onChange={event => this.updateSearchQuery(event)}
              type="text"
            />
            <i
              id="close-search-overlay"
              className="material-icons"
              onClick={() => this.onButtonClick()}
            >
              close
            </i>
          </div>
          <div className="search-results">
            {searchResults.map(event => (
              <SearchRow
                key={event.id}
                onSearchRowClick={events => this.props.onSearchRowClick(events)}
                event={event}
                query={this.props.queryString}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(Search)
