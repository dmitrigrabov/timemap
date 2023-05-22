export type ZoomLevel = {
  label: string;
  duration: number;
};

export type Dimensions = {
  ticks: number;
  height: number;
  width: number;
  marginLeft: number;
  marginTop: number;
  marginBottom: number;
  contentHeight: number;
  width_controls: number;
};

export type Timeline = {
  dimensions: Dimensions;
  range: [Date, Date];
  rangeLimits: [Date, Date];
  zoomLevels: ZoomLevel[];
};

export type Cluster = {
  radius: number;
  minZoom: number;
  maxZoom: number;
};

export type Views = {
  events: boolean;
  routes: boolean;
  sites: boolean;
};

export type Associations = {
  coloringSet: unknown[];
  filters: unknown[];
  narrative: unknown;
  categories: unknown[];
  views: Views;
};

export type Errors = {
  source: boolean;
};

export type Flags = {
  isFetchingDomain: boolean;
  isFetchingSources: boolean;
  isCover: boolean;
  isCardstack: boolean;
  isInfopopup: boolean;
  isIntropopup: boolean;
  isShowingSites: boolean;
};

export type Cover = {
  title: string;
  description: string;
  exploreButton: string;
};

export type Category = {
  icon: string;
  label: string;
  title: string;
  description: string;
};

export type Categories = {
  default: Category;
};

export type Panels = {
  categories: Categories;
  filters: Category;
  narratives: Category;
  shapes: Category;
};

export type Toolbar = {
  panels: Panels;
};

export type Map = {
  anchor: [number, number];
  startZoom: number;
};

export type App = {
  debug: boolean;
  errors: Errors;
  highlighted: unknown;
  selected: unknown[];
  source: unknown;
  associations: Associations;
  shapes: unknown[];
  isMobile: boolean;
  language: "en-US";
  cluster: Cluster;
  timeline: Timeline;
  flags: Flags;
  cover: Cover;
  toolbar: Toolbar;
  loading: boolean;
  map: Map;
};

export type Domain = {
  events: unknown[];
  categories: unknown[];
  associations: unknown[];
  sources: unknown;
  sites: unknown[];
  shapes: unknown[];
  regions: unknown[];
  notifications: unknown[];
};

export type Titles = {
  current: string;
  default: string;
};

export type Narratives = {
  opacity: number;
  stroke: string;
  strokeWidth: number;
};

export type Style = {
  categories: {
    default: string;
  };
  narratives: {
    default: Narratives;
  };
  regions: {
    default: Narratives;
  };
  clusters: {
    radial: false;
  };
};

export type Card = {
  layout: {
    template: string;
  };
};

export type Coloring = {
  maxNumOfColors: number;
  colors: string[];
};

export type Dom = {
  timeline: string;
  timeslider: string;
  map: string;
};

export type Ui = {
  tiles: Titles;
  style: Style;
  card: Card;
  coloring: Coloring;
  dom: Dom;
  eventRadius: number;
};

export type Features = {
  USE_COVER: boolean;
  USE_ASSOCIATIONS: boolean;
  USE_SITES: boolean;
  USE_SOURCES: boolean;
  USE_REGIONS: boolean;
  GRAPH_NONLOCATED: boolean;
  HIGHLIGHT_GROUPS: boolean;
};

export type AppState = {
  domain: Domain;
  app: App;
  ui: Ui;
  features: Features;
};
