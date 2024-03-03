import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { TableBody, TableHeader } from "@react-stately/table";

const Category = () => {
  const dispatch = useDispatch();
  const { DeleteRecoverCategory, GetCategory, EditCategory, AddCategory } =
    useSelector((state) => state.categoryState);
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(GetCategoryAction());
  }, [dispatch]);

  const {
    values,
    errors,
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
  const handleCategory = (values = values) => {
    if (ModalState === "Update") {
      dispatch(EditCategoryAction(values));
    } else if (ModalState === "Create") {
      dispatch(CreateCategoryAction(values));
    } else if (["Delete", "Deactivated"].includes(ModalState)) {
      dispatch(DeleteCategoryAction(values));
    }
  };
  useEffect(() => {
    if (DeleteRecoverCategory || EditCategory || AddCategory) {
      onClose();
      resetForm();
    }
  }, [AddCategory, DeleteRecoverCategory, EditCategory, onClose, resetForm]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between ">
                  <h6 className="card-title">Total {} Categories</h6>
                  <div className="d-flex gap-3">
                    <Link
                      className="text-red-600  text-decoration-none"
                      onClick={() => {
                        onOpen(), setModalState("Deactivated");
                      }}
                    >
                      Deleted Categories
                    </Link>
                    <Link
                      className="text-decoration-none"
                      onClick={() => {
                        setModalState("Create"), onOpen();
                      }}
                    >
                      Create Category
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <Table
                    removeWrapper
                    aria-label="Example table with dynamic content"
                  >
                    <TableHeader>
                      <TableColumn>#</TableColumn>
                      <TableColumn>Category</TableColumn>
                      <TableColumn>Created At</TableColumn>
                      <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {Array.isArray(GetCategory) && GetCategory?.length > 0
                        ? GetCategory?.map((Category, index) => {
                            return (
                              Category?.is_deleted === false && (
                                <TableRow key={Category._id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{Category.name}</TableCell>
                                  <TableCell>
                                    {moment(Category.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <i
                                      onClick={() => {
                                        onOpen(),
                                          setModalState("Update"),
                                          setValues(Category);
                                      }}
                                      className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                    <i
                                      onClick={() => {
                                        onOpen(),
                                          setModalState("Delete"),
                                          setValues({
                                            ...Category,
                                            is_deleted: true,
                                          });
                                      }}
                                      className="fa-solid fa-trash ms-3 text-danger ml-2"
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                  </TableCell>
                                </TableRow>
                              )
                            );
                          })
                        : null}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="p-3">{ModalState} Category</ModalHeader>
          <form onSubmit={handleSubmit}>
            {["Create", "Update"].includes(ModalState) && (
              <>
                <ModalBody className="p-3">
                  <Input
                    type="text"
                    value={values.name}
                    variant="faded"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.name}
                  />
                </ModalBody>
              </>
            )}
            {["Delete"].includes(ModalState) && (
              <>
                <ModalBody className="p-3">
                  <div>
                    If you proceed, you will lose all {values?.name} data
                  </div>
                </ModalBody>
              </>
            )}
            {["Deactivated"].includes(ModalState) && (
              <>
                <ModalBody className="p-3">
                  <Table removeWrapper aria-label="Example empty table">
                    <TableHeader>
                      <TableColumn>Name</TableColumn>
                      <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {GetCategory?.filter(
                        (category) => category.is_deleted
                      ).map((category) => {
                        return (
                          <TableRow key={category._id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                color="success"
                                variant="light"
                                onClick={async () => {
                                  handleCategory({
                                    ...category,
                                    is_deleted: false,
                                  });
                                }}
                              >
                                Recover
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ModalBody>
              </>
            )}

            {!["Deactivated"].includes(ModalState) && (
              <ModalFooter className="p-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={ModalState === "Delete" ? "danger" : "primary"}
                  type="submit"
                  className="rounded"
                >
                  {ModalState}
                </Button>
              </ModalFooter>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Category;
