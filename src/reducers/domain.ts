import initial from 'store/initial'
import { validateDomain } from 'reducers/validate/validators'
import { DomainState } from 'store/types'
import { ActionTypes, UpdateDomainAction } from 'actions'

function updateDomain(domainState: DomainState, action: UpdateDomainAction) {
  return {
    ...domainState,
    ...validateDomain(action.payload.domain, action.payload.features)
  }
}

const markNotificationsRead = (domainState: DomainState) => ({
  ...domainState,
  notifications: domainState.notifications.map(notification => ({
    ...notification,
    isRead: true
  }))
})

const initialDomain: DomainState = initial.domain

function domain(domainState = initialDomain, action: ActionTypes) {
  switch (action.type) {
    case 'UPDATE_DOMAIN':
      return updateDomain(domainState, action)
    case 'MARK_NOTIFICATIONS_READ':
      return markNotificationsRead(domainState)
    default:
      return domainState
  }
}

export default domain
