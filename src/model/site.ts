import { z } from 'zod'

const siteModel = z.object({
  id: z.string(),
  description: z.string(),
  site: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  enabled: z.string()
})

export type SiteModel = z.infer<typeof siteModel>

export const sitesModel = z.array(siteModel)
export type SitesModel = z.infer<typeof sitesModel>
