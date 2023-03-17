import { makeStyles } from "@material-ui/core/styles";

const useImageStyles = makeStyles((theme) => ({
  image: {
    cursor: "pointer",
    objectFit: "cover",
  },
  barImageRef: {
    width: 240,
    height: 240,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  randomPopUp: {
    cursor: "initial",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dragAndDrop: {
    background: theme.palette.grey["800"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.common.white,
    flexFlow: "column",
  },
}));

export default useImageStyles;
