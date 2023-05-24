const Sites = ({ sites, projectPoint }) => {
  if (!sites || !sites.length) {
    return null
  }

  return (
    <div className="sites-layer">
      {sites.map(site => {
        const { x, y } = projectPoint([site.latitude, site.longitude])

        return (
          <div
            className="leaflet-tooltip site-label leaflet-zoom-animated leaflet-tooltip-top"
            style={{
              opacity: 1,
              transform: `translate3d(calc(${x}px - 50%), ${y - 25}px, 0px)`
            }}
          >
            {site.site}
          </div>
        )
      })}
    </div>
  )
}

export default Sites
