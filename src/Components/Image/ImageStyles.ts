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
    background:
      theme.palette.type === "dark"
        ? theme.palette.grey["800"]
        : theme.palette.grey["100"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.grey["400"],
    flexFlow: "column",
  },
}));

export default useImageStyles;
