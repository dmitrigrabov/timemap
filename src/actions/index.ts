import { urlFromEnv } from 'common/utilities'
import {
  associationsApiPath,
  eventsApiPath,
  regionsApiPath,
  shapesApiPath,
  sitesApiPath,
  sourcesApiPath
} from 'config'
import { validate } from 'lib/validate/validate'
import { associationsModel } from 'model/association'
import { shapesModel } from 'model/shape'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  Dimensions,
  Event,
  Language,
  Source,
  TimeRange,
  Notification,
  Shape,
  Associations,
  Narrative,
  ColoringSet,
  DomainExternal,
  StoreState,
  FeaturesState
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

const createError = (message: string): Notification => ({
  type: 'error',
  message
})

type HandleResponseArgs = {
  inUse?: boolean
  domainType: string
  urls: string | string[]
}

type HandleResponseOutput = {
  notification?: Notification
  data: unknown[]
}

const handleResponse = ({
  domainType,
  urls,
  inUse
}: HandleResponseArgs): Promise<HandleResponseOutput> => {
  const empty: unknown[] = []

  if (!inUse) {
    return Promise.resolve({
      data: empty
    })
  }

  if (!urls.length) {
    return Promise.resolve({
      data: empty,
      notification: createError(
        'USE_ASSOCIATIONS is true, but you have not provided a ASSOCIATIONS_EXT'
      )
    })
  }

  return fetch([urls].join(''))
    .then(response => response.json())
    .then(data => ({
      data
    }))
    .catch(() => ({
      notification: createError(domainMsg(domainType)),
      data: empty
    }))
}

const fetchDomain = (): ThunkAction<
  Promise<DomainExternal | undefined>,
  StoreState,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
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
          .catch((): unknown[] => {
            // handleError('events')
            return []
          })
      )
    ).then((results: unknown[]) => results.flatMap(t => t))

    const associationsPromise = handleResponse({
      domainType: 'associations',
      urls: associationsUrls,
      inUse: features.USE_ASSOCIATIONS
    })

    const sourcesPromise = handleResponse({
      domainType: 'sources',
      urls: sourcesUrl,
      inUse: features.USE_SOURCES
    })

    const sitesPromise = handleResponse({
      domainType: 'sites',
      urls: sitesUrl,
      inUse: features.USE_SITES
    })

    const regionsPromise = handleResponse({
      domainType: 'regions',
      urls: regionsUrl,
      inUse: features.USE_REGIONS
    })

    const shapesPromise = handleResponse({
      domainType: 'shapes',
      urls: shapesUrl,
      inUse: features.USE_SHAPES
    })

    return Promise.all([
      eventPromise,
      associationsPromise,
      sourcesPromise,
      sitesPromise,
      regionsPromise,
      shapesPromise
    ])
      .then(res => {
        const [events, associations, sources, sites, regions, shapes] = res
        const notifications = [
          associations,
          sources,
          sites,
          regions,
          shapes
        ].reduce<Notification[]>((acc, { notification }) => {
          if (notification) {
            acc.push(notification)
          }
          return acc
        }, [])

        const result: DomainExternal = {
          events,
          associations: associations.data,
          sources: sources.data,
          sites: sites.data,
          regions: regions.data,
          shapes: shapes.data,
          notifications
        }

        // if (
        //   Object.values(result).some(resp =>
        //     Object.prototype.hasOwnProperty.call(resp, 'error')
        //   )
        // ) {
        //   throw new Error(
        //     'Some URLs returned negative. If you are in development, check the server is running'
        //   )
        // }

        const parsedAssociations =
          validate(associations.data, associationsModel) ?? []

        const parsedShapes = validate(shapes.data, shapesModel) ?? []

        dispatch(toggleFetchingDomain())
        dispatch(setInitialCategories(parsedAssociations))
        dispatch(setInitialShapes(parsedShapes))

        return result
      })
      .catch(err => {
        dispatch(fetchError('Failed to fetch'))
        dispatch(toggleFetchingDomain())

        alert(err.message)

        return undefined
      })
  }
}

export type FetchErrorAction = {
  type: 'FETCH_ERROR'
  message: string
}

const fetchError = (message: string): FetchErrorAction => ({
  type: 'FETCH_ERROR',
  message
})

export type UpdateDomainAction = {
  type: 'UPDATE_DOMAIN'
  payload: UpdateDomainPayload
}

type UpdateDomainPayload = {
  domain: DomainExternal | undefined
  features: FeaturesState
}

const updateDomain = (payload: UpdateDomainPayload): UpdateDomainAction => {
  return {
    type: 'UPDATE_DOMAIN',
    payload
  }
}

export type UpdateHighlightedAction = {
  type: 'UPDATE_HIGHLIGHTED'
  highlighted: boolean
}

const updateHighlighted = (highlighted: boolean): UpdateHighlightedAction => ({
  type: 'UPDATE_HIGHLIGHTED',
  highlighted
})

export type UpdateSelectedAction = {
  type: 'UPDATE_SELECTED'
  selected: Event[]
}

const updateSelected = (selected: Event[]): UpdateSelectedAction => ({
  type: 'UPDATE_SELECTED',
  selected: selected
})

export type ClearFilterAction = {
  type: 'CLEAR_FILTER'
  filter: string
}

const clearFilter = (filter: string): ClearFilterAction => ({
  type: 'CLEAR_FILTER',
  filter
})

export type ToggleAssociationsAction = {
  type: 'TOGGLE_ASSOCIATIONS'
  association: 'filters' | 'categories'
  value: string | string[]
  shouldColor?: boolean
}

const toggleAssociations = (
  association: 'filters' | 'categories',
  value: string | string[],
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
const toggleShapes = (shape: string) => ({
  type: 'TOGGLE_SHAPES',
  shape
})

export type SetLoadingAction = {
  type: 'SET_LOADING'
}

const setLoading = (): SetLoadingAction => ({
  type: 'SET_LOADING'
})

export type SetNotLoadingAction = {
  type: 'SET_NOT_LOADING'
}

const setNotLoading = (): SetNotLoadingAction => ({
  type: 'SET_NOT_LOADING'
})

export type SetInitialCategoriesAction = {
  type: 'SET_INITIAL_CATEGORIES'
  values: Associations[]
}

const setInitialCategories = (
  values: Associations[]
): SetInitialCategoriesAction => ({
  type: 'SET_INITIAL_CATEGORIES',
  values
})

export type SetInitialShapesAction = {
  type: 'SET_INITIAL_SHAPES'
  values: Shape[]
}

const setInitialShapes = (values: Shape[]): SetInitialShapesAction => ({
  type: 'SET_INITIAL_SHAPES',
  values
})
export type UpdateTimeRangeAction = {
  type: 'UPDATE_TIMERANGE'
  timerange: TimeRange
}

const updateTimeRange = (timerange: TimeRange): UpdateTimeRangeAction => ({
  type: 'UPDATE_TIMERANGE',
  timerange
})

export type UpdateDimensionsAction = {
  type: 'UPDATE_DIMENSIONS'
  dims: Dimensions
}

const updateDimensions = (dims: Dimensions): UpdateDimensionsAction => ({
  type: 'UPDATE_DIMENSIONS',
  dims
})

export type UpdateNarrativeAction = {
  type: 'UPDATE_NARRATIVE'
  narrative: Narrative
}

const updateNarrative = (narrative: Narrative): UpdateNarrativeAction => {
  return {
    type: 'UPDATE_NARRATIVE',
    narrative
  }
}

export type UpdateNarrativeStepIdxAction = {
  type: 'UPDATE_NARRATIVE_STEP_IDX'
  idx: number
}

const updateNarrativeStepIdx = (idx: number): UpdateNarrativeStepIdxAction => ({
  type: 'UPDATE_NARRATIVE_STEP_IDX',
  idx
})

export type UpdateSourceAction = {
  type: 'UPDATE_SOURCE'
  source: Source
}

const updateSource = (source: Source): UpdateSourceAction => ({
  type: 'UPDATE_SOURCE',
  source
})

export type UpdateColoringSetAction = {
  type: 'UPDATE_COLORING_SET'
  coloringSet: ColoringSet
}

const updateColoringSet = (coloringSet: ColoringSet) => ({
  type: 'UPDATE_COLORING_SET',
  coloringSet
})

export type UpdateTicksAction = {
  type: 'UPDATE_TICKS'
  ticks: number
}

const updateTicks = (ticks: number): UpdateTicksAction => ({
  type: 'UPDATE_TICKS',
  ticks
})

// UI

export type ToggleSitesAction = {
  type: 'TOGGLE_SITES'
}
const toggleSites = (): ToggleSitesAction => ({
  type: 'TOGGLE_SITES'
})

export type ToggleFetchingDomainAction = {
  type: 'TOGGLE_FETCHING_DOMAIN'
}

const toggleFetchingDomain = (): ToggleFetchingDomainAction => ({
  type: 'TOGGLE_FETCHING_DOMAIN'
})

export type ToggleLanguageAction = {
  type: 'TOGGLE_LANGUAGE'
  language: Language
}

const toggleLanguage = (language: Language): ToggleLanguageAction => ({
  type: 'TOGGLE_LANGUAGE',
  language
})

export type CloseToolbarAction = {
  type: 'CLOSE_TOOLBAR'
}

const closeToolbar = (): CloseToolbarAction => ({
  type: 'CLOSE_TOOLBAR'
})

export type ToggleInfoPopupAction = {
  type: 'TOGGLE_INFOPOPUP'
}

const toggleInfoPopup = (): ToggleInfoPopupAction => ({
  type: 'TOGGLE_INFOPOPUP'
})

export type ToggleIntroPopupAction = {
  type: 'TOGGLE_INTROPOPUP'
}

const toggleIntroPopup = (): ToggleIntroPopupAction => ({
  type: 'TOGGLE_INTROPOPUP'
})

export type ToggleNotificationsAction = {
  type: 'TOGGLE_NOTIFICATIONS'
}

const toggleNotifications = (): ToggleNotificationsAction => ({
  type: 'TOGGLE_NOTIFICATIONS'
})

export type MarkNotificationsReadAction = {
  type: 'MARK_NOTIFICATIONS_READ'
}

const markNotificationsRead = (): MarkNotificationsReadAction => ({
  type: 'MARK_NOTIFICATIONS_READ'
})

export type ToggleCoverAction = {
  type: 'TOGGLE_COVER'
}

const toggleCover = (): ToggleCoverAction => ({
  type: 'TOGGLE_COVER'
})

export type UpdateSearchQueryAction = {
  type: 'UPDATE_SEARCH_QUERY'
  searchQuery: string
}
const updateSearchQuery = (searchQuery: string): UpdateSearchQueryAction => ({
  type: 'UPDATE_SEARCH_QUERY',
  searchQuery
})

// ERRORS

export type ToggleSatelliteViewAction = {
  type: 'TOGGLE_SATELLITE_VIEW'
}

const toggleSatelliteView = (): ToggleSatelliteViewAction => ({
  type: 'TOGGLE_SATELLITE_VIEW'
})

const actions = {
  fetchDomain,
  fetchError,
  updateDomain,
  updateHighlighted,
  updateSelected,
  clearFilter,
  toggleAssociations,
  toggleShapes,
  setLoading,
  setNotLoading,
  setInitialCategories,
  setInitialShapes,
  updateTimeRange,
  updateDimensions,
  updateNarrative,
  updateNarrativeStepIdx,
  updateSource,
  updateColoringSet,
  updateTicks,
  toggleSites,
  toggleFetchingDomain,
  toggleLanguage,
  closeToolbar,
  toggleInfoPopup,
  toggleIntroPopup,
  toggleNotifications,
  markNotificationsRead,
  toggleCover,
  updateSearchQuery,
  toggleSatelliteView
}

export default actions

export type Actions = typeof actions

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
  | UpdateDomainAction
  | UpdateHighlightedAction
  | UpdateNarrativeAction
  | UpdateNarrativeStepIdxAction
  | UpdateSearchQueryAction
  | UpdateSelectedAction
  | UpdateSourceAction
  | UpdateTicksAction
  | UpdateTimeRangeAction
