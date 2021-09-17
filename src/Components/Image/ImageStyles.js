import { makeStyles } from "@material-ui/core/styles";

const useImageStyles = makeStyles((theme) => ({
  image: {
    cursor: "pointer",
    objectFit: "cover",
  },
  barImageRef: {
    width: 240,
    height: 240,
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
    background: "lightgrey",
  },
}));

export default useImageStyles;
