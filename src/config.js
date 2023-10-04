export const config = {
  title: 'IPHR',
  display_title: 'IPHR',
  SERVER_ROOT: 'https://data-helper-server.herokuapp.com',
  EVENTS_EXT: '/api/timemap_data/export_events/deeprows',
  ASSOCIATIONS_EXT: '/api/timemap_data/export_associations/deeprows',
  SOURCES_EXT: '/api/timemap_data/export_sources/deepids',
  SITES_EXT: '',
  SHAPES_EXT: '',
  DATE_FMT: 'DD/MM/YYYY',
  TIME_FMT: 'hh:mm',
  MAPBOX_TOKEN:
    'pk.eyJ1IjoiZG1pdHJpZyIsImEiOiJjbDJjYnpreTIwY28yM2dudWQ0NGlxejl6In0.qzCHDJ0dRBn6BXy4fkqTIg',
  store: {
    app: {
      map: {
        anchor: [46.444431, 32.059769],
        bounds: [[42, 22], [53, 40]],
        maxBounds: [[40, 20], [55, 42]],
        startZoom: 6
      },
      timeline: {
        range: [new Date(2022, 1, 23, 12), new Date()],
        rangeLimits: [new Date(2022, 1, 1, 1), new Date()]
      }
    },
    ui: {
      card: {
        layout: {
          template: 'sourced'
        }
      },
      tiles: {
        current: 'cl2xts14f000414t4geqv53r5',
        default: 'cl2xts14f000414t4geqv53r5'
      }
    },
    features: {
      COLOR_BY_ASSOCIATION: true,
      USE_ASSOCIATIONS: true,
      USE_FULLSCREEN: true,
      USE_SOURCES: true,
      USE_COVER: false,
      GRAPH_NONLOCATED: false,
      HIGHLIGHT_GROUPS: false
    }
  }
}
