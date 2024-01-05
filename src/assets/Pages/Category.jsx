import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { CategoryInitialState } from "../Configurations/InitialStates";
import { CategorySchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
import {
  CreateCategoryAction,
  DeleteCategoryAction,
  EditCategoryAction,
  GetCategoryAction,
} from "../../Services/Actions/Category";
import moment from "moment/moment";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryState);
  const ModalCloseRef = useRef();
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleCategory = (values) => {
    const body = { ...values };
    if (ModalState === "Edit") {
      dispatch(EditCategoryAction(body));
    } else {
      dispatch(CreateCategoryAction(body));
    }
  };
  const handleEditCategory = (Category) => {
    setValues({
      ...Category,
    });
    setModalState("Edit");
  };
  const handleDeleteCategory = (Category) => {
    setValues({
      ...Category,
    });
    setModalState("Delete");
  };

  useEffect(() => {
    dispatch(GetCategoryAction());
  }, [dispatch]);

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
    initialValues: CategoryInitialState,
    validationSchema: CategorySchema,
    onSubmit: () => handleCategory(values),
  });

  useEffect(() => {
    if (
      categoryState?.error ||
      categoryState?.DeleteRecoverCategory ||
      categoryState?.EditCategory ||
      categoryState?.AddCategory
    ) {
      ModalCloseRef.current.click();
      resetForm();
    }
  }, [
    categoryState?.AddCategory,
    categoryState?.DeleteRecoverCategory,
    categoryState?.EditCategory,
    categoryState?.error,
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
                  <h6 className="card-title">Total {} Categories</h6>
                  <div className="d-flex ">
                    <Link
                      className="card-title cursor-pointer mx-4 text-danger"
                      onClick={onOpen}
                    >
                      Deleted Categories
                    </Link>
                    <Link
                      onClick={() => {
                        setModalState("CREATE");
                        onOpen();
                      }}
                    >
                      Create Category
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(categoryState.GetCategory) &&
                      categoryState.GetCategory?.length > 0
                        ? categoryState.GetCategory?.map((Category, index) => {
                            return (
                              Category?.is_deleted === false && (
                                <tr key={Category._id}>
                                  <td>{index + 1}</td>
                                  <td>{Category.name}</td>
                                  <td>
                                    {moment(Category.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </td>
                                  <td>
                                    <i
                                      onClick={() =>
                                        handleEditCategory(Category)
                                      }
                                      className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                      style={{ fontSize: "20px" }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#CategoryModal"
                                    ></i>
                                    <i
                                      onClick={() =>
                                        handleDeleteCategory(Category)
                                      }
                                      className="fa-solid fa-trash ms-3 text-danger ml-2"
                                      style={{ fontSize: "20px" }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#DeleteModal"
                                    ></i>
                                  </td>
                                </tr>
                              )
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                  {Array.isArray(categoryState?.GetCategory) &&
                    categoryState?.GetCategory?.every(
                      (Category) => Category?.is_deleted === true
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

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Action
                </Button>
              </ModalFooter>
            </>
          </form>
        </ModalContent>
      </Modal>

      <div
        className="modal fade"
        id="CategoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered" role="document">
          <div className="modal-content">
            <form
              onSubmit={handleSubmit}
              className="cmxform"
              noValidate="novalidate"
            >
              <div className="modal-body">
                <fieldset>
                  <div className="form-group my-2">
                    <label htmlFor="name">Category Name</label>
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
                      placeholder="Enter Category Name"
                    />
                    {touched.name && errors.name && (
                      <p className="h6 text-danger mt-1">
                        {" "}
                        Category {errors.name}{" "}
                      </p>
                    )}
                  </div>
                </fieldset>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  type="reset"
                  onClick={resetForm}
                >
                  {" "}
                  Reset
                </button>
                <button
                  type="button"
                  className="btn me-auto"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    resetForm();
                  }}
                  ref={ModalCloseRef}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal modal-blur fade "
        id="DeleteModal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ paddingLeft: "0px" }}
      >
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
                data-bs-dismiss="modal"
                ref={ModalCloseRef}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  dispatch(
                    DeleteCategoryAction({ ...values, is_deleted: true })
                  );
                }}
              >
                Yes, Delete {values?.name}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-blur fade "
        id="DeactivateModal"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ paddingLeft: "0px" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <div></div>
                <i
                  className="fa-solid fa-xmark text-danger cursor-pointer"
                  data-bs-dismiss="modal"
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
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(categoryState.GetCategory) &&
                    categoryState.GetCategory?.length > 0
                      ? categoryState.GetCategory?.map((Category, index) => {
                          return (
                            Category?.is_deleted === true && (
                              <tr key={Category._id}>
                                <td>{index + 1}</td>
                                <td>{Category.name}</td>
                                <td>
                                  {" "}
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                      dispatch(
                                        DeleteCategoryAction({
                                          _id: Category?._id,
                                        })
                                      );
                                    }}
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
                {Array.isArray(categoryState?.GetCategory) &&
                  categoryState?.GetCategory?.every(
                    (Category) => Category?.is_deleted === false
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
    </>
  );
};

export default Category;
