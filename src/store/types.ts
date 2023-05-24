export type ZoomLevel = {
  label: string
  duration: number
}

export type Dimensions = {
  ticks: number
  height: number
  width: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  contentHeight: number
  width_controls: number
}

export type TimeRange = [Date, Date] | [Date] | []

export type Timeline = {
  dimensions: Dimensions
  range: TimeRange
  rangeLimits: TimeRange
  zoomLevels: ZoomLevel[]
}

export type Cluster = {
  radius: number
  minZoom: number
  maxZoom: number
}

export type Views = {
  events: boolean
  routes: boolean
  sites: boolean
}

export type AssociationMode = 'CATEGORY' | 'NARRATIVE' | 'FILTER'

export type Association = {
  id: string
  title: string
  desc: string
  filter_paths: string[]
}

export type FilterAssociation = {
  mode: 'FILTER'
} & Association

export type NarrativeAssociation = {
  mode: 'NARRATIVE'
} & Association

export type CategoryAssociation = {
  mode: 'CATEGORY'
} & Association

export type Associations =
  | FilterAssociation
  | NarrativeAssociation
  | CategoryAssociation

export type Narative = {
  id: string
  label: string
  description: string
  withLines: boolean
  steps: Event[]
}

export type AssociationsObject = {
  coloringSet: unknown[]
  filters: FilterAssociation[]
  narrative: Narative
  categories: CategoryAssociation[]
  views: Views
}

export type Errors = {
  source: boolean
}

export type Flags = {
  isFetchingDomain: boolean
  isFetchingSources: boolean
  isCover: boolean
  isCardstack: boolean
  isInfopopup: boolean
  isIntropopup: boolean
  isShowingSites: boolean
}

export type Cover = {
  title: string
  description: string
  exploreButton: string
}

export type Category = {
  icon: string
  label: string
  title: string
  description: string
}

export type Categories = {
  default: Category
}

export type Panels = {
  categories: Categories
  filters: Category
  narratives: Category
  shapes: Category
}

export type Toolbar = {
  panels: Panels
}

export type Map = {
  anchor: [number, number]
  startZoom: number
}

export type Notification = {
  message: string
  type: 'error'
}

export type Language = 'en-US' | 'es-MX'

export type Shape = {
  id: string
  title: string
  shape: string
  colour: string
}

export type AppState = {
  debug: boolean
  errors: Errors
  error?: string
  notifications: Notification[]
  highlighted: unknown
  selected: Event[]
  source: Source
  associations: AssociationsObject
  shapes: string[]
  isMobile: boolean
  language: Language
  cluster: Cluster
  timeline: Timeline
  flags: Flags
  cover: Cover
  toolbar: Toolbar
  loading: boolean
  map?: Map
  searchQuery?: string
  filters: Record<string, unknown[]>
  narrativeState: {
    current: number
  }
}

export type Source = {
  id: string
  title: string
  thumbnail: string
  paths: unknown[]
  type: string
  affil_s: unknown[]
  url: string
  description: string
  parent: string
  author: string
  date: string
  notes: string
}

export type Event = {
  id: string
  description: string
  date: string
  time: string
  time_precision: string
  location: string
  latitude: string
  longitude: string

  x: string
  y: string
  z: string

  type: string
  category: string
  category_full: string
  associations: string[]
  sources: Source[]
  comments: string
  time_display: string

  narrative__stepStyles: unknown[]
  shape: string
  colour: string
}

export type EventEnriched = {
  id: number
  description: string
  date: string
  time: string
  datetime: Date
  time_precision: string
  location: string
  latitude: string
  longitude: string

  x: string
  y: string
  z: string

  type: string
  category: string
  category_full: string
  associations: Associations[]
  sources: Source[]
  comments: string
  time_display: string

  narrative__stepStyles: unknown[]
  shape: string
  colour: string
}

export type Site = {
  id: string
  description: string
  site: string
  latitude: string
  longitude: string
  enabled: string
}

export type DomainState = {
  events: Event[]
  categories: unknown[]
  associations: Associations[]
  sources: unknown
  sites: Site[]
  shapes: unknown[]
  regions: unknown[]
  notifications: unknown[]
}

export type Titles = {
  current: string
  default: string
}

export type Narratives = {
  opacity: number
  stroke: string
  strokeWidth: number
}

export type Style = {
  categories: {
    default: string
  }
  narratives: {
    default: Narratives
  }
  regions: {
    default: Narratives
  }
  clusters: {
    radial: false
  }
}

export type Card = {
  layout: {
    template: string
  }
}

export type Coloring = {
  maxNumOfColors: number
  colors: string[]
}

export type Dom = {
  timeline: string
  timeslider: string
  map: string
}

export type UiState = {
  tiles: Titles
  style: Style
  card: Card
  coloring: Coloring
  dom: Dom
  eventRadius: number
}

export type GraphNonLocated = {
  categories: string[]
}

export type FeaturesState = {
  USE_COVER: boolean
  USE_ASSOCIATIONS: boolean
  USE_SITES: boolean
  USE_SOURCES: boolean
  USE_REGIONS: boolean
  GRAPH_NONLOCATED: GraphNonLocated
  HIGHLIGHT_GROUPS: boolean
  USE_SHAPES: boolean
}

export type StoreState = {
  domain: DomainState
  app: AppState
  ui: UiState
  features: FeaturesState
}

export type GetState = () => StoreState
