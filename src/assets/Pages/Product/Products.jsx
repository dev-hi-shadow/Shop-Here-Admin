/* eslint-disable no-unused-vars */
import { useState } from "react";

import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const Products = () => {
  const [ViewProduct, setViewProduct] = useState();

  const handlePublish = (productId, state) => {};

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <table className="table table-vcenter card-table">
                <thead>
                  <TableRow></TableRow>
                </thead>
              </table>

              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>#</TableColumn>
                  <TableColumn>Image</TableColumn>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Brand</TableColumn>
                  <TableColumn>Category</TableColumn>
                  <TableColumn>Rating</TableColumn>
                  <TableColumn>URL</TableColumn>
                  <TableColumn>Publish</TableColumn>
                  <TableColumn className="text-center">Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                  {Array.isArray(Products) &&
                    Products.map((product, index) => {
                      return (
                        <TableRow key={index + 1}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <img
                              className="rounded"
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              width={80}
                              height="auto"
                            />
                          </TableCell>
                          <TableCell>{product?.name} by name</TableCell>
                          <TableCell>{product?.brandid?.name}</TableCell>
                          <TableCell>{product?.category_id?.name}</TableCell>
                          <TableCell>Ratting (todo)</TableCell>
                          <TableCell>
                            <a
                              href={product?.friendly_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Go To Product
                            </a>
                          </TableCell>
                          <TableCell>
                            {product?.is_publish ? (
                              <button
                                className="btn btn-green btn-sm"
                                onClick={() =>
                                  handlePublish(product?.id, false)
                                }
                              >
                                &nbsp; Published&nbsp;
                              </button>
                            ) : (
                              <button
                                className="btn btn-red btn-sm"
                                onClick={() => handlePublish(product?.id, true)}
                              >
                                Unpublished
                              </button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Link
                              className="p-2 bg-primary rounded mx-1"
                              data-bs-target="#ProductViewModal"
                              data-bs-toggle="modal"
                              onClick={() => setViewProduct(product)}
                            >
                              <i className="fas fa-eye text-white"></i>
                            </Link>
                            <Link className="p-2 bg-yellow rounded mx-1">
                              <i className="fas fa-pencil text-white"></i>
                            </Link>
                            <Link className="p-2 bg-red rounded mx-1">
                              <i className="fas fa-trash text-white"></i>
                            </Link>
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

      <div
        className="modal modal-blur fade"
        id="ProductViewModal"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-full-width modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="container">
                <div className="d-flex justify-content-end">
                  <i
                    className="fas fa-xmark  fs-1 text-red cursor-pointer"
                    data-bs-dismiss="modal"
                  ></i>
                </div>
                {ViewProduct && (
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <div className="d-flex flex-column">
                            {/*
                              //TODO
                              IMAGE FETCH AND LOOP 
                           */}
                            <img
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              className="m-2 rounded"
                              height={100}
                              width="auto"
                            />
                            <img
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              className="m-2 rounded"
                              height={100}
                              width="auto"
                            />
                            <img
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              className="m-2 rounded"
                              height={100}
                              width="auto"
                            />
                            <img
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              className="m-2 rounded"
                              height={100}
                              width="auto"
                            />
                            <img
                              src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                              className="m-2 rounded"
                              height={100}
                              width="auto"
                            />
                          </div>
                        </div>
                        <div className=" col-9">
                          <img
                            src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                            className="m-2 w-100 rounded"
                            height={566}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 my-2">
                      <div className="d-flex flex-column">
                        <p className="fs-1  mb-2">{ViewProduct?.name}</p>
                        <span className="d-flex align-items-center mb-2">
                          {/* 
                          //TODO
                          RATTING OF PRODUCT \
                           */}
                          <ReactStars
                            classNames="me-3"
                            size={20}
                            edit={false}
                            value={4.5}
                            emptyIcon={<i className="fa-solid fa-star"></i>}
                            halfIcon={
                              <i className="fa-solid fa-star-half-alt"></i>
                            }
                            fullIcon={<i className="fa-solid fa-star"></i>}
                            activeColor="black"
                          />
                          <span> 16 reviews</span>
                        </span>
                        <p>
                          <span className="">Vandor: </span>
                          <span className="ms-1">
                            {ViewProduct?.userid?.name}
                          </span>
                        </p>
                        <p>
                          <span className="">Product Type: </span>
                          <span className="ms-1">{ViewProduct?.type}</span>
                        </p>
                        <p className="mb-3">
                          <span className="">SKU: </span>
                          <span className="ms-1">{ViewProduct?.SKU}</span>
                        </p>

                        <p className="mb-3">
                          <span className="text-black text-decoration-underline me-2 ">
                            Limited time offer:
                          </span>
                          <span className="text-black underline">35 DAYS</span>
                        </p>
                        <div className=" mb-3">
                          <p className="mb-2">Attributes: </p>

                          {Array.isArray(ViewProduct?.attributes) &&
                            ViewProduct?.attributes?.map((attribute, index) => {
                              return (
                                <>
                                  <div className="d-flex mb-1" key={index}>
                                    <p className="badge me-3 bg-red m-0">
                                      {attribute?.attributeid?.name}
                                    </p>
                                    :
                                    {Array.isArray(attribute?.values) &&
                                      attribute?.values?.map((value, index) => {
                                        return (
                                          <span
                                            className="mx-1 badge"
                                            key={index}
                                          >
                                            {value?.name}
                                          </span>
                                        );
                                      })}
                                  </div>
                                </>
                              );
                            })}
                        </div>

                        <p className="mb-3 d-flex">
                          <span className="me-3">description : </span>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: ViewProduct?.description?.substring(
                                0,
                                50
                              ),
                            }}
                          ></span>
                        </p>

                        <p className="mb-3"> Variants:</p>
                        <div className="table-responsive">
                          <Table className="table table-vcenter card-table">
                            <TableHeader>
                              <TableColumn className="text-center">
                                Variant
                              </TableColumn>
                              <TableColumn className="text-center">
                                #
                              </TableColumn>
                              <TableColumn className="text-center">
                                Manufacture Price
                              </TableColumn>
                              <TableColumn className="text-center">
                                Retail Price
                              </TableColumn>
                              <TableColumn className="text-center">
                                Publish
                              </TableColumn>
                              <TableColumn className="text-center">
                                Actions
                              </TableColumn>
                            </TableHeader>
                            <TableBody>
                              {Array.isArray(ViewProduct?.price) &&
                                ViewProduct?.price.map((variation) => {
                                  return (
                                    <TableRow key={variation?.id}>
                                      <TableCell className="text-center">
                                        1
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {variation.variation}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {variation.manufacture_price}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {variation.retail_price}
                                      </TableCell>

                                      <TableCell className="text-center">
                                        {variation?.is_publish && (
                                          <Link
                                            className="text-decoration-none text-red"
                                            // onClick={() =>
                                            //   handlePublishVariation(
                                            //     variation?.id,
                                            //     true
                                            //   )
                                            // }
                                          >
                                            Unactive
                                          </Link>
                                        )}

                                        {!variation?.is_publish && (
                                          <Link
                                            className="text-green text-decoration-none"
                                            // onClick={() =>
                                            //   handlePublishVariation(
                                            //     variation?.id,
                                            //     false
                                            //   )
                                            // }
                                          >
                                            &nbsp;Active&nbsp;
                                          </Link>
                                        )}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Link className="p-2 bg-red rounded">
                                          <i className="fas fa-trash text-white"></i>
                                        </Link>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
