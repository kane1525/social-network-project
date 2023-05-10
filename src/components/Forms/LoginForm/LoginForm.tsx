import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "redux/store";
import * as Yup from "yup";

import { fetchUserThunk, loginThunk } from "../../../redux/auth/asyncActions";
import {
  authErrorSelector,
  authLoadingSelector,
} from "../../../redux/auth/selectors";
import TextInput from "../../TextInput";

import "./style.css";

interface FormValues {
  login: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const isLoading = useSelector(authLoadingSelector);
  const error = useSelector(authErrorSelector);

  const initialValues = {
    login: "",
    password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string().required("Login is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    dispatch(loginThunk(values)).then(() => {
      dispatch(fetchUserThunk());
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    });
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="login-form-title">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const disabled =
            !formik.isValid || !formik.dirty || formik.isSubmitting;
          return (
            <Form className="login-form">
              <TextInput
                label="Login"
                type="text"
                placeholder="enter your login"
                name="login"
                id="login"
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="enter your password"
                name="password"
                id="password"
              />

              <button
                type="submit"
                className={`login-form__button ${disabled ? "disabled" : ""}`}
                disabled={formik.isSubmitting}
              >
                Sign In
              </button>
            </Form>
          );
        }}
      </Formik>
      <p>
        if you don't have an account, you can{" "}
        <Link to="/register">Register</Link>
      </p>
      {isLoading && <p className="login-form-status">Loading...</p>}
      {error && <p className="login-form-error">{error}</p>}
    </div>
  );
};

export default LoginForm;
