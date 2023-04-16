import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { ReactComponent as WithoutAvatar } from "../../../assets/Group.svg";
import { updateUserThunk } from "../../../redux/auth/asyncActions";
import { authUserSelector } from "../../../redux/auth/selectors";
import TextInput from "../../TextInput";

import "./style.css";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, avatar, email, login } =
    useSelector(authUserSelector);
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [fileContents, setFileContents] = useState(avatar);

  const initialValues = {
    login,
    firstName,
    lastName,
    email,
    avatar,
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      .matches(/^[A-z0-9]+$/, {
        message: "Just latin letters and numbers",
      })
      .required("This field is required"),
    firstName: Yup.string()
      .matches(/^[A-z]+$/, {
        message: "Just latin letters",
      })
      .required("This field is required"),
    lastName: Yup.string()
      .matches(/^[A-z]+$/, {
        message: "Just latin letters",
      })
      .required("This field is required"),
    email: Yup.string().required("This field is required").email(),
    avatar: Yup.mixed().test("fileSize", "File size too large", (value) => {
      return fileRef.current ? fileRef.current.size <= 7000 : true;
    }),
  });

  const onSubmit = (values, onSubmitProps) => {
    dispatch(updateUserThunk(values))
      .then((res) => {
        onSubmitProps.setSubmitting(false);
        setMessage("Settings changed successfully");
        setTimeout(setMessage, 1500, "");
      })
      .catch((e) => {
        setError(e.message);
        setTimeout(setError, 1500, "");
        onSubmitProps.resetForm();
      });
  };

  const handleFileChange = (event, formik) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      setFileContents(contents);
      formik.setFieldValue("avatar", contents);
    };
    if (file) {
      reader.readAsDataURL(file);
      fileRef.current = file;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form className="settings-form">
            <div className="settings-form__avatar-upload">
              {fileContents ? (
                <img
                  className="settings-form__avatar"
                  src={fileContents}
                  alt="avatar"
                />
              ) : (
                <WithoutAvatar className="settings-form__avatar" />
              )}

              <label className="settings-form__avatar-upload-button">
                Change avatar
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={(event) => {
                    handleFileChange(event, formik);
                  }}
                />
              </label>
              {formik?.errors?.avatar && (
                <div className="text-input__error">
                  {formik?.errors?.avatar}
                </div>
              )}
            </div>
            <TextInput
              label="First name"
              name="firstName"
              type="text"
              placeholder="Your first name"
            />
            <TextInput
              label="Last name"
              name="lastName"
              type="text"
              placeholder="your last name"
            />
            <TextInput
              label="Login"
              name="login"
              type="text"
              placeholder="Your login"
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Your email"
            />
            {message && <p className="settings-form-message">{message}</p>}
            {error && <p className="settings-form-error">{error}</p>}
            <button
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              type="submit"
              className="settings-form__submit-btn settings-form__avatar-upload-button"
            >
              Save profile
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SettingsForm;
