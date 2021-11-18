import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useFormStyles = makeStyles((theme) =>
  createStyles({
    text: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    lightGrey: {
      color: theme.palette.primary.dark,
    },
    icon: {
      cursor: "pointer",
      marginRight: theme.spacing(6),
      marginTop: theme.spacing(1),
    },
    date: {
      textAlign: "right",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginRight: theme.spacing(5),
    },
    marginBottom2: {
      marginBottom: theme.spacing(2),
    },
    marginBottom3: {
      marginBottom: theme.spacing(3),
    },
    marginRight: {
      marginRight: theme.spacing(2),
    },
    paddingLeft: {
      paddingLeft: theme.spacing(2),
    },
    flex: {
      display: "flex",
    },
    spaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3),
    },
    fullWidth: {
      width: "100%",
    },
    button: {
      minWidth: theme.spacing(17),
      borderRadius: theme.spacing(1),
    },
    buttonContainer: {
      alignSelf: "flex-end",
      flex: "1",
      display: "flex",
      alignItems: "center",
    },
    bottomContainer: {
      display: "flex",
      flexFlow: "column",
    },
    fontWeightBold: {
      fontWeight: "bold",
    },
    pointer: {
      cursor: "pointer",
    },
    displayNone: {
      display: "none",
    },
    lighterGrey: {
      color: theme.palette.grey[400],
    },
    verticalDivider: {
      height: theme.spacing(3),
      width: "1px",
      background: theme.palette.grey["500"],
      marginRight: theme.spacing(2),
    },
    variantColor: {
      position: "absolute",
      width: "100px",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: -1,
    },
    ideaBar: {
      background: "#ff346c",
    },
    inspirationBar: {
      background: "#ff9cfe",
    },
    projectBar: {
      background: "#9c48c3",
    },
  })
);
