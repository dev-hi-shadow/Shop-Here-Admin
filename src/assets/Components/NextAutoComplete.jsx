/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Capitalize } from "../Helpers";
const NextAutoComplete = ({
  name = "",
  placeholder = "",
  ariaLabel = "",
  ariaLabelledby = "",
  childAriaLabel = "",
  childAriaLabelledby = "",
  className = "",
  variant = "",
  onBlur = () => {
    console.log("please provide handleBlur");
  },
  onSelectionChange = () => {
    console.log("please provide onSelectionChange");
  },
  classNames = {},
  touched = {},
  errors = {},
  selectedKey = "",
  startContent = "",
  startContentIsImage = false,
  startContentSrc = "",
  startContentAlt = "",
  endContent = "",
  endContentIsImage = false,
  endContentSrc = "",
  endContentAlt = "",
  childArray = "",
  childKey = "",
  childTextValueField = "",
  childValue = "",
  childStartContent = "",
  childEndContent = "",
  childValueShow = "",
  childStartContentIsImage = false,
  childStartContentAlt = "",
  childStartContentSrc = "",
  childEndContentIsImage = false,
  childEndContentAlt = "",
  childEndContentSrc,
}) => {
  const myFilter = (textValue, inputValue) => {
     if (inputValue.length === 0) {
      return true;
    }
    textValue = textValue.toString()?.normalize("NFC")?.toLocaleLowerCase();
    inputValue = inputValue.toString()?.normalize("NFC")?.toLocaleLowerCase();
    return textValue.startsWith(inputValue);
  };
  return (
    <Autocomplete
      variant={variant}
      defaultFilter={myFilter}
       placeholder={placeholder || Capitalize(name.split("_").join(" ") || name)}
      classNames={classNames}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`${className}`}
      onSelectionChange={onSelectionChange}
      onBlur={onBlur}
      selectedKey={selectedKey}
      isInvalid={touched[name] && errors[name]}
      errorMessage={touched[name] && errors[name]}
      startContent={
        !startContentIsImage ? (
          [startContent]
        ) : (
          <img
            className="rounded-full w-3 h-3"
            alt={[startContentAlt]}
            src={[startContentSrc]}
          />
        )
      }
      endContent={
        !endContentIsImage ? (
          [endContent]
        ) : (
          <img
            className="rounded-full w-3 h-3"
            alt={[endContentAlt]}
            src={[endContentSrc]}
          />
        )
      }
    >
      {childArray?.map((item, index) => (
        <AutocompleteItem
          key={item?.[childKey] || item}
          aria-label={`${[childAriaLabel]}-${index}`}
          aria-labelledby={`${[childAriaLabelledby]}-${index}`}
          textValue={item?.[childTextValueField] || item}
          value={item?.[childValue] || item}
          startContent={
            !childStartContentIsImage ? (
              [childStartContent]
            ) : (
              <img
                aria-label="image-country-idd"
                aria-labelledby="image-country-idd"
                className="rounded-full w-3 h-3"
                alt={item?.[childStartContentAlt] || [childStartContentAlt]}
                src={item?.[childStartContentSrc] || [childStartContentSrc]}
              />
            )
          }
          endContent={
            !childEndContentIsImage ? (
              childEndContent
            ) : (
              <img
                className="rounded-full w-3 h-3"
                alt={[childEndContentAlt]}
                src={[childEndContentSrc]}
              />
            )
          }
        >
        {item?.[childValueShow] || item}
          {/* {item.name} */}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default NextAutoComplete;
