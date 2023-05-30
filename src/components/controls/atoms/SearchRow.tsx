import { FC } from 'react'
import { Event } from 'store/types'

type SearchRowProps = {
  query: string
  event: Event
  onSearchRowClick: (events: Event[]) => void
}

const SearchRow: FC<SearchRowProps> = ({ query, event, onSearchRowClick }) => {
  const { description, location, date } = event

  return (
    <div className="search-row" onClick={() => onSearchRowClick([event])}>
      <div className="location-date-container">
        <div className="date-container">
          <i className="material-icons">event</i>
          <p>{getHighlightedText(date, query)}</p>
        </div>
        <div className="location-container">
          <i className="material-icons">location_on</i>
          <p>{getHighlightedText(location, query)}</p>
        </div>
      </div>
      <p>
        {getShortDescription(description, query).map(match => (
          <span key={match}>
            {getHighlightedText(match, query)}...
            <br />
          </span>
        ))}
      </p>
    </div>
  )
}

export default SearchRow

function getHighlightedText(text = '', highlight: string) {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <span>
      {parts.map(part =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span style={{ backgroundColor: 'yellow', color: 'black' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  )
}

function getShortDescription(text: string, searchQuery: string) {
  const regexp = new RegExp(
    `(([^ ]* ){0,6}[a-zA-Z]*${searchQuery.toLowerCase()}[a-zA-Z]*( [^ ]*){0,5})`,
    'gm'
  )
  const parts = text.toLowerCase().match(regexp)

  if (parts?.length) {
    for (let x = 0; x < parts.length; x++) {
      parts[x] = '...' + parts[x]
    }
  }

  const firstLine = [text.match('(([^ ]* ){0,10})' /*, 'm'*/)?.[0]]
  return parts || firstLine
}
