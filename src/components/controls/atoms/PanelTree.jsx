import Checkbox from 'components/controls/atoms/Checkbox'

const PanelTree = ({ data, activeValues, onSelect, type }) => {
  // If the parent panel is of type 'CATEGORY': filter on title. If panel is 'SHAPE': filter on id
  const onSelectionType = type === 'CATEGORY' ? 'title' : 'id'
  return (
    <div>
      {data.map(val => {
        return (
          <li
            key={val.title.replace(/ /g, '_')}
            className="filter-filter active"
            style={{ marginLeft: '20px' }}
          >
            <Checkbox
              label={val.title}
              isActive={activeValues.includes(val[onSelectionType])}
              onClickCheckbox={() => onSelect(val[onSelectionType])}
              styleProps={val.styles}
            />
          </li>
        )
      })}
    </div>
  )
}

export default PanelTree
