import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TaxInitialState } from "../Configurations/InitialStates";
import { TaxSchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
import {
  CreateTaxAction,
  DeleteTaxAction,
  EditTaxAction,
  GetTaxAction,
} from "../../Services/Actions/Tax";
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

const Tax = () => {
  const dispatch = useDispatch();
  const { DeleteRecoverTax, GetTax, EditTax, AddTax } = useSelector(
    (state) => state.taxState
  );
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(GetTaxAction());
  }, [dispatch]);

  const {
    values,
    touched,
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
  const handleTax = (values = values) => {
    if (ModalState === "Update") {
      dispatch(EditTaxAction(values));
    } else if (ModalState === "Create") {
      dispatch(CreateTaxAction(values));
    } else if (["Delete", "Deactivated"].includes(ModalState)) {
      dispatch(DeleteTaxAction(values));
    }
  };
  useEffect(() => {
    if (DeleteRecoverTax || EditTax || AddTax) {
      onClose();
      resetForm();
    }
  }, [AddTax, DeleteRecoverTax, EditTax, onClose, resetForm]);

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
                      Deleted Taxs
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
                    <TableBody emptyContent={"No rows to display."}>
                      {Array.isArray(GetTax) && GetTax?.length > 0
                        ? GetTax?.map((Tax, index) => {
                            return (
                              Tax?.is_deleted === false && (
                                <TableRow key={Tax._id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{Tax.name}</TableCell>
                                  <TableCell>
                                    {moment(Tax.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
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
                    errorMessage={touched.name && errors.name}
                  />
                  <Input
                    type="text"
                    value={values.value}
                    variant="faded"
                    label="Tax Vaue"
                    name="value"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.value && errors.value}
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
                      {GetTax?.filter((tax) => tax.is_deleted).map((tax) => {
                        return (
                          <TableRow key={tax._id}>
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

export default Tax;
