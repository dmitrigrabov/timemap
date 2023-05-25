import { urlFromEnv } from 'common/utilities'
import {
  associationsApiPath,
  eventsApiPath,
  regionsApiPath,
  shapesApiPath,
  sitesApiPath,
  sourcesApiPath
} from 'config'
import { AppDispatch } from 'store'
import {
  Dimensions,
  Event,
  GetState,
  Language,
  Source,
  TimeRange,
  Notification,
  Shape,
  Associations,
  Narative,
  ColoringSet
} from 'store/types'

// TODO: relegate these URLs entirely to environment variables
// const CONFIG_URL = urlFromEnv('CONFIG_EXT')
const eventsUrls = urlFromEnv(eventsApiPath)
const associationsUrls = urlFromEnv(associationsApiPath)
const sourcesUrl = urlFromEnv(sourcesApiPath)
const sitesUrl = urlFromEnv(sitesApiPath)
const regionsUrl = urlFromEnv(regionsApiPath)
const shapesUrl = urlFromEnv(shapesApiPath)

const domainMsg = (domainType: string) => {
  return `Something went wrong fetching ${domainType}. Check the URL or try disabling them in the config file.`
}

export function fetchDomain() {
  const notifications: Notification[] = []

  function handleError(message: string) {
    notifications.push({
      message,
      type: 'error'
    })
    return []
  }

  return (dispatch: AppDispatch, getState: GetState) => {
    const features = getState().features
    dispatch(toggleFetchingDomain())

    // let configPromise = Promise.resolve([])
    // if (features.USE_REMOTE_CONFIG) {
    //   configPromise = fetch(CONFIG_URL)
    //     .then(response => response.json())
    //     .catch(() => handleError("Couldn't find data at the config URL you specified."))
    // }

    // NB: eventsUrls is a list, and so results are aggregated
    const eventPromise = Promise.all(
      eventsUrls.map(url =>
        fetch(url)
          .then(response => response.json())
          .catch(() => handleError('events'))
      )
    ).then(results => results.flatMap(t => t))

    let associationsPromise = Promise.resolve([])
    if (features.USE_ASSOCIATIONS) {
      if (!associationsUrls.length) {
        associationsPromise = Promise.resolve(
          handleError(
            'USE_ASSOCIATIONS is true, but you have not provided a ASSOCIATIONS_EXT'
          )
        )
      } else {
        associationsPromise = fetch([associationsUrls].join(''))
          .then(response => response.json())
          .catch(() => handleError(domainMsg('associations')))
      }
    }

    let sourcesPromise = Promise.resolve([])
    if (features.USE_SOURCES) {
      if (!sourcesUrl) {
        sourcesPromise = Promise.resolve(
          handleError(
            'USE_SOURCES is true, but you have not provided a SOURCES_EXT'
          )
        )
      } else {
        sourcesPromise = fetch([sourcesUrl].join(''))
          .then(response => response.json())
          .catch(() => handleError(domainMsg('sources')))
      }
    }

    let sitesPromise = Promise.resolve([])
    if (features.USE_SITES) {
      sitesPromise = fetch([sitesUrl].join(''))
        .then(response => response.json())
        .catch(() => handleError(domainMsg('sites')))
    }

    let regionsPromise = Promise.resolve([])
    if (features.USE_REGIONS) {
      regionsPromise = fetch([regionsUrl].join(''))
        .then(response => response.json())
        .catch(() => handleError(domainMsg('regions')))
    }

    let shapesPromise = Promise.resolve([])
    if (features.USE_SHAPES) {
      shapesPromise = fetch([shapesUrl].join(''))
        .then(response => response.json())
        .catch(() => handleError(domainMsg('shapes')))
    }

    return Promise.all([
      eventPromise,
      associationsPromise,
      sourcesPromise,
      sitesPromise,
      regionsPromise,
      shapesPromise
    ])
      .then(response => {
        const result = {
          events: response[0],
          associations: response[1],
          sources: response[2],
          sites: response[3],
          regions: response[4],
          shapes: response[5],
          notifications
        }
        if (
          Object.values(result).some(resp =>
            Object.prototype.hasOwnProperty.call(resp, 'error')
          )
        ) {
          throw new Error(
            'Some URLs returned negative. If you are in development, check the server is running'
          )
        }
        dispatch(toggleFetchingDomain())
        dispatch(setInitialCategories(associations))
        dispatch(setInitialShapes(shapes))
        return result
      })
      .catch(err => {
        dispatch(fetchError(err.message))
        dispatch(toggleFetchingDomain())
        // TODO: handle this appropriately in React hierarchy
        alert(err.message)
      })
  }
}

export type FetchErrorAction = {
  type: 'FETCH_ERROR'
  message: string
}

export const fetchError = (message: string): FetchErrorAction => ({
  type: 'FETCH_ERROR',
  message
})

export function updateDomain(payload) {
  return {
    type: 'UPDATE_DOMAIN',
    payload
  }
}

export type UpdateHighlightedAction = {
  type: 'UPDATE_HIGHLIGHTED'
  highlighted: boolean
}

export const updateHighlighted = (
  highlighted: boolean
): UpdateHighlightedAction => ({
  type: 'UPDATE_HIGHLIGHTED',
  highlighted
})

export type UpdateSelectedAction = {
  type: 'UPDATE_SELECTED'
  selected: Event[]
}

export const updateSelected = (selected: Event[]): UpdateSelectedAction => ({
  type: 'UPDATE_SELECTED',
  selected: selected
})

export type ClearFilterAction = {
  type: 'CLEAR_FILTER'
  filter: string
}

export const clearFilter = (filter: string): ClearFilterAction => ({
  type: 'CLEAR_FILTER',
  filter
})

export type ToggleAssociationsAction = {
  type: 'TOGGLE_ASSOCIATIONS'
  association: 'filters' | 'categories'
  value: Associations | Associations[]
  shouldColor?: boolean
}

export const toggleAssociations = (
  association: 'filters' | 'categories',
  value: Associations | Associations[],
  shouldColor?: boolean
): ToggleAssociationsAction => ({
  type: 'TOGGLE_ASSOCIATIONS',
  association,
  value,
  shouldColor
})

export type ToggleShapesAction = {
  type: 'TOGGLE_SHAPES'
  shape: string
}
export const toggleShapes = (shape: string) => ({
  type: 'TOGGLE_SHAPES',
  shape
})

export type SetLoadingAction = {
  type: 'SET_LOADING'
}

export const setLoading = (): SetLoadingAction => ({
  type: 'SET_LOADING'
})

export type SetNotLoadingAction = {
  type: 'SET_NOT_LOADING'
}

export const setNotLoading = (): SetNotLoadingAction => ({
  type: 'SET_NOT_LOADING'
})

export type SetInitialCategoriesAction = {
  type: 'SET_INITIAL_CATEGORIES'
  values: Associations[]
}

export const setInitialCategories = (values: Associations[]) => ({
  type: 'SET_INITIAL_CATEGORIES',
  values
})

export type SetInitialShapesAction = {
  type: 'SET_INITIAL_SHAPES'
  values: Shape[]
}

export const setInitialShapes = (values: Shape[]): SetInitialShapesAction => ({
  type: 'SET_INITIAL_SHAPES',
  values
})
export type UpdateTimeRangeAction = {
  type: 'UPDATE_TIMERANGE'
  timerange: TimeRange
}

export const updateTimeRange = (
  timerange: TimeRange
): UpdateTimeRangeAction => ({
  type: 'UPDATE_TIMERANGE',
  timerange
})

export type UpdateDimensionsAction = {
  type: 'UPDATE_DIMENSIONS'
  dims: Dimensions
}

export const updateDimensions = (dims: Dimensions): UpdateDimensionsAction => ({
  type: 'UPDATE_DIMENSIONS',
  dims
})

export type UpdateNarativeAction = {
  type: 'UPDATE_NARRATIVE'
  narrative: Narative
}

export const updateNarrative = (narrative: Narative): UpdateNarativeAction => {
  return {
    type: 'UPDATE_NARRATIVE',
    narrative
  }
}

export type UpdateNarrativeStepIdxAction = {
  type: 'UPDATE_NARRATIVE_STEP_IDX'
  idx: number
}

export const updateNarrativeStepIdx = (
  idx: number
): UpdateNarrativeStepIdxAction => ({
  type: 'UPDATE_NARRATIVE_STEP_IDX',
  idx
})

export type UpdateSourceAction = {
  type: 'UPDATE_SOURCE'
  source: Source
}

export const updateSource = (source: Source): UpdateSourceAction => ({
  type: 'UPDATE_SOURCE',
  source
})

export type UpdateColoringSetAction = {
  type: 'UPDATE_COLORING_SET'
  coloringSet: ColoringSet
}

export const updateColoringSet = (coloringSet: ColoringSet) => ({
  type: 'UPDATE_COLORING_SET',
  coloringSet
})

export type UpdateTicksAction = {
  type: 'UPDATE_TICKS'
  ticks: number
}

export const updateTicks = (ticks: number): UpdateTicksAction => ({
  type: 'UPDATE_TICKS',
  ticks
})

// UI

export type ToggleSitesAction = {
  type: 'TOGGLE_SITES'
}
export const toggleSites = (): ToggleSitesAction => ({
  type: 'TOGGLE_SITES'
})

export type ToggleFetchingDomainAction = {
  type: 'TOGGLE_FETCHING_DOMAIN'
}

export const toggleFetchingDomain = (): ToggleFetchingDomainAction => ({
  type: 'TOGGLE_FETCHING_DOMAIN'
})

export type ToggleLanguageAction = {
  type: 'TOGGLE_LANGUAGE'
  language: Language
}

export const toggleLanguage = (language: Language): ToggleLanguageAction => ({
  type: 'TOGGLE_LANGUAGE',
  language
})

export type CloseToolbarAction = {
  type: 'CLOSE_TOOLBAR'
}

export const closeToolbar = (): CloseToolbarAction => ({
  type: 'CLOSE_TOOLBAR'
})

export type ToggleInfoPopupAction = {
  type: 'TOGGLE_INFOPOPUP'
}

export const toggleInfoPopup = (): ToggleInfoPopupAction => ({
  type: 'TOGGLE_INFOPOPUP'
})

export type ToggleIntroPopupAction = {
  type: 'TOGGLE_INTROPOPUP'
}

export const toggleIntroPopup = (): ToggleIntroPopupAction => ({
  type: 'TOGGLE_INTROPOPUP'
})

export type ToggleNotificationsAction = {
  type: 'TOGGLE_NOTIFICATIONS'
}

export const toggleNotifications = (): ToggleNotificationsAction => ({
  type: 'TOGGLE_NOTIFICATIONS'
})

export type MarkNotificationsReadAction = {
  type: 'MARK_NOTIFICATIONS_READ'
}

export const markNotificationsRead = (): MarkNotificationsReadAction => ({
  type: 'MARK_NOTIFICATIONS_READ'
})

export type ToggleCoverAction = {
  type: 'TOGGLE_COVER'
}

export const toggleCover = (): ToggleCoverAction => ({
  type: 'TOGGLE_COVER'
})

export type UpdateSearchQueryAction = {
  type: 'UPDATE_SEARCH_QUERY'
  searchQuery: string
}
export const updateSearchQuery = (
  searchQuery: string
): UpdateSearchQueryAction => ({
  type: 'UPDATE_SEARCH_QUERY',
  searchQuery
})

// ERRORS

export type ToggleSatelliteViewAction = {
  type: 'TOGGLE_SATELLITE_VIEW'
}

export const toggleSatelliteView = (): ToggleSatelliteViewAction => ({
  type: 'TOGGLE_SATELLITE_VIEW'
})

export type ActionTypes =
  | ClearFilterAction
  | CloseToolbarAction
  | FetchErrorAction
  | MarkNotificationsReadAction
  | SetInitialCategoriesAction
  | SetInitialCategoriesAction
  | SetInitialShapesAction
  | SetLoadingAction
  | SetLoadingAction
  | SetNotLoadingAction
  | ToggleAssociationsAction
  | ToggleCoverAction
  | ToggleFetchingDomainAction
  | ToggleInfoPopupAction
  | ToggleIntroPopupAction
  | ToggleLanguageAction
  | ToggleNotificationsAction
  | ToggleSatelliteViewAction
  | ToggleShapesAction
  | ToggleSitesAction
  | UpdateColoringSetAction
  | UpdateDimensionsAction
  | UpdateHighlightedAction
  | UpdateNarativeAction
  | UpdateNarrativeStepIdxAction
  | UpdateSearchQueryAction
  | UpdateSelectedAction
  | UpdateSourceAction
  | UpdateTicksAction
  | UpdateTimeRangeAction
