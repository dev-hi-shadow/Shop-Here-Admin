import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditProductAction,
  GetProductAction,
 } from "../../../Services/Actions/Product";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Products = () => {
  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const [Products, setProducts] = useState([]);
  const [ViewProduct, setViewProduct] = useState();

  const handlePublish = (productId, state) => {
    dispatch(EditProductAction({ _id: productId, is_publish: state }));
  };

  const handlePublishVariation = (id, state) => {
    // dispatch(
    //   VariationActiveDeactive({
    //     _id: ViewProduct?._id,
    //     variation_id: id,
    //     is_publish: state,
    //   })
    // );
  };

  useEffect(() => {
    dispatch(GetProductAction());
  }, [dispatch]);

  useEffect(() => {
    const ActiveProducts = productState?.GetProduct?.filter((product) => {
      return product.is_deleted === false;
    });
    setProducts(ActiveProducts);
  }, [productState.GetProduct]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="table-responsive rounded">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Rating</th>
                      <th>URL</th>
                      <th>Publish</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(Products) && Products.length > 0
                      ? Products.map((product, index) => {
                          return (
                            <tr key={index + 1}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  className="rounded"
                                  src="/static/photos/elegant-home-office-with-golden-accessories.jpg"
                                  width={80}
                                  height="auto"
                                />
                              </td>
                              <td>{product?.name} by name</td>
                              <td>{product?.brand_id?.name}</td>
                              <td>{product?.category_id?.name}</td>
                              <td>Ratting (todo)</td>
                              <td>
                                <a
                                  href={product?.friendly_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Go To Product
                                </a>
                              </td>
                              <td>
                                {product?.is_publish ? (
                                  <button
                                    className="btn btn-green btn-sm"
                                    onClick={() =>
                                      handlePublish(product?._id, false)
                                    }
                                  >
                                    &nbsp; Published&nbsp;
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-red btn-sm"
                                    onClick={() =>
                                      handlePublish(product?._id, true)
                                    }
                                  >
                                    Unpublished
                                  </button>
                                )}
                              </td>
                              <td>
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
                              </td>
                            </tr>
                          );
                        })
                      : "Data Not Found"}
                  </tbody>
                </table>
              </div>
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
                            {ViewProduct?.user_id?.name}
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
                        {/* 
 //TODO
 Offers fetch and Show Only those Offers Which is associate with this product
 */}
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
                                      {attribute?.attribute_id?.name}
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
                          <table className="table table-vcenter card-table">
                            <thead>
                              <tr>
                                <th className="text-center">Variant</th>
                                <th className="text-center">#</th>
                                <th className="text-center">
                                  Manufacture Price
                                </th>
                                <th className="text-center">Retail Price</th>
                                <th className="text-center">Publish</th>
                                <th className="text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(ViewProduct?.price) &&
                                ViewProduct?.price.map((variation) => {
                                  return (
                                    <tr key={variation?._id}>
                                      <td className="text-center">1</td>
                                      <td className="text-center">
                                        {variation.variation}
                                      </td>
                                      <td className="text-center">
                                        {variation.manufacture_price}
                                      </td>
                                      <td className="text-center">
                                        {variation.retail_price}
                                      </td>

                                      <td className="text-center">
                                        {variation?.is_publish && (
                                          <Link
                                            className="text-decoration-none text-red"
                                            onClick={() =>
                                              handlePublishVariation(
                                                variation?._id,
                                                true
                                              )
                                            }
                                          >
                                            Unactive
                                          </Link>
                                        )}

                                        {!variation?.is_publish && (
                                          <Link
                                            className="text-green text-decoration-none"
                                            onClick={() =>
                                              handlePublishVariation(
                                                variation?._id,
                                                false
                                              )
                                            }
                                          >
                                            &nbsp;Active&nbsp;
                                          </Link>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        <Link className="p-2 bg-red rounded">
                                          <i className="fas fa-trash text-white"></i>
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
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
