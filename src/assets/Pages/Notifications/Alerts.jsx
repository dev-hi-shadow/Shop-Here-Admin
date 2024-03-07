// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { CategoryInitialState } from "../Configurations/InitialStates";
// import { CategorySchema } from "../Configurations/YupSchema";
// import { useFormik } from "formik";

import moment from "moment/moment";
import {
  //   Button,
  //   Input,
  //   Modal,
  //   ModalBody,
  //   ModalContent,
  //   ModalFooter,
  //   ModalHeader,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  //   useDisclosure,
} from "@nextui-org/react";
import { TableBody, TableHeader } from "@react-stately/table";
const Alerts = () => {
  const GetNotifications = []; 

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Total {} Categories</h6>
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
                      {Array.isArray(GetNotifications) &&
                      GetNotifications?.length > 0
                        ? GetNotifications?.map((notification, index) => {
                            if (
                              [false, null].includes(notification?.is_deleted)
                            ) {
                              return (
                                <TableRow key={notification.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{notification.title}</TableCell>
                                  <TableCell>
                                    {moment(notification.created_at).format(
                                      "MMMM DD, YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <i
                                      onClick={() => {
                                        // onOpen(),
                                        //   setModalState("Update"),
                                        //   setValues(Category);
                                      }}
                                      className="fa-solid fa-pen me-3 text-warning  mr-2 "
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                    <i
                                      onClick={() => {
                                        // onOpen(),
                                        //   setModalState("Delete"),
                                        //   setValues({
                                        // ...Category,
                                        // is_deleted: true,
                                        //   });
                                      }}
                                      className="fa-solid fa-trash ms-3 text-danger ml-2"
                                      style={{ fontSize: "20px" }}
                                    ></i>
                                  </TableCell>
                                </TableRow>
                              );
                            }
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
    </>
  );
};

export default Alerts;
