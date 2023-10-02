import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { SubCategoryInitialState } from "../Configurations/InitialStates"
import { SubCategorySchema } from "../Configurations/YupSchema"
import { useFormik } from "formik"
import { CreateSubCategoryAction, DeleteSubCategoryAction, EditSubCategoryAction, GetSubCategoryAction } from "../../Services/Actions/SubCategory"
import moment from "moment/moment"
import Select from "react-select"
import { GetCategoryAction } from "../../Services/Actions/Category"


const SubCategory = () => {
    const dispatch = useDispatch()
    const subcategoryState = useSelector(state => state.subcategoryState)
    const categoryState = useSelector(state => state.categoryState)
    const ModalCloseRef = useRef();
    const [ModalState, setModalState] = useState("")

    const handleSubCategory = (values) => {
        const body = { ...values }
        if (ModalState === "Edit") {
            dispatch(EditSubCategoryAction(body))
        } else {
            dispatch(CreateSubCategoryAction(body))
        }
    }
    const handleEditSubCategory = (subcategory) => {
        setValues({
            ...subcategory
        })
        setModalState("Edit")
    }
    const handleDeleteSubCategory = (subcategory) => {
        setValues({
            ...subcategory
        })
        setModalState("Delete")

    }


    useEffect(() => {
        dispatch(GetSubCategoryAction())
        dispatch(GetCategoryAction())
    }, [dispatch])


    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm, setFieldValue, setValues } = useFormik({
        initialValues: SubCategoryInitialState,
        validationSchema: SubCategorySchema,
        onSubmit: () => handleSubCategory(values),
    })
    useEffect(() => {
        if (subcategoryState?.error || subcategoryState?.DeleteRecoverSubCategory || subcategoryState?.EditSubCategory || subcategoryState?.AddSubCategory) {
            ModalCloseRef?.current?.click()
            resetForm()
        }
    }, [resetForm, subcategoryState?.AddSubCategory, subcategoryState?.DeleteRecoverSubCategory, subcategoryState?.EditSubCategory, subcategoryState?.error])


    return (
        <>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">       
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between ">
                                        <h6 className="card-title">Total { } Sub Categories</h6>
                                        <div className="d-flex ">
                                            <h6 className="card-title cursor-pointer mx-4 text-danger" data-bs-toggle="modal" data-bs-target="#DeactivateModal" >Deleted Sub Categories</h6>
                                            <h6 onClick={() => setModalState("Add")} className="card-title cursor-pointer " data-bs-toggle="modal" data-bs-target="#SubCategoryModal" >Add SubCategory</h6>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>SubCategory</th>
                                                    <th>Category</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(subcategoryState.GetSubCategory) && subcategoryState.GetSubCategory?.length > 0 ?
                                                    subcategoryState.GetSubCategory?.map((subcategory, index) => {
                                                        return (subcategory?.is_deleted === false && <tr key={subcategory._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{subcategory.name}</td>
                                                            <td>{subcategory?.category_id?.name}</td>
                                                            <td>{moment(subcategory.createdAt).format("MMMM DD, YYYY")}</td>
                                                            <td>
                                                                <i onClick={() => handleEditSubCategory(subcategory)} className="fa-solid fa-pen me-3 text-warning  mr-2 " style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#SubCategoryModal" ></i>
                                                                <i onClick={() => handleDeleteSubCategory(subcategory)} className="fa-solid fa-trash ms-3 text-danger ml-2" style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#DeleteModal" ></i>
                                                            </td>
                                                        </tr>
                                                        )
                                                    })
                                                    : null

                                                }
                                            </tbody>
                                        </table>
                                        {(Array.isArray(subcategoryState?.GetSubCategory) && subcategoryState?.GetSubCategory?.every((subcategory) => subcategory?.is_deleted === true)) &&
                                            <div className="card my-1 mx-auto text-center">
                                                <span className="mt-1">    Data Not Found
                                                </span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="modal modal-blur fade " id="SubCategoryModal" tabIndex="-1" style={{ marginLeft: "0px" }} aria-modal="true" role="dialog">
                <div className="modal-dialog  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} className="cmxform" noValidate="novalidate">
                            <div className="modal-body">
                                <fieldset>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">SubCategory Name</label>
                                        <input onChange={handleChange} onBlur={handleBlur} value={values?.name} id="name" className={`form-control my-1 ${(touched.name && errors.name) && "is-invalid"}`} name="name" type="text" required placeholder="Enter SubCategory Name" />
                                        {(touched.name && errors.name) && <p className="h6 text-danger mt-1"> subcategory {errors.name} </p>}

                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">SubCategory Name</label>
                                        <Select
                                            className="bg-primary text-primary my-1"
                                            value={
                                                values?.category_id ? {
                                                    value: values?.category_id,
                                                    label: values?.category_id?.name
                                                } : null
                                            }
                                            onChange={(value) => { setFieldValue("category_id", value.values) }}
                                            name="category_id"
                                            options={Array.isArray(categoryState.GetCategory) && categoryState.GetCategory?.map((category) => {
                                                return {
                                                    label: category?.name,
                                                    values: category
                                                }
                                            })}
                                        />
                                        {(touched.category_id && errors.category_id) && <p className="h6 text-danger mt-1"> subcategory {errors.category_id} </p>}

                                    </div>


                                </fieldset>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" type="reset" onClick={resetForm}  > Reset</button>
                                <button ref={ModalCloseRef} className="btn me-auto" data-bs-dismiss="modal" onClick={() => { resetForm() }}>Close</button>
                                <button type="submit" className="btn btn-primary" >Save changes</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade " id="DeleteModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingLeft: "0px" }}>

                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-title">Are you sure?</div>
                            <div>If you proceed, you will lose all {values?.name} data</div>
                        </div>
                        <div className="modal-footer">
                            <button ref={ModalCloseRef} className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal" >Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => { dispatch(DeleteSubCategoryAction({ ...values, is_deleted: true })) }} >Yes, Delete {values?.name}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade " id="DeactivateModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingLeft: "0px" }}>

                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <i ref={ModalCloseRef} className="fa-solid fa-xmark text-danger cursor-pointer" data-bs-dismiss="modal" > </i>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>SubCategory</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(subcategoryState.GetSubCategory) && subcategoryState.GetSubCategory?.length > 0 ?
                                            subcategoryState.GetSubCategory?.map((subcategory, index) => {
                                                return (subcategory?.is_deleted === true && <tr key={subcategory._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{subcategory.name}</td>
                                                    <td> <button type="button" className="btn btn-success" onClick={() => { dispatch(DeleteSubCategoryAction({ _id: subcategory?._id })) }} > Recover </button>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                                {(Array.isArray(subcategoryState?.GetSubCategory) && subcategoryState?.GetSubCategory?.every((subcategory) => subcategory?.is_deleted === false)) &&
                                    <div className="card my-1 mx-auto text-center">
                                        <span className="mt-1">    Data Not Found
                                        </span>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default SubCategory
