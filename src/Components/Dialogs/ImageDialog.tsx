import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "./Dialog";
import { isURL } from "../../utils";
import { BASE_URL } from "../../constants";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    zIndex: theme.zIndex.snackbar,
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  image: {
    objectFit: "contain",
    height: "100%",
  },
}));

interface Props {
  image: string;
  dialogOpen: boolean;
  setDialogOpen: () => void;
  variant: string;
  onRemove?: () => void;
}

const ImageDialog: FC<Props> = ({
  image,
  dialogOpen,
  setDialogOpen,
  variant,
  onRemove,
}) => {
  const classes = useStyles();
  return (
    <>
      <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} transparent>
        <img
          src={isURL(image) ? image : `${BASE_URL}/images/${variant}/${image}`}
          className={classes.image}
        />
      </Dialog>
      {onRemove && (
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              onRemove();
              setDialogOpen();
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageDialog;
