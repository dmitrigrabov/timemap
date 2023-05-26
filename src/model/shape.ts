import { z } from 'zod'

const shapeModel = z.object({
  id: z.string(),
  title: z.string(),
  shape: z.string(),
  colour: z.string()
})

export type ShapeModel = z.infer<typeof shapeModel>

export const shapesModel = z.array(shapeModel)
export type ShapesModel = z.infer<typeof shapesModel>
