import React, { useEffect, FC } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const ScrollToTop: FC<RouteComponentProps> = ({ location, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{children}</>;
};

export default withRouter(ScrollToTop);
