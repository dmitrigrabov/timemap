import initial from "store/initial";

import { UPDATE_DOMAIN, MARK_NOTIFICATIONS_READ } from "actions";
import { validateDomain } from "reducers/validate/validators";
import { Domain } from "store/types";

function updateDomain(domainState: Domain, action) {
  return {
    ...domainState,
    ...validateDomain(action.payload.domain, action.payload.features),
  };
}

function markNotificationsRead(domainState: Domain, action) {
  return {
    ...domainState,
    notifications: domainState.notifications.map((n) => ({
      ...n,
      isRead: true,
    })),
  };
}

function domain(domainState = initial.domain, action) {
  switch (action.type) {
    case UPDATE_DOMAIN:
      return updateDomain(domainState, action);
    case MARK_NOTIFICATIONS_READ:
      return markNotificationsRead(domainState, action);
    default:
      return domainState;
  }
}

export default domain;
