import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NotFoundImage from "../assets/404.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 15000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="not-found-page">
      <h2 className="not-found-page__heading">Sorry, Page Not Found</h2>
      <img src={NotFoundImage} alt="not found" className="not-found-img" />
      <button onClick={handleButtonClick} className="not-found-page__button">
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
