import Card from 'components/atoms/NarrativeCard'
import Adjust from 'components/atoms/NarrativeAdjust'
import Close from 'components/atoms/NarrativeClose'

const NarrativeControls = ({ narrative, methods }) => {
  if (!narrative) {
    return null
  }

  const { current, steps } = narrative
  const prevExists = current !== 0
  const nextExists = current < steps.length - 1

  return (
    <>
      <Card narrative={narrative} />
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
        onClickHandler={() => methods.onSelectNarrative(null)}
        closeMsg="-- exit from narrative --"
      />
    </>
  )
}

export default NarrativeControls
