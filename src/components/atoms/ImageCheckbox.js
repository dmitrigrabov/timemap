import React from "react";
import { DEFAULT_CHECKBOX_COLOR } from "../../common/constants";

const Checkbox = ({ asset, isActive, onClickCheckbox, color, styleProps }) => {
  const checkboxColor = color ? color : DEFAULT_CHECKBOX_COLOR;
  const baseStyles = {
    checkboxStyles: {
      background: isActive ? checkboxColor : "none",
      border: `1px solid ${checkboxColor}`,
    },
  };
  const containerStyles = styleProps ? styleProps.containerStyles : {};
  const checkboxStyles = styleProps
    ? styleProps.checkboxStyles
    : baseStyles.checkboxStyles;
  return (
    <div className={isActive ? "image-checkbox active" : "image-checkbox"}>
      <img src={asset} alt="related asset" />
      <button onClick={onClickCheckbox}>
        <div className="border" style={containerStyles}>
          <div className="checkbox" style={checkboxStyles} />
        </div>
      </button>
    </div>
  );
};

export default Checkbox;
