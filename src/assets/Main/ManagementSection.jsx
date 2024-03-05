import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { SideBarConfig, SubBar } from "../Configurations/ManagementSection";
import { useDispatch } from "react-redux";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import LordIcons from "../Components/LordIcons";

const ManagementSection = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
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
                <div className="flex items-end">
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
              <div className="flex items-center  col-auto ms-auto d-print-none m-0">
                <Link className=" xs:hidden nav-link ">
                  Download Report
                  <i className="fas fa-arrow-down ms-2"></i>
                </Link>
                <Dropdown placement="bottom-start">
                  <DropdownTrigger className="  ">
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                      }}
                      className="transition-transform"
                      description="@tonyreichert"
                      name="Tony Reichert"
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="User Actions"
                    variant="flat"
                    className="h-60 overflow-y-scroll scrollbar-hide"
                  >
                    {SideBarConfig.map((item) => {
                      return (
                        <DropdownItem
                          closeOnSelect
                          key={item.redirects}
                          className="h-10"
                          color={item.Title === "Logout" ? "danger" : "primary"}
                          onClick={
                            item?.onClickFunction
                              ? () => dispatch(item.onClickFunction())
                              : () => Navigate(item.redirects)
                          }
                          variant="flat"
                        >
                          <div className="flex items-center justify-center">
                            <LordIcons
                              icon={item.icon}
                              width="30"
                              state={item.state}
                              colors={item.colors}
                            />
                            <p className="fw-bold m-0 text-small">
                              {item.Title}
                            </p>
                          </div>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementSection;
