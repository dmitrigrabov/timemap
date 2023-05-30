// import createEventSchema from 'reducers/validate/eventSchema'
import { calcDatetime } from 'common/utilities'
import { EventPostValidation, DomainExternal, FeaturesState } from 'store/types'
import { validate } from 'lib/validate/validate'
import { eventsModel } from 'model/event'
import { sitesModel } from 'model/site'
import { AssociationsModel, associationsModel } from 'model/association'
import { sourcesMap } from 'model/source'
import { regionsModel } from 'model/region'
import { ShapeModel, ShapesModel, shapesModel } from 'model/shape'
import { Notification } from 'store/types'

type NotificationWithId = Notification & { id: string }

/*
 * Create an error notification object
 * Types: ['error', 'warning', 'good', 'neural']
 */
const makeError = (
  type: string,
  id: string,
  message: string
): NotificationWithId => ({
  type: 'error',
  id,
  message: `${type} ${id}: ${message}`
})

// const isValidDate = (date: unknown) => {
//   return date instanceof Date && !isNaN(date)
// }

type Duplicate = {
  id: string
  error: NotificationWithId
}

function findDuplicateAssociations(
  associations: AssociationsModel | undefined
) {
  const seenSet = new Set<string>([])
  const duplicates: Duplicate[] = []

  associations?.forEach(association => {
    if (seenSet.has(association.id)) {
      duplicates.push({
        id: association.id,
        error: makeError(
          'Association',
          association.id,
          'association was found more than once. Ignoring duplicate.'
        )
      })
    } else {
      seenSet.add(association.id)
    }
  })
  return duplicates
}

// function validateArrayItem(item: unknown, domainKey: string, schema) {
//   const result = Joi.validate(item, schema)
//   if (result.error !== null) {
//     const id = item.id || '-'
//     const domainStr = capitalize(domainKey)
//     const error = makeError(domainStr, id, result.error.message)

//     discardedDomain[domainKey].push(Object.assign(item, { error }))
//   } else {
//     sanitizedDomain[domainKey].push(item)
//   }
// }

// function validateArray(items, domainKey, schema) {
//   items.forEach(item => {
//     if (domainKey === 'events' && item.date === '' && item.time === '') {
//       return
//     }
//     validateArrayItem(item, domainKey, schema)
//   })
// }

// function validateObject(obj, domainKey, itemSchema) {
//   Object.keys(obj).forEach(key => {
//     if (key === '') {
//       return
//     }
//     const vl = obj[key]
//     const result = Joi.validate(vl, itemSchema)
//     if (result.error !== null) {
//       const id = vl.id || '-'
//       const domainStr = capitalize(domainKey)
//       discardedDomain[domainKey].push({
//         ...vl,
//         error: makeError(domainStr, id, result.error.message)
//       })
//     } else {
//       sanitizedDomain[domainKey][key] = vl
//     }
//   })
// }

/*
 * Validate domain schema
 */
export function validateDomain(
  domain: DomainExternal | undefined,
  features: FeaturesState
) {
  const sanitizedDomain: DomainExternal = {
    events: [],
    sites: [],
    associations: [],
    sources: {},
    regions: [],
    shapes: [],
    notifications: domain ? domain.notifications : []
  }

  if (domain === undefined) {
    return sanitizedDomain
  }

  // const discardedDomain = {
  //   events: [],
  //   sites: [],
  //   associations: [],
  //   sources: [],
  //   regions: [],
  //   shapes: []
  // }

  if (!Array.isArray(features.CUSTOM_EVENT_FIELDS)) {
    features.CUSTOM_EVENT_FIELDS = []
  }

  // const eventSchema = createEventSchema(features.CUSTOM_EVENT_FIELDS)

  const eventsTemp = validate(domain.events, eventsModel)
  const sitesTemp = validate(domain.sites, sitesModel)
  const associationsTemp = validate(domain.associations, associationsModel)
  const sourcesTemp = validate(domain.sources, sourcesMap)
  const regionsTemp = validate(domain.regions, regionsModel)
  const shapesTemp = validate(domain.shapes, shapesModel)

  // NB: [lat, lon] array is best format for projecting into map
  const regionsTemp2 = regionsTemp?.map(region => ({
    name: region.name,
    points: region.items.map(coords => coords.replace(/\s/g, '').split(','))
  }))

  const shapesTemp2 = shapesTemp?.reduce<ShapesModel>((acc, val) => {
    //if (!val.shape) {
    // discardedDomain.shapes.push({
    //   ...val,
    //   error: makeError(
    //     'events',
    //     val.id,
    //     'Invalid event shape. Please specify a shape for this type of event.'
    //   )
    // })
    if (val.shape) {
      acc.push(val)
    }
    return acc
  }, [])

  /* const duplicateAssociations =*/ findDuplicateAssociations(associationsTemp)
  // Duplicated associations
  // if (duplicateAssociations.length > 0) {
  //   sanitizedDomain.notifications.push({
  //     message:
  //       'Associations are required to be unique. Ignoring duplicates for now.',
  //     items: duplicateAssociations,
  //     type: 'error'
  //   })
  // }
  // sanitizedDomain.associations = domain.associations

  // append events with datetime and sort
  const eventsTemp2 = eventsTemp?.reduce<EventPostValidation[]>(
    (acc, event, idx) => {
      // const errorMsg = ''
      const eventId = idx
      // event.associations comes in as a [association.ids...]; convert to actual association objects
      const eventAssociations = event.associations.reduce<AssociationsModel>(
        (associationsAcc, id) => {
          const foundAssociation = associationsTemp?.find(
            association => association.id === id
          )

          if (foundAssociation) {
            associationsAcc.push(foundAssociation)
          }

          return associationsAcc
        },
        []
      )
      let eventShape: ShapeModel | undefined

      if (event.shape) {
        const relatedShapeObj = shapesTemp2?.find(
          shape => shape.id === event.shape
        )
        // errorMsg =
        //   'Failed to find related shape. Please verify shape type for event.'

        if (relatedShapeObj) {
          eventShape = relatedShapeObj
        }
      }
      // if lat, long come in with commas, replace with decimal format
      // event.latitude = event.latitude.replace(',', '.')
      // event.longitude = event.longitude.replace(',', '.')

      const eventDatetime = calcDatetime(event.date, event.time)

      // if (!isValidDate(eventDatetime)) {
      //   errorMsg =
      //     "Invalid date. It's been dropped, as otherwise timemap won't work as expected."
      // }

      // if (errorMsg) {
      //   discardedDomain.events.push({
      //     ...event,
      //     error: makeError('events', event.id, errorMsg)
      //   })
      //   return false
      // }

      acc.push({
        ...event,
        id: eventId,
        associations: eventAssociations,
        datetime: eventDatetime,
        shape: eventShape
      })

      return acc
    },
    []
  )

  eventsTemp2?.sort((a, b) => a.datetime.getTime() - b.datetime.getTime())

  // Message the number of failed items in domain
  // Object.keys(discardedDomain).forEach(disc => {
  //   const len = discardedDomain[disc].length
  //   if (len) {
  //     sanitizedDomain.notifications.push({
  //       message: `${len} invalid ${disc} not displayed.`,
  //       items: discardedDomain[disc],
  //       type: 'error'
  //     })
  //   }
  // })

  return {
    events: eventsTemp2,
    sites: sitesTemp,
    associations: associationsTemp,
    sources: sourcesTemp,
    regions: regionsTemp2,
    shapes: shapesTemp2,
    notifications: sanitizedDomain.notifications
  }
}
