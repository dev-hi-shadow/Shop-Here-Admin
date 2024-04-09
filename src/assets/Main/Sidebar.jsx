import { Link, useNavigate } from "react-router-dom";
import LordIcons from "../Components/LordIcons";
import { SideBarConfig } from "../Configurations/ManagementSection";
import { useLogoutMutation } from "../../Services/API/auth";
const Sidebar = () => {
  const Navigate = useNavigate()
  const [logout, { isError, isLoading, isSuccess, data }] = useLogoutMutation();
  if(data?.logout){
    localStorage.removeItem("accessToken");
    Navigate("/")
   }
   return (
    <>
      <aside className="navbar navbar-vertical navbar-expand-lg  ">
        <div className="container-fluid">
          <div className="navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              {SideBarConfig.map((item, index) => {
                if (item.Title === "Logout") {
                  return (
                    <li key={index} className="nav-item mb-3">
                      <Link
                        onClick={logout}
                        className="nav-link d-flex flex-column"
                        to={item.redirects}
                      >
                        <LordIcons
                          icon={item.icon}
                          state={item.state}
                          colors={item.colors}
                        />
                        <p className="fw-bold my-0">{item.Title}</p>
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="nav-item mb-3">
                      <Link
                        onClick={
                          item?.onClickFunction
                            ? () => item.onClickFunction()
                            : null
                        }
                        className="nav-link d-flex flex-column"
                        to={item.redirects}
                      >
                        <LordIcons
                          icon={item.icon}
                          state={item.state}
                          colors={item.colors}
                        />
                        <p className="fw-bold my-0">{item.Title}</p>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
