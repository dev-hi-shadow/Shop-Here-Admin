/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";
import { Capitalize } from "../../Helpers";

const NextInput = ({
  className = "",
  onChange = () => console.log("please add onChange"),
  onBlur = () => console.log("please add onBlur"),
  value = "",
  variant = "faded",
  name = "",
  type = "text",
  isRequired = true,
  placeholder = "",
  touched = {},
  errors = {},
  startContent = "",
  endContent = "",
  helperText = "",
  ...rest
}) => {
  return (
    <Input
      className={`my-1 ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      variant={variant}
      name={name}
      startContent={startContent}
      endContent={endContent}
      type={type}
      helperText={helperText}
      isRequired={isRequired || true}
      placeholder={placeholder || Capitalize(name.split("_").join(" "))}
      isInvalid={touched[name] && errors[name]}
      errorMessage={touched[name] && errors[name]}
      {...rest}
    />
  );
};

export default NextInput;
