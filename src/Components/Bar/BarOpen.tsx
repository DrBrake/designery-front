import React, { FC } from "react";
import classnames from "classnames";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { Project, Idea, Inspiration } from "../../Types/dataTypes";
import IdeaForm from "./IdeaForm";
import ProjectForm from "./ProjectForm";
import InspirationForm from "./InspirationForm";
import { VARIANTS } from "../../constants";
import { useFormStyles } from "./FormStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      border: `1px solid ${theme.palette.primary.dark}`,
      padding: `${theme.spacing(5)} ${theme.spacing(5)} ${theme.spacing(
        1
      )} ${theme.spacing(5)}`,
      borderBottomWidth: "0px",
      position: "relative",
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
  const formClasses = useFormStyles();
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
      <div
        className={classnames(formClasses.variantColor, {
          [formClasses.ideaBar]: itemData.Variant === VARIANTS.IDEA,
          [formClasses.inspirationBar]:
            itemData.Variant === VARIANTS.INSPIRATION,
          [formClasses.projectBar]: itemData.Variant === VARIANTS.PROJECT,
        })}
      />
      {getContent()}
    </div>
  );
};

export default BarOpen;
