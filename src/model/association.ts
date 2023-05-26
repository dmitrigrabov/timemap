import { z } from 'zod'

export const associationModel = z.object({
  id: z.string(),
  title: z.string(),
  desc: z.string(),
  mode: z.union([
    z.literal('CATEGORY'),
    z.literal('NARRATIVE'),
    z.literal('FILTER')
  ]),
  filter_paths: z.array(z.string())
})

export type AssociationModel = z.infer<typeof associationModel>

export const associationsModel = z.array(associationModel)
export type AssociationsModel = z.infer<typeof associationsModel>
