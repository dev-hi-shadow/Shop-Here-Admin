import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { GetUsersAction } from "../../Services/Actions/Users";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";
import { USER_ROLES } from "../Helpers";

const Users = () => {
  const { GetUsers } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [Users, setUsers] = useState(null);

  const Location = useLocation();
  useEffect(() => {
    const ActiveFilter = USER_ROLES[Location.pathname.split("/")[1]];
    const users =
      Array.isArray(GetUsers) &&
      GetUsers.filter((item) => {
        return item.role_id.name === ActiveFilter;
      });
    setUsers(users);
  }, [GetUsers, Location.pathname]);

  useLayoutEffect(() => {
    dispatch(GetUsersAction());
  }, [dispatch]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              {["User", "Admin", "Seller", "Customer"].map((item) => (
                <div key={item} className="col-sm-6 col-lg-3">
                  <Card className="w-full  card-link-pop">
                    <CardBody
                      onClick={() => Navigate(`/${item.toLowerCase()}`)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="subheader">{item}s</div>
                        <div className="ms-auto lh-1">
                          <div className="dropdown">
                            <Link
                              className="dropdown-toggle text-muted"
                              to="#"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Last 7 days
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item active" to="#">
                                Last 7 days
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Last 30 days
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Last 3 months
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h1 mb-3">75%</div>
                      <div className="d-flex mb-2">
                        <div>{(item.length * 4).toFixed(2)}%</div>
                        <div className="ms-auto">
                          <span className="text-green d-inline-flex align-items-center lh-1">
                            7%{" "}
                            {/* Download SVG icon from http://tabler-icons.io/i/trending-up */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon ms-1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 17l6 -6l4 4l8 -8" />
                              <path d="M14 7l7 0l0 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${item.length * 4}%` }}
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-label="75% Complete"
                        >
                          <span className="visually-hidden">75% Complete</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
              <div className="row my-3">
                {Array.isArray(Users)
                  ? Users.length < 0
                    ? "NO DATA FOUND"
                    : Users.map((user) => (
                        <div key={user._id} className="col-sm-6 col-lg-3">
                          <Card className="py-4 w-fit">
                            <CardHeader className="overflow-visible py-2">
                              <Image
                                alt="Card background"
                                className="object-cover rounded-xl opacity-100"
                                src="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                width={270}
                              />
                            </CardHeader>
                            <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
                              <p className="text-tiny uppercase font-bold">
                                {user.role_id.name}{" "}
                              </p>
                              <small className="text-default-500">
                                {user.email}
                              </small>
                              <div className="flex justify-between items-center w-full">
                                <h4 className="font-bold text-large">
                                  {user.name}
                                </h4>
                                <Button
                                  isIconOnly
                                  color="warning"
                                  variant="light"
                                >
                                  <IconPencil />
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
