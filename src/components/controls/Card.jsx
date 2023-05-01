import React, { useState } from 'react'
import CardCaret from './atoms/Caret'
import hash from 'object-hash'
import { CardField } from './CardField'

export const generateCardLayout = {
  basic: ({ event }) => {
    return [
      [
        {
          kind: 'date',
          title: 'Incident Date',
          value: event.datetime || event.date || ``
        },
        {
          kind: 'text',
          title: 'Location',
          value: event.location || `—`
        }
      ],
      [{ kind: 'line-break', times: 0.4 }],
      [
        {
          kind: 'text',
          title: 'Summary',
          value: event.description || ``,
          scaleFont: 1.1
        }
      ]
    ]
  },
  sourced: ({ event }) => {
    const formatted = [
      [
        {
          kind: 'date',
          title: 'Incident Date',
          value: event.datetime || event.date || ``
        },
        {
          kind: 'text',
          title: 'Location',
          value: event.location || `—`
        }
      ],
      [
        {
          kind: 'text',
          title: 'Summary',
          value: event.description || ``,
          scaleFont: 1.1
        }
      ],
      ...event.sources.flatMap(source =>
        source.paths.map(path => [
          {
            kind: 'media',
            title: 'Media',
            value: [{ src: path, title: null, type: source.type }]
          }
        ])
      )
    ]
    return formatted
  }
}

export const Card = ({
  content = [],
  isLoading = true,
  onSelect = () => {},
  sources = [],
  isSelected = false,
  language = 'en-US'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const renderCaret = () =>
    sources.length === 0 && (
      <CardCaret toggle={() => toggle()} isOpen={isOpen} />
    )

  // TODO: render afterCaret appropriately from props
  sources = []

  return (
    <li
      key={hash(content)}
      className={`event-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {content.map(row => (
        <div className="card-row" key={hash(row)}>
          {row.map(field => (
            <span key={hash(field)}>
              <CardField field={field} language={language} />
            </span>
          ))}
        </div>
      ))}
      {isOpen && (
        <div className="card-bottomhalf">
          {sources.map(() => (
            <div className="card-row"></div>
          ))}
        </div>
      )}
      {sources.length > 0 ? renderCaret() : null}
    </li>
  )
}
