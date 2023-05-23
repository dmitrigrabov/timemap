import initial from 'store/initial'
import { validateDomain } from 'reducers/validate/validators'
import { DomainState } from 'store/types'

function updateDomain(domainState: DomainState, action) {
  return {
    ...domainState,
    ...validateDomain(action.payload.domain, action.payload.features)
  }
}

function markNotificationsRead(domainState: DomainState, action) {
  return {
    ...domainState,
    notifications: domainState.notifications.map(n => ({
      ...n,
      isRead: true
    }))
  }
}

function domain(domainState = initial.domain, action) {
  switch (action.type) {
    case 'UPDATE_DOMAIN':
      return updateDomain(domainState, action)
    case 'MARK_NOTIFICATIONS_READ':
      return markNotificationsRead(domainState, action)
    default:
      return domainState
  }
}

export default domain
