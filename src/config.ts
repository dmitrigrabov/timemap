export const initialConfig = {
  store: {
    app: {
      map: {
        anchor: [46.444431, 32.059769],
        startZoom: 6,
      },
      timeline: {
        range: ["2022-02-23T12:00:00.000Z", "2023-05-01T20:48:00.207Z"],
        rangeLimits: ["2022-02-01T01:00:00.000Z", "2023-05-01T20:48:00.207Z"],
      },
    },
    ui: {
      card: {
        layout: {
          template: "sourced",
        },
      },
      tiles: {
        current: "cl2xts14f000414t4geqv53r5",
        default: "cl2xts14f000414t4geqv53r5",
      },
    },
    features: {
      COLOR_BY_ASSOCIATION: true,
      USE_ASSOCIATIONS: true,
      USE_FULLSCREEN: true,
      USE_SOURCES: true,
      USE_COVER: false,
      GRAPH_NONLOCATED: false,
      HIGHLIGHT_GROUPS: false,
    },
  },
};

export const fastRefresh = true;
export const dateFormat = "DD/MM/YYYY";
export const timeFormat = "hh:mm";
