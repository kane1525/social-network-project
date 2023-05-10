import { ReactNode } from "react";

import "./style.css";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return <div className={`page-container ${className}`}>{children}</div>;
};

export default PageContainer;
