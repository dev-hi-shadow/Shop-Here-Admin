import { Link } from "react-router-dom";
import { LogoutAction } from "../../Services/Actions/Authentication";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <aside className="navbar navbar-vertical navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              <li className="nav-item mb-3">
                <Link className="nav-link d-flex flex-column" to="/">
                  <lord-icon
                    src="https://cdn.lordicon.com/hbwqfgcf.json"
                    trigger="hover"
                    colors="outline:#084186,primary:#206bc4,secondary:#206bc4,tertiary:#206bc4"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0">Dashboard</p>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  className="nav-link d-flex flex-column "
                  to="/product-list "
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/nocovwne.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#206bc4"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0 text-center">Product</p>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link d-flex flex-column" to="/stock-in">
                  <lord-icon
                    src="https://cdn.lordicon.com/etqbfrgp.json"
                    trigger="hover"
                    colors="outline:#131432,primary:#92140c,secondary:#f24c00,tertiary:#b26836,quaternary:#ebe6ef"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0 text-center">Warehouse</p>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link d-flex flex-column" to="/brand">
                  <lord-icon
                    src="https://cdn.lordicon.com/snvfoxut.json"
                    trigger="hover"
                    colors="outline:#242424,primary:#206bc4,secondary:#000000"
                    stroke="40"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0 text-center">
                    Association Management
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link d-flex flex-column" to="/brand">
                  <lord-icon
                    src="https://cdn.lordicon.com/vusrdugn.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#b26836,tertiary:#206bc4,quaternary:#f9c9c0,quinary:#ebe6ef"
                    state="hover-jump"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0 text-center">Profile</p>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link
                  className="nav-link d-flex flex-column"
                  onClick={() => dispatch(LogoutAction())}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/twopqjaj.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#ebe6ef,tertiary:#f9c9c0,quaternary:#f24c00,quinary:#3a3347,senary:#b26836,septenary:#206bc4"
                    style={{ width: "60px", height: "60px" }}
                  ></lord-icon>
                  <p className="fw-bold my-0 text-center">Logout</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
