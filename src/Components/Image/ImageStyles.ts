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
  },
  completedWork: {
    maxHeight: 280,
  },
  grid: {
    maxHeight: 370,
    width: "100%",
  },
  randomPopUp: {
    width: 240,
    height: 240,
    cursor: "initial",
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
  },
  dragAndDrop: {
    background: theme.palette.grey["100"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey["400"],
    flexFlow: "column",
  },
}));

export default useImageStyles;
