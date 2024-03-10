/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import { Capitalize } from "../Helpers";

const MyDatePicker = DatePicker.generatePicker(momentGenerateConfig);

const CustomDatePicker = ({
  onChange = () => {
    console.log("Missing Prop OnChange");
  },
  onBlur = () => {
    console.log("Missing Prop OnChange");
  },
  value = "",
  errors = {},
  touched = {},
  name = "",
  className = "",
  placeholder = "",
  type = "",
  ...rest
}) => {
  return (
    <>
      <div
        className="group flex flex-col w-full my-1 is-filled"
        data-slot="base"
        data-filled="true"
        data-filled-within="true"
        data-required="true"
        data-has-value="true"
      >
        <div data-slot="main-wrapper" className="h-full">
          <div
            data-slot="input-wrapper"
            className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 border-medium border-default-200 data-[hover=true]:border-default-400 group-data-[focus=true]:border-default-foreground min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 transition-colors motion-reduce:transition-none h-14 py-2 is-filled"
            style={{ cursor: "text" }}
          >
            <div
              data-slot="inner-wrapper"
              className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end"
            >
              <MyDatePicker
                data-slot="input"
                className={`my-1 ${className} w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small is-filled`}
                aria-label="Username"
                aria-required="true"
                id="react-aria3372671800-:r15:"
                data-filled="true"
                data-filled-within="true"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                type={type}
                placeholder={
                  placeholder || Capitalize(name.split("_").join(" "))
                }
                isInvalid={touched[name] && errors[name]}
                errorMessage={touched[name] && errors[name]}
                {...rest}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomDatePicker;
