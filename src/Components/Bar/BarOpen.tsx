import React, { FC } from "react";
import classnames from "classnames";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Project, Idea, Inspiration } from "../../Types/dataTypes";
import IdeaForm from "./IdeaForm";
import ProjectForm from "./ProjectForm";
import InspirationForm from "./InspirationForm";
import { VARIANTS } from "../../constants";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      border: `1px solid ${theme.palette.primary.dark}`,
      padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
        1
      )}px ${theme.spacing(5)}px`,
      borderBottomWidth: "0px",
    },
    firstContainer: {
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
    },
    lastContainer: {
      borderBottomWidth: "1px",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
    },
  })
);

interface Props {
  itemData: Idea | Inspiration | Project;
  isLast: boolean;
  isFirst: boolean;
  isNewItem: boolean;
  index: number;
  setOpen: (value: boolean) => void;
}

const BarOpen: FC<Props> = ({
  itemData,
  setOpen,
  isLast,
  isFirst,
  isNewItem,
  index,
}) => {
  const classes = useStyles();
  const getContent = () => {
    if (itemData.Variant === VARIANTS.IDEA) {
      return (
        <IdeaForm
          idea={itemData}
          isNewItem={isNewItem}
          setOpen={setOpen}
          index={index}
        />
      );
    } else if (itemData.Variant === VARIANTS.INSPIRATION) {
      return (
        <InspirationForm
          inspiration={itemData}
          isNewItem={isNewItem}
          setOpen={setOpen}
          index={index}
        />
      );
    } else if (itemData.Variant === VARIANTS.PROJECT) {
      return (
        <ProjectForm
          project={itemData}
          isNewItem={isNewItem}
          setOpen={setOpen}
          index={index}
        />
      );
    }
  };
  return (
    <div
      className={classnames(classes.container, {
        [classes.lastContainer]: isLast,
        [classes.firstContainer]: isFirst,
      })}
    >
      {getContent()}
    </div>
  );
};

export default BarOpen;
