import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { AttributeInitialState } from "../Configurations/InitialStates"
import { AttributeSchema } from "../Configurations/YupSchema"
import { useFormik } from "formik"
import { CreateAttributeAction, DeleteAttributeAction, EditAttributeAction, GetAttributeAction } from "../../Services/Actions/Attribute"
import moment from "moment/moment"


const Attribute = () => {
    const dispatch = useDispatch()
    const attributeState = useSelector(state => state.attributeState)
    const ModalCloseRef = useRef();
    const [ModalState, setModalState] = useState("")

    const handleAttribute = (values) => {
        const body = { ...values }
        if (ModalState === "Edit") {
            dispatch(EditAttributeAction(body))
        } else {
            dispatch(CreateAttributeAction(body))
        }
    }
    const handleEditAttribute = (Attribute) => {
        setModalState("Edit")
        setValues({
            ...Attribute
        })
    }

    const handleDeleteAttribute = (Attribute) => {
        setValues({
            ...Attribute
        })
        setModalState("Delete")
    }
    useEffect(() => {
        dispatch(GetAttributeAction())
    }, [dispatch])

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm, setValues } = useFormik({
        initialValues: AttributeInitialState,
        validationSchema: AttributeSchema,
        onSubmit: () => handleAttribute(values),
    })

    useEffect(() => {
        ModalCloseRef?.current?.click()
        resetForm()
    }, [attributeState?.AddAttribute, attributeState?.AddAttributeValue, attributeState?.DeleteRecoverAttribute, attributeState?.EditAttribute, attributeState?.error, resetForm])

    return (
        <>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">       
                        <div className=" grid-margin stretch-card ">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between ">
                                        <h6 className="card-title">Total { } Attributes</h6>
                                        <div className="d-flex ">
                                            <h6 className="card-title cursor-pointer mx-4 text-danger" data-bs-toggle="modal" data-bs-target="#DeactivateModal" >Deleted Attributes</h6>
                                            <h6 onClick={() => setModalState("Add")} className="card-title cursor-pointer " data-bs-toggle="modal" data-bs-target="#AttributeModal" >Add Attribute</h6>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Attribute</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                    <th>Values</th>
                                                    <th className="text-center">Add Values</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(attributeState.GetAttribute) && attributeState.GetAttribute?.length > 0 ?
                                                    attributeState.GetAttribute?.map((Attribute, index) => {
                                                        return (Attribute?.is_deleted === false && !Attribute?.attribute_id && <tr key={Attribute._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{Attribute.name}</td>
                                                            <td>{moment(Attribute.createdAt).format("MMMM DD, YYYY")}</td>
                                                            <td>
                                                                <i onClick={() => handleEditAttribute(Attribute)} className="fa-solid fa-pen me-3 text-warning  mr-2 " style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#AttributeModal" ></i>
                                                                <i onClick={() => handleDeleteAttribute(Attribute)} className="fa-solid fa-trash ms-3 text-danger ml-2" style={{ fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#DeleteModal" ></i>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    {
                                                                        attributeState?.GetAttribute?.length > 0 ?
                                                                            attributeState?.GetAttribute?.map((value, index) => {
                                                                                return (value?.attribute_id?._id == Attribute?._id) && <div key={index} className="d-flex flex-column justify-content-center" onMouseLeave={resetForm} onMouseEnter={() => { setValues({ _id: value?._id }) }} onClick={() => dispatch(DeleteAttributeAction(values))}>
                                                                                    {value?._id === values?._id && <i className=" mx-auto mb-1 fa-solid fa-trash text-danger"></i>}
                                                                                    <span key={value?._id} className="badge bg-primary mx-2" >{value?.name}</span>
                                                                                </div>
                                                                            }) : <div className="card  card-body m-1 py-1 px-5 mx-auto text-center">
                                                                                <span className="mt-1"> No Values Found
                                                                                </span>
                                                                            </div>
                                                                    }
                                                                </div>

                                                            </td>
                                                            <td >
                                                                <form onSubmit={handleSubmit} className="d-flex align-items-center  justify-content-center  py-auto">
                                                                    <input type="text" value={values?.attribute_id === Attribute?._id ? values?.name : null} onChange={handleChange} className="w-50 form-control form-control-sm" name="name" onFocus={() => { setModalState("AddValue"), setValues({ attribute_id: Attribute?._id }) }} placeholder="Add Value" />
                                                                    <button className="btn btn-primary btn-sm ml-1 px-1" type="submit">
                                                                        Add Value
                                                                    </button>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </tbody>
                                         </table>
                                        {(Array.isArray(attributeState?.GetAttribute) && attributeState?.GetAttribute?.every((Attribute) => Attribute?.is_deleted === true)) &&
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
            </div >
            <div className="modal fade" id="AttributeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} className="cmxform" noValidate="novalidate">
                            <div className="modal-body">
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="name">Attribute Name</label>
                                        <input onChange={handleChange} onBlur={handleBlur} value={values?.name} id="name" className={`form-control ${(touched.name && errors.name) && "is-invalid"}`} name="name" type="text" required placeholder="Enter Attribute Name" />
                                        {(touched.name && errors.name) && <p className="h6 text-danger mt-1"> Attribute {errors.name} </p>}
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

            <div className="modal modal-blur fade " id="DeleteModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingLeft: "0px" }}>
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-title">Are you sure?</div>
                            <div>If you proceed, you will lose all {values?.name} data</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal" ref={ModalCloseRef}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => { dispatch(DeleteAttributeAction({ ...values, is_deleted: true })) }} >Yes, Delete {values?.name}</button>
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
                                <i className="fa-solid fa-xmark text-danger cursor-pointer" data-bs-dismiss="modal" ref={ModalCloseRef}> </i>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Attribute</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(attributeState.GetAttribute) && attributeState.GetAttribute?.length > 0 ?
                                            attributeState.GetAttribute?.map((Attribute, index) => {
                                                return (Attribute?.is_deleted === true && <tr key={Attribute._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{Attribute.name}</td>
                                                    <td> <button type="button" className="btn btn-success" onClick={() => { dispatch(DeleteAttributeAction({ _id: Attribute?._id })) }} > Recover </button>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                            : null
                                        }
                                    </tbody>
                                </table>
                                {(Array.isArray(attributeState?.GetAttribute) && attributeState?.GetAttribute?.every((Attribute) => Attribute?.is_deleted === false)) &&
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

export default Attribute
