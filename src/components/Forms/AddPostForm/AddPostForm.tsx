import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState } from "react";
import { useAppDispatch } from "redux/store";
import { CreatePostData } from "types/apiTypes";
import * as Yup from "yup";

import { createPostThunk } from "../../../redux/auth/asyncActions";
import TextInput from "../../TextInput";

import "./style.css";

interface FormValues {
  postTitle: string;
  postImage: string;
}

interface AddPostFormProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPostForm = ({ setIsPopupOpen }: AddPostFormProps) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string>("");

  const initialValues = {
    postTitle: "",
    postImage: "",
  };

  const validationSchema = Yup.object({
    postTitle: Yup.string()
      .matches(/^[A-z0-9]+$/, {
        message: "Just latin letters and numbers",
      })
      .required("This field is required"),

    postImage: Yup.mixed()
      .required("Image is required")
      .test("fileSize", "File size should be less then 15kb", (value) => {
        if (value && "size" in value) {
          return (value.size as number) <= 15000;
        }
        return true;
      }),
  });

  const onSubmit = (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const fD = new FormData();
    fD.append("title", values.postTitle);
    fD.append("image", values.postImage);
    dispatch(createPostThunk(fD as CreatePostData)).then(() => {
      setIsPopupOpen(false);
      onSubmitProps.setSubmitting(false);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<FormValues>
  ) => {
    const file = event.target.files?.[0];
    await formik.setFieldValue("postImage", file);
    formik.validateField("postImage");
    formik.setFieldTouched("postImage");

    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target?.result;
      if (contents && typeof contents === "string") {
        setImage(contents);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-post-form-wrapper">
      <h2 className="add-post-form-heading">Add post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form className="add-post-form">
              <TextInput
                label="Post Title"
                name="postTitle"
                type="text"
                placeholder="post title"
              />
              <div className="add-post-form__image-upload">
                {image && (
                  <img
                    className="add-post-form__image"
                    src={image}
                    alt="avatar"
                  />
                )}
                <label className="add-post-form__image-upload-button">
                  Change image
                  <input
                    id="postImage"
                    name="postImage"
                    type="file"
                    accept="image/png,image/jpeg"
                    hidden
                    onChange={(event) => {
                      handleImageChange(event, formik);
                    }}
                  />
                </label>
                {formik?.errors?.postImage && formik.touched.postImage && (
                  <div className="text-input__error">
                    {formik?.errors?.postImage}
                  </div>
                )}
              </div>

              <button
                disabled={formik.isSubmitting}
                type="submit"
                className={
                  !formik.isValid || !formik.dirty || formik.isSubmitting
                    ? "disabled"
                    : ""
                }
              >
                Create post
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPostForm;
