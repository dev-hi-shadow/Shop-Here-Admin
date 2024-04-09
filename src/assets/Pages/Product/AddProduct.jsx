/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProductSchema } from "../../Configurations/YupSchema";
import { ProductInitialState } from "../../Configurations/InitialStates";
import _ from "lodash";

 import {
  Autocomplete,
  AutocompleteItem,
    Card,
  CardBody,
  Checkbox,
  Chip,
  Divider,
  Input,
  Link,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@nextui-org/react";

import {
  IconAdjustmentsHorizontal,
  IconFileInfo,
  IconServerCog,
  IconTruck,
  IconCurrencyDollar,
  IconSettingsCog,
  IconSend,
  IconHelpHexagon,
  IconTrash,
} from "@tabler/icons-react";

import { ORDER_STATUSES } from "../../Helpers";
import NextInput from "../../Components/NextUI/NextInput";
import NextCheckBox from "../../Components/NextUI/NextCheckBox";
import { useGetCategoriesQuery } from "../../../Services/API/Category";
import { useGetSubCategoriesQuery } from "../../../Services/API/SubCategory";
import { useGetAddressesQuery } from "../../../Services/API/Address";
// import { useGetSubCategoriesTaxQuery } from "../../../Services/API/SubCategotyTax";
import { useGetBrandsQuery } from "../../../Services/API/Brand";
import { useGetUnitsQuery } from "../../../Services/API/Unit";
import { useGetTaxesQuery } from "../../../Services/API/Tax";
import { Countries } from "../../Helpers/Countries";
import { useGetAttributesQuery } from "../../../Services/API/Attribute";
import NextButton from "../../Components/NextUI/NextButton";

const AddProduct = () => {
  const [ActiveTab, setActiveTab] = useState(0);
   const [SelectedVarientionRows, setSelectedVarientionRows] = useState([]);
  const [SelectedAttributes, setSelectedAttributes] = useState([]);
  const [VariableAttributeCategory, setVariableAttributeCategory] =
    useState(null);
  const [SelectedCity, setSelectedCity] = useState(null);
  const Categories = useGetCategoriesQuery();
  const SubCategories = useGetSubCategoriesQuery();
  const Addresses = useGetAddressesQuery();
  // const SubCategortTaxes = useGetSubCategoriesTaxQuery();
  const Attributes = useGetAttributesQuery();
  const Brands = useGetBrandsQuery();
  const Units = useGetUnitsQuery();
  const Taxes = useGetTaxesQuery();

  const handleProduct = () => {
    //  dispatch(CreateProductAction(values));
  };

  const {
    values,
    errors,
    setValues,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    initialValues,
    setFieldValue,
  } = useFormik({
    initialValues: ProductInitialState,
    validationSchema: ProductSchema,
    onSubmit: (values) => handleProduct(values),
  });

  // const handleAttributeSelect = (
  //   ArgsAttribure,
  //   ArgsSelectedItems,
  //   ArgsType = "add"
  // ) => {
  //   let selectedItems = Array.from(ArgsSelectedItems);
  //   let attribute = ArgsAttribure;
  //   let type = ArgsType;
  //   const UpdateArray = values.attributes;
  //   const index = UpdateArray.findIndex((item) =>
  //     Object.prototype?.hasOwnProperty?.call(item, attribute)
  //   );

  //   if (type === "deleteAttribute") {
  //     attribute = Object.keys(UpdateArray[index])[0];
  //     let UpdateValue = UpdateArray[index][attribute];
  //     const valueindex = UpdateValue.findIndex((item) => {
  //       return item === selectedItems.join("").toString();
  //     });
  //     UpdateValue.splice(valueindex, 1);
  //     selectedItems = UpdateValue;
  //   }

  //   if (index === -1) {
  //     UpdateArray.push({ [attribute]: selectedItems });
  //   } else {
  //     if (selectedItems.length <= 0) {
  //       UpdateArray.splice(index, 1);
  //     } else {
  //       UpdateArray[index] = { [attribute]: selectedItems };
  //     }
  //   }
  //   setFieldValue(`attributes`, [...UpdateArray] || initialValues.attributes);
  // };

  const HandleVarients = (event, index) => {
    if (event.target.checked) {
      // If the checkbox is checked, add the index to the selected rows
      setSelectedVarientionRows((prevSelected) => [...prevSelected, index]);
    } else {
      // If the checkbox is unchecked, remove the index from the selected rows
      setSelectedVarientionRows((prevSelected) =>
        prevSelected.filter((item) => item !== index)
      );
    }
  };
  useEffect(() => {
    function generateValueCombinations(
      attributes,
      index = 0,
      currentCombination = [],
      allCombinations = []
    ) {
      if (index === attributes.length) {
        // Create the combination object with additional fields
        const combinationObject = {
          attributeids: currentCombination.map((item) => item.valueid),
          manufacture_price: null,
          retail_price: null,
          special_price: null,
        };
        allCombinations.push(combinationObject);
        return;
      }

      const attributeId = Object.keys(attributes[index])[0];
      const attributeValues = attributes[index][attributeId];

      attributeValues.forEach((valueId) => {
        currentCombination.push({
          attribute_id: attributeId,
          valueid: valueId,
        });
        generateValueCombinations(
          attributes,
          index + 1,
          currentCombination,
          allCombinations
        );
        currentCombination.pop();
      });

      return index === 0 ? allCombinations : undefined;
    }

    if (values.attributes && values.attributes.length >= 0) {
      const newCombinations = generateValueCombinations(values.attributes);
      setFieldValue("variations", newCombinations);
    }
  }, [values.attributes, setFieldValue]);

  const DeleteVarients = () => {
    try {
      if (SelectedVarientionRows === "all") {
        setValues({ ...values, attributes: [], variations: [] });
        return;
      }
      if (
        Array.isArray(SelectedVarientionRows) &&
        SelectedVarientionRows.length > 0
      ) {
        const UpdateVarientionValues = values.variations.filter((item) => {
          return !SelectedVarientionRows.includes(item.attributeids.toString());
        });
        setFieldValue("variations", UpdateVarientionValues);

        const AttributeKeys = values.attributes.map(
          (item) => Object.keys(item)[0]
        );

        const record = AttributeKeys.map((Attribute) => {
          const finded = values.attributes.find((attr) =>
            Object.prototype?.hasOwnProperty?.call(attr, Attribute)
          );

          const FilteredValues = finded[Attribute].filter((preVal) => {
            return UpdateVarientionValues.some((value) => {
              return value.attributeids.includes(preVal);
            });
          });
          return { [Attribute]: FilteredValues };
        }).filter((item) => typeof item === "object");

        setFieldValue("attributes", record || initialValues.attributes);
        setSelectedVarientionRows([]);
      } else {
        // TODO  Toast error message no any rows selected
      }
    } catch (error) {
      // TODO  Toast error message error.message
    }
  };

  function cartesian(...args) {
    if (args.length === 0 || args.some((arg) => arg.length === 0)) {
      return [[]];
    }
    return args.reduce(
      (a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())),
      [[]]
    );
  }

  useEffect(() => {
    const hasSelectedAttributes =
      Object.values(SelectedAttributes).length > 0 &&
      Object.values(SelectedAttributes).every((attr) => attr.length > 0);

    if (hasSelectedAttributes) {
      const attributeValues = Object.values(SelectedAttributes).map((attr) =>
        attr.map((item) => item.name)
      );
      const allCombinations = cartesian(...attributeValues);
      const formattedCombinations = allCombinations.map((combination) => ({
        variation_name: combination.join(" "),
        manufacture_price: null, // Corrected spelling
        retail_price: null,
        special_price: null,
        width: null,
        height: null,
        depth: null,
        weight: null,
        SKU: combination?.SKU || Math.floor(Math.random() * 9999999),
      }));
      setFieldValue("variations", formattedCombinations);
    } else {
      setFieldValue("variations", []);
    }

   }, [SelectedAttributes, setFieldValue]);

  useEffect(() => {
    let newRecord = [];
    values.attributes.forEach((item) => {
      newRecord.push(
        _.pick(
          Attributes.data.data.rows.find((att) => {
            return att.id == item;
          }),
          ["id", "name", "attribute.name"]
        )
      );
    });
    setSelectedAttributes(_.groupBy(newRecord, (item) => item.attribute.name));
  }, [Attributes?.data?.data?.rows, values.attributes]);

  const handleDeleteAttribute = (id) => {
    const updatedAttributes = new Set([...values.attributes]);
    const idToRemove = String(id);
    updatedAttributes.delete(idToRemove);
    setFieldValue("attributes", updatedAttributes);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Tabs selectedKey={ActiveTab} onSelectionChange={setActiveTab}>
                  <Tab
                    key="Information"
                    title={
                      <div className="flex items-center space-x-1">
                        <IconFileInfo />
                        <span>Information</span>
                      </div>
                    }
                    className="w-full max-h-full mx-1 p-2"
                  >
                    <Card className="h-full">
                      <CardBody>
                        <div className="mb-3 flex">
                          <div className="form-selectgroup d-flex align-items-center me-2">
                            <label className="form-label me-2">
                              Freshness :
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="freshness"
                                value="New"
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.freshness === "New"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.freshness &&
                                  errors.freshness &&
                                  "border border-danger"
                                }`}
                              >
                                New
                              </span>
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="freshness"
                                value="Second Hand"
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.freshness === "Second Hand"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.freshness &&
                                  errors.freshness &&
                                  "border border-danger"
                                }  `}
                              >
                                Second Hand
                              </span>
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="freshness"
                                value="Refurbished"
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.freshness === "Refurbished"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.freshness &&
                                  errors.freshness &&
                                  "border border-danger"
                                }`}
                              >
                                Refurbished
                              </span>
                            </label>
                          </div>
                          <div className="form-selectgroup d-flex align-items-center">
                            <label className="form-label me-2">
                              Product Type :
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="product_type"
                                value="Standard"
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.product_type === "Standard"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.product_type &&
                                  errors.product_type &&
                                  "border border-danger"
                                }`}
                              >
                                Standard
                              </span>
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="product_type"
                                value="Variable"
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.product_type === "Variable"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.product_type &&
                                  errors.product_type &&
                                  "border border-danger"
                                }`}
                              >
                                Variable
                              </span>
                            </label>
                          </div>
                        </div>

                        <NextInput
                          type="text"
                          name="name"
                          placeholder=""
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched}
                          errors={errors}
                          value={values.name}
                        />

                        <NextInput
                          label="SKU Code"
                          name="SKU"
                          onChange={handleChange}
                          isRequired
                          value={values.SKU}
                          onBlur={handleBlur}
                          touched={touched}
                          errors={errors}
                        />

                        <NextInput
                          label="Short Description"
                          name="short_description"
                          onChange={handleChange}
                          value={values.short_description}
                          onBlur={handleBlur}
                          touched={touched}
                          errors={errors}
                        />

                        <div className="my-2">
                          <label htmlFor="name">Product Main Description</label>
                          <ReactQuill
                            theme="snow"
                            onChange={(value) =>
                              setFieldValue("description", value)
                            }
                            name="description"
                            value={values?.description}
                          />
                          {touched.description && errors.description && (
                            <p className="h6 text-danger mt-1">
                              Product {errors.description}
                            </p>
                          )}
                        </div>
                        <div className="  mb-3">
                          <label htmlFor="name">
                            Product Extra Description
                          </label>
                          <ReactQuill
                            theme="snow"
                            onChange={(value) =>
                              setFieldValue("extra_description", value)
                            }
                            value={values?.extra_description}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    key="Association"
                    title={
                      <div className="flex items-center space-x-1">
                        <IconSettingsCog />
                        <span>Association</span>
                      </div>
                    }
                    className="w-full max-h-full mx-1 p-2"
                  >
                    <Card className="h-full">
                      <CardBody>
                        {/* <Select
                          className="mb-3"
                          isRequired
                          color={
                            touched.brand_id && errors.brand_id && "danger"
                          }
                          selectedKeys={values.brand_id && [values.brand_id]}
                          label="Brand"
                          name="brand_id"
                          isInvalid={touched.brand_id && errors.brand_id}
                          onBlur={handleBlur}
                          errorMessage={touched.brand_id && errors.brand_id}
                          onChange={handleChange}
                        >
                          {Array.isArray(GetBrand) &&
                            GetBrand.map((brand) => {
                              return (
                                <SelectItem
                                  key={brand.id}
                                  value={brand.id}
                                  textValue={brand.name}
                                >
                                  {brand.name}
                                </SelectItem>
                              );
                            })}
                        </Select> */}

                        <Autocomplete
                          isRequired
                          className="mb-3"
                          label="Brand"
                          name="brand_id"
                          selectedKey={values.brand_id}
                          onSelectionChange={(e) =>
                            setFieldValue("brand_id", e)
                          }
                        >
                          {Brands.isSuccess &&
                            Brands.data.data.rows?.map((brand) => (
                              <AutocompleteItem key={brand.id}>
                                {brand.name}
                              </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        {/* <Select
                          className="mb-3"
                          isRequired
                          label="Category"
                          name="category_id"
                          color={
                            touched.category_id &&
                            errors.category_id &&
                            "danger"
                          }
                          selectedKeys={
                            values.category_id && [values.category_id]
                          }
                          isInvalid={touched.category_id && errors.category_id}
                          onBlur={handleBlur}
                          errorMessage={
                            touched.category_id && errors.category_id
                          }
                          onChange={handleChange}
                        >
                          {
                            // Array.isArray(GetCategory) &&
                            // GetCategory
                            [
                              {
                                id: 1,
                                name: "Category 1",
                              },
                            ].map((category) => {
                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                  textValue={category.name}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })
                          }
                        </Select> */}

                        <Autocomplete
                          isRequired
                          className="mb-3"
                          label="Category"
                          name="category_id"
                          selectedKey={values.category_id}
                          onSelectionChange={(e) =>
                            setFieldValue("category_id", e)
                          }
                        >
                          {Categories.isSuccess &&
                            Categories.data.data.rows?.map((category) => (
                              <AutocompleteItem key={category.id}>
                                {category.name}
                              </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        {/* <Select
                          className="mb-3"
                          isRequired
                          color={
                            touched.sub_category_id &&
                            errors.sub_category_id &&
                            "danger"
                          }
                          label="Sub Category"
                          isInvalid={
                            touched.sub_category_id && errors.sub_category_id
                          }
                          selectedKeys={
                            values.sub_category_id && [values.sub_category_id]
                          }
                          onBlur={handleBlur}
                          errorMessage={
                            touched.sub_category_id && errors.sub_category_id
                          }
                          name="sub_category_id"
                          onChange={handleChange}
                        >
                          {Array.isArray(GetSubCategory) &&
                            GetSubCategory.filter(
                              (item) =>
                                item.category_id.id === values.category_id
                            ).map((subcategory) => {
                              return (
                                <SelectItem
                                  key={subcategory.id}
                                  value={subcategory.id}
                                  textValue={subcategory.name}
                                >
                                  {subcategory.name}
                                </SelectItem>
                              );
                            })}
                        </Select> */}
                        <Autocomplete
                          isRequired
                          className="mb-3"
                          label="Sub Category"
                          name="subcategory_id"
                          selectedKey={values.subcategory_id}
                          onSelectionChange={(e) =>
                            setFieldValue("subcategory_id", e)
                          }
                        >
                          {SubCategories.isSuccess &&
                            SubCategories.data.data.rows?.map(
                              (sub_category) => (
                                <AutocompleteItem key={sub_category.id}>
                                  {sub_category.name}
                                </AutocompleteItem>
                              )
                            )}
                        </Autocomplete>
                        {/* <Select
                          isRequired
                          className="mb-3"
                          label="Unit"
                          color={touched.unit_id && errors.unit_id && "danger"}
                          name="unit_id"
                          isInvalid={touched.unit_id && errors.unit_id}
                          onBlur={handleBlur}
                          errorMessage={touched.unit_id && errors.unit_id}
                          onChange={handleChange}
                          selectedKeys={values.unit_id && [values.unit_id]}
                        >
                          {Array.isArray(GetUnit) &&
                            GetUnit.map((unit) => {
                              return unit(
                                <SelectItem
                                  key={unit.id}
                                  value={unit.id}
                                  textValue={unit.name}
                                >
                                  {unit.name} [{unit.unit_code}]
                                </SelectItem>
                              );
                            })}
                        </Select> */}

                        <Autocomplete
                          isRequired
                          className="mb-3"
                          label="Unit"
                          name="unit_id"
                          selectedKey={values.unit_id}
                          onSelectionChange={(e) => setFieldValue("unit_id", e)}
                        >
                          {Units.isSuccess &&
                            Units.data.data.rows?.map((Unit) => (
                              <AutocompleteItem key={Unit.id}>
                                {Unit.name}
                              </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <NextCheckBox
                              className="ms-2 my-2  max-h-fit  h-fit"
                              name="tax_details.is_tax_included"
                              label="tax included"
                              isSelected={values.tax_details.is_tax_included}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              Is Tax Included
                            </NextCheckBox>
                          </div>
                          <div>
                            <NextCheckBox
                              className="my-2 max-h-fit  h-fit"
                              name="cancellable.is_cancellable"
                              label="Is cancellable"
                              isSelected={values.cancellable.is_cancellable}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            ></NextCheckBox>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 my-2">
                          {/* <Select
                            isRequired={!values.tax_details.is_tax_included}
                            isDisabled={values.tax_details.is_tax_included}
                            className="mb-3"
                            label="Tax"
                            color={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid &&
                              "danger"
                            }
                            name="tax_details?.taxid"
                            isInvalid={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid
                            }
                            onChange={handleChange}
                            selectedKeys={
                              values.tax_details?.taxid && [
                                values.tax_details?.taxid,
                              ]
                            }
                          >
                            {Array.isArray(GetTax) &&
                              GetTax.map((tax) => {
                                return tax(
                                  <SelectItem
                                    key={tax.id}
                                    value={tax.id}
                                    textValue={tax.name}
                                  >
                                    {tax.name} [{tax.value}]
                                  </SelectItem>
                                );
                              })}
                          </Select> */}
                          <Autocomplete
                            key={values.tax_details.is_tax_included}
                            isRequired={!values.tax_details.is_tax_included}
                            isDisabled={values.tax_details.is_tax_included}
                            color={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid &&
                              "danger"
                            }
                            isInvalid={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.tax_details?.taxid &&
                              errors.tax_details?.taxid
                            }
                            className="mb-3"
                            label="Tax"
                            name="tax_id"
                            selectedKey={values.tax_id}
                            onSelectionChange={(e) =>
                              setFieldValue("tax_id", e)
                            }
                          >
                            {Taxes.isSuccess &&
                              Taxes.data.data.rows?.map((tax) => (
                                <AutocompleteItem key={tax.id}>
                                  {tax.name}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete>

                          <Autocomplete
                            isRequired={values.cancellable.is_cancellable}
                            isDisabled={
                              values.cancellable.is_cancellable === false
                            }
                            label="Till Cancellable Status "
                            name="cancellable_till"
                            isInvalid={
                              touched.cancellable?.cancellable_till &&
                              errors.cancellable?.cancellable_till
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.cancellable?.cancellable_till &&
                              errors.cancellable?.cancellable_till
                            }
                            className="mb-3"
                            selectedKey={values.cancellable_till}
                            onSelectionChange={(e) =>
                              setFieldValue("cancellable_till", e)
                            }
                          >
                            {Object.entries(ORDER_STATUSES).map(
                              ([key, value]) => (
                                <AutocompleteItem key={key}>
                                  {value.name}
                                </AutocompleteItem>
                              )
                            )}
                          </Autocomplete>
                          {/* <Select
                            isRequired={values.cancellable.is_cancellable}
                            isDisabled={
                              values.cancellable.is_cancellable === false
                            }
                            className="mb-3"
                            label="Till Cancellable Status "
                            name="cancellable.cancellable_till"
                            isInvalid={
                              touched.cancellable?.cancellable_till &&
                              errors.cancellable?.cancellable_till
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.cancellable?.cancellable_till &&
                              errors.cancellable?.cancellable_till
                            }
                            onChange={handleChange}
                            selectedKeys={
                              values.cancellable?.cancellable_till && [
                                values.cancellable?.cancellable_till,
                              ]
                            }
                          >
                            {Object.entries(ORDER_STATUSES).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={key}
                                  value={value.name}
                                  textValue={value.name}
                                >
                                  {value.name}
                                </SelectItem>
                              )
                            )}
                          </Select> */}
                        </div>

                        <div className="grid grid-cols-4 gap-1 my-2">
                          <NextInput
                            type="number"
                            name="warranty_period"
                            value={values.warranty_period}
                            label="Warranty [Months]"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                          />
                          <NextInput
                            type="number"
                            label="Guarantee [Months] "
                            name="guarantee_period"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            value={values.guarantee_period}
                          />
                          <NextInput
                            type="number"
                            label="Min Order Quantity "
                            name="min_order_quantity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            value={values.min_order_quantity}
                          />
                          <NextInput
                            type="number"
                            label="Max Order Quantity"
                            name="max_order_quantity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched}
                            errors={errors}
                            value={values.max_order_quantity}
                          />
                        </div>

                        <div className="grid grid-cols-4 gap-1 my-2">
                          <Autocomplete
                            isRequired
                            label="Made in "
                            name="made_in"
                            isInvalid={touched.made_in && errors.made_in}
                            onBlur={handleBlur}
                            errorMessage={touched.made_in && errors.made_in}
                            selectedKey={values.made_in}
                            onSelectionChange={(e) =>
                              setFieldValue("made_in", e)
                            }
                          >
                            {Countries.map((item) => (
                              <AutocompleteItem
                                key={item.name}
                                startContent={
                                  <>
                                    <img
                                      className="rounded-full w-3 h-3"
                                      alt={item.name}
                                      src={item.flag}
                                    />
                                  </>
                                }
                              >
                                {item.name}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                          <Autocomplete
                            label="Assembled in "
                            name="assembled_in"
                            isInvalid={
                              touched.assembled_in && errors.assembled_in
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.assembled_in && errors.assembled_in
                            }
                            selectedKey={values.assembled_in}
                            onSelectionChange={(e) =>
                              setFieldValue("assembled_in", e)
                            }
                          >
                            {Countries.map((item) => (
                              <AutocompleteItem
                                key={item.name}
                                startContent={
                                  <>
                                    <img
                                      className="rounded-full w-3 h-3"
                                      alt={item.name}
                                      src={item.flag}
                                    />
                                  </>
                                }
                              >
                                {item.name}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                           {/* <Autocomplete
                            isLoading={!Array.isArray(GetCountries)}
                            label="Made In"
                            className="max-w-xs my-3"
                            name="made_in"
                            onSelectionChange={(e) =>
                              setFieldValue("made_in", e)
                            }
                            onBlur={handleBlur}
                            selectedKey={values.made_in}
                          >
                            {Array.isArray(GetCountries) &&
                              GetCountries.map((country) => (
                                <AutocompleteItem
                                  key={country.name.common}
                                  value={country.name.common}
                                  startContent={
                                    <Avatar
                                      alt={country.flags.alt}
                                      src={country.flags.png}
                                    />
                                  }
                                >
                                  {country.name.common}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete> */}
                          {/* <Autocomplete
                            name="assembled_in"
                            onSelectionChange={(e) =>
                              setFieldValue("assembled_in", e)
                            }
                            onBlur={handleBlur}
                            isLoading={!Array.isArray(GetCountries)}
                            label="Assembled In"
                            className="max-w-xs my-3"
                            selectedKey={values.assembled_in}
                          >
                            {Array.isArray(GetCountries) &&
                              GetCountries.map((country) => (
                                <AutocompleteItem
                                  key={country.name.common}
                                  value={country.name.common}
                                  startContent={
                                    <Avatar
                                      alt={country.flags.alt}
                                      src={country.flags.png}
                                    />
                                  }
                                >
                                  {country.name.common}
                                </AutocompleteItem>
                              ))}
                          </Autocomplete> */}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    className="w-full max-h-full mx-1 p-2"
                    key="Price"
                    title={
                      <div className="flex items-center space-x-1">
                        {values?.product_type === "Standard" ? (
                          <>
                            <IconCurrencyDollar />
                            <span>Price</span>
                          </>
                        ) : (
                          <>
                            <IconAdjustmentsHorizontal />
                            <span>Variations</span>
                          </>
                        )}
                      </div>
                    }
                  >
                    <Card className="h-full">
                      <CardBody>
                        <div className="row">
                          <div className="col-6">
                            <span className="fs-3">Variable Attibutes</span>
                            <Autocomplete
                              className="my-2"
                              label="Attribute"
                              onSelectionChange={setVariableAttributeCategory}
                            >
                              {Attributes.isSuccess &&
                                _.filter(
                                  Attributes.data.data.rows,
                                  (item) => !item.attribute_id
                                ).map((attribute) => (
                                  <AutocompleteItem key={attribute.id}>
                                    {attribute.name}
                                  </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <div className=" overflow-y-scroll border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                              <Listbox
                                aria-label="Multiple selection example"
                                color="primary"
                                variant="flat"
                                selectionMode="multiple"
                                selectedKeys={values.attributes}
                                onSelectionChange={(e) =>
                                  setFieldValue(
                                    "attributes",
                                    new Set(Array.from(e))
                                  )
                                }
                              >
                                {Attributes.isSuccess &&
                                  _.filter(
                                    Attributes.data.data.rows,
                                    (item) =>
                                      item.attribute_id &&
                                      item.attribute_id ==
                                        VariableAttributeCategory
                                  ).map((item) => {
                                    return (
                                      <ListboxItem
                                        key={item.id}
                                        value={item.id.toString()}
                                      >
                                        {item.name}
                                      </ListboxItem>
                                    );
                                  })}
                              </Listbox>
                            </div>
                          </div>
                          <div className="  col-6">
                            <span className="fs-3">Selected Attibutes</span>
                            {Object.keys(SelectedAttributes).map(
                              (category, index) => (
                                <div key={index} className="my-2 flex flex-row">
                                  <span className="badge badge-outline text-yellow px-4 me-2">
                                    {category}
                                  </span>
                                  :
                                  <ScrollShadow
                                    hideScrollBar
                                    className="w-[300px] ms-2 flex flex-row"
                                    overflowCheck={"horizontal"}
                                    offset={200}
                                  >
                                    {SelectedAttributes[category].map(
                                      (attribute, attributeIndex) => (
                                        <Chip
                                          className="h-fit ps-0 me-1 hover:bg-red-200 hover:transition hover:delay-75 hover:ease-in-out "
                                          key={`${category}-${attributeIndex}`}
                                          onClose={() =>
                                            handleDeleteAttribute(attribute.id)
                                          }
                                          variant="flat"
                                        >
                                          {attribute.name}
                                        </Chip>
                                      )
                                    )}
                                  </ScrollShadow>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-medium">Variation Table</span>
                          <NextButton
                            size="sm"
                            color="danger"
                            variant="flat"
                            buttonText="Delete Rows"
                            startContent={<IconTrash />}
                            isDisabled={SelectedVarientionRows.length < 1}
                            onPress={DeleteVarients}
                          >
                            Delete Rows
                          </NextButton>
                        </div>
                        <Table
                          aria-labelledby="Variation-Table"
                          removeWrapper={true}
                          className="mt-3"
                        >
                          <TableHeader>
                            <TableColumn className="w-fit p-0"></TableColumn>
                            <TableColumn>#</TableColumn>
                            <TableColumn>SKU</TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Manufacture Price</TableColumn>
                            <TableColumn>Retail Price</TableColumn>
                            <TableColumn>
                              Tax{" "}
                              {values.tax_details.is_tax_included
                                ? "[included]"
                                : null}
                            </TableColumn>
                            <TableColumn>Margin</TableColumn>
                          </TableHeader>
                          <TableBody emptyContent={"Variations Not Found"}>
                            {Array.isArray(values.variations) &&
                              values.variations.map((variation, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell className="w-fit p-0 text-center">
                                      <Checkbox
                                        key={index}
                                        isSelected={SelectedVarientionRows.includes(
                                          index
                                        )}
                                        size="sm"
                                        onChange={(event) =>
                                          HandleVarients(event, index)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{variation.SKU}</TableCell>
                                    <TableCell>
                                      {variation.variation_name}
                                    </TableCell>
                                    <TableCell>
                                      <NextInput
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Menufacture Price"
                                        size="sm"
                                        type="number"
                                        name={`variations.${index}.menufacture_price`}
                                        value={
                                          values.variations[index]
                                            .menufacture_price
                                        }
                                        errorMessage={
                                          touched?.variations?.[index]
                                            ?.menufacture_price &&
                                          errors?.variations?.[index]
                                            ?.menufacture_price
                                        }
                                        isInvalid={
                                          touched?.variations?.[index]
                                            ?.menufacture_price &&
                                          errors?.variations?.[index]
                                            ?.menufacture_price
                                        }
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <NextInput
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Retail Price"
                                        type="number"
                                        size="sm"
                                        name={`variations.${index}.retail_price`}
                                        value={
                                          values.variations[index].retail_price
                                        }
                                        errorMessage={
                                          touched?.variations?.[index]
                                            ?.retail_price &&
                                          errors?.variations?.[index]
                                            ?.retail_price
                                        }
                                        isInvalid={
                                          touched?.variations?.[index]
                                            ?.retail_price &&
                                          errors?.variations?.[index]
                                            ?.retail_price
                                        }
                                      />
                                    </TableCell>
                                    <TableCell>Tax</TableCell>
                                    <TableCell>Margin</TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    key="Shipping"
                    title={
                      <div className="flex flex-column items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          <IconTruck />
                          <span>Shipping</span>
                        </div>
                        &
                        <div className="mx-0 flex items-center space-x-1">
                          <IconHelpHexagon />
                          <span>FAQ</span>
                        </div>
                      </div>
                    }
                    className="w-full max-h-full mx-1 p-2"
                  >
                    <Card className="h-full">
                      <CardBody>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <span className="ms-1  mb-2 text-medium">
                              Select Pickup Locations
                            </span>
                            <Autocomplete
                              className="my-2"
                              label="Attribute"
                              selectedKey={SelectedCity}
                              onSelectionChange={setSelectedCity}
                            >
                              {Attributes.isSuccess &&
                                Addresses?.data?.data?.rows?.map((address) => (
                                  <AutocompleteItem key={address.city}>
                                    {`${address.city}`}
                                  </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <div className=" overflow-y-scroll border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                              <Listbox
                                aria-label="Multiple selection example"
                                color="primary"
                                variant="flat"
                                selectionMode="multiple"
                                selectedKeys={values.pickup_locations}
                                onSelectionChange={(e) =>
                                  setFieldValue(
                                    "pickup_locations",
                                    new Set(Array.from(e))
                                  )
                                }
                              >
                                {Addresses.isSuccess &&
                                  _.filter(
                                    Addresses.data.data.rows,
                                    (address) => address.city === SelectedCity
                                  ).map((item) => {
                                    return (
                                      <ListboxItem
                                        key={item.id}
                                        value={item.id.toString()}
                                      >
                                        {item.address}
                                      </ListboxItem>
                                    );
                                  })}
                              </Listbox>
                            </div>
                          </div>
                          <>
                            <span className="ms-1  mb-2 text-medium">
                              Selected Locations
                            </span>
                          </>
                        </div>
                        <Divider className="bg-black mb-2 " />
                        <div className="flex justify-between items-center ">
                          <span className="text-medium">FAQ Section</span>
                          <Link
                            color="primary"
                            className="text-decoration-none border-none"
                            variant="bordered"
                            onClick={() => {
                              setValues({
                                ...values,
                                faqs: [
                                  ...values.faqs,
                                  {
                                    question: null,
                                    answer: null,
                                  },
                                ],
                              });
                            }}
                          >
                            {values.faqs.length < 1
                              ? "Create Frequently Asked Questions"
                              : "Add More Faq(s)"}
                          </Link>
                        </div>
                         <Divider className="bg-black mt-2" />
                        <div className="h-full max-h-full min-h-full">
                          {Array.isArray(values.faqs) &&
                            values.faqs.map((faq, index) => (
                              <div key={index} className="my-2">
                                <span className="text-medium">
                                  {" "}
                                  Question - {index + 1}
                                </span>
                                <NextInput
                                  type="text"
                                  className="my-2"
                                  name={`faqs.${index}.question`}
                                  label="FAQ Question"
                                  value={faq.question}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ReactQuill
                                  theme="snow"
                                  placeholder="FAQ Answer"
                                  onChange={(value) =>
                                    setFieldValue(`faqs.${index}.answer`, value)
                                  }
                                  name="description"
                                  value={faq.answer}
                                />
                                <Divider className="bg-black my-2" />
                              </div>
                            ))}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    key="SEO"
                    title={
                      <div className="flex items-center space-x-1">
                        <IconServerCog />
                        <span>SEO</span>
                      </div>
                    }
                    className="w-full max-h-full mx-1 p-2"
                  >
                    <Card className="h-full">
                      <CardBody>
                        <Input
                          className="mb-3"
                          type="text"
                          label="Meta title"
                          isRequired
                          name="meta_title"
                          value={values.meta_title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          errorMessage={
                            errors.meta_title && touched.meta_title
                              ? errors.meta_title
                              : null
                          }
                        />
                        <div className="  mb-3">
                          <label htmlFor="name">Meta Description</label>
                          <ReactQuill
                            theme="snow"
                            onChange={(value) =>
                              setFieldValue("meta_description", value)
                            }
                            name="meta_description"
                            value={values?.meta_description}
                          />
                          {touched.meta_description &&
                            errors.meta_description && (
                              <p className="h6 text-danger mt-1">
                                Product {errors.meta_description}
                              </p>
                            )}
                        </div>
                        <Input
                          className="mb-3"
                          type="text"
                          name="friendly_url"
                          label="Friendly URL"
                          isRequired
                          value={values.friendly_url}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          errorMessage={
                            errors.friendly_url && touched.friendly_url
                              ? errors.friendly_url
                              : null
                          }
                        />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    key="-"
                    title={
                      <div className="flex items-center space-x-1">
                        <IconSend />
                        <span>Submit</span>
                      </div>
                    }
                    className="w-full max-h-full mx-1 p-2"
                  >
                    <Card className="hello">
                      <CardBody className=" hello body h-full">
                        <div className="d-flex justify-content-between ">
                          <h6 className="card-title">Add Product</h6>
                          <div className="d-flex ">
                            <a
                              onClick={() => resetForm()}
                              className="card-title btn btn-outline-danger text-dark text-decoration-none  p-1 mx-1"
                            >
                              Reset Product
                            </a>
                            <input
                              type="submit"
                              className="card-title p-1 nav-link text-decoration-none ms-1 border border-secondary rounded bg-green"
                              value={"Save Product"}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
