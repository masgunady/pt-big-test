import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";

import * as Yup from "yup";
import { asyncRegisterAction } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { clearMessage } from "../../redux/reducers/auth";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is Required!").email("Email is invalid!"),
  username: Yup.string().required("Username is Required!"),
  fullName: Yup.string().required("Full name is Required!"),
  password: Yup.string().required("Password is Required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);
  const [iconEye, setIconEye] = React.useState(false);
  const [typePassword, setTypePassword] = React.useState(false);

  const [selectedPicture, setSelectedPicture] = React.useState(false);
  const [pictureURI, setPictureURI] = React.useState("");

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };

  const handleInputPassword = () => {
    setIconEye(!typePassword);
    setTypePassword(!iconEye);
  };

  const doRegister = async (values, { setSubmitting }) => {
    dispatch(clearMessage());
    const newValue = { ...values, picture: selectedPicture };
    dispatch(asyncRegisterAction(newValue));
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [successMessage, navigate, dispatch]);

  return (
    <main className="w-full bg-secondary">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full lg:max-w-[500px] py-11 px-11 bg-white">
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-2 w-full">
              <div className="text-xl text-primary font-bold w-full text-center">
                Create New Account
              </div>
              <div className="text-base text-primary font-semibold w-full text-center">
                Get your free account now
              </div>
              {successMessage && (
                <div className="alert alert-success text-white capitalize">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-error text-white capitalize">
                  {errorMessage}
                </div>
              )}
            </div>
            <Formik
              initialValues={{
                email: "",
                username: "",
                fullName: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={doRegister}
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
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Email
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`input input-bordered text-black ${
                          errors.email && touched.email
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type="text"
                        name="email"
                        placeholder="Email"
                      />
                      {errors.email && touched.email && (
                        <label htmlFor="email" className="label">
                          <span className="label-text-alt text-error">
                            {errors.email}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Username
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`input input-bordered text-black ${
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
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Photo
                    </div>
                    <div className="w-full">
                      <input
                        name="picture"
                        onChange={changePicture}
                        className=""
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      FullName
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className={`input input-bordered text-black ${
                          errors.fullName && touched.fullName
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                      />
                      {errors.fullName && touched.fullName && (
                        <label htmlFor="fullName" className="label">
                          <span className="label-text-alt text-error">
                            {errors.fullName}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Password
                    </div>
                    <div className="w-full relative">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`input input-bordered text-black ${
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
                      Sign Up
                    </button>
                  </div>

                  <div className="w-full text-black text-center">
                    <div className="w-full mb-5">Create Account with :</div>
                    <div className="w-full flex justify-center items-center gap-5">
                      <Link
                        to="https://www.facebook.com"
                        target="_blank"
                        className="hover:text-[#373a42]"
                      >
                        <AiFillFacebook size={35} className="text-primary" />
                      </Link>
                      <Link
                        to="https://www.google.com"
                        target="_blank"
                        className="hover:text-[#373a42]"
                      >
                        <FcGoogle size={35} className="text-primary" />
                      </Link>
                    </div>
                  </div>
                  <div className="w-full text-black text-center">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-primary font-bold">
                      {" "}
                      Sign In
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

export default Register;
