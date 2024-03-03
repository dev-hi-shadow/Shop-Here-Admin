import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SubCategoryInitialState } from "../Configurations/InitialStates";
import { SubCategorySchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
import {
  CreateSubCategoryAction,
  DeleteSubCategoryAction,
  EditSubCategoryAction,
  GetSubCategoryAction,
} from "../../Services/Actions/SubCategory";
import moment from "moment/moment";
import {
  Autocomplete,
  AutocompleteItem,
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
import { GetCategoryAction } from "../../Services/Actions/Category";

const SubCategory = () => {
  const dispatch = useDispatch();
  const {
    DeleteRecoverSubCategory,
    GetSubCategory,
    EditSubCategory,
    AddSubCategory,
  } = useSelector((state) => state.subcategoryState);
  const { GetCategory } = useSelector((state) => state.categoryState);
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(GetSubCategoryAction());
    dispatch(GetCategoryAction());
  }, [dispatch]);

  const handleSubCategory = (values = values) => {
    if (ModalState === "Update") {
      dispatch(EditSubCategoryAction(values));
    } else if (ModalState === "Create") {
      dispatch(CreateSubCategoryAction(values));
    } else if (["Delete", "Deactivated"].includes(ModalState)) {
      dispatch(DeleteSubCategoryAction(values));
    }
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFieldValue,
    setFieldTouched,
    setValues,
  } = useFormik({
    initialValues: SubCategoryInitialState,
    validationSchema: SubCategorySchema,
    onSubmit: handleSubCategory,
  });

  useEffect(() => {
    if (DeleteRecoverSubCategory || EditSubCategory || AddSubCategory) {
      onClose();
      resetForm();
    }
  }, [
    AddSubCategory,
    DeleteRecoverSubCategory,
    EditSubCategory,
    onClose,
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
                  <h6 className="card-title">Total {} Sub-Categories</h6>
                  <div className="d-flex gap-3">
                    <Link
                      className="text-red-600  text-decoration-none"
                      onClick={() => {
                        onOpen(), setModalState("Deactivated");
                      }}
                    >
                      Deleted Sub-Categories
                    </Link>
                    <Link
                      className="text-decoration-none"
                      onClick={() => {
                        setModalState("Create"), onOpen();
                      }}
                    >
                      Create Sub-Category
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
                      <TableColumn>SubCategory</TableColumn>
                      <TableColumn>Created At</TableColumn>
                      <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {Array.isArray(GetSubCategory) &&
                      GetSubCategory?.length > 0
                        ? GetSubCategory?.map((SubCategory, index) => {
                            return (
                              SubCategory?.is_deleted === false && (
                                <TableRow key={SubCategory._id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{SubCategory.name}</TableCell>
                                  <TableCell>
                                    {moment(SubCategory.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <i
                                      onClick={() => {
                                        onOpen(),
                                          setModalState("Update"),
                                          setValues({
                                            ...SubCategory,
                                            category_id:
                                              SubCategory.category_id._id,
                                          });
                                      }}
                                      className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                    <i
                                      onClick={() => {
                                        onOpen(),
                                          setModalState("Delete"),
                                          setValues({
                                            ...SubCategory,
                                            category_id:
                                              SubCategory.category_id._id,
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
          <ModalHeader className="p-3">{ModalState} SubCategory</ModalHeader>
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
                  <Autocomplete
                    label="Parent Category"
                    placeholder="Search an category"
                    name="category_id"
                    selectedKey={values.category_id}
                    onBlur={(e) => setFieldTouched("category_id", e)}
                    onSelectionChange={(e) => setFieldValue("category_id", e)}
                  >
                    {Array.isArray(GetCategory) &&
                      GetCategory.filter(
                        (category) => category.is_deleted === false
                      ).map((item) => (
                        <AutocompleteItem key={item._id} value={item._id}>
                          {item.name}
                        </AutocompleteItem>
                      ))}
                  </Autocomplete>
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
                      {GetSubCategory?.filter(
                        (subcategory) => subcategory.is_deleted
                      ).map((subcategory) => {
                        return (
                          <TableRow key={subcategory._id}>
                            <TableCell>{subcategory.name}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                color="success"
                                variant="light"
                                onClick={async () => {
                                  handleSubCategory({
                                    ...subcategory,
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

export default SubCategory;
