import { z } from 'zod'

const regionModel = z.object({
  name: z.string(),
  items: z.array(z.string())
})

export type RegionModel = z.infer<typeof regionModel>

export const regionsModel = z.array(regionModel)
export type RegionsModel = z.infer<typeof regionsModel>
