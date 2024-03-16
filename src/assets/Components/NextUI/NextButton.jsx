/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
const NextButton = ({
  isLoading = false,
  color,
  varient,
  isDisabled,
  isIconOnly,
  StartContent,
  StartContentAlt,
  StartContentIsImage,
  StartContentSrc,
  EndContent,
  EndContentAlt,
  EndContentIsImage,
  EndContentSrc,
  buttonText,
  type,
  className="",
  ...rest
}) => {
  return (
    <div>
      <Button
        color={color}
        className={className}
        variant={varient}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isIconOnly={isIconOnly}
        startContent={
          !StartContentIsImage ? (
            [StartContent]
          ) : (
            <img
              aria-label="image-country-idd"
              aria-labelledby="image-country-idd"
              className="rounded-full w-3 h-3"
              alt={[StartContentAlt]}
              src={[StartContentSrc]}
            />
          )
        }
        endContent={
          !EndContentIsImage ? (
            [EndContent]
          ) : (
            <img
              aria-label="image-country-idd"
              aria-labelledby="image-country-idd"
              className="rounded-full w-3 h-3"
              alt={[EndContentAlt]}
              src={[EndContentSrc]}
            />
          )
        }
        type={type || "button"}
        {...rest}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default NextButton;
