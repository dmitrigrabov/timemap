import { z } from 'zod'

const eventModel = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  time_precision: z.string(),
  location: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  x: z.string(),
  y: z.string(),
  z: z.string(),
  type: z.string(),
  category: z.string(),
  category_full: z.string(),
  associations: z.array(z.string()),
  sources: z.array(z.string()),
  comments: z.string(),
  time_display: z.string(),
  narrative__stepStyles: z.array(z.unknown()),
  shape: z.string(),
  colour: z.string()
})

export type EventModel = z.infer<typeof eventModel>

export const eventsModel = z.array(eventModel)
export type EventsModel = z.infer<typeof eventsModel>
