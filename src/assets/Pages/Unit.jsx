import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UnitInitialState } from "../Configurations/InitialStates";
import { UnitSchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
import {
  CreateUnitAction,
  DeleteUnitAction,
  EditUnitAction,
  GetUnitAction,
} from "../../Services/Actions/Unit";
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
import Toastify from "../Components/Toastify";
import { TableBody, TableHeader } from "@react-stately/table";

const Unit = () => {
  const dispatch = useDispatch();
  const { DeleteRecoverUnit, GetUnit, EditUnit, AddUnit } = useSelector(
    (state) => state.unitState
  );
  const [ModalState, setModalState] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(GetUnitAction());
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
    initialValues: UnitInitialState,
    validationSchema: UnitSchema,
    onSubmit: () => handleUnit(values),
  });
  const handleUnit = (values = values) => {
    if (ModalState === "Update") {
      dispatch(EditUnitAction(values));
    } else if (ModalState === "Create") {
      dispatch(CreateUnitAction(values));
    } else if (["Delete", "Deactivated"].includes(ModalState)) {
      dispatch(DeleteUnitAction(values));
    }
  };
  useEffect(() => {
    if (DeleteRecoverUnit || EditUnit || AddUnit) {
      onClose();
      resetForm();
    }
  }, [AddUnit, DeleteRecoverUnit, EditUnit, onClose, resetForm]);

  return (
    <>
      <Toastify />
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
                      Deleted Units
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
                    <TableBody emptyContent={"No rows to display."}>
                      {Array.isArray(GetUnit) && GetUnit?.length > 0
                        ? GetUnit?.map((Unit, index) => {
                            return (
                              Unit?.is_deleted === false && (
                                <TableRow key={Unit._id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{Unit.name}</TableCell>
                                  <TableCell>
                                    {moment(Unit.createdAt).format(
                                      "MMMM DD, YYYY"
                                    )}
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
                  <Input
                    type="text"
                    value={values.unit_code}
                    variant="faded"
                    label="Unit Code"
                    name="unit_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.unit_code}
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
                      {GetUnit?.filter((unit) => unit.is_deleted).map(
                        (unit) => {
                          return (
                            <TableRow key={unit._id}>
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
                        }
                      )}
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
