import { useEffect, useState } from "react";
import { CategoryInitialState } from "../Configurations/InitialStates";
import { CategorySchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";

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
import { useAlert } from "../hooks/Toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../Services/API/Category";
 
const Category = () => {
  const [Categories, setCategories] = useState(null);
  const [CreateCategory] = useCreateCategoryMutation();
  const [UpdateCategory] = useUpdateCategoryMutation();
  const [DeleteCategory] = useDeleteCategoryMutation();
  const { showAlert } = useAlert();
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: CategoryInitialState,
    validationSchema: CategorySchema,
    onSubmit: () => handleCategory(values),
  });
  const handleCategory = async (values) => {
    const toast_id = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateCategory({ id: values.id, data: values }).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateCategory(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteCategory(values).unwrap();
      }
      showAlert(toast_id, data.message, data.success || data?.status);
      onClose();
      resetForm();
    } catch (error) {
       showAlert(toast_id, "Something got wrong", false);
    }
  };
  const { data, isSuccess, isError } = useGetCategoriesQuery();
  useEffect(() => {
    if (isSuccess && !isError) {
      setCategories(data?.data);
    }
  }, [data, isError, isSuccess]);
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
                      {Array.isArray(Categories) && Categories?.length > 0
                        ? Categories?.map((Category, index) => {
                            return (
                              <TableRow key={Category._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{Category.name}</TableCell>
                                <TableCell>
                                  {moment(Category.created_at).format(
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
                                        setValues(Category);
                                    }}
                                    className="fa-solid fa-trash ms-3 text-danger ml-2"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                </TableCell>
                              </TableRow>
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
                      {/* {Categories?.filter(
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
                      })} */}
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
