import { marked } from 'marked'
import PanelTree from 'components/controls/atoms/PanelTree'

const CategoriesListPanel = ({
  categories,
  activeCategories,
  onCategoryFilter,
  language,
  title,
  description
}) => (
  <div className="react-innertabpanel">
    <h2>{title}</h2>
    <p
      dangerouslySetInnerHTML={{
        __html: marked(description)
      }}
    />
    <PanelTree
      data={categories}
      activeValues={activeCategories}
      onSelect={onCategoryFilter}
      type="CATEGORY"
    />
  </div>
)

export default CategoriesListPanel
