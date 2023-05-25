import SitesIcon from 'components/atoms/SitesIcon'
import CoverIcon from 'components/atoms/CoverIcon'
import InfoIcon from 'components/atoms/InfoIcon'
import { FC } from 'react'
import { FeaturesState } from 'store/types'

type BottomActionsProps = {
  features: FeaturesState
}

const BottomActions: FC<BottomActionsProps> = props => (
  <div className="bottom-actions">
    <div className="bottom-action-block">
      {props.features.USE_SITES ? (
        <SitesIcon
          isActive={props.sites.enabled}
          onClickHandler={props.sites.toggle}
        />
      ) : null}
    </div>
    ,
    <div className="botttom-action-block">
      <InfoIcon
        isActive={props.info.enabled}
        onClickHandler={props.info.toggle}
      />
    </div>
    ,
    <div className="botttom-action-block">
      {props.features.USE_COVER ? (
        <CoverIcon onClickHandler={props.cover.toggle} />
      ) : null}
    </div>
  </div>
)

export default BottomActions
