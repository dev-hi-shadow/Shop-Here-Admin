import { useState } from "react";
import { SubCategoryInitialState } from "../Configurations/InitialStates";
import { SubCategorySchema } from "../Configurations/YupSchema";
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
  Spinner,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { TableBody, TableHeader } from "@react-stately/table";
import {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "../../Services/API/SubCategory";
import { useAlert } from "../hooks/Toastify";
import { useGetCategoriesQuery } from "../../Services/API/Category";
import NextAutoComplete from "../Components/NextAutoComplete";

const SubCategory = () => {
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSuccess, isLoading, data } = useGetSubCategoriesQuery();
  const [CreateSubCategory] = useCreateSubCategoryMutation();
  const [UpdateSubCategory] = useUpdateSubCategoryMutation();
  const [DeleteSubCategory] = useDeleteSubCategoryMutation();
  const { showAlert } = useAlert();
  const { data: GetCategory } = useGetCategoriesQuery();

  const handleSubCategory = async (values = values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateSubCategory(values).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateSubCategory(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteSubCategory(values).unwrap();
      }
      showAlert(toastid, data.message, data.success || data?.status);
      onClose();
      resetForm();
    } catch (error) {
      Array.isArray(error.data.errors)
        ? error.data.errors.map((error) => showAlert(toastid, error, false))
        : showAlert(toastid, "Something went wrong", false);
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
     setValues,
  } = useFormik({
    initialValues: SubCategoryInitialState,
    validationSchema: SubCategorySchema,
    onSubmit: handleSubCategory,
  });

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
                    <TableBody
                      emptyContent={
                        isLoading ? (
                          <Spinner
                            size="sm"
                            label="Loading..."
                            color="warning"
                          />
                        ) : (
                          "No data Found"
                        )
                      }
                    >
                      {isSuccess &&
                        Array.isArray(data.data) &&
                        data.data?.map((SubCategory, index) => {
                          return (
                            <TableRow key={SubCategory.id}>
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
                                        category_id: SubCategory.category.id,
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
                                        category_id: SubCategory.category_id.id,
                                        is_deleted: true,
                                      });
                                  }}
                                  className="fa-solid fa-trash ms-3 text-danger ml-2"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
                   <NextAutoComplete
                    ariaLabel={`select category`}
                    ariaLabelledby={`select-category`}
                    className="py-0 my-0"
                    onSelectionChange={(e) => setFieldValue("category_id", e)}
                    onBlur={handleBlur}
                    defaultSelectedKey={values.category_id}
                    selectedKey={values.category_id}
                    errors={errors}
                    childArray={GetCategory?.data}
                    childAriaLabel="country-add"
                    childAriaLabelledby="country-add"
                    childKey="id"
                    childTextValueField="name"
                    childValue="name"
                    childValueShow="name"
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
                      {data.data
                        ?.filter((subcategory) => subcategory.is_deleted)
                        .map((subcategory) => {
                          return (
                            <TableRow key={subcategory.id}>
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
