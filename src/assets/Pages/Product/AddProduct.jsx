import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { ProductSchema } from "../../Configurations/YupSchema";
import { ProductInitialState } from "../../Configurations/InitialStates";
import ReactSelect from "react-select";
import { GetCategoryAction } from "../../../Services/Actions/Category";
import { GetSubCategoryAction } from "../../../Services/Actions/SubCategory";
import { GetBrandAction } from "../../../Services/Actions/Brand";
import { GetUnitAction } from "../../../Services/Actions/Unit";
import { GetAttributeAction } from "../../../Services/Actions/Attribute";
import {
  CreateProductAction,
  GetProductAction,
} from "../../../Services/Actions/Product";
import { Select, SelectItem } from "@nextui-org/select";
import { Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";

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
   const [SubCategories, setSubCategories] = useState([]);
  const [Attributes, setAttributes] = useState([]);
  const [SelectedAttribute, setSelectedAttribute] = useState();
  const [ActiveTab, setActiveTab] = useState(0);
  const [SelectedAttributes, setSelectedAttributes] = useState();
  const [AttributeValues, setAttributeValues] = useState();

  const handleProduct = (values) => {
    dispatch(CreateProductAction(values));
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
    setValues,
    setTouched,
    setErrors,
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: { ...ProductInitialState },
    validationSchema: ProductSchema,
    onSubmit: () => {
      handleProduct(values);
    },
  });
    console.log(" values", values)
  useEffect(() => {
    if (DeleteRecoverProduct || EditProduct || AddProduct) {
      resetForm();
    }
  }, [AddProduct, DeleteRecoverProduct, EditProduct, resetForm]);
  useEffect(() => {
    const ActiveSubCategories = GetSubCategory?.filter((subcategory) => {
      return subcategory.is_deleted === false;
    });
    if (values.category_id) {
      const OptionOfSubCategories = ActiveSubCategories.filter(
        (subcategory) => {
          return subcategory?.category_id?._id === values?.category_id?._id;
        }
      );
      setSubCategories(OptionOfSubCategories);
    }

    const Attributes = GetAttribute?.filter((attribute) => {
      return !attribute?.attribute_id && attribute?.is_deleted === false;
    });
    setAttributes(Attributes);
  }, [GetAttribute, GetSubCategory, values.category_id, SelectedAttribute]);

  const handleAttributes = (Attribute) => {
    setSelectedAttribute(Attribute);
    const Values = GetAttribute?.filter((value) => {
      return value.attribute_id && value.attribute_id?._id === Attribute?._id;
    });
    setAttributeValues(Values);
  };

  useEffect(() => {
    const tempAttribute = SelectedAttributes?.map((val) => {
      const attribute_id = val?.value?.attribute_id?._id;
      const attribute_name = val?.value?.attribute_id?.name;
      const tempValues = SelectedAttributes?.filter((attrvalue) => {
        return attrvalue?.value?.attribute_id?._id === attribute_id;
      });
      return {
        attribute_id,
        attribute_name,
        values: tempValues?.map((value) => {
          return {
            _id: value?.value?._id,
            name: value?.value?.name,
          };
        }),
      };
    });

    const uniqueObject = {};
    const uniqueData = tempAttribute?.reduce((acc, item) => {
      const key = item["attribute_id"];
      if (!uniqueObject[key]) {
        uniqueObject[key] = true;
        acc.push(item);
      }
      return acc;
    }, []);

    setFieldValue("attributes", uniqueData);
  }, [SelectedAttributes, setFieldValue]);

  // const ProductTax = 12;

  useEffect(() => {
    const generateCombinations = (arr, i, result, current) => {
      if (i === arr.length) {
        result.push([...current]);
        return;
      }
      for (const value of arr[i].values) {
        current.push({ attribute: arr[i], value });
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
        attribute_ids: combination.map(({ value }) => value._id),
        variation: combination
          .map(({ value }) => value.name)
          .toString()
          .split(",")
          .join("-"),
        manufacture_price: "",
        retail_price: "",
        company_cost: "",
        margin: "",
        tax: "",
      };
    });
    setFieldValue("price", Combinations);
  }, [setFieldValue, values?.attributes]);

  const handleRemove = (index) => {
    const updatePrice = [...values.price];
    updatePrice.splice(index, 1);
    setValues({ ...values, price: updatePrice });
    const updateErrors = [...errors.price];
    updateErrors.splice(index, 1);
    setErrors({ ...errors, price: updateErrors });
    const updateTouched = [...touched.price];
    updateTouched.splice(index, 1);
    setTouched({ ...touched, price: updateTouched });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl ">
            <div className="flex">
              <Tabs selectedKey={ActiveTab} onSelectionChange={setActiveTab}>
                <Tab key="-" title="Submit" className="w-full mx-2">
                  <Card>
                    <CardBody>
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
                <Tab
                  key="Information"
                  title="Information"
                  className="w-full mx-2"
                >
                  <Card>
                    <CardBody>
                      <div className="mb-3 flex justify-self-auto">
                        <div className="form-selectgroup flex me-3 align-items-center">
                          <label className="form-label me-2">Type : </label>
                          <label className="form-selectgroup-item">
                            <input
                              type="radio"
                              name="type"
                              value="Standard"
                              className="form-selectgroup-input"
                              onChange={handleChange}
                              checked={values.type === "Standard"}
                            />
                            <span className="form-selectgroup-label">
                              Standard
                            </span>
                          </label>
                          <label className="form-selectgroup-item">
                            <input
                              type="radio"
                              name="type"
                              value="Pack Of"
                              className="form-selectgroup-input"
                              onChange={handleChange}
                              checked={values.type === "Pack Of"}
                            />
                            <span className="form-selectgroup-label">
                              Pack Of
                            </span>
                          </label>
                        </div>
                        <div className="form-selectgroup d-flex align-items-center me-2">
                          <label className="form-label me-2">Freshness :</label>
                          <label className="form-selectgroup-item">
                            <input
                              type="radio"
                              name="freshness"
                              value="New"
                              className="form-selectgroup-input"
                              onChange={handleChange}
                              checked={values.freshness === "New"}
                            />
                            <span className="form-selectgroup-label">New</span>
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
                            <span className="form-selectgroup-label">
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
                            <span className="form-selectgroup-label">
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
                            <span className="form-selectgroup-label">
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
                            <span className="form-selectgroup-label">
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
                        errorMessage={
                          errors.name && touched.name ? errors.name : null
                        }
                        value={values.names}
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
                          errors.short_description && touched.short_description
                        }
                        errorMessage={
                          errors.short_description && touched.short_description
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
                        <label htmlFor="name">Product Extra Description</label>
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
                  className="w-full mx-2"
                >
                  <Card>
                    <CardBody>
                      <Select
                        className="mb-3"
                        isRequired
                        label="Brand"
                        name="brand_id"
                        isInvalid={touched.brand_id && errors.brand_id}
                        onBlur={handleBlur}
                        value={values.brand_id}
                        errorMessage={
                          touched.category_id && errors.category_id
                            ? errors.category_id
                            : ""
                        }
                        onChange={handleChange}
                      >
                        {Array.isArray(GetBrand) &&
                          GetBrand.map((brand) => {
                            return (
                              brand.is_deleted === false && (
                                <SelectItem key={brand._id} value={brand._id}>
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
                        value={values.category_id}
                        isInvalid={touched.category_id && errors.category_id}
                        onBlur={handleBlur}
                        errorMessage={
                          touched.category_id && errors.category_id
                            ? errors.category_id
                            : ""
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
                        value={values.subcategory_id}
                        label="Sub Category"
                        isInvalid={
                          touched.subcategory_id && errors.subcategory_id
                        }
                        onBlur={handleBlur}
                        errorMessage={
                          touched.subcategory_id && errors.subcategory_id
                            ? errors.subcategory_id
                            : null
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
                        name="unit_id"
                        selectedKeys={values.unit_id}
                        isInvalid={touched.unit_id && errors.unit_id}
                        onBlur={handleBlur}
                        errorMessage={
                          touched.unit_id && errors.unit_id
                            ? errors.unit_id
                            : ""
                        }
                        onChange={handleChange}
                      >
                        {Array.isArray(GetUnit) &&
                          GetUnit.map((unit) => {
                            return (
                              unit.is_deleted === false && (
                                <SelectItem key={unit._id} value={unit._id}>
                                  {unit.name} [{unit.unit_code}]
                                </SelectItem>
                              )
                            );
                          })}
                      </Select>

                      <ReactSelect
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
                      />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab
                  className="w-full mx-2"
                  key="Price"
                  title={
                    values?.product_type === "Standard"
                      ? "Price"
                      : "Varientions"
                  }
                >
                  <Card>
                    <CardBody>
                      {values?.attributes?.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Model</th>
                                <th>Manufacture Price </th>
                                <th>Selling Price</th>
                                <th>Tax (12% GST)</th>
                                <th>CTC</th>
                                <th>Margin </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values?.price?.map((combination, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{combination?.variation}</td>
                                    <td>
                                      <div className="form-group">
                                        <input
                                          value={
                                            values?.price?.[index]
                                              ?.manufacture_price
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          className={` form-control  ${
                                            touched.price?.[index]
                                              ?.manufacture_price &&
                                            errors.price?.[index]
                                              ?.manufacture_price &&
                                            "is-invalid"
                                          } `}
                                          name={`price.${[
                                            index,
                                          ]}.manufacture_price`}
                                          type="number"
                                          required
                                          placeholder={
                                            touched.price?.[index]
                                              ?.manufacture_price &&
                                            errors.price?.[index]
                                              ?.manufacture_price
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="form-group">
                                        <input
                                          value={
                                            values?.price[index]?.retail_price
                                          }
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          className={` form-control  ${
                                            touched?.price?.[index]
                                              ?.retail_price &&
                                            errors.price?.[index]
                                              ?.retail_price &&
                                            "is-invalid"
                                          }  `}
                                          name={`price.${[index]}.retail_price`}
                                          type="number"
                                          required
                                          placeholder={
                                            touched.price?.[index]
                                              ?.retail_price &&
                                            errors.price?.[index]?.retail_price
                                          }
                                        />
                                      </div>
                                    </td>

                                    <td>{values.price[index]?.tax || 0.0}</td>
                                    <td>
                                      {values.price[index]?.company_cost || 0.0}
                                    </td>
                                    <td>
                                      {values.price[index]?.margin || 0.0}
                                    </td>
                                    <td className="text-center">
                                      <i
                                        className="fas fa-xmark text-red fs-3"
                                        onClick={() => handleRemove(index)}
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        "Please select atleast one attribute from product"
                      )}
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="SEO" title="SEO" className="w-full mx-2">
                  <Card>
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
              </Tabs>
            </div>
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
                <tbody>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
