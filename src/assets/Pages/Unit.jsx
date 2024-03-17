import { useState } from "react";
import { UnitInitialState } from "../Configurations/InitialStates";
import { UnitSchema } from "../Configurations/YupSchema";
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
  useCreateUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsQuery,
  useUpdateUnitMutation,
} from "../../Services/API/Unit";
import { useAlert } from "../hooks/Toastify";
import NextInput from "../Components/NextUI/NextInput";

const Unit = () => {
  const { data, isSuccess, isLoading } = useGetUnitsQuery();
  const [CreateUnit] = useCreateUnitMutation();
  const [UpdateUnit] = useUpdateUnitMutation();
  const [DeleteUnit] = useDeleteUnitMutation();

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
    touched,
  } = useFormik({
    initialValues: UnitInitialState,
    validationSchema: UnitSchema,
    onSubmit: () => handleUnit(values),
  });
  const handleUnit = async (values = values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateUnit(values).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateUnit(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteUnit(values).unwrap();
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
  //   if (DeleteRecoverUnit || EditUnit || AddUnit) {
  //     onClose();
  //     resetForm();
  //   }
  // }, [AddUnit, DeleteRecoverUnit, EditUnit, onClose, resetForm]);

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
                      Create Unit
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
                      <TableColumn>Unit</TableColumn>
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
                        data.data.rows?.map((Unit, index) => {
                          return (
                            <TableRow key={Unit.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{Unit.name}</TableCell>
                              <TableCell>
                                {moment(Unit.createdAt).format("MMMM DD, YYYY")}
                              </TableCell>
                              <TableCell className="text-center">
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Update"),
                                      setValues(Unit);
                                  }}
                                  className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                  style={{ fontSize: "20px" }}
                                ></i>
                                <i
                                  onClick={() => {
                                    onOpen(),
                                      setModalState("Delete"),
                                      setValues({
                                        ...Unit,
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
          <ModalHeader className="p-3">{ModalState} Unit</ModalHeader>
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
                  <NextInput
                    name="short_form"
                    value={values.short_form}
                    label="Short Form"
                    isRequired={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched}
                    errors={errors}
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
                      {Array.isArray(data.data.rows) &&
                        data.data.rows.map((unit) => {
                          return (
                            <TableRow key={unit.id}>
                              <TableCell>{unit.name}</TableCell>
                              <TableCell className="text-center">
                                <Button
                                  color="success"
                                  variant="light"
                                  onClick={async () => {
                                    handleUnit({
                                      ...unit,
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

export default Unit;
