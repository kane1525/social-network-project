import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '../FormGroup';
import { createPost } from '../../api/api';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../store/authSlice';
import './style.css';

const AddPostForm = ({ setIsPopupOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    imageToShow: null,
  });
  const [errors, setErrors] = useState({ title: '', image: '' });
  const dispatch = useDispatch();

  function handleTitleChange(e) {
    setFormData({ ...formData, title: e.target.value });
    if (e.target.value.length) {
      setErrors({ ...errors, title: '' });
    } else {
      setErrors({ ...errors, title: 'Title is required' });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    setFormData((prev) => ({ ...prev, image: file }));
    setErrors({ ...errors, image: '' });
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const base64Data = reader.result;
      setFormData((prev) => ({ ...prev, imageToShow: base64Data }));
    };
  }

  function handleCreatePost() {
    if (formData.title && formData.image) {
      const fD = new FormData();
      fD.append('title', formData.title);
      fD.append('image', formData.image);
      dispatch(createPostThunk(fD)).then(() => {
        setIsPopupOpen(false);
      });
    } else {
      if (!formData.title) {
        setErrors((prev) => ({ ...prev, title: 'title is required' }));
      }
      if (!formData.image) {
        setErrors((prev) => ({ ...prev, image: 'image is required' }));
      }
    }
  }

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="form">
      <h2>Add post</h2>
      <form>
        <div className="form-group">
          <input
            name="title"
            placeholder="Post title"
            id="title"
            required
            onChange={handleTitleChange}
            onBlur={() => {
              handleFocus();
              if (!formData.title.length) {
                setErrors({ ...errors, title: 'title is required' });
              }
            }}
            focused={focused.toString()}
          />
          <div className="errorr">{errors.title}</div>
        </div>
        <div className="add-post-file-wrapper">
          <label className="add-post-button">
            add file
            <input onChange={handleFileChange} type="file" hidden />
          </label>
          <div className="errorr">{errors.image}</div>
        </div>

        {formData.imageToShow && (
          <img
            className="add-post-img"
            width="50px"
            src={formData.imageToShow}
            alt="im"
          />
        )}

        <button onClick={handleCreatePost} type="button">
          Create post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
