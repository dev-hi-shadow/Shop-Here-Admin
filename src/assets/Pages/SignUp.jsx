import { useFormik } from "formik";
import { SignUpInitialState } from "../Configurations/InitialStates";
import { SignUpSchema } from "../Configurations/YupSchema";
import NextInput from "../Components/NextUI/NextInput";
import { Countries } from "../Helpers/Countries";
import moment from "moment";
import CustomDatePicker from "../Components/DatePicker";
import { IconEye } from "@tabler/icons-react";
import { IconEyeClosed } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import NextAutoComplete from "../Components/NextUI/NextAutoComplete";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import NextButton from "../Components/NextUI/NextButton";
import NextCheckBox from "../Components/NextUI/NextCheckBox";

const SignUp = () => {
  const [typePassword, setTypePassword] = useState(true);
  const [Country, setSelectedCountry] = useState({});
  const [PhoneCountry, setSelectedPhoneCountry] = useState({});
  const handleSignUpSubmit = (values) => {
    console.log("values", values);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    // handleReset,
    setFieldValue,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues: SignUpInitialState,
    validationSchema: SignUpSchema,
    onSubmit: () => handleSignUpSubmit(values),
    onReset: () => resetForm(),
  });
  useEffect(() => {
    const country = Countries.find((item) => item.name === values.phone_start);

    setSelectedCountry(country);
    setSelectedPhoneCountry(country); // Assuming this was the intention
    if (
      country?.currencies?.length === 1 &&
      country?.currencies?.[0] !== values.currencies
    ) {
      setFieldValue("currencies", country?.currencies?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.phone]);

  return (
    <>
      <div className="lg:m-10">
        <form
          onSubmit={handleSubmit}
          className="relative border border-gray-100 space-y-3  rounded-md bg-white p-6 shadow-xl lg:p-10"
        >
          <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Register</h1>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <NextInput
                className=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.first_name}
                variant="bordered"
                name="first_name"
                type="text"
                isRequired
                touched={touched}
                errors={errors}
              />
            </div>
            <div>
              <NextInput
                className=""
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.last_name}
                variant="bordered"
                name="last_name"
                type="text"
                isRequired={true}
                touched={touched}
                errors={errors}
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <NextInput
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
                variant="bordered"
                name="email"
                touched={touched}
                errors={errors}
              />
            </div>
            <div className="grid-cols-3">
              <>
                <NextAutoComplete
                  placeholder="Country IDD"
                  ariaLabel="select idd"
                  ariaLabelledby="select idd "
                  className="py-0 my-0 col-span-1"
                  variant={"underlined"}
                  classNames={{
                    inputWrapper: ["border-0"],
                  }}
                  onSelectionChange={(e) => setFieldValue("phone_start", e)}
                  onBlur={handleBlur}
                  selectedKey={values.phone_start || values.country}
                  touched={touched}
                  errors={errors}
                  startContentIsImage={
                    values.phone_start || values.country ? true : false
                  }
                  startContentSrc={PhoneCountry?.flag}
                  startContentAlt="idd country image"
                  childArray={Countries}
                  childAriaLabel="country-idd"
                  childAriaLabelledby="country-idd"
                  childTextValueField="name"
                  childValue="name"
                  childStartContentIsImage={true}
                  childStartContentSrc="flag"
                  childStartContent="name"
                  childKey="name"
                  childValueShow="name"
                />
                {PhoneCountry?.idd}
              </>
              <NextInput
                className="col-span-2"
                classNames={{
                  inputWrapper: ["ps-1"],
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.phone}
                variant="bordered"
                name="phone"
                type="number"
              />
            </div>
          </div>
          <div className="grid gap-3 grid-cols-4">
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.username}
              variant="bordered"
              name="username"
              touched={touched}
              errors={errors}
            />
            <CustomDatePicker
              onChange={(event) => {
                setFieldValue(
                  "date_of_birth",
                  event ? moment(event).format("DD-MM-YYYY") : null
                );
              }}
              onBlur={handleBlur}
              value={
                values.date_of_birth
                  ? moment(values.date_of_birth, "DD-MM-YYYY")
                  : null
              }
              variant="bordered"
              name="date_of_birth"
              touched={touched}
              errors={errors}
            />
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              variant="bordered"
              name="password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setTypePassword(!typePassword)}
                >
                  {typePassword ? (
                    <IconEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={typePassword ? "password" : "text"}
              touched={touched}
              errors={errors}
            />
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirm_password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setTypePassword(!typePassword)}
                >
                  {typePassword ? (
                    <IconEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IconEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={typePassword ? "password" : "text"}
              variant="bordered"
              name="confirm_password"
              touched={touched}
              errors={errors}
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <NextInput
              className="col-span-2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.address}
              variant="bordered"
              name="address"
              placeholder="Address / Street / Landmark"
              touched={touched}
              errors={errors}
            />
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.city}
              variant="bordered"
              name="city"
              touched={touched}
              errors={errors}
            />
          </div>

          <div className="grid gap-3 grid-cols-4">
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.state}
              variant="bordered"
              name="state"
              touched={touched}
              errors={errors}
            />
            <div className="flex flex-col">
              <NextAutoComplete
                ariaLabel={`select country`}
                ariaLabelledby={`select-country`}
                className="py-0 my-0"
                onSelectionChange={(e) => setFieldValue("country", e)}
                onBlur={handleBlur}
                defaultSelectedKey={values.phone_start}
                selectedKey={values.country || values.phone_start}
                touched={touched}
                errors={errors}
                startContentIsImage={
                  (values.country || values.phone_start) && true
                }
                startContentSrc={Country?.flag}
                placeholder="Country"
                startContentAlt="Country name"
                childArray={Countries}
                childAriaLabel="country-add"
                childAriaLabelledby="country-add"
                childKey="name"
                childTextValueField="name"
                childValue="name"
                childStartContentIsImage={true}
                childStartContentSrc="flag"
                childStartContentAlt="name"
                childValueShow="name"
              />
              <span className="px-1  mt-1 text-gray-600 text-small">
                {values.currencies &&
                  `preffered curruncy : ${values?.currencies?.split("-")[1]} `}
              </span>
            </div>
            <NextInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.postal_code}
              variant="bordered"
              name="postal_code"
              type={"number"}
              touched={touched}
              errors={errors}
            />
            <Dropdown className="my-1">
              <DropdownTrigger>
                <Button variant="bordered" className="  ">
                  {values.gender}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="gender"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[values.gender]}
                onSelectionChange={(e) => setFieldValue("gender", e)}
              >
                <DropdownItem key="Male">Male</DropdownItem>
                <DropdownItem key="Female">Female</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {!values.currencies && values.country && (
            <div className="grid-cols-2">
              <NextAutoComplete
                childArray={
                  Country?.currencies || [
                    "Cambodian riel - ៛",
                    "United States dollar - $",
                  ]
                }
                placeholder="Please Select Curruncy"
                ariaLabel="curruncy"
                ariaLabelledby="curruncy"
                onSelectionChange={(e) => setFieldValue("curruncy", e)}
                onBlur={handleBlur}
                touched={touched}
                errors={errors}
                startContentIsImage={false}
                selectedKey={values.currency}
                // startContent={values.currency}
                childAriaLabel="currency"
                childAriaLabelledby="currency"
                childKey={null}
              />
            </div>
          )}

          <div className="flex flex-col gap-y-3">
            <NextCheckBox
              value={values.is_primary}
              name="is_primary"
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired={true}
              label="Save as primary address"
            />
            <NextCheckBox
              value={values.terms_conditions}
              name="terms_conditions"
              onChange={handleChange}
              isRequired={true}
              onBlur={handleBlur}
              label="I have agreed all terms and conditions"
            />
          </div>
          <div>
            <NextButton
              type="submit"
              color="primary"
              varient={"flat"}
              buttonText="Get Started"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
