/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
const NextButton = ({
  isLoading = false,
  color = "primary",
  varient = "flat",
  isDisabled,
  isIconOnly,
  StartContent,
  EndContent,
  buttonText,
  type,
  onClick = () => console.log("please provide onClick functions"),
  className = "",
  ...rest
}) => {
  return (
    <div>
      <Button
        onPress={onClick}
        color={color}
        className={"h-10 min-h-10 " + className}
        variant={varient}
        isLoading={isLoading}
        isDisabled={isDisabled}
        isIconOnly={isIconOnly}
        startContent={StartContent}
        endContent={EndContent}
        type={type || "button"}
        {...rest}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default NextButton;
