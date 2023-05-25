import Checkbox from 'components/atoms/Checkbox'
import { marked } from 'marked'
import {
  aggregateFilterPaths,
  getFilterIdxFromColorSet,
  getPathLeaf
} from 'common/utilities'
import { FC } from 'react'
import { ColoringSet, FilterAssociation, Language } from 'store/types'

/** recursively get an array of node keys to toggle */
function getFiltersToToggle(filter, activeFilters) {
  const [key, children] = filter
  // base case: no children to recurse through
  // TODO commented out because it should always evaluate to false and not run
  // if (children === {}) return [key];

  const turningOff = activeFilters.includes(key)
  const childKeys = Object.entries(children)
    .flatMap(filter => getFiltersToToggle(filter, activeFilters))
    .filter(child => activeFilters.includes(child) === turningOff)

  childKeys.push(key)

  return childKeys
}

type FilterListPanelProps = {
  filters: FilterAssociation[]
  coloringSet: ColoringSet
  language: Language
  activeFilters: string[]
  onSelectFilter: (key: string, matchingKeys: string[]) => void
  title: string
  description: string
  filterColors: string[]
}

const FilterListPanel: FC<FilterListPanelProps> = ({
  filters,
  activeFilters,
  onSelectFilter,
  language,
  coloringSet,
  filterColors,
  title,
  description
}) => {
  function createNodeComponent(filter, depth) {
    const [key, children] = filter
    const pathLeaf = getPathLeaf(key)
    const matchingKeys = getFiltersToToggle(filter, activeFilters)
    const idxFromColorSet = getFilterIdxFromColorSet(key, coloringSet)
    const assignedColor =
      idxFromColorSet !== -1 && activeFilters.includes(key)
        ? filterColors[idxFromColorSet]
        : ''

    const styles = {
      color: assignedColor,
      marginLeft: `${depth * 20}px`
    }

    return (
      <li
        key={pathLeaf.replace(/ /g, '_')}
        className="filter-filter"
        style={{ ...styles }}
      >
        <Checkbox
          label={pathLeaf}
          isActive={activeFilters.includes(key)}
          onClickCheckbox={() => onSelectFilter(key, matchingKeys)}
          color={assignedColor}
        />
        {Object.keys(children).length > 0 ? (
          <ul>
            {Object.entries(children).map(filter =>
              createNodeComponent(filter, depth + 1)
            )}
          </ul>
        ) : null}
      </li>
    )
  }

  function renderTree(filters) {
    const aggregatedFilterPaths = aggregateFilterPaths(filters)

    return (
      <div>
        {Object.entries(aggregatedFilterPaths).map(filter =>
          createNodeComponent(filter, 1)
        )}
      </div>
    )
  }

  return (
    <div className="react-innertabpanel">
      <h2>{title}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: marked(description)
        }}
      />
      {renderTree(filters)}
    </div>
  )
}

export default FilterListPanel
