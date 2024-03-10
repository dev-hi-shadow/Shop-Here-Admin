import { useFormik } from "formik";
import { SignUpInitialState } from "../Configurations/InitialStates";
import { SignUpSchema } from "../Configurations/YupSchema";
import NextInput from "../Components/NextInput";
import { Countries } from "../Helpers/Countries";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import moment from "moment";
import CustomDatePicker from "../Components/DatePicker";
import { IconEye } from "@tabler/icons-react";
import { IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";
import NextAutoComplete from "../Components/NextAutoComplete";

const SignUp = () => {
  const [typePassword, setTypePassword] = useState(true);
  const handleSignUpSubmit = (values) => {
    const body = { ...values };
    console.log("🚀  body:", body);
  };
  const { values, errors, touched, handleChange, setFieldValue, handleBlur } =
    useFormik({
      initialValues: SignUpInitialState,
      validationSchema: SignUpSchema,
      onSubmit: () => handleSignUpSubmit(values),
    });

  return (
    <>
      <div className="lg:m-10">
        <form className="relative border border-gray-100 space-y-3  rounded-md bg-white p-6 shadow-xl lg:p-10">
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

            <NextInput
              className="flex items-center"
              classNames={{
                inputWrapper: ["ps-1"],
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.phone}
              variant="bordered"
              name="phone"
              type="number"
              startContent={
                <>
                  <NextAutoComplete
                    ariaLabel="select idd"
                    ariaLabelledby="select idd "
                    className="py-0 my-0"
                    variant={"underlined"}
                    classNames={{
                      inputWrapper: ["border-0"],
                    }}
                    onSelectionChange={(e) => setFieldValue("phone_start", e)}
                    onBlur={handleBlur}
                    selectedKey={values.phone_start}
                    touched={touched}
                    errors={errors}
                    startContentIsImage={true}
                    startContentSrc={
                      Countries.find(
                        (item) =>
                          item.name === (values.phone_start || values.country)
                      )?.flag
                    }
                    startContentAlt="idd country image"
                    childArray={Countries}
                    childAriaLabel="country-idd"
                    childAriaLabelledby="country-idd"
                    childTextValueField="name"
                    childValue="name"
                    childStartContentIsImage={true}
                    childStartContent="name"
                    childValueShow="name"
                  ></NextAutoComplete>
                  {/* <Autocomplete
                    aria-label="select idd country"
                    aria-labelledby="select idd country"
                    className="py-0 my-0"
                    variant={"underlined"}
                    classNames={{
                      inputWrapper: ["border-0"],
                    }}
                    onSelectionChange={(e) => setFieldValue("phone_start", e)}
                    onBlur={handleBlur}
                    selectedKey={values.phone_start}
                    touched={touched}
                    errors={errors}
                    startContent={
                      <img
                        className="rounded-full w-3 h-3"
                        alt={name}
                        src={
                          Countries.find(
                            (item) =>
                              item.name ===
                              (values.phone_start || values.country)
                          )?.flag
                        }
                      />
                    }
                  >
                    {Countries.map(({ name, flag }, index) => (
                      <AutocompleteItem
                        key={name}
                        aria-label={`country-idd-${index}`}
                        aria-labelledby={`country-idd-${index}`}
                        textValue={name}
                        value={name}
                        startContent={
                          <img
                            aria-label="image-country-idd"
                            aria-labelledby="image-country-idd"
                            className="rounded-full w-3 h-3"
                            alt={name}
                            src={flag}
                          />
                        }
                      >
                        {name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete> */}
                  {
                    Countries.find(
                      (item) =>
                        item.name === (values.phone_start || values.country)
                    )?.idd
                  }
                </>
              }
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
              value={values?.username}
              variant="bordered"
              name="username"
              touched={touched}
              errors={errors}
            />

            <Autocomplete
              aria-label={`select country-name`}
              aria-labelledby={`select-country-idd`}
              className="py-0 my-0"
              classNames={{
                inputWrapper: ["border-0"],
              }}
              onSelectionChange={(e) => setFieldValue("country", e)}
              onBlur={handleBlur}
              defaultSelectedKey={values.phone_start}
              selectedKey={values.country || values.phone_start}
              touched={touched}
              errors={errors}
              startContent={
                <img
                  aria-label="image-country-name"
                  aria-labelledby="image-country-name"
                  key={values.country}
                  className="rounded-full w-3 h-3"
                  alt={name}
                  src={
                    Countries.find(
                      (item) =>
                        item.name === (values.country || values.phone_start)
                    )?.flag
                  }
                />
              }
            >
              {Countries.map(({ name, flag }, index) => (
                <AutocompleteItem
                  key={name}
                  aria-label={`country-idd-${index}`}
                  aria-labelledby={`country-idd-${index}`}
                  textValue={name}
                  value={name}
                  startContent={
                    <img
                      className="rounded-full w-3 h-3"
                      alt={name}
                      src={flag}
                    />
                  }
                >
                  {name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
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

          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className=""> Gender </label>
              <div className="relative w-56 mt-2 bg-gray-100 rounded-lg">
                <input
                  className="peer hidden"
                  type="checkbox"
                  name="select-1"
                  id="select-1"
                />
                <label
                  htmlFor="select-1"
                  className="flex w-full cursor-pointer rounded-lg select-none border p-2 px-3 text-sm text-gray-700 ring-blue-400 peer-checked:ring"
                >
                  Select Option{" "}
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute right-5 top-3 h-4 text-gray-600 transition peer-checked:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                    Male
                  </li>
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                    Female
                  </li>
                  <li className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">
                    Other
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label className="">
                {" "}
                Phone: <span className="text-sm text-gray-400">
                  (optional)
                </span>{" "}
              </label>
              <input
                type="text"
                placeholder="+543 5445 0543"
                className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
              />
            </div>
          </div>

          <div className="checkbox">
            <input type="checkbox" id="chekcbox1" checked="" />
            <label htmlFor="checkbox1">
              I agree to the{" "}
              <a href="#" target="_blank" className="text-blue-600">
                {" "}
                Terms and Conditions{" "}
              </a>{" "}
            </label>
          </div>

          <div>
            <button
              type="button"
              className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
