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
import PriceTable from "./PriceTable";
import { CreateProductAction, GetProductAction } from "../../../Services/Actions/Product";

const AddProduct = () => {
    const dispatch = useDispatch();
    const brandState = useSelector((state) => state.brandState);
    const categoryState = useSelector((state) => state.categoryState);
    const subcategoryState = useSelector((state) => state.subcategoryState);
    const attributeState = useSelector((state) => state.attributeState);
    const unitState = useSelector(state => state.unitState)
    const productState = useSelector(state => state.productState)
    const [Section, setSection] = useState("Information");
    const [SubCategories, setSubCategories] = useState([]);
    const [Attributes, setAttributes] = useState([]);
    const [SelectedAttribute, setSelectedAttribute] = useState();
    const [SelectedAttributes, setSelectedAttributes] = useState();
    const [AttributeValues, setAttributeValues] = useState();
    const [RemovedCombinations, setRemovedCombinations] = useState([]);

    const handleProduct = (values) => {
        const body = {
            ...values,
            attributes: values.attributes?.map((attribute) => {
                return {
                    _id: attribute.attribute_id,
                    values: attribute.values.map((value) => value._id)
                }
            })
        }
        dispatch(CreateProductAction(body))
    }

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
        initialValues: ProductInitialState,
        validationSchema: ProductSchema,
        onSubmit: () => {
            handleProduct(values)
        },
    });
    useEffect(() => {
        if (productState?.error || productState?.DeleteRecoverProduct || productState?.EditProduct || productState?.AddProduct) {
            resetForm()
        }
    }, [productState?.AddProduct, productState?.DeleteRecoverProduct, productState?.EditProduct, productState?.error, resetForm])
console.log(productState)
    useEffect(() => {
        const ActiveSubCategories = subcategoryState?.GetSubCategory?.filter(
            (subcategory) => {
                return subcategory.is_deleted === false;
            }
        );
        if (values.category_id) {
            const OptionOfSubCategories = ActiveSubCategories.filter(
                (subcategory) => {
                    return subcategory?.category_id?._id === values?.category_id?._id;
                }
            );
            setSubCategories(OptionOfSubCategories);
        }

        const Attributes = attributeState?.GetAttribute?.filter((attribute) => {
            return !attribute?.attribute_id && attribute?.is_deleted === false;
        });
        setAttributes(Attributes);
    }, [
        attributeState?.GetAttribute,
        subcategoryState?.GetSubCategory,
        values.category_id,
        SelectedAttribute,
    ]);

    const handleAttributes = (Attribute) => {
        setSelectedAttribute(Attribute);
        const Values = attributeState?.GetAttribute?.filter((value) => {
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


    return (
        <>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <div className="row">
                            <div className="col-2 p-0 border border-2 pe-2 border-start-0 border-top-0 border-bottom-0  border-black ">
                                <div className="d-flex flex-column ">
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Information")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer text-${Section === "Information" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fa-solid fa-circle-info me-2"></i>
                                            Information
                                        </p>
                                    </div>
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Association")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Association" ? "dark" : "secondary"
                                                }`}
                                        >
                                            <i className="fas fa-chain me-2"></i> Association
                                        </p>
                                    </div>
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Prices")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Prices" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fas fa-inr me-2"></i>Prices
                                        </p>
                                    </div>
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("SEO")}
                                    >
                                        <p className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "SEO" ? "dark" : "secondary"} `}>
                                            <i className="fas fa-book me-2"></i>SEO
                                        </p>
                                    </div>
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Shipping")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Shipping" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fas fa-truck-fast me-2"></i>Shipping
                                        </p>
                                    </div>

                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Images")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Images" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fas fa-image me-2"></i>Images
                                        </p>
                                    </div>

                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Attachment")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Attachment" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fas fa-paperclip me-2"></i>Attachment
                                        </p>
                                    </div>
                                    <div
                                        className="card card-body p-0 mb-3"
                                        onClick={() => setSection("Others")}
                                    >
                                        <p
                                            className={`p-2 d-flex align-items-center cursor-pointer  text-${Section === "Others" ? "dark" : "secondary"
                                                } `}
                                        >
                                            <i className="fa-solid fa-cart-shopping me-2"></i>Others
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className=" grid-margin stretch-card ">
                                    <div className="card">
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex justify-content-between ">
                                                    <h6 className="card-title">
                                                        Add Product / {Section}
                                                    </h6>
                                                    <div className="d-flex ">
                                                        <a onClick={() => resetForm()} className="card-title btn btn-outline-danger text-dark text-decoration-none  p-2 mx-1"> Reset Product  </a>
                                                        <input type="submit" className="card-title btn btn-green text-decoration-none ms-1 border p-2" value={"Save Product"} />

                                                    </div>
                                                </div>
                                                <div className={Section !== "Information" && "d-none"}>
                                                    <div className="mb-3 d-flex ">
                                                        <div className="form-selectgroup d-flex align-items-center me-3">
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
                                                        <div className="form-selectgroup d-flex align-items-center">
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
                                                                <span className="form-selectgroup-label">
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
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Product Name</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.name}
                                                            id="name"
                                                            className={`my-2 form-control ${touched.name && errors.name && "is-invalid"
                                                                }`}
                                                            name="name"
                                                            type="text"
                                                            required
                                                            placeholder="Enter Product Name"
                                                        />
                                                        {touched.name && errors.name && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Product SKU Code</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.SKU}
                                                            id="SKU"
                                                            className={`my-2 form-control ${touched.SKU && errors.SKU && "is-invalid"
                                                                }`}
                                                            name="SKU"
                                                            type="text"
                                                            required
                                                            placeholder="Enter Product Name"
                                                        />
                                                        {touched.SKU && errors.SKU && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.SKU}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">
                                                            Product Main Description
                                                        </label>
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
                                                    <div className="form-group mb-3">
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
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Product Tags</label>
                                                        <TagsInput
                                                            classNames="form-control my-1"
                                                            onChange={(event) => setFieldValue("tags", event)}
                                                            name="tags"
                                                            placeHolder="Enter Tags"
                                                        />
                                                        <div className="d-flex justify-content-end">
                                                            {500 -
                                                                (values.tags ? values.tags.join("").length : 0)}
                                                            Character Left
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={Section !== "Prices" && "d-none"}>
                                                    {values?.attributes?.length > 0 ? (
                                                        <PriceTable
                                                            RemovedCombinations={RemovedCombinations}
                                                            setRemovedCombinations={setRemovedCombinations}
                                                            attributes={values.attributes}
                                                            setValues={setValues}
                                                            values={values}
                                                        />
                                                    ) : (
                                                        "Please select atleast one attribute from product"
                                                    )}
                                                </div>
                                                <div className={Section !== "Prices" && "d-none"}>

                                                </div>

                                                <div className={Section !== "SEO" && "d-none"}>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Meta Title</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.meta_title}
                                                            id="name"
                                                            className={`my-2 form-control ${touched.meta_title &&
                                                                errors.meta_title &&
                                                                "is-invalid"
                                                                }`}
                                                            name="meta_title"
                                                            type="text"
                                                            required
                                                            placeholder="Enter Meta Title"
                                                        />
                                                        {touched.meta_title && errors.meta_title && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.meta_title}
                                                            </p>
                                                        )}
                                                    </div>


                                                    <div className="form-group mb-3">
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
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Friendly URL</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.friendly_url}
                                                            id="name"
                                                            className={`my-2 form-control ${touched.friendly_url &&
                                                                errors.friendly_url &&
                                                                "is-invalid"
                                                                }`}
                                                            name="friendly_url"
                                                            type="text"
                                                            required
                                                            placeholder="Enter a Keyword as You Want To Create URL"
                                                        />
                                                        {touched.friendly_url && errors.friendly_url && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.friendly_url}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={Section !== "Shipping" && "d-none"}>
                                                    {/* TODO */}
                                                    Shipping Section TODO
                                                </div>

                                                <div className={Section !== "Association" && "d-none"}>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name"> Brand </label>
                                                        <ReactSelect
                                                            className="bg-primary text-primary my-1"
                                                            value={
                                                                values?.brand_id
                                                                    ? {
                                                                        value: values?.brand_id?._id,
                                                                        label: values?.brand_id?.name,
                                                                    }
                                                                    : null
                                                            }
                                                            onBlur={() => setFieldTouched("brand_id", true)}
                                                            onChange={(value) => {
                                                                setFieldValue("brand_id", value.values);
                                                            }}
                                                            name="brand_id"
                                                            options={
                                                                Array.isArray(brandState.GetBrand) &&
                                                                brandState.GetBrand?.map((brand) => {
                                                                    return {
                                                                        label: brand?.name,
                                                                        values: brand,
                                                                    };
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                    {touched.brand_id && errors.brand_id && (
                                                        <p className="h6 text-danger mt-1">
                                                            Product {errors.brand_id}
                                                        </p>
                                                    )}

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name"> Category </label>
                                                        <ReactSelect
                                                            className="bg-primary text-primary my-1"
                                                            value={
                                                                values?.category_id
                                                                    ? {
                                                                        value: values?.category_id,
                                                                        label: values?.category_id?.name,
                                                                    }
                                                                    : null
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched("category_id", true)
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue("category_id", value.values);
                                                            }}
                                                            name="category_id"
                                                            options={
                                                                Array.isArray(categoryState.GetCategory) &&
                                                                categoryState.GetCategory?.map((category) => {
                                                                    return {
                                                                        label: category?.name,
                                                                        values: category,
                                                                    };
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                    {touched.category_id && errors.category_id && (
                                                        <p className="h6 text-danger mt-1">
                                                            Product {errors.category_id}
                                                        </p>
                                                    )}

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Sub Category</label>
                                                        <ReactSelect
                                                            className="bg-primary text-primary my-1"
                                                            value={
                                                                values?.subcategory_id
                                                                    ? {
                                                                        value: values?.subcategory_id,
                                                                        label: values?.subcategory_id?.name,
                                                                    }
                                                                    : null
                                                            }
                                                            onBlur={() =>
                                                                setFieldTouched("subcategory_id", true)
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue("subcategory_id", value.values);
                                                            }}
                                                            name="subcategory_id"
                                                            options={SubCategories?.map((subcategory) => {
                                                                return {
                                                                    label: subcategory?.name,
                                                                    values: subcategory,
                                                                };
                                                            })}
                                                        />
                                                    </div>
                                                    {touched.subcategory_id && errors.subcategory_id && (
                                                        <p className="h6 text-danger mt-1">
                                                            Product {errors.subcategory_id}
                                                        </p>
                                                    )}

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Unit</label>
                                                        <ReactSelect
                                                            className="bg-primary text-primary my-1"
                                                            value={
                                                                values?.unit_id ? {
                                                                    value: values?.unit_id,
                                                                    label: values?.unit_id?.name + " (" + values?.unit_id?.unit_code + ") "
                                                                } : null
                                                            }
                                                            onBlur={() => setFieldTouched("unit_id", true)}
                                                            onChange={(value) => { setFieldValue("unit_id", value.values) }}
                                                            name="unit_id"
                                                            options={Array.isArray(unitState.GetUnit) && unitState.GetUnit?.map((unit) => {
                                                                return {
                                                                    label: unit?.name + " (" + unit?.unit_code + ")",
                                                                    values: unit
                                                                }
                                                            })}
                                                        />
                                                    </div>
                                                    {(touched.unit_id && errors.unit_id) && <p className="h6 text-danger mt-1"> Product {errors.unit_id} </p>}

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name" className="my-1">
                                                            Attribute
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <ReactSelect
                                                                    className="my-2"
                                                                    onChange={(event) =>
                                                                        handleAttributes(event.value)
                                                                    }
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
                                                            </div>
                                                            <div className="col d-flex flex-column my-2  ">
                                                                <button
                                                                    className=" btn btn-dark"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#ShowAttributeModal"
                                                                    disabled={values?.attributes === ""}
                                                                >
                                                                    Show Attributes
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className={Section !== "Others" && "d-none"}>
                                                    <div className="mb-3 d-flex ">
                                                        <label className="form-check form-switch mx-2">
                                                            <input className="form-check-input" type="checkbox" name="cancellable" onChange={(event) => setFieldValue("cancellable", event.target.checked)} checked={values.cancellable} />
                                                            <span className="form-check-label">Cancellable</span>
                                                        </label>
                                                        <label className="form-check form-switch mx-2">
                                                            <input className="form-check-input" type="checkbox" name="replaceable" onChange={(event) => setFieldValue("replaceable", event.target.checked)} checked={values.replaceable} />
                                                            <span className="form-check-label">Replaceable</span>
                                                        </label>
                                                        <label className="form-check form-switch mx-2">
                                                            <input className="form-check-input" type="checkbox" name="returnable" onChange={(event) => setFieldValue("returnable", event.target.checked)} checked={values.returnable} />
                                                            <span className="form-check-label">Returnable</span>
                                                        </label>
                                                    </div>


                                                    <div className="form-group mb-3 ">
                                                        <label htmlFor="name">Minimum Order Quantity</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.min_order_quantity}
                                                            id="min_order_quantity"
                                                            className={`my-2 form-control ${touched.min_order_quantity &&
                                                                errors.min_order_quantity &&
                                                                "is-invalid"
                                                                }`}
                                                            name="min_order_quantity"
                                                            type="number"
                                                            required
                                                            placeholder="Enter Minimum Order Quantity "
                                                        />
                                                        {touched.min_order_quantity && errors.min_order_quantity && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.min_order_quantity}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="form-group mb-3 ">
                                                        <label htmlFor="name">Maximum Order Quantity</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.max_order_quantity}
                                                            id="max_order_quantity"
                                                            className={`my-2 form-control ${touched.max_order_quantity &&
                                                                errors.max_order_quantity &&
                                                                "is-invalid"
                                                                }`}
                                                            name="max_order_quantity"
                                                            type="number"
                                                            required
                                                            placeholder="Enter Maximum Order Quantity"
                                                        />
                                                        {touched.max_order_quantity && errors.max_order_quantity && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.max_order_quantity}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="form-group mb-3 ">
                                                        <label htmlFor="name">Warranty</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.warranty}
                                                            id="warranty"
                                                            className={`my-2 form-control ${touched.warranty &&
                                                                errors.warranty &&
                                                                "is-invalid"
                                                                }`}
                                                            name="warranty"
                                                            type="number"
                                                            required
                                                            placeholder="Enter Warranty [In Months]"
                                                        />
                                                        {touched.warranty && errors.warranty && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.warranty}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Guarantee</label>
                                                        <input
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values?.guarantee}
                                                            id="guarantee"
                                                            className={`my-2 form-control ${touched.guarantee &&
                                                                errors.guarantee &&
                                                                "is-invalid"
                                                                }`}
                                                            name="guarantee"
                                                            type="number"
                                                            required
                                                            placeholder="Enter Guarantee [In Months]"
                                                        />
                                                        {touched.guarantee && errors.guarantee && (
                                                            <p className="h6 text-danger mt-1">
                                                                Product {errors.guarantee}
                                                            </p>
                                                        )}
                                                    </div>

                                                </div>


                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
