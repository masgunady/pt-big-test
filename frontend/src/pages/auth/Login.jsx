import React from "react";
import bannerAuth from "../../assets/images/login-fam.jpg";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/reducers/auth";
import { asyncLoginAction } from "../../redux/actions/auth";

const validationSchema = Yup.object({
  username: Yup.string().required("USername is Required!"),
  password: Yup.string().required("Password is invalid"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [iconEye, setIconEye] = React.useState(false);
  const [typePassword, setTypePassword] = React.useState(false);
  const handleInputPassword = () => {
    setIconEye(!typePassword);
    setTypePassword(!iconEye);
  };
  const doLogin = async (values, { setSubmitting }) => {
    dispatch(clearMessage());
    dispatch(asyncLoginAction(values));
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (token) {
      dispatch(clearMessage());
      navigate("/");
    }
  }, [token, navigate, dispatch]);

  return (
    <main className="w-full flex justify-center items-center h-screen bg-secondary">
      <div className="w-[70%] h-[600px] flex items-center justify-center">
        <div className="hidden lg:block flex-1 w-full h-full">
          <img src={bannerAuth} className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:max-w-[600px] h-full px-11 bg-white">
          <div className="w-full h-full flex flex-col justify-center items-center gap-7">
            <div className="flex flex-col gap-3 w-full">
              <div className="text-xl text-black font-bold w-full text-left">
                Welcome Back !
              </div>
              <div className="text-base text-black font-semibold w-full">
                Login to continue
              </div>
              {errorMessage && (
                <div className="alert alert-error">{errorMessage}</div>
              )}
            </div>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={doLogin}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-3 text-black">
                    <div className="font-semibold capitalize text-black">
                      Username
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`input input-bordered ${
                          errors.username && touched.username
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type="text"
                        name="username"
                        placeholder="Username"
                      />
                      {errors.username && touched.username && (
                        <label htmlFor="username" className="label">
                          <span className="label-text-alt text-error">
                            {errors.username}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-black">
                    <div className="font-semibold capitalize text-black">
                      Password
                    </div>
                    <div className="w-full relative">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`input input-bordered ${
                          errors.password && touched.password
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type={typePassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                      />

                      <button
                        type="button"
                        onClick={handleInputPassword}
                        className="absolute top-[14px] right-4 text-[#4c3f91]"
                      >
                        {iconEye ? (
                          <i className="">
                            <FiEyeOff size={20} />
                          </i>
                        ) : (
                          <i className="">
                            <FiEye size={20} />
                          </i>
                        )}
                      </button>
                      {errors.password && touched.password && (
                        <label htmlFor="password" className="label">
                          <span className="label-text-alt text-error">
                            {errors.password}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full text-white capitalize"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="w-full text-black text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/auth/register"
                      className="text-primary font-bold"
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
