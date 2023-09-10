import React, { useEffect, FC, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const ScrollToTop: FC<RouteComponentProps & { children: ReactNode }> = ({
  location,
  children,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
};

export default withRouter(ScrollToTop);
