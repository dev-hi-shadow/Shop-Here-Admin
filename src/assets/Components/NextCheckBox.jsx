/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Checkbox, cn } from "@nextui-org/react";

const NextCheckBox = ({
  onChange = () => console.log("please provide onChange"),
  value,
  onBlur = () => console.log("please provide handleBlur"),
  name = "",
  label = "",
  variant = "faded",
  isRequired = true,
  touched = {},
  errors = {},
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  color = "primary",
}) => {
  return (
    <div>
      <Checkbox
        size="sm"
        onBlur={onBlur}
        name={name}
        isInvalid={isInvalid || (touched[name] && errors[name])}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        variant={variant}
        color={color}
        isRequired={isRequired}
        labe
        isSelected={value}
        onChange={onChange}
      >
        {[label]}
      </Checkbox>
    </div>
  );
};

export default NextCheckBox;
