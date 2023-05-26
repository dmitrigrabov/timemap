import { z } from 'zod'

const sourceModel = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  paths: z.array(z.string()),
  type: z.string(),
  affil_s: z.array(z.string()),
  url: z.string(),
  description: z.string(),
  parent: z.string(),
  author: z.string(),
  date: z.string(),
  notes: z.string()
})

export type SourceModel = z.infer<typeof sourceModel>

export const sourcesModel = z.array(sourceModel)
export type SourcesModel = z.infer<typeof sourcesModel>

export const sourcesMap = z.record(z.string(), sourceModel)
export type SourcesMap = z.infer<typeof sourcesMap>
