import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProductSchema } from "../../Configurations/YupSchema";
import { ProductInitialState } from "../../Configurations/InitialStates";
import { GetCategoryAction } from "../../../Services/Actions/Category";
import { GetSubCategoryAction } from "../../../Services/Actions/SubCategory";
import { GetBrandAction } from "../../../Services/Actions/Brand";
import { GetUnitAction } from "../../../Services/Actions/Unit";
import { GetAttributeAction } from "../../../Services/Actions/Attribute";

import { GetProductAction } from "../../../Services/Actions/Product";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
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
import { GetTaxAction } from "../../../Services/Actions/Tax";
 import { GetCountriesAction } from "../../../Services/Actions/Countries";
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
import { GetAddressesAction } from "../../../Services/Actions/Addresses";
import { toast } from "react-toastify";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { CustomFind, ORDER_STATUSES } from "../../Helpers";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { GetBrand } = useSelector((state) => state.brandState);
  const { GetCategory } = useSelector((state) => state.categoryState);
  const { GetSubCategory } = useSelector((state) => state.subcategoryState);
  const { GetAttribute } = useSelector((state) => state.attributeState);
  const { GetUnit } = useSelector((state) => state.unitState);
  const { GetTax } = useSelector((state) => state.taxState);
  const { GetCountries } = useSelector((state) => state.countryState);
  const { profile } = useSelector((state) => state.authentication);
  const { GetAddresses } = useSelector((state) => state.addressesState);
  const { DeleteRecoverProduct, EditProduct, AddProduct } = useSelector(
    (state) => state.productState
  );
  const [ActiveTab, setActiveTab] = useState(0);
  const [SelectedVarientionRows, setSelectedVarientionRows] = useState([]);
  const [VariableAttributeCategory, setVariableAttributeCategory] =
    useState(null);

  const handleProduct = () => {
    //  dispatch(CreateProductAction(values));
  };

  useLayoutEffect(() => {
    dispatch(GetBrandAction());
    dispatch(GetAddressesAction());
    dispatch(GetCountriesAction());
    dispatch(GetCategoryAction());
    dispatch(GetSubCategoryAction());
    dispatch(GetUnitAction());
    dispatch(GetAttributeAction());
    dispatch(GetProductAction());
    dispatch(GetTaxAction());
  }, [dispatch]);

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
  useEffect(() => {
    if (DeleteRecoverProduct || EditProduct || AddProduct) {
      resetForm();
    }
  }, [AddProduct, DeleteRecoverProduct, EditProduct, resetForm]);

  const handleAttributeSelect = (
    ArgsAttribure,
    ArgsSelectedItems,
    ArgsType = "add"
  ) => {
    let selectedItems = Array.from(ArgsSelectedItems);
    let attribute = ArgsAttribure;
    let type = ArgsType;
    const UpdateArray = values.attributes;
    const index = UpdateArray.findIndex((item) =>
      Object.prototype?.hasOwnProperty?.call(item, attribute)
    );

    if (type === "deleteAttribute") {
      attribute = Object.keys(UpdateArray[index])[0];
      let UpdateValue = UpdateArray[index][attribute];
      const valueindex = UpdateValue.findIndex((item) => {
        return item === selectedItems.join("").toString();
      });
      UpdateValue.splice(valueindex, 1);
      selectedItems = UpdateValue;
    }

    if (index === -1) {
      UpdateArray.push({ [attribute]: selectedItems });
    } else {
      if (selectedItems.length <= 0) {
        UpdateArray.splice(index, 1);
      } else {
        UpdateArray[index] = { [attribute]: selectedItems };
      }
    }
    setFieldValue(`attributes`, [...UpdateArray] || initialValues.attributes);
  };

  const HandleVarients = (attribute_ids, event) => {
    if (event.target.checked) {
      setSelectedVarientionRows([...SelectedVarientionRows, attribute_ids]);
    } else {
      const updateValues = [...SelectedVarientionRows];
      const index = SelectedVarientionRows.indexOf(attribute_ids);
      updateValues.splice(index, 1);
      setSelectedVarientionRows([...updateValues]);
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
          attribute_ids: currentCombination.map((item) => item.value_id),
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
          value_id: valueId,
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
          return !SelectedVarientionRows.includes(
            item.attribute_ids.toString()
          );
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
              return value.attribute_ids.includes(preVal);
            });
          });

          return { [Attribute]: FilteredValues };
        }).filter((item) => typeof item === "object");

        setFieldValue("attributes", record || initialValues.attributes);
        setSelectedVarientionRows([]);
      } else {
        toast.error("You have not selected any rows", {
          icon: <IconAlertCircleFilled />,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        icon: <IconAlertCircleFilled />,
      });
    }
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
                        <div className="mb-3 flex justify-self-auto ">
                          <div className="form-selectgroup flex me-3 align-items-center">
                            <label className="form-label me-2">Type : </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="type"
                                value="Standard"
                                onBlur={handleBlur}
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.type === "Standard"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.type &&
                                  errors.type &&
                                  "border border-danger"
                                }`}
                              >
                                Standard
                              </span>
                            </label>
                            <label className="form-selectgroup-item">
                              <input
                                type="radio"
                                name="type"
                                value="Pack Of"
                                onBlur={handleBlur}
                                className="form-selectgroup-input"
                                onChange={handleChange}
                                checked={values.type === "Pack Of"}
                              />
                              <span
                                className={`form-selectgroup-label  ${
                                  touched.type &&
                                  errors.type &&
                                  "border border-danger"
                                }`}
                              >
                                Pack Of
                              </span>
                            </label>
                          </div>
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

                        <Input
                          className="mb-3"
                          type="text"
                          label="Name"
                          name="name"
                          onChange={handleChange}
                          isRequired
                          onBlur={handleBlur}
                          isInvalid={errors.name && touched.name}
                          errorMessage={touched.name && errors.name}
                          value={values.name}
                        />
                        <Input
                          className="mb-3"
                          type="text"
                          label="SKU Code"
                          name="SKU"
                          onChange={handleChange}
                          isRequired
                          value={values.SKU}
                          onBlur={handleBlur}
                          isInvalid={errors.SKU && touched.SKU}
                          errorMessage={
                            errors.SKU && touched.SKU ? errors.SKU : null
                          }
                        />
                        <Input
                          className="mb-3"
                          type="text"
                          label="Short Description"
                          name="short_description"
                          onChange={handleChange}
                          isRequired
                          onBlur={handleBlur}
                          isInvalid={
                            errors.short_description &&
                            touched.short_description
                          }
                          errorMessage={
                            errors.short_description &&
                            touched.short_description
                              ? errors.short_description
                              : null
                          }
                          value={values.short_description}
                        />
                        <div className="mb-3">
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
                        <Select
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
                                brand.is_deleted === false && (
                                  <SelectItem
                                    key={brand._id}
                                    value={brand._id}
                                    textValue={brand.name}
                                  >
                                    {brand.name}
                                  </SelectItem>
                                )
                              );
                            })}
                        </Select>
                        <Select
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
                          {Array.isArray(GetCategory) &&
                            GetCategory.map((category) => {
                              return (
                                category.is_deleted === false && (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                    textValue={category.name}
                                  >
                                    {category.name}
                                  </SelectItem>
                                )
                              );
                            })}
                        </Select>
                        <Select
                          className="mb-3"
                          isRequired
                          color={
                            touched.subcategory_id &&
                            errors.subcategory_id &&
                            "danger"
                          }
                          label="Sub Category"
                          isInvalid={
                            touched.subcategory_id && errors.subcategory_id
                          }
                          selectedKeys={
                            values.subcategory_id && [values.subcategory_id]
                          }
                          onBlur={handleBlur}
                          errorMessage={
                            touched.subcategory_id && errors.subcategory_id
                          }
                          name="subcategory_id"
                          onChange={handleChange}
                        >
                          {Array.isArray(GetSubCategory) &&
                            GetSubCategory.filter(
                              (item) =>
                                item.category_id._id === values.category_id
                            ).map((subcategory) => {
                              return (
                                <SelectItem
                                  key={subcategory._id}
                                  value={subcategory._id}
                                  textValue={subcategory.name}
                                >
                                  {subcategory.name}
                                </SelectItem>
                              );
                            })}
                        </Select>
                        <Select
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
                              return (
                                unit.is_deleted === false && (
                                  <SelectItem
                                    key={unit._id}
                                    value={unit._id}
                                    textValue={unit.name}
                                  >
                                    {unit.name} [{unit.unit_code}]
                                  </SelectItem>
                                )
                              );
                            })}
                        </Select>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Checkbox
                              className="max-h-fit  h-fit"
                              name="tax_details.is_tax_included"
                              isSelected={values.tax_details.is_tax_included}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              Is Tax Included
                            </Checkbox>
                          </div>
                          <div>
                            <Checkbox
                              className="max-h-fit  h-fit"
                              name="cancellable.is_cancellable"
                              isSelected={values.cancellable.is_cancellable}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            >
                              Is Cancellable
                            </Checkbox>
                          </div>

                          <div></div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 my-2">
                          <Select
                            isRequired={!values.tax_details.is_tax_included}
                            isDisabled={values.tax_details.is_tax_included}
                            className="mb-3"
                            label="Tax"
                            color={
                              touched.tax_details?.tax_id &&
                              errors.tax_details?.tax_id &&
                              "danger"
                            }
                            name="tax_details?.tax_id"
                            isInvalid={
                              touched.tax_details?.tax_id &&
                              errors.tax_details?.tax_id
                            }
                            onBlur={handleBlur}
                            errorMessage={
                              touched.tax_details?.tax_id &&
                              errors.tax_details?.tax_id
                            }
                            onChange={handleChange}
                            selectedKeys={
                              values.tax_details?.tax_id && [
                                values.tax_details?.tax_id,
                              ]
                            }
                          >
                            {Array.isArray(GetTax) &&
                              GetTax.map((tax) => {
                                return (
                                  tax.is_deleted === false && (
                                    <SelectItem
                                      key={tax._id}
                                      value={tax._id}
                                      textValue={tax.name}
                                    >
                                      {tax.name} [{tax.value}]
                                    </SelectItem>
                                  )
                                );
                              })}
                          </Select>
                          <Select
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
                          </Select>

                          <div></div>
                        </div>

                        <div className="grid grid-cols-4 gap-1">
                          <Input
                            type="number"
                            label="Warranty [Months]"
                            name="warranty_period"
                            onChange={handleChange}
                            isRequired
                            onBlur={handleBlur}
                            isInvalid={
                              errors.warranty_period && touched.warranty_period
                            }
                            errorMessage={
                              touched.warranty_period && errors.warranty_period
                            }
                            value={values.warranty_period}
                          />
                          <Input
                            type="number"
                            label="Guarantee [Months] "
                            name="guarantee_period"
                            onChange={handleChange}
                            isRequired
                            onBlur={handleBlur}
                            isInvalid={
                              errors.guarantee_period &&
                              touched.guarantee_period
                            }
                            errorMessage={
                              touched.guarantee_period &&
                              errors.guarantee_period
                            }
                            value={values.guarantee_period}
                          />
                          <Input
                            type="number"
                            label="Min Order Quantity "
                            name="min_order_quantity"
                            onChange={handleChange}
                            isRequired
                            onBlur={handleBlur}
                            isInvalid={
                              errors.min_order_quantity &&
                              touched.min_order_quantity
                            }
                            errorMessage={
                              touched.min_order_quantity &&
                              errors.min_order_quantity
                            }
                            value={values.min_order_quantity}
                          />
                          <Input
                            type="number"
                            label="Max Order Quantity"
                            name="max_order_quantity"
                            onChange={handleChange}
                            isRequired
                            onBlur={handleBlur}
                            isInvalid={
                              errors.max_order_quantity &&
                              touched.max_order_quantity
                            }
                            errorMessage={
                              touched.max_order_quantity &&
                              errors.max_order_quantity
                            }
                            value={values.max_order_quantity}
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          <Autocomplete
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
                          </Autocomplete>
                          <Autocomplete
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
                          </Autocomplete>
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
                            <div className="mb-2">
                              <Select
                                label="Select an attribute category"
                                className="my-2"
                                selectedKeys={
                                  VariableAttributeCategory && [
                                    VariableAttributeCategory,
                                  ]
                                }
                                onChange={(e) =>
                                  setVariableAttributeCategory(e.target.value)
                                }
                                onBlur={handleBlur}
                                name="Attribute"
                              >
                                {Array.isArray(GetAttribute) &&
                                  GetAttribute.filter(
                                    (filterItem) => !filterItem.attribute_id
                                  ).map((attribute) => (
                                    <SelectItem
                                      textValue={attribute.name}
                                      key={attribute._id}
                                      value={attribute.value}
                                    >
                                      {attribute.name}
                                    </SelectItem>
                                  ))}
                              </Select>
                              <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                <Listbox
                                  aria-label="Multiple selection example"
                                  variant="flat"
                                  selectionMode="multiple"
                                  selectedKeys={
                                    values.attributes?.find((attribute) =>
                                      Object.prototype.hasOwnProperty?.call(
                                        attribute,
                                        VariableAttributeCategory
                                      )
                                    )?.[VariableAttributeCategory]
                                  }
                                  onSelectionChange={(event) =>
                                    handleAttributeSelect(
                                      VariableAttributeCategory,
                                      event
                                    )
                                  }
                                >
                                  {Array.isArray(GetAttribute) &&
                                    GetAttribute.filter(
                                      (item) =>
                                        item.attribute_id?._id ===
                                        VariableAttributeCategory
                                    ).map((attribute) => (
                                      <ListboxItem
                                        textValue={attribute.name}
                                        key={attribute._id}
                                        value={attribute._id}
                                      >
                                        {attribute.name}
                                      </ListboxItem>
                                    ))}
                                </Listbox>
                              </div>
                            </div>
                          </div>
                          <div className="  col-6">
                            <span className="fs-3">Selected Attibutes</span>
                            <div className="my-2">
                              {Array.isArray(values.attributes) &&
                              values.attributes.length > 0
                                ? values.attributes.map((attribute) => {
                                    const attributeKey =
                                      Object.keys(attribute)[0];
                                    const attributeValues =
                                      attribute[attributeKey];

                                    return (
                                      <div
                                        className="d-flex items-center my-2"
                                        key={attributeKey}
                                      >
                                        <Chip
                                          variant="flat"
                                          color="primary"
                                          size="lg"
                                          className=" py-2 h-fit"
                                        >
                                          {CustomFind(
                                            GetAttribute,
                                            attributeKey,
                                            "name"
                                          )}
                                        </Chip>
                                        <p className="p-0 mx-1 fs-2"> : </p>
                                        <ScrollShadow
                                          orientation="horizontal"
                                          className="max-w-[100%] flex"
                                        >
                                          {attributeValues.map((item) => (
                                            <Chip
                                              className="h-fit p-1 mx-2"
                                              key={item}
                                              variant="bordered"
                                              onClose={() =>
                                                handleAttributeSelect(
                                                  attributeKey,
                                                  item,
                                                  "deleteAttribute"
                                                )
                                              }
                                            >
                                              {CustomFind(
                                                GetAttribute,
                                                item,
                                                "name"
                                              )}
                                            </Chip>
                                          ))}
                                        </ScrollShadow>
                                      </div>
                                    );
                                  })
                                : "No attributes Selected"}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-medium">Variation Table</span>
                          <Button
                            size="sm"
                            className="text-danger-600"
                            startContent={<IconTrash />}
                            onPress={DeleteVarients}
                          >
                            Delete Rows
                          </Button>
                        </div>
                        <Table
                          aria-labelledby="Variation-Table"
                          removeWrapper={true}
                          // selectionMode="multiple"
                          // onSelectionChange={HandleVarients}
                          // selectedKeys={SelectedVarientionRows}
                          className="mt-3 h-[350] overflow-y-scroll"
                        >
                          <TableHeader>
                            <TableColumn>#</TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Manucature Price</TableColumn>
                            <TableColumn>Retail Price</TableColumn>
                            <TableColumn>Special Price</TableColumn>
                            <TableColumn>Tax</TableColumn>
                            <TableColumn>Margin</TableColumn>
                            <TableColumn>Action</TableColumn>
                          </TableHeader>
                          <TableBody emptyContent="No Data Found">
                            {Array.isArray(values.variations) &&
                              values.variations.map((variation, index) => (
                                <TableRow key={variation.attribute_ids}>
                                  <TableCell>
                                    <Checkbox
                                      onChange={(event) =>
                                        HandleVarients(
                                          variation.attribute_ids.toString(),
                                          event
                                        )
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {variation.attribute_ids
                                      .map((item) =>
                                        CustomFind(GetAttribute, item, "name")
                                      )
                                      .join("-")}
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      values={variation.menufacture_price}
                                      name={`variation.[${index}].menufacture_price`}
                                      type="number"
                                      label=" Price"
                                      onChange={handleChange}
                                      onBlue={handleBlur}
                                      isInvalid={
                                        touched?.variations?.[index]
                                          ?.manufacture_price &&
                                        errors?.variations?.[index]
                                          ?.manufacture_price
                                      }
                                      errorMessage={
                                        touched?.variations?.[index]
                                          ?.manufacture_price &&
                                        errors?.variations?.[index]
                                          ?.manufacture_price
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      values={variation.retail_price}
                                      name={`variation.[${index}].retail_price`}
                                      type="number"
                                      label=" Price"
                                      onChange={handleChange}
                                      onBlue={handleBlur}
                                      isInvalid={
                                        touched?.variations?.[index]
                                          ?.retail_price &&
                                        errors?.variations?.[index]
                                          ?.retail_price
                                      }
                                      errorMessage={
                                        touched?.variations?.[index]
                                          ?.manufacture_price &&
                                        errors?.variations?.[index]
                                          ?.retail_price
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      values={variation.special_price}
                                      name={`variation.[${index}].special_price`}
                                      type="number"
                                      label=" Price"
                                      onChange={handleChange}
                                      onBlue={handleBlur}
                                      isInvalid={
                                        touched?.variations?.[index]
                                          ?.special_price &&
                                        errors?.variations?.[index]
                                          ?.special_price
                                      }
                                      errorMessage={
                                        touched?.variations?.[index]
                                          ?.manufacture_price &&
                                        errors?.variations?.[index]
                                          ?.special_price
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      type="number"
                                      label="Tax"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      type="number"
                                      label="Price"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      size="sm"
                                      className="rounded"
                                      type="number"
                                      label="Price"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
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
                            <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                              <Listbox
                                aria-label="Multiple selection example"
                                variant="flat"
                                selectionMode="multiple"
                              >
                                {Array.isArray(GetAddresses) &&
                                  GetAddresses.filter(
                                    (item) =>
                                      item.is_pickup_address &&
                                      item.seller_id === profile?._id
                                  ).map((address) => (
                                    <ListboxItem
                                      textValue={address.name}
                                      key={address._id}
                                      value={address._id}
                                    >
                                      {address.name}
                                    </ListboxItem>
                                  ))}
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
                              const add = {
                                question: null,
                                answer: null,
                              };
                              setValues({
                                ...values,
                                faqs: [...values.faqs, [add]],
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
                                <Input
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
