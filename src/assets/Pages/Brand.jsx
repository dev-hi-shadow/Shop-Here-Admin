import { useState } from "react";
import { BrandInitialState } from "../Configurations/InitialStates";
import { BrandSchema } from "../Configurations/YupSchema";
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
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "../../Services/API/Brand";
import { useAlert } from "../hooks/Toastify";

const Brand = () => {
  const { data, isSuccess, isLoading } = useGetBrandsQuery();
  const [CreateBrand] = useCreateBrandMutation();
  const [UpdateBrand] = useUpdateBrandMutation();
  const [DeleteBrand] = useDeleteBrandMutation();

  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showAlert } = useAlert();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: BrandInitialState,
    validationSchema: BrandSchema,
    onSubmit: () => handleBrand(values),
  });
  const handleBrand = async (values = values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateBrand(values).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateBrand(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteBrand(values).unwrap();
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
  // useEffect(() => {
  //   if (DeleteRecoverBrand || EditBrand || AddBrand) {
  //     onClose();
  //     resetForm();
  //   }
  // }, [AddBrand, DeleteRecoverBrand, EditBrand, onClose, resetForm]);

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
                      Create Brand
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
                      <TableColumn>Brand</TableColumn>
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
                        data.data?.map((Brand, index) => {
                          return (
                            <TableRow key={Brand.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{Brand.name}</TableCell>
                              <TableCell>
                                {moment(Brand.createdAt).format(
                                  "MMMM DD, YYYY"
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Update"),
                                      setValues(Brand);
                                  }}
                                  className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                  style={{ fontSize: "20px" }}
                                ></i>
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Delete"),
                                      setValues({
                                        ...Brand,
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
          <ModalHeader className="p-3">{ModalState} Brand</ModalHeader>
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
                      {data.data
                        ?.filter((brand) => brand.is_deleted)
                        .map((brand) => {
                          return (
                            <TableRow key={brand.id}>
                              <TableCell>{brand.name}</TableCell>
                              <TableCell className="text-center">
                                <Button
                                  color="success"
                                  variant="light"
                                  onClick={async () => {
                                    handleBrand({
                                      ...brand,
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

export default Brand;
