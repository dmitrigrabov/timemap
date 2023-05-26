import initial from 'store/initial'
import { toggleFlagAC } from 'common/utilities'
import {
  UpdateHighlightedAction,
  ActionTypes,
  UpdateTicksAction,
  UpdateSelectedAction,
  UpdateNarrativeStepIdxAction,
  ClearFilterAction,
  UpdateDimensionsAction,
  ToggleLanguageAction,
  UpdateSourceAction,
  FetchErrorAction,
  UpdateSearchQueryAction,
  UpdateTimeRangeAction,
  SetInitialShapesAction,
  ToggleShapesAction,
  SetInitialCategoriesAction,
  ToggleAssociationsAction,
  UpdateColoringSetAction,
  UpdateNarrativeAction
} from 'actions'
import { AppState } from 'store/types'

const updateHighlighted = (
  appState: AppState,
  action: UpdateHighlightedAction
) => {
  return Object.assign({}, appState, {
    highlighted: action.highlighted
  })
}

const updateTicks = (appState: AppState, action: UpdateTicksAction) => ({
  ...appState,
  timeline: {
    ...appState.timeline,
    dimensions: {
      ...appState.timeline.dimensions,
      ticks: action.ticks
    }
  }
})

const updateSelected = (
  appState: AppState,
  action: UpdateSelectedAction
): AppState => {
  return Object.assign({}, appState, {
    selected: action.selected
  })
}

const updateColoringSet = (
  appState: AppState,
  action: UpdateColoringSetAction
) => ({
  ...appState,
  associations: {
    ...appState.associations,
    coloringSet: action.coloringSet
  }
})

const updateNarrative = (appState: AppState, action: UpdateNarrativeAction) => {
  let minTime = appState.timeline.range[0]
  let maxTime = appState.timeline.range[1]

  const cornerBound0 = [180, 180]
  const cornerBound1 = [-180, -180]

  // Compute narrative time range and map bounds
  if (action.narrative) {
    // Forced to comment out min and max time changes, not sure why?
    minTime = appState.timeline.rangeLimits[0]
    maxTime = appState.timeline.rangeLimits[1]

    // Find max and mins coordinates of narrative events
    action.narrative.steps.forEach(step => {
      const stepTime = step.datetime
      if (stepTime < minTime) {
        minTime = stepTime
      }
      if (stepTime > maxTime) {
        maxTime = stepTime
      }

      if (!!step.longitude && !!step.latitude) {
        if (+step.longitude < cornerBound0[1]) {
          cornerBound0[1] = +step.longitude
        }
        if (+step.longitude > cornerBound1[1]) {
          cornerBound1[1] = +step.longitude
        }
        if (+step.latitude < cornerBound0[0]) {
          cornerBound0[0] = +step.latitude
        }
        if (+step.latitude > cornerBound1[0]) {
          cornerBound1[0] = +step.latitude
        }
      }
    })
    // Adjust bounds to center around first event, while keeping visible all others
    // Takes first event, finds max ditance with first attempt bounds, and use this max distance
    // on the other side, both in latitude and longitude
    const first = action.narrative.steps[0]
    if (!!first.longitude && !!first.latitude) {
      const firstToLong0 = Math.abs(+first.longitude - cornerBound0[1])
      const firstToLong1 = Math.abs(+first.longitude - cornerBound1[1])
      const firstToLat0 = Math.abs(+first.latitude - cornerBound0[0])
      const firstToLat1 = Math.abs(+first.latitude - cornerBound1[0])

      if (firstToLong0 > firstToLong1) {
        cornerBound1[1] = +first.longitude + firstToLong0
      }
      if (firstToLong0 < firstToLong1) {
        cornerBound0[1] = +first.longitude - firstToLong1
      }
      if (firstToLat0 > firstToLat1) {
        cornerBound1[0] = +first.latitude + firstToLat0
      }
      if (firstToLat0 < firstToLat1) {
        cornerBound0[0] = +first.latitude - firstToLat1
      }
    }

    // Add some buffer on both sides of the time extent
    minTime = minTime - Math.abs((maxTime - minTime) / 10)
    maxTime = maxTime + Math.abs((maxTime - minTime) / 10)
  }
  return {
    ...appState,
    associations: {
      ...appState.associations,
      narrative: action.narrative
    },
    map: {
      ...appState.map,
      bounds: action.narrative ? [cornerBound0, cornerBound1] : null
    },
    timeline: {
      ...appState.timeline,
      range: [minTime, maxTime]
    }
  }
}

const updateNarrativeStepIdx = (
  appState: AppState,
  action: UpdateNarrativeStepIdxAction
): AppState => {
  return {
    ...appState,
    narrativeState: {
      current: action.idx
    }
  }
}

const toggleAssociations = (
  appState: AppState,
  action: ToggleAssociationsAction
): AppState => {
  const values = Array.isArray(action.value) ? action.value : [action.value]

  const { association: associationType } = action

  let newAssociations = appState.associations[associationType].slice(0)

  values.forEach(value => {
    if (newAssociations.includes(value)) {
      newAssociations = newAssociations.filter(s => s !== value)
    } else {
      newAssociations.push(value)
    }
  })

  return {
    ...appState,
    associations: {
      ...appState.associations,
      [associationType]: newAssociations
    }
  }
}

const toggleShapes = (appState: AppState, action: ToggleShapesAction) => {
  const newShapes = [...appState.shapes]
  if (newShapes.includes(action.shape)) {
    const idx = newShapes.indexOf(action.shape)
    newShapes.splice(idx, 1)
  } else {
    newShapes.push(action.shape)
  }

  return {
    ...appState,
    shapes: newShapes
  }
}

const clearFilter = (
  appState: AppState,
  action: ClearFilterAction
): AppState => {
  return {
    ...appState,
    filters: {
      ...appState.filters,
      [action.filter]: []
    }
  }
}

const updateTimeRange = (
  appState: AppState,
  action: UpdateTimeRangeAction
) => ({
  ...appState,
  timeline: {
    ...appState.timeline,
    range: action.timerange
  }
})

const updateDimensions = (
  appState: AppState,
  action: UpdateDimensionsAction
): AppState => {
  return {
    ...appState,
    timeline: {
      ...appState.timeline,
      dimensions: {
        ...appState.timeline.dimensions,
        ...action.dims
      }
    }
  }
}

const toggleLanguage = (
  appState: AppState,
  action: ToggleLanguageAction
): AppState => {
  const otherLanguage = appState.language === 'es-MX' ? 'en-US' : 'es-MX'
  return Object.assign({}, appState, {
    language: action.language || otherLanguage
  })
}

const updateSource = (
  appState: AppState,
  action: UpdateSourceAction
): AppState => {
  return {
    ...appState,
    source: action.source
  }
}

const fetchError = (state: AppState, action: FetchErrorAction): AppState => {
  return {
    ...state,
    error: action.message,
    notifications: [{ type: 'error', message: action.message }]
  }
}

const toggleSites = toggleFlagAC('isShowingSites')
const toggleFetchingDomain = toggleFlagAC('isFetchingDomain')
const toggleInfoPopup = toggleFlagAC('isInfopopup')
const toggleIntroPopup = toggleFlagAC('isIntropopup')
const toggleNotifications = toggleFlagAC('isNotification')
const toggleCover = toggleFlagAC('isCover')

const setLoading = (appState: AppState): AppState => {
  return {
    ...appState,
    loading: true
  }
}

const setNotLoading = (appState: AppState): AppState => {
  return {
    ...appState,
    loading: false
  }
}

const setInitialCategories = (
  appState: AppState,
  action: SetInitialCategoriesAction
): AppState => {
  const categories = action.values.reduce<string[]>((acc, val) => {
    if (val.mode === 'CATEGORY') {
      acc.push(val.title)
    }
    return acc
  }, [])

  return {
    ...appState,
    associations: {
      ...appState.associations,
      categories: categories
    }
  }
}

const setInitialShapes = (
  appState: AppState,
  action: SetInitialShapesAction
): AppState => {
  const shapeIds = action.values.map(sh => sh.id)
  return {
    ...appState,
    shapes: shapeIds
  }
}

const updateSearchQuery = (
  appState: AppState,
  action: UpdateSearchQueryAction
): AppState => {
  return {
    ...appState,
    searchQuery: action.searchQuery
  }
}

function app(appState = initial.app, action: ActionTypes) {
  switch (action.type) {
    case 'UPDATE_HIGHLIGHTED':
      return updateHighlighted(appState, action)
    case 'UPDATE_SELECTED':
      return updateSelected(appState, action)
    case 'UPDATE_COLORING_SET':
      return updateColoringSet(appState, action)
    case 'UPDATE_TICKS':
      return updateTicks(appState, action)
    case 'CLEAR_FILTER':
      return clearFilter(appState, action)
    case 'TOGGLE_ASSOCIATIONS':
      return toggleAssociations(appState, action)
    case 'TOGGLE_SHAPES':
      return toggleShapes(appState, action)
    case 'UPDATE_TIMERANGE':
      return updateTimeRange(appState, action)
    case 'UPDATE_DIMENSIONS':
      return updateDimensions(appState, action)
    case 'UPDATE_NARRATIVE':
      return updateNarrative(appState, action)
    case 'UPDATE_NARRATIVE_STEP_IDX':
      return updateNarrativeStepIdx(appState, action)
    case 'UPDATE_SOURCE':
      return updateSource(appState, action)
    /* toggles */
    case 'TOGGLE_LANGUAGE':
      return toggleLanguage(appState, action)
    case 'TOGGLE_SITES':
      return toggleSites(appState)
    case 'TOGGLE_FETCHING_DOMAIN':
      return toggleFetchingDomain(appState)
    case 'TOGGLE_INFOPOPUP':
      return toggleInfoPopup(appState)
    case 'TOGGLE_INTROPOPUP':
      return toggleIntroPopup(appState)
    case 'TOGGLE_NOTIFICATIONS':
      return toggleNotifications(appState)
    case 'TOGGLE_COVER':
      return toggleCover(appState)
    /* errors */
    case 'FETCH_ERROR':
      return fetchError(appState, action)
    case 'SET_LOADING':
      return setLoading(appState)
    case 'SET_NOT_LOADING':
      return setNotLoading(appState)
    case 'SET_INITIAL_CATEGORIES':
      return setInitialCategories(appState, action)
    case 'SET_INITIAL_SHAPES':
      return setInitialShapes(appState, action)
    case 'UPDATE_SEARCH_QUERY':
      return updateSearchQuery(appState, action)
    default:
      return appState
  }
}

export default app
