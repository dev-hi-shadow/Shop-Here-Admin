import { useState } from "react";
import { TaxInitialState } from "../Configurations/InitialStates";
import { TaxSchema } from "../Configurations/YupSchema";
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
  useCreateTaxMutation,
  useDeleteTaxMutation,
  useGetTaxesQuery,
  useUpdateTaxMutation,
} from "../../Services/API/Tax";
import { useAlert } from "../hooks/Toastify";

const Tax = () => {
  const { data, isSuccess, isLoading } = useGetTaxesQuery();
  const [CreateTax] = useCreateTaxMutation();
  const [UpdateTax] = useUpdateTaxMutation();
  const [DeleteTax] = useDeleteTaxMutation();

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
    initialValues: TaxInitialState,
    validationSchema: TaxSchema,
    onSubmit: () => handleTax(values),
  });
  const handleTax = async (values = values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateTax(values).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateTax(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteTax(values).unwrap();
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
  //   if (DeleteRecoverTax || EditTax || AddTax) {
  //     onClose();
  //     resetForm();
  //   }
  // }, [AddTax, DeleteRecoverTax, EditTax, onClose, resetForm]);

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
                      Create Tax
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
                      <TableColumn>Tax</TableColumn>
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
                        Array.isArray(data.data.rows) &&
                        data.data.rows?.map((Tax, index) => {
                          return (
                            <TableRow key={Tax.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{Tax.name}</TableCell>
                              <TableCell>
                                {moment(Tax.createdAt).format("MMMM DD, YYYY")}
                              </TableCell>
                              <TableCell className="text-center">
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Update"),
                                      setValues(Tax);
                                  }}
                                  className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                  style={{ fontSize: "20px" }}
                                ></i>
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Delete"),
                                      setValues({
                                        ...Tax,
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

      <Modal
        size={"lg"}
        isOpen={isOpen}
        onClose={() => {
          resetForm(), onClose();
        }}
      >
        <ModalContent>
          <ModalHeader className="p-3">{ModalState} Tax</ModalHeader>
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
                      {data.data.rows
                        ?.filter((tax) => tax.is_deleted)
                        .map((tax) => {
                          return (
                            <TableRow key={tax.id}>
                              <TableCell>{tax.name}</TableCell>
                              <TableCell className="text-center">
                                <Button
                                  color="success"
                                  variant="light"
                                  onClick={async () => {
                                    handleTax({
                                      ...tax,
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
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    resetForm(), onClose();
                  }}
                >
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

export default Tax;
