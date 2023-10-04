import React, { useEffect, useReducer } from 'react'
// import { makeNiceDate } from '../../../common/utilities'
import { DateRangeInput } from '@datepicker-react/styled'
import { ThemeProvider } from 'styled-components'

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload }

    case 'dateChange':
      return action.payload

    case 'close':
      return state

    default:
      throw new Error()
  }
}

const TimelineHeader = ({
  title,
  from,
  to,
  onClick,
  hideInfo,
  onUpdateTimerange
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // const d0 = from && makeNiceDate(from)
  // const d1 = to && makeNiceDate(to)

  useEffect(() => {
    const { startDate, endDate } = state

    if (startDate && endDate) {
      onUpdateTimerange([startDate, endDate])
    }
  }, [state, onUpdateTimerange])

  return (
    <div className="timeline-header">
      <div className="timeline-toggle" onClick={() => onClick()}>
        <p>
          <i className="arrow-down" />
        </p>
      </div>
      <div className={`timeline-info ${hideInfo ? 'hidden' : ''}`}>
        <p>{title}</p>

        <ThemeProvider
          theme={{
            reactDatepicker: {
              fontFamily: 'GT-Zirkon, Lato, Helvetica, sans-serif',
              colors: {
                accessibility: '#D80249',
                selectedDay: '#EB443E',
                selectedDayHover: '#D9423D',
                primaryColor: '#CF332D',
                silverCloud: 'rgb(255, 255, 255, 0.6)'
              },
              closeColor: 'rgba(255, 255, 255, 0.5)',
              closeHoverColor: 'rgba(255, 255, 255, 0.5)',
              datepickerBackground: 'rgba(0, 0, 0, 0.8)',
              datepickerBorderRadius: '0',
              datepickerCloseWrapperRight: '20px',
              datepickerPadding: '20px',
              dateRangeDatepickerWrapperLeft: '-10px',
              dateRangeBorderRadius: '0',
              dayBackground: 'transparent',
              dayColor: 'rgba(255, 255, 255, 0.8)',
              dayLabelColor: 'rgba(255, 255, 255, 0.5)',
              inputBackground: 'transparent',
              inputCalendarWrapperLeft: '8px',
              inputCalendarWrapperTop: '8px',
              inputColor: 'rgba(255, 255, 255, 0.8)',
              inputLabelBackground: 'transparent',
              inputLabelBorderRadius: '0',
              inputMinHeight: '30px',
              monthLabelColor: 'rgba(255, 255, 255, 0.8)',
              navButtonBackground: 'transparent',
              navButtonIconColor: 'rgba(255,255,255,0.8)',
              selectDateDateColor: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          <DateRangeInput
            onDatesChange={data =>
              dispatch({ type: 'dateChange', payload: data })
            }
            onFocusChange={focusedInput =>
              dispatch({ type: 'focusChange', payload: focusedInput })
            }
            onClose={() => dispatch({ type: 'close' })}
            startDate={from} // Date or null
            endDate={to} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
            placement="top"
            showResetDates={false}
            displayFormat="dd/MM/yyyy"
            initialVisibleMonth={new Date(2022, 1, 23)}
          />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default TimelineHeader
