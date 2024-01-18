import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginAction } from "../../Services/Actions/Authentication";
import { useEffect } from "react";
import { SignInInitialState } from "../Configurations/InitialStates";
import { SignInSchema } from "../Configurations/YupSchema";
import { useFormik } from "formik";
import Toastify from "../Components/Toastify";
import { Button, Input } from "@nextui-org/react";

const SignIn = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);

  const handleSignInSubmit = (values) => {
     const body = { ...values };
    dispatch(LoginAction(body));
  };
  useEffect(() => {
    if (authentication.isAuthenticated || authentication.profile) {
      const accessToken = authentication?.signin?.token;
      if (accessToken) {
        window.localStorage.setItem(
          "accessToken",
          authentication?.signin?.token
        );
      }
      Navigate("/");
    }
  }, [Navigate, authentication]);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: SignInInitialState,
      validationSchema: SignInSchema,
      onSubmit: handleSignInSubmit,
    });

  return (
    <>
      <Toastify />
      <main className="main-content my-5 ps">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-7 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header text-left bg-transparent py-4 flex justify-between items-center	">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome back
                      </h3>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <Input
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.credential}
                          variant="bordered"
                          name="credential"
                          type="text"
                          isRequired
                          placeholder="Email or Phone"
                          isInvalid={errors.credential && touched.credential}
                          errorMessage={touched.credential && errors.credential}
                        />
                        <Input
                          className="mb-3"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.password}
                          name="password"
                          variant="bordered"
                          type="password"
                          isRequired
                          placeholder="Password"
                          isInvalid={errors.password && touched.password}
                          errorMessage={touched.password && errors.password}
                        />

                        <Button
                          type="submit"
                          value="submit"
                          variant="faded"
                          color="primary"
                        >
                          Sign in
                        </Button>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Dont have an account?
                        <Link
                          to="/sign-up"
                          className="text-info text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                      className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                      style={{
                        backgroundImage: `url("public/assets/img/curved-images/curved6.jpg") `,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            className="ps__thumb-x"
            tabIndex="0"
            style={{ left: "0px", width: "0px" }}
          ></div>
        </div>
        <div className="ps__rail-y" style={{ top: "0px", right: "0px" }}>
          <div
            className="ps__thumb-y"
            tabIndex="0"
            style={{ top: "0px", height: "0px" }}
          ></div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
