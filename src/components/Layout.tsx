import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as selectors from 'selectors'

import Toolbar from 'components/Toolbar'
import InfoPopup from 'components/InfoPopup'
import Notification from 'components/Notification'
import TemplateCover from 'components/TemplateCover'

import Popup from 'components/atoms/Popup'
import StaticPage from 'components/atoms/StaticPage'
import MediaOverlay from 'components/atoms/Media'
import LoadingOverlay from 'components/atoms/Loading'

import Timeline from 'components/time/Timeline'
import Space from 'components/space/Space'
import Search from 'components/controls/Search'
import CardStack from 'components/controls/CardStack'
import NarrativeControls from 'components/controls/NarrativeControls'

import { fallbackEventColor } from 'common/global'
import { binarySearch } from 'common/utilities'
import { isMobileOnly } from 'react-device-detect'

import { Component } from 'react'
import { DomainExternal, StoreState, Narrative } from 'store/types'
import { Actions, default as actionsObject } from 'actions'

type DashboardProps = StoreState & {
  actions: Actions
}

class Dashboard extends Component<DashboardProps> {
  constructor(props: DashboardProps) {
    super(props)

    this.handleViewSource = this.handleViewSource.bind(this)
    this.handleHighlight = this.handleHighlight.bind(this)
    this.setNarrative = this.setNarrative.bind(this)
    this.setNarrativeFromFilters = this.setNarrativeFromFilters.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getCategoryColor = this.getCategoryColor.bind(this)
    this.findEventIdx = this.findEventIdx.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.selectNarrativeStep = this.selectNarrativeStep.bind(this)
  }

  componentDidMount() {
    if (!this.props.app.isMobile) {
      const fetchDomain = this.props.actions
        .fetchDomain as unknown as () => Promise<DomainExternal | undefined>

      fetchDomain()
        .then(domain => {
          this.props.actions.updateDomain({
            domain,
            features: this.props.features
          })
        })
        .catch((err: Error) => {
          console.error(err)
        })
    }
    // NOTE: hack to get the timeline to always show. Not entirely sure why
    // this is necessary.
    globalThis.window.dispatchEvent(new Event('resize'))
  }

  handleHighlight(highlighted) {
    this.props.actions.updateHighlighted(highlighted || null)
  }

  handleViewSource(source) {
    this.props.actions.updateSource(source)
  }

  findEventIdx(theEvent) {
    const { events } = this.props.domain
    return binarySearch(events, theEvent, (theev, otherev) => {
      return theev.datetime - otherev.datetime
    })
  }

  handleSelect(selected, axis) {
    if (selected.length <= 0) {
      this.props.actions.updateSelected([])
      return
    }

    const matchedEvents = []
    const TIMELINE_AXIS = 0
    if (axis === TIMELINE_AXIS) {
      matchedEvents.push(selected)
      // find in events
      const { events } = this.props.domain
      const idx = this.findEventIdx(selected)
      // binary search can return event with different id
      if (events[idx].id !== selected.id) {
        matchedEvents.push(events[idx])
      }

      // check events before
      let ptr = idx - 1

      while (
        ptr >= 0 &&
        events[idx].datetime.getTime() === events[ptr].datetime.getTime()
      ) {
        if (events[ptr].id !== selected.id) {
          matchedEvents.push(events[ptr])
        }
        ptr -= 1
      }
      // check events after
      ptr = idx + 1

      while (
        ptr < events.length &&
        events[idx].datetime.getTime() === events[ptr].datetime.getTime()
      ) {
        if (events[ptr].id !== selected.id) {
          matchedEvents.push(events[ptr])
        }
        ptr += 1
      }
    } else {
      // Map..
      const std = { ...selected }
      delete std.sources
      Object.values(std).forEach(ev => matchedEvents.push(ev))
    }

    this.props.actions.updateSelected(matchedEvents)
  }

  getCategoryColor(category) {
    if (!this.props.features.USE_CATEGORIES) {
      return fallbackEventColor
    }

    const cat = this.props.ui.style.categories[category]
    if (cat) {
      return cat
    } else {
      return this.props.ui.style.categories.default
    }
  }

  setNarrative(narrativ: Narrative) {
    // only handleSelect if narrative is not null and has associated events
    if (narrative && narrative.steps.length >= 1) {
      this.handleSelect([narrative.steps[0]])
    }
    this.props.actions.updateNarrative(narrative)
  }

  // setNarrativeFromFilters(withSteps) {
  //   const { app, domain } = this.props
  //   let activeFilters = app.associations.filters

  //   if (activeFilters.length === 0) {
  //     alert('No filters selected, cant narrativise')
  //     return
  //   }

  //   activeFilters = activeFilters.map(f => ({ name: f }))

  //   const evs = domain.events.filter(ev => {
  //     let hasOne = false
  //     // add event if it has at least one matching filter
  //     for (let i = 0; i < activeFilters.length; i++) {
  //       if (ev.associations.includes(activeFilters[i].name)) {
  //         hasOne = true
  //         break
  //       }
  //     }
  //     if (hasOne) {
  //       return true
  //     }
  //     return false
  //   })

  //   if (evs.length === 0) {
  //     alert('No associated events, cant narrativise')
  //     return
  //   }

  //   const name = activeFilters.map(f => f.name).join('-')
  //   const desc = activeFilters.map(f => f.description).join('\n\n')
  //   this.setNarrative({
  //     id: name,
  //     label: name,
  //     description: desc,
  //     withLines: withSteps,
  //     steps: evs.map(insetSourceFrom(domain.sources))
  //   })
  // }

  selectNarrativeStep(idx: number) {
    // Try to find idx if event passed rather than number
    if (typeof idx !== 'number') {
      const e = idx[0] || idx

      if (this.props.app.associations.narrative) {
        const { steps } = this.props.app.associations.narrative
        // choose the first event at a given location
        const locationEventId = e.id
        const narrativeIdxObj = steps.find(s => s.id === locationEventId)
        const narrativeIdx = steps.indexOf(narrativeIdxObj)

        if (narrativeIdx > -1) {
          idx = narrativeIdx
        }
      }
    }

    const { narrative } = this.props.app.associations
    if (narrative === null) {
      return
    }

    if (idx < narrative.steps.length && idx >= 0) {
      const step = narrative.steps[idx]

      this.handleSelect([step])
      this.props.actions.updateNarrativeStepIdx(idx)
    }
  }

  onKeyDown(e) {
    const { narrative, selected } = this.props.app
    const { events } = this.props.domain

    const prev = idx => {
      if (narrative === null) {
        this.handleSelect(events[idx - 1], 0)
      } else {
        this.selectNarrativeStep(this.props.narrativeIdx - 1)
      }
    }
    const next = idx => {
      if (narrative === null) {
        this.handleSelect(events[idx + 1], 0)
      } else {
        this.selectNarrativeStep(this.props.narrativeIdx + 1)
      }
    }
    if (selected.length > 0) {
      const ev = selected[selected.length - 1]
      const idx = this.findEventIdx(ev)
      switch (e.keyCode) {
        case 37: // left arrow
        case 38: // up arrow
          if (idx <= 0) {
            return
          }
          prev(idx)
          break
        case 39: // right arrow
        case 40: // down arrow
          if (idx < 0 || idx >= this.props.domain.length - 1) {
            return
          }
          next(idx)
          break
        default:
      }
    }
  }

  renderIntroPopup(isMobile, styles) {
    const { app, actions } = this.props

    const extraContent = isMobile ? (
      <div style={{ position: 'relative', bottom: 0 }}>
        <h3 style={{ color: 'var(--error-red)' }}>
          This platform is not suitable for mobile.
          <br />
          <br />
          Please re-visit the site on a device with a larger screen.
        </h3>
      </div>
    ) : null

    return (
      <Popup
        title="Introduction to the platform"
        theme="dark"
        isOpen={app.flags.isIntropopup}
        onClose={actions.toggleIntroPopup}
        content={app.intro}
        styles={styles}
        isMobile={isMobile}
      >
        {extraContent}
      </Popup>
    )
  }

  render() {
    const { actions, app, domain, features } = this.props
    const dateHeight = 80
    const padding = 2
    const checkMobile = isMobileOnly || window.innerWidth < 600

    const popupStyles = {
      height: checkMobile ? '100vh' : 'fit-content',
      display: checkMobile ? 'block' : 'table',
      width: checkMobile
        ? '100vw'
        : window.innerWidth > 768
        ? '60vw'
        : 'calc(100vw - var(--toolbar-width))',
      maxWidth: checkMobile ? '100vw' : 600,
      maxHeight: checkMobile
        ? '100vh'
        : window.innerHeight > 768
        ? `calc(100vh - ${app.timeline.dimensions.height}px - ${dateHeight}px)`
        : '100vh',
      left: checkMobile ? padding : 'var(--toolbar-width)',
      top: 0,
      overflowY: 'scroll'
    }

    if (checkMobile) {
      const msg =
        'This platform is not suitable for mobile. Please re-visit the site on a device with a larger screen.'
      return (
        <div>
          {features.USE_COVER && !app.intro && (
            <StaticPage showing={app.flags.isCover}>
              {/* enable USE_COVER in config.js features, and customise your header */}
              {/* pass 'actions.toggleCover' as a prop to your custom header */}
              <TemplateCover
                showAppHandler={() => {
                  /* eslint-disable no-undef */
                  alert(msg)
                  /* eslint-enable no-undef */
                }}
              />
            </StaticPage>
          )}
          {app.intro && <>{this.renderIntroPopup(true, popupStyles)}</>}
          {!app.intro && !features.USE_COVER && (
            <div className="fixedTooSmallMessage">{msg}</div>
          )}
        </div>
      )
    }

    return (
      <div>
        <Toolbar
          isNarrative={!!app.associations.narrative}
          methods={{
            onTitle: actions.toggleCover,
            onSelectFilter: filters =>
              actions.toggleAssociations('filters', filters),
            onCategoryFilter: categories =>
              actions.toggleAssociations('categories', categories),
            onShapeFilter: actions.toggleShapes,
            onSelectNarrative: (narrative: Narrative) => {
              this.setNarrative(narrative)
            }
          }}
        />
        <Space
          kind={'map' in app ? 'map' : 'space3d'}
          onKeyDown={this.onKeyDown}
          methods={{
            onSelectNarrative: this.setNarrative,
            getCategoryColor: this.getCategoryColor,
            onSelect: app.associations.narrative
              ? this.selectNarrativeStep
              : ev => this.handleSelect(ev, 1)
          }}
        />
        <Timeline
          onKeyDown={this.onKeyDown}
          methods={{
            onSelect: app.associations.narrative
              ? this.selectNarrativeStep
              : ev => this.handleSelect(ev, 0),
            onUpdateTimerange: actions.updateTimeRange,
            getCategoryColor: this.getCategoryColor
          }}
        />
        <CardStack
          timelineDims={app.timeline.dimensions}
          onViewSource={this.handleViewSource}
          onSelect={
            app.associations.narrative ? this.selectNarrativeStep : () => null
          }
          onHighlight={this.handleHighlight}
          onToggleCardstack={() => actions.updateSelected([])}
          getCategoryColor={this.getCategoryColor}
        />
        <NarrativeControls
          narrative={
            app.associations.narrative
              ? {
                  ...app.associations.narrative,
                  current: this.props.narrativeIdx
                }
              : null
          }
          methods={{
            onNext: () => this.selectNarrativeStep(this.props.narrativeIdx + 1),
            onPrev: () => this.selectNarrativeStep(this.props.narrativeIdx - 1),
            onSelectNarrative: this.setNarrative
          }}
        />
        <InfoPopup
          language={app.language}
          styles={popupStyles}
          isOpen={app.flags.isInfopopup}
          onClose={actions.toggleInfoPopup}
        />
        {this.renderIntroPopup(false, popupStyles)}
        {app.debug ? (
          <Notification
            isNotification={app.flags.isNotification}
            notifications={domain.notifications}
            onToggle={actions.markNotificationsRead}
          />
        ) : null}
        {features.USE_SEARCH && (
          <Search
            narrative={app.narrative}
            queryString={app.searchQuery}
            events={domain.events}
            onSearchRowClick={this.handleSelect}
          />
        )}
        {app.source ? (
          <MediaOverlay
            source={app.source}
            onCancel={() => {
              actions.updateSource(null)
            }}
          />
        ) : null}
        <LoadingOverlay
          isLoading={app.loading || app.flags.isFetchingDomain}
          ui={app.flags.isFetchingDomain}
          language={app.language}
        />
        {features.USE_COVER && (
          <StaticPage showing={app.flags.isCover}>
            {/* enable USE_COVER in config.js features, and customise your header */}
            {/* pass 'actions.toggleCover' as a prop to your custom header */}
            <TemplateCover
              showing={app.flags.isCover}
              showAppHandler={actions.toggleCover}
            />
          </StaticPage>
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionsObject, dispatch)
  }
}

export default connect(
  (state: StoreState) => ({
    ...state,
    narrativeIdx: selectors.selectNarrativeIdx(state),
    narratives: selectors.selectNarratives(state),
    selected: selectors.selectSelected(state)
  }),
  mapDispatchToProps
)(Dashboard)
