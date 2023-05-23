import { combineReducers } from 'redux'

import domain from 'reducers/domain'
import app from 'reducers/app'
import ui from 'reducers/ui'
import features from 'reducers/features'

export default combineReducers({
  app,
  domain,
  ui,
  features
})
