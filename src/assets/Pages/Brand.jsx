import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { BrandInitialState } from "../Configurations/InitialStates"
import { BrandSchema } from "../Configurations/YupSchema"
import { useFormik } from "formik"
import { CreateBrandAction, DeleteBrandAction, EditBrandAction, GetBrandAction } from "../../Services/Actions/Brand"
import moment from "moment/moment"

const Brand = () => {
    const dispatch = useDispatch()
    const brandState = useSelector(state => state.brandState)
    const ModalCloseRef = useRef();
    const [State, setState] = useState("")

    const handleBrand = (values) => {
        const body = { ...values }
        if (State === "Edit") {
            dispatch(EditBrandAction(body))
        } else {
            dispatch(CreateBrandAction(body))
        }
    }
    const handleEditBrand = (Brand) => {
        setValues({
            ...Brand
        })
        setState("Edit")
    }
    const handleDeleteBrand = (Brand) => {
        setValues({
            ...Brand
        })
        setState("Delete")
    }



    useEffect(() => {
        dispatch(GetBrandAction())
    }, [dispatch])


    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm, setValues } = useFormik({
        initialValues: BrandInitialState,
        validationSchema: BrandSchema,
        onSubmit: () => handleBrand(values),
    })

    useEffect(() => {
        if (brandState?.error || brandState?.DeleteRecoverBrand || brandState?.EditBrand || brandState?.AddBrand) {
            ModalCloseRef.current.click()
            resetForm()
        }
    }, [brandState?.AddBrand, brandState?.DeleteRecoverBrand, brandState?.EditBrand, brandState?.error, resetForm])

    return (
        <>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between ">
                                    <h6 className="card-title">Total {brandState?.GetBrand?.filter(brand => !brand.is_deleted)?.length} Active Brands</h6>
                                    <div className="d-flex ">
                                        <h6 className="card-title cursor-pointer mx-4 text-danger" data-bs-toggle="modal" data-bs-target="#DeactivateModal" >Deleted Brands</h6>
                                        <h6 onClick={() => setState("Add")} className="card-title cursor-pointer " data-bs-toggle="modal" data-bs-target="#BrandModal" >Add Brand</h6>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Brand</th>
                                                <th>Created At</th>
                                                <th>Last Updated At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(brandState.GetBrand) && brandState.GetBrand?.length > 0 ?
                                                brandState.GetBrand?.map((Brand, index) => {
                                                    return (Brand?.is_deleted === false && <tr key={Brand._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{Brand.name}</td>
                                                        <td>{moment(Brand.createdAt).format("MMMM DD, YYYY")}</td>
                                                        <td>{moment(Brand.updatedAt).format("MMMM DD, YYYY")}</td>
                                                        <td>
                                                            <i onClick={() => handleEditBrand(Brand)} className="fa-solid fa-pen me-3 text-warning  mr-2 " style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#BrandModal" ></i>
                                                            <i onClick={() => handleDeleteBrand(Brand)} className="fa-solid fa-trash ms-3 text-danger ml-2" style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#DeleteModal" ></i>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                                : null

                                            }
                                        </tbody>
                                    </table>
                                    {(Array.isArray(brandState?.GetBrand) && brandState?.GetBrand?.every((Brand) => Brand?.is_deleted === true)) &&
                                        <div className="card my-1 mx-auto text-center">
                                            <span className="mt-1">    Data Not Found
                                            </span>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>

                    </div >
                </div >
            </div >




            <div className="modal modal-blur fade " id="BrandModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingLeft: "0px" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetForm}></button>
                        </div>
                        <form onSubmit={handleSubmit} className="cmxform" noValidate="novalidate">
                            <div className="modal-body">
                                <fieldset>
                                    <div className="form-group my-2">
                                        <label htmlFor="name">Brand Name</label>
                                        <input onChange={handleChange} onBlur={handleBlur} value={values?.name} id="name" className={`my-2 form-control ${(touched.name && errors.name) && "is-invalid"}`} name="name" type="text" required placeholder="Enter Brand Name" />
                                        {(touched.name && errors.name) && <p className="h6 text-danger mt-1"> Brand {errors.name} </p>}

                                    </div>
                                </fieldset>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" type="reset" onClick={resetForm}  > Reset</button>
                                <button type="button" className="btn me-auto" data-bs-dismiss="modal" onClick={() => { resetForm() }} ref={ModalCloseRef}>Close</button>
                                <button type="submit" className="btn btn-primary" >Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade " id="DeactivateModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingLeft: "0px" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">

                    <div className="modal-content">

                        <div className="d-flex justify-content-between">
                            <div></div>
                            <i className="fa-solid fa-xmark text-danger cursor-pointer" data-bs-dismiss="modal" ref={ModalCloseRef}> </i>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Brand</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(brandState.GetBrand) && brandState.GetBrand?.length > 0 ?
                                        brandState.GetBrand?.map((Brand, index) => {
                                            return (Brand?.is_deleted === true && <tr key={Brand._id}>
                                                <td>{index + 1}</td>
                                                <td>{Brand.name}</td>
                                                <td> <button type="button" className="btn btn-success" onClick={() => { dispatch(DeleteBrandAction({ _id: Brand?._id })) }} > Recover </button>
                                                </td>
                                            </tr>
                                            )
                                        })
                                        : null
                                    }
                                </tbody>
                            </table>
                            {(Array.isArray(brandState?.GetBrand) && brandState?.GetBrand?.every((Brand) => Brand?.is_deleted === false)) &&
                                <div className="card my-1 mx-auto text-center">
                                    <span className="mt-1">    Data Not Found
                                    </span>
                                </div>
                            }

                        </div>
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
                            <button type="button" className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal" ref={ModalCloseRef}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => { dispatch(DeleteBrandAction({ ...values, is_deleted: true })) }} >Yes, Delete {values?.name}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Brand
