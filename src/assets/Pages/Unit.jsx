import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { UnitInitialState } from "../Configurations/InitialStates"
import { UnitSchema } from "../Configurations/YupSchema"
import { useFormik } from "formik"
import { CreateUnitAction, DeleteUnitAction, EditUnitAction, GetUnitAction } from "../../Services/Actions/Unit"
import moment from "moment/moment"


const Unit = () => {
    const dispatch = useDispatch()
    const unitState = useSelector(state => state.unitState)
    const ModalCloseRef = useRef();
    const [ModalState, setModalState] = useState("")

    const handleUnit = (values) => {
        const body = { ...values }
        if (ModalState === "Edit") {
            dispatch(EditUnitAction(body))
        } else {
            dispatch(CreateUnitAction(body))
        }
    }
    const handleEditUnit = (Unit) => {
        setValues({
            ...Unit
        })
        setModalState("Edit")
    }
    const handleDeleteUnit = (Unit) => {
        setValues({
            ...Unit
        })
        setModalState("Delete")
    }


    useEffect(() => {
        dispatch(GetUnitAction())
    }, [dispatch])


    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm, setValues } = useFormik({
        initialValues: UnitInitialState,
        validationSchema: UnitSchema,
        onSubmit: () => handleUnit(values),
    })

    useEffect(() => {
        if (unitState?.error || unitState?.DeleteRecoverUnit || unitState?.EditUnit || unitState?.AddUnit) {
            ModalCloseRef.current.click()
            resetForm()
        }
    }, [unitState?.AddUnit, unitState?.DeleteRecoverUnit, unitState?.EditUnit, unitState?.error, resetForm])

    return (
        <>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between ">
                                    <h6 className="card-title">Total { } Units</h6>
                                    <div className="d-flex ">
                                        <h6 onClick={() => setModalState("Deactivated")} className="card-title cursor-pointer mx-4 text-danger" data-toggle="modal" data-target="#UnitModal" >Deleted Units</h6>
                                        <h6 onClick={() => setModalState("Add")} className="card-title cursor-pointer " data-toggle="modal" data-target="#UnitModal" >Add Unit</h6>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Unit</th>
                                                <th>Code</th>
                                                <th>Created At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(unitState.GetUnit) && unitState.GetUnit?.length > 0 ?
                                                unitState.GetUnit?.map((Unit, index) => {
                                                    return (Unit?.is_deleted === false && <tr key={Unit._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{Unit.name}</td>
                                                        <td>{Unit.unit_code}</td>
                                                        <td>{moment(Unit.createdAt).format("MMMM DD, YYYY")}</td>
                                                        <td>
                                                            <i onClick={() => handleEditUnit(Unit)} className="fa-solid fa-pen me-3 text-warning  mr-2 " style={{ fontSize: "20px" }} data-toggle="modal" data-target="#UnitModal" ></i>
                                                            <i onClick={() => handleDeleteUnit(Unit)} className="fa-solid fa-trash ms-3 text-danger ml-2" style={{ fontSize: "20px" }} data-toggle="modal" data-target="#UnitModal" ></i>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                                : null
                                            }
                                        </tbody>
                                    </table>
                                    {(Array.isArray(unitState?.GetUnit) && unitState?.GetUnit?.every((Unit) => Unit?.is_deleted === true)) &&
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




            <div className="modal fade" id="UnitModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {(ModalState === "Edit" || ModalState === "Add") &&
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} className="cmxform" noValidate="novalidate">
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="name">Unit Name</label>
                                            <input onChange={handleChange} onBlur={handleBlur} value={values?.name} id="name" className={`form-control ${(touched.name && errors.name) && "is-invalid"}`} name="name" type="text" required placeholder="Enter Unit Name" />
                                            {(touched.name && errors.name) && <p className="h6 text-danger mt-1"> Unit {errors.name} </p>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name">Unit Code</label>
                                            <input onChange={handleChange} onBlur={handleBlur} value={values?.unit_code} id="unit_code" className={`form-control ${(touched.unit_code && errors.unit_code) && "is-invalid"}`} name="unit_code" type="text" required placeholder="Enter Unit Code" />
                                            {(touched.unit_code && errors.unit_code) && <p className="h6 text-danger mt-1"> Unit {errors.unit_code} </p>}
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <input className="btn btn-danger" type="reset" onClick={resetForm} value="Reset" />
                                            <button className="btn btn-secondary" data-dismiss="modal" onClick={() => { resetForm() }} ref={ModalCloseRef} > Close</button>
                                            <input className="btn btn-primary" type="submit" value="Submit" />
                                        </div>
                                    </fieldset>
                                </form>
                            </div>

                        </div>
                    </div>
                }
                {ModalState === "Delete" &&
                    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="modal-title">Are you sure?</div>
                                <div>If you proceed, you will lose all {values?.name} data</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-link link-secondary me-auto" data-dismiss="modal" ref={ModalCloseRef}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={() => { dispatch(DeleteUnitAction({ ...values, is_deleted: true })) }} >Yes, Delete {values?.name}</button>
                            </div>
                        </div>
                    </div>
                }


                {ModalState === "Deactivated" &&
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex justify-content-between">
                                    <div></div>
                                    <i className="fa-solid fa-xmark text-danger cursor-pointer" data-dismiss="modal" ref={ModalCloseRef}> </i>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Unit</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(unitState.GetUnit) && unitState.GetUnit?.length > 0 ?
                                                unitState.GetUnit?.map((Unit, index) => {
                                                    return (Unit?.is_deleted === true && <tr key={Unit._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{Unit.name}</td>
                                                        <td> <button type="button" className="btn btn-success" onClick={() => { dispatch(DeleteUnitAction({ _id: Unit?._id })) }} > Recover </button>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                                : null
                                            }
                                        </tbody>
                                    </table>
                                    {(Array.isArray(unitState?.GetUnit) && unitState?.GetUnit?.every((Unit) => Unit?.is_deleted === false)) &&
                                        <div className="card my-1 mx-auto text-center">
                                            <span className="mt-1">    Data Not Found
                                            </span>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }



            </div >

        </>
    )
}

export default Unit
