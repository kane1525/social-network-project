import './style.css';

const PageContainer = ({ children, className }) => {
  return <div className={`page-container ${className}`}>{children}</div>;
};

export default PageContainer;
