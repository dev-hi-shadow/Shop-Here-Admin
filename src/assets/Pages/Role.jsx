import {  useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RoleInitialState } from "../Configurations/InitialStates";
import { RoleSchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
 
import moment from "moment/moment";

const Role = () => {
  // const dispatch = useDispatch();
  const roleState = useSelector((state) => state.roleState);
  const ModalCloseRef = useRef();
  const [ModalState, setModalState] = useState("");

  const handleRole = ( ) => {
    // const body = { ...values };
    if (ModalState === "Edit") {
      // dispatch(EditRoleAction(body));
    } else {
      // dispatch(CreateRoleAction(body));
    }
  };
  const handleEditRole = (Role) => {
    setValues({
      ...Role,
    });
    setModalState("Edit");
  };
  const handleDeleteRole = (Role) => {
    setValues({
      ...Role,
    });
    setModalState("Delete");
  };

 

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: RoleInitialState,
    validationSchema: RoleSchema,
    onSubmit: () => handleRole(values),
  });

  useEffect(() => {
    if (
      roleState?.error ||
      roleState?.DeleteRecoverRole ||
      roleState?.EditRole ||
      roleState?.AddRole
    ) {
      ModalCloseRef.current.click();
      resetForm();
    }
  }, [
    roleState?.AddRole,
    roleState?.DeleteRecoverRole,
    roleState?.EditRole,
    roleState?.error,
    resetForm,
  ]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between ">
                  <h6 className="card-title">Total {} Roles</h6>
                  <div className="d-flex ">
                    <h6
                      onClick={() => setModalState("Deactivated")}
                      className="card-title cursor-pointer mx-4 text-danger"
                      data-toggle="modal"
                      data-target="#RoleModal"
                    >
                      Deleted Roles
                    </h6>
                    <h6
                      onClick={() => setModalState("Add")}
                      className="card-title cursor-pointer "
                      data-toggle="modal"
                      data-target="#RoleModal"
                    >
                      Add Role
                    </h6>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(roleState.GetRole) &&
                      roleState.GetRole?.length > 0
                        ? roleState.GetRole?.map((Role, index) => {
                            return (
                              Role && (
                                <tr key={Role.id}>
                                  <td>{index + 1}</td>
                                  <td>{Role.name}</td>
                                  <td>
                                    {moment(Role.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <i
                                      onClick={() => handleEditRole(Role)}
                                      className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                      style={{ fontSize: "20px" }}
                                      data-toggle="modal"
                                      data-target="#RoleModal"
                                    ></i>
                                    <i
                                      onClick={() => handleDeleteRole(Role)}
                                      className="fa-solid fa-trash ms-3 text-danger ml-2"
                                      style={{ fontSize: "20px" }}
                                      data-toggle="modal"
                                      data-target="#RoleModal"
                                    ></i>
                                  </td>
                                </tr>
                              )
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                  {Array.isArray(roleState?.GetRole) &&
                    roleState?.GetRole?.every(
                      (Role) => Role?.is_deleted === true
                    ) && (
                      <div className="card my-1 mx-auto text-center">
                        <span className="mt-1"> Data Not Found</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="RoleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {(ModalState === "Edit" || ModalState === "Add") && (
          <div className="modal-dialog  modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit}
                  className="cmxform"
                  noValidate="novalidate"
                >
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor="name">Role Name</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.name}
                        id="name"
                        className={`form-control ${
                          touched.name && errors.name && "is-invalid"
                        }`}
                        name="name"
                        type="text"
                        required
                        placeholder="Enter Role Name"
                      />
                      {touched.name && errors.name && (
                        <p className="h6 text-danger mt-1">
                          {" "}
                          Role {errors.name}{" "}
                        </p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <input
                        className="btn btn-danger"
                        type="reset"
                        onClick={resetForm}
                        value="Reset"
                      />
                      <button
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => {
                          resetForm();
                        }}
                        ref={ModalCloseRef}
                      >
                        {" "}
                        Close
                      </button>
                      <input
                        className="btn btn-primary"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        )}
        {ModalState === "Delete" && (
          <div
            className="modal-dialog modal-sm modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-title">Are you sure?</div>
                <div>If you proceed, you will lose all {values?.name} data</div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-link link-secondary me-auto"
                  data-dismiss="modal"
                  ref={ModalCloseRef}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    // dispatch(DeleteRoleAction({ ...values, is_deleted: true }));
                  }}
                >
                  Yes, Delete {values?.name}
                </button>
              </div>
            </div>
          </div>
        )}

        {ModalState === "Deactivated" && (
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex justify-content-between">
                  <div></div>
                  <i
                    className="fa-solid fa-xmark text-danger cursor-pointer"
                    data-dismiss="modal"
                    ref={ModalCloseRef}
                  >
                    {" "}
                  </i>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(roleState.GetRole) &&
                      roleState.GetRole?.length > 0
                        ? roleState.GetRole?.map((Role, index) => {
                            return (
                              Role?.is_deleted === true && (
                                <tr key={Role.id}>
                                  <td>{index + 1}</td>
                                  <td>{Role.name}</td>
                                  <td>
                                    {" "}
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      // onClick={() => {
                                      //   dispatch(
                                      //     DeleteRoleAction({ id: Role?.id })
                                      //   );
                                      // }}
                                    >
                                      {" "}
                                      Recover{" "}
                                    </button>
                                  </td>
                                </tr>
                              )
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                  {Array.isArray(roleState?.GetRole) &&
                    roleState?.GetRole?.every((Role) => Role) && (
                      <div className="card my-1 mx-auto text-center">
                        <span className="mt-1"> Data Not Found</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Role;
