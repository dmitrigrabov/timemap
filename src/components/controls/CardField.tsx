import CardText from 'components/controls/atoms/Text'
import CardButton from 'components/controls/atoms/Button'
import CardCustom from 'components/controls/atoms/CustomField'
import CardMedia from 'components/controls/atoms/Media'
import { makeNiceDate, isEmptyString } from 'common/utilities'
import CardTime from 'components/controls/atoms/Time'
import { FC } from 'react'
import { ContentField, Language } from 'store/types'

type CardFieldProps = {
  field: ContentField
  language: Language
}

export const CardField: FC<CardFieldProps> = ({ field, language }) => {
  switch (field.kind) {
    case 'media':
      return (
        <>
          {field.value.map((media, idx) => (
            <CardMedia key={idx} media={media} />
          ))}
        </>
      )
    case 'line':
      return (
        <div style={{ height: `1rem`, width: `100%` }}>
          <hr />
        </div>
      )
    case 'line-break':
      return <div style={{ height: `${field.times || 1}rem`, width: `100%` }} />
    case 'item':
      // this is like a span
      return null
    case 'markdown':
      return <CardCustom {...field} />
    case 'tag':
      return (
        <div
          className="card-cell m0"
          style={{
            textTransform: `uppercase`,
            fontSize: `.8em`,
            lineHeight: `.8em`
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: `flex-${field.align || `start`}`
            }}
          >
            {field.value}
          </div>
        </div>
      )
    case 'button':
      return (
        <div className="card-cell">
          {field.title && <h4>{field.title}</h4>}
          {/* <div className="card-row"> */}
          {field.value.map((t, idx) => (
            <CardButton key={`card-button-${idx}`} {...t} />
          ))}
          {/* </div> */}
        </div>
      )
    case 'text':
      return !isEmptyString(field.value) ? <CardText {...field} /> : null
    case 'date':
      return (
        <CardTime
          language={language}
          timelabel={makeNiceDate(field.value)}
          {...field}
        />
      )
    case 'links':
      return (
        <div className="card-cell">
          {field.title && <h4>{field.title}</h4>}
          <div className="card-row m0">
            {field.value.map(({ text, href }, idx) => (
              <a href={href} key={`card-links-url-${idx}`}>
                {text}
              </a>
            ))}
          </div>
        </div>
      )
    case 'list': {
      // Only render if some of the list's strings are non-empty
      const shouldFieldRender =
        !!field.value.length &&
        !!field.value.filter(s => !isEmptyString(s)).length

      return shouldFieldRender ? (
        // <div className="card-cell">
        <div>
          {field.title && <h4>{field.title}</h4>}
          <div className="card-row m0">
            {field.value.map(({ title, value }, idx) => (
              <CardText
                key={`card-list-text-${idx}`}
                value={value}
                title={title}
              />
            ))}
          </div>
        </div>
      ) : null
    }
    default:
      return null
  }
}
