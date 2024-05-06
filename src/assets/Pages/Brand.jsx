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
import NextImage from "../Components/NextUI/NextImage";
import NextButton from "../Components/NextUI/NextButton";
import { IconRefresh } from "@tabler/icons-react";

const Brand = () => {
  const { data, isSuccess, isLoading } = useGetBrandsQuery();
  const [CreateBrand] = useCreateBrandMutation();
  const [UpdateBrand] = useUpdateBrandMutation();
  const [DeleteBrand] = useDeleteBrandMutation();

  const [ModalState, setModalState] = useState("");
  const [ImagePreview, setImagePreview] = useState(null);
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
    initialValues: BrandInitialState,
    validationSchema: BrandSchema,
    onSubmit: () => handleBrand(values),
  });
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];

    if (image) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };
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
                      <TableColumn>Image</TableColumn>
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
                        data.data.rows?.map((Brand, index) => {
                          console.log("🚀  Brand:", Brand)
                          return (
                            <TableRow key={Brand.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{Brand.name}</TableCell>
                              <TableCell>
                                <NextImage src={Brand.image} />
                              </TableCell>
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

      <Modal
        size={"lg"}
        scrollBehavior="outside"
        isOpen={isOpen}
        onClose={() => {
          onClose(), resetForm();
        }}
      >
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
                  <div className="flex items-center justify-center w-full">
                    {ImagePreview ? (
                      <>
                        <div className="flex flex-col  justify-around w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <NextImage
                            src={ImagePreview}
                            alt="Image Preview"
                            className="w-full h-full mb-3"
                          />
                          <div
                            className={`flex justify-center px-3 items-center flex-wrap`}
                          >
                            <NextButton
                              onClick={() => {
                                setImagePreview(null);
                                setValues({ ...values, image: null });
                              }}
                              buttonText={"Change Image"}
                              EndContent={<IconRefresh />}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <label
                          onBlur={handleBlur}
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full max-h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-6 h-6 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            name="image"
                            onChange={(e) => {
                              handleImageChange(e);
                              handleChange(e);
                            }}
                            className="hidden"
                          />
                        </label>
                        {touched.image && errors.image}
                      </>
                    )}
                  </div>
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
              <ModalFooter
                className={`p-3 flex justify-${
                  ModalState !== "Create" ? "end" : "between"
                } align-center flex-wrap`}
              >
                <div className={`${ModalState != "Create" && "hidden"}`}>
                  <NextButton
                    buttonText={"Reset"}
                    color="danger"
                    onClick={resetForm}
                  />
                </div>
                <div className="flex">
                  <NextButton
                    color="danger"
                    varient="light"
                    buttonText={"Close"}
                    onClick={() => {
                      onClose(), resetForm();
                    }}
                  />
                  <NextButton
                    color={ModalState === "Delete" ? "danger" : "primary"}
                    type="submit"
                    buttonText={"Save"}
                  >
                    {ModalState}
                  </NextButton>
                </div>
              </ModalFooter>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Brand;
