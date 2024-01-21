import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  Card,
  CardBody,
  Chip,
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { CustomFind } from "../../Configurations/Config";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { GetBrand } = useSelector((state) => state.brandState);
  const { GetCategory } = useSelector((state) => state.categoryState);
  const { GetSubCategory } = useSelector((state) => state.subcategoryState);
  const { GetAttribute } = useSelector((state) => state.attributeState);
  const { GetUnit } = useSelector((state) => state.unitState);
  const { DeleteRecoverProduct, EditProduct, AddProduct } = useSelector(
    (state) => state.productState
  );
  const [ActiveTab, setActiveTab] = useState(0);
  const [VariableAttributeCategory, setVariableAttributeCategory] =
    useState(null);

  const handleProduct = (values) => {
    //  dispatch(CreateProductAction(values));
  };

  useEffect(() => {
    dispatch(GetBrandAction());
    dispatch(GetCategoryAction());
    dispatch(GetSubCategoryAction());
    dispatch(GetUnitAction());
    dispatch(GetAttributeAction());
    dispatch(GetProductAction());
  }, [dispatch]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: { ...ProductInitialState },
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
      Object.prototype.hasOwnProperty.call(item, attribute)
    );

    if (type === "deleteAttribute") {
      attribute = Object.keys(UpdateArray[index])[0];
      let UpdateValue = UpdateArray[index][attribute];
       const valueindex = UpdateValue.findIndex((item) => {
        return item === selectedItems.join('').toString();
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
    setFieldValue(`attributes`, UpdateArray);
  };

  useEffect(() => {
    const generateCombinations = (arr, i, result, current) => {
      if (i === arr.length) {
        result.push([...current]);
        return;
      }
      const attributeId = Object.keys(arr[i])[0];
      const attributeValues = arr[i][attributeId];

      for (const valueId of attributeValues) {
        current.push({ attribute_id: attributeId, value_id: valueId });
        generateCombinations(arr, i + 1, result, current);
        current.pop();
      }
    };

    const combinations = [];
    if (values?.attributes?.length > 0) {
      generateCombinations(values?.attributes, 0, combinations, []);
    }

    const Combinations = combinations.map((combination) => {
      return {
        attribute_ids: combination.map(({ attribute_id }) => attribute_id),
        manufacture_price: null,
        retail_price: null,
        special_price: null,
      };
    });

    setFieldValue("variation", Combinations);
  }, [setFieldValue, values?.attributes]);

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
                    title="Information"
                    className="w-full max-h-full mx-2 py-1 "
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
                    title="Association "
                    className="w-full max-h-full mx-2 py-1"
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

                        <p className="fs-3">Attributes</p>

                        {/* <ReactSelect
                        className="my-3"
                        onChange={(event) => handleAttributes(event.value)}
                        value={
                          SelectedAttribute
                            ? {
                                value: SelectedAttribute?._id,
                                label: SelectedAttribute?.name,
                              }
                            : null
                        }
                        options={Attributes?.map((attribute) => {
                          return {
                            label: attribute?.name,
                            value: attribute,
                          };
                        })}
                      />
                      <ReactSelect
                        className="mb-3"
                        isMulti
                        value={SelectedAttributes}
                        onChange={(selectedOptions) => {
                          setSelectedAttributes(selectedOptions);
                        }}
                        options={AttributeValues?.map((value) => {
                          return {
                            label: value?.name,
                            value: value,
                          };
                        })}
                      /> */}
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    className="w-full max-h-full mx-2 py-1"
                    key="Price"
                    title={
                      values?.product_type === "Standard"
                        ? "Price"
                        : "Varientions"
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
                                    values.attributes.find((attribute) =>
                                      Object.prototype.hasOwnProperty.call(
                                        attribute,
                                        VariableAttributeCategory
                                      )
                                    )?.[VariableAttributeCategory] || []
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
                                        <ScrollShadow orientation="horizontal" className="max-w-[100%] flex">
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
                        {/* {values.price?.length > 0 && (
                          <Table
                            aria-label="Example table with client side sorting"
                            classNames={{
                              table: "min-h-[400px]",
                            }}
                          >
                       
                         
                          </Table>
                        )} */}
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab
                    key="SEO"
                    title="SEO"
                    className="w-full max-h-full mx-2 py-1"
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
                    title="Submit"
                    className="w-full max-h-full mx-2 py-1"
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
      <div
        className="modal modal-blur fade "
        id="ShowAttributeModal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <table className="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Values</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {values?.attributes &&
                    values?.attributes?.map((Attribute) => {
                      return (
                        <>
                          <tr>
                            <td className="py-0">
                              {Attribute?.attribute_name}
                            </td>
                            <td className="text-secondary py-0">
                              {Attribute?.values?.map((value) => {
                                return (
                                  <span
                                    className=" m-2 ms-0 badge badge-danger rounded "
                                    key={value?._id}
                                  >
                                    {value?.name}
                                  </span>
                                );
                              })}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
