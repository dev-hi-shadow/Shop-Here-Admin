import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LordIcons from "../Components/LordIcons";
import { SideBarConfig } from "../Configurations/ManagementSection";
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <aside className="navbar navbar-vertical navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              {SideBarConfig.map((item, index) => (
                <li key={index} className="nav-item mb-3">
                  <Link
                    onClick={
                      item?.onClickFunction
                        ? () => dispatch(item.onClickFunction())
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
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
