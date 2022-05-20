import React, { FC } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { selectToken, logout } from "../Reducers/authSlice";
import { dataAPI } from "../Services/dataAPI";

interface Props {
  setLoginDialogOpen: () => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(2),
    cursor: "pointer",
  },
  on: {
    color: "white",
  },
  off: {
    color: "transparent",
  },
}));

const Footer: FC<Props> = ({ setLoginDialogOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleClick = (e: MouseEvent) => {
    if (e.shiftKey && !token) {
      setLoginDialogOpen();
    } else if (token) {
      dispatch(logout());
      dispatch(
        dataAPI.endpoints.getData.initiate(undefined, { forceRefetch: true })
      );
    }
  };

  return (
    <div
      className={classnames(
        classes.container,
        token ? classes.on : classes.off
      )}
      // @ts-ignore
      onClick={(e) => handleClick(e)}
    >
      π
    </div>
  );
};

export default Footer;
