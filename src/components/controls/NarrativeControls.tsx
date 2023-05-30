import Card from 'components/controls/atoms/NarrativeCard'
import Adjust from 'components/controls/atoms/NarrativeAdjust'
import Close from 'components/controls/atoms/NarrativeClose'
import { Narrative } from 'store/types'
import { FC } from 'react'

type NarrativeControlsMethods = {
  onNext: () => void
  onPrev: () => void
  onSelectNarrative: (narrative: Narrative | undefined) => void
}

type NarrativeControlsProps = {
  narrative: Narrative
  methods: NarrativeControlsMethods
}

const NarrativeControls: FC<NarrativeControlsProps> = ({
  narrative,
  methods
}) => {
  if (!narrative) {
    return null
  }

  const { current, steps } = narrative
  const prevExists = current !== 0
  const nextExists = current < steps.length - 1

  return (
    <>
      <Card /* narrative={narrative} pulling in from Redux*/ />
      <Adjust
        isDisabled={!prevExists}
        direction="left"
        onClickHandler={methods.onPrev}
      />
      <Adjust
        isDisabled={!nextExists}
        direction="right"
        onClickHandler={methods.onNext}
      />
      <Close
        onClickHandler={() => methods.onSelectNarrative(undefined)}
        closeMsg="-- exit from narrative --"
      />
    </>
  )
}

export default NarrativeControls
