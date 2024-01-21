import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { SubBar } from "../Configurations/ManagementSection";

const ManagementSection = () => {
  const [Module, setModule] = useState();
  const Location = useLocation();
  useEffect(() => {
    setModule(Location.pathname.split("/")[1]);
  }, [Location]);
  const Capitalize = (str) => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  };
  const Keys = Object.keys(SubBar);
  const Key = Keys?.find((key) => {
    return SubBar[key].find((key) => key === Module);
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="page-header d-print-none mt-3">
          <div className="container-xl">
            <div
              className="row g-2 align-items-center border-blue border p-1  m-0  "
              style={{ borderRadius: "5px" }}
            >
              <div className="col m-0">
                {/* Page pre-title */}
                <div className="page-pretitle">Overview</div>
                <div className="d-flex align-items-center">
                  <h2 className="page-title me-3">
                    {Capitalize(Module) === ""
                      ? "Dashboard"
                      : Capitalize(Module)}
                  </h2>
                  {SubBar[Key]?.length > 0 &&
                    SubBar[Key]?.map((value, index) => {
                      return (
                        <Link
                          to={"/" + value}
                          key={index}
                          className={` m-0 mx-2 text-sm text-black fw-bold ${
                            value === Module ? "d-none" : ""
                          } `}
                        >
                          {Capitalize(value)}
                        </Link>
                      );
                    })}
                </div>
              </div>
              {/* Page title actions */}
              <div className="col-auto ms-auto d-print-none m-0">
                <Link className="nav-link ">
                  Download Report
                  <i className="fas fa-arrow-down ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementSection;
