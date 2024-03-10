/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
const NextAutoComplete = ({
  ariaLabel = "",
  ariaLabelledby = "",
  childAriaLabel = "",
  childAriaLabelledby = "",
  className = "",
  variant = "",
  setFieldValue = "",
  handleBlur = () => {
    console.log("please provide handleBlur");
  },
  onSelectionChange = () => {
    console.log("please provide onSelectionChange");
  },
  classNames = {},
  touched = "",
  errors = "",
  values = "",
  selectedKey = "",
  defaultSelectedKey = "",
  name = "",
  startContent = "",
  startContentIsImage = false,
  startContentSrc = "",
  startContentAlt = "",
  endContent = "",
  endContentIsImage = false,
  endContentSrc = "",
  endContentAlt = "",
  childArray = "",
  child = "",
  childKey = "",
  childTextValueField = "",
  childValue = "",
  childStartContent = "",
  childEndContent = "",
  childValueShow = "",
  childStartContentIsImage = false,
  childIimageSrc = "",
  childImageAlt = "",
  childEndContentIsImage = false,
  childEndContentAlt = "",
  childEndContentSrc,
}) => {
  return (
    <>
      <Autocomplete
        variant={variant}
        classNames={classNames}
        aria-label="select idd country"
        aria-labelledby="select idd country"
        className={`${className}`}
        onSelectionChange={onSelectionChange}
        onBlur={handleBlur}
        selectedKey={selectedKey}
        touched={touched}
        errors={errors}
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
        {childArray.map((item, index) => (
          <AutocompleteItem
            key={item?.[childKey]}
            aria-label={`${[childAriaLabel]}-${index}`}
            aria-labelledby={`${[childAriaLabelledby]}-${index}`}
            textValue={item?.[childTextValueField]}
            value={item?.[childValue]}
            startContent={
              !childStartContentIsImage ? (
                [childStartContent]
              ) : (
                <img
                  aria-label="image-country-idd"
                  aria-labelledby="image-country-idd"
                  className="rounded-full w-3 h-3"
                  alt={[childImageAlt]}
                  src={[childIimageSrc]}
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
            {item?.[childValueShow]}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
};

export default NextAutoComplete;
