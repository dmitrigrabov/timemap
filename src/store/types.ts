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

export type Media = {
  src: string
  title: null
  type: string
}

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

export type Narrative = {
  id: string
  label: string
  description: string
  withLines: boolean
  steps: Event[]
  current: number
}

export type AssociationsObject = {
  coloringSet: string[][]
  filters: FilterAssociation[]
  narrative: Narrative
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
  type: 'error'
  message: string
  isRead?: boolean
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
  intro: string[]
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
  shape: Shape | undefined
  colour: string
}

export type EventPostValidation = {
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
  sources: string[]
  comments: string
  time_display: string

  narrative__stepStyles: unknown[]
  shape: Shape | undefined
  colour: string
}

export type DomainExternal = {
  events: unknown[]
  associations: unknown[]
  sources: unknown
  sites: unknown[]
  shapes: unknown[]
  regions: unknown[]
  notifications: Notification[]
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
  notifications: Notification[]
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
  CUSTOM_EVENT_FIELDS: unknown[]
}

export type StoreState = {
  domain: DomainState
  app: AppState
  ui: UiState
  features: FeaturesState
}

export type ColoringSet = string[][]

export type ContentKind = 'date' | 'text' | 'line-break' | 'text' | 'media'

export type ContentLink = {
  text: string
  href: string
}

export type ContentField =
  | ContentFieldDate
  | ContentFieldText
  | ContentFieldLineBreak
  | ContentFieldMedia
  | ContentFieldLine
  | ContentFieldItem
  | ContentFieldMarkdown
  | ContentFieldTag
  | ContentFieldButton
  | ContentFieldLinks
  | ContentFieldList

export type ContentFieldList = {
  kind: 'list'
  title: string
  value: {
    title: string
    value: string
  }[]
}

export type ContentFieldLinks = {
  kind: 'links'
  title: string
  value: ContentLink[]
}

export type ContentFieldButton = {
  kind: 'button'
  title: string
  value: unknown[]
}

export type ContentFieldTag = {
  kind: 'tag'
  align: 'start' | 'end'
  value: string
}

export type ContentFieldMarkdown = {
  kind: 'markdown'
  title: string
  value: string
}

export type ContentFieldItem = {
  kind: 'item'
}

export type ContentFieldLine = {
  kind: 'line'
}

export type ContentFieldDate = {
  kind: 'date'
  title: string
  value: Date | string
}

export type ContentFieldText = {
  kind: 'text'
  title: string
  value: string
  scaleFont?: number
}

export type ContentFieldLineBreak = {
  kind: 'line-break'
  times: number
}

export type ContentFieldMedia = {
  kind: 'media'
  title: string
  value: Media[]
}

export type ContentRow = ContentField[]

export type Content = ContentRow[]

export type GetState = () => StoreState
