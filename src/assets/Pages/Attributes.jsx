import { useState } from "react";
import { AttributeInitialState } from "../Configurations/InitialStates";
import { AttributeSchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";

import moment from "moment/moment";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import {
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributesQuery,
  useUpdateAttributeMutation,
} from "../../Services/API/Attribute";
import { useAlert } from "../hooks/Toastify";
const Attribute = () => {
  const { isLoading, data } = useGetAttributesQuery();
  console.log("🚀  data:", data);
  const [CreateAttribute] = useCreateAttributeMutation();
  const [UpdateAttribute] = useUpdateAttributeMutation();
  const [DeleteAttribute] = useDeleteAttributeMutation();
  const { showAlert } = useAlert();

  const [ModalState, setModalState] = useState("");
  let { isOpen, onOpen, onClose } = useDisclosure();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    touched,
    setValues,
  } = useFormik({
    initialValues: AttributeInitialState,
    validationSchema: AttributeSchema,
    onSubmit: () => handleAttribute(values),
  });
  const handleAttribute = async (values = values) => {
    const toastid = showAlert(null, `Please we will ${ModalState}ing`, "info");
    try {
      let data;
      if (ModalState === "Update") {
        data = await UpdateAttribute(values).unwrap();
      } else if (ModalState === "Create") {
        data = await CreateAttribute(values).unwrap();
      } else if (["Delete", "Deactivated"].includes(ModalState)) {
        data = await DeleteAttribute(values).unwrap();
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
  //   if (DeleteRecoverAttribute || EditAttribute || AddAttribute) {
  //     onClose();
  //     resetForm();
  //   }
  // }, [AddAttribute, DeleteRecoverAttribute, EditAttribute, onClose, resetForm]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className=" grid-margin stretch-card ">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <h6 className="card-title">Total {} Attributes</h6>
                    <div className="d-flex ">
                      <h6
                        className="cursor-pointer mx-4 text-danger"
                        onClick={() => {
                          setModalState("Deactivated"), onOpen();
                        }}
                      >
                        Deleted Attributes
                      </h6>
                      <h6
                        onClick={() => {
                          setModalState("Create"), onOpen();
                        }}
                        className=" cursor-pointer "
                      >
                        Create Attribute
                      </h6>
                    </div>
                  </div>
                  <Table removeWrapper>
                    <TableHeader>
                      <TableColumn>#</TableColumn>
                      <TableColumn>Attribute</TableColumn>
                      <TableColumn>Created At</TableColumn>
                      <TableColumn className="text-center">Action</TableColumn>
                      <TableColumn className="text-center">Values</TableColumn>
                      <TableColumn className="text-center">
                        Add Values
                      </TableColumn>
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
                      {Array.isArray(data?.data?.rows) &&
                        data?.data?.rows
                          ?.filter((item) => !item.attribute)
                          .map((Attribute, index) => {
                            return (
                              <TableRow key={Attribute?.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{Attribute?.name}</TableCell>
                                <TableCell>
                                  {moment(Attribute.created_at).format(
                                    "MMMM DD, YYYY"
                                  )}
                                </TableCell>
                                <TableCell className="text-center">
                                  <i
                                    onClick={() => {
                                      setValues(Attribute),
                                        setModalState("Update"),
                                        onOpen();
                                    }}
                                    className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                  <i
                                    onClick={() => {
                                      setValues({
                                        Attribute,
                                        is_deleted: true,
                                      }),
                                        setModalState("Delete"),
                                        onOpen();
                                    }}
                                    className="fa-solid fa-trash ms-3 text-danger ml-2"
                                    style={{ fontSize: "20px" }}
                                  ></i>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Dropdown>
                                    <DropdownTrigger>
                                      <Button
                                        variant="bordered"
                                        className="rounded-3"
                                      >
                                        Total{" "}
                                        {Array.isArray(data.data.rows) &&
                                          data.data.rows?.filter(
                                            (value) =>
                                              value?.attribute_id ==
                                              Attribute?.id
                                          ).length}{" "}
                                        Values
                                      </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu variant="flat" color="danger">
                                      {Array.isArray(data.data.rows) &&
                                        data.data.rows
                                          ?.filter(
                                            (value) =>
                                              value?.attribute_id ==
                                              Attribute?.id
                                          )
                                          ?.map((value) => (
                                            <DropdownItem
                                              key={value.id}
                                              onClick={() => {
                                                setValues({
                                                  ...value,
                                                  is_deleted: true,
                                                }),
                                                  setModalState("Delete"),
                                                  onOpen();
                                              }}
                                            >
                                              <div className=" p-0 m-0 flex justify-between items-center">
                                                <span> {value.name} </span>
                                                <i className="fa-solid fa-trash text-danger"></i>
                                              </div>
                                            </DropdownItem>
                                          ))}
                                    </DropdownMenu>
                                  </Dropdown>
                                  <div className="d-flex"></div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    color="primary"
                                    variant="flat"
                                    onClick={() => {
                                      setModalState("Create"),
                                        setValues({
                                          attribute_id: Attribute?.id,
                                        });
                                      onOpen();
                                    }}
                                  >
                                    Create New Value in {Attribute.name}
                                  </Button>
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
          onClose();
          resetForm();
        }}
      >
        <ModalContent>
          <ModalHeader className="p-3">{ModalState} Attribute</ModalHeader>
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
                        ?.filter((attribute) => attribute.is_deleted)
                        .map((attribute) => {
                          return (
                            <TableRow key={attribute.id}>
                              <TableCell>
                                {attribute.name} [{attribute?.attrbute.id?.name}
                                ]
                              </TableCell>
                              <TableCell>
                                <Button
                                  color="success"
                                  variant="light"
                                  onClick={async () => {
                                    handleAttribute({
                                      ...attribute,
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
                    onClose(), resetForm();
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

export default Attribute;
