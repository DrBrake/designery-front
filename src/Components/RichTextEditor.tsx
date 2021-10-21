import React, { useRef, FC } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { IconButton, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import "draft-js/dist/Draft.css";

import { NumberedList, BulletList, Bold, Italic } from "./Icons";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    height: "100%",
    cursor: "text",
    padding: "18.5px 14px",
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const INLINE_BUTTONS = [
  {
    label: <Bold />,
    value: "BOLD",
  },
  {
    label: <Italic />,
    value: "ITALIC",
  },
];

const BLOCK_BUTTONS = [
  {
    label: <BulletList />,
    value: "unordered-list-item",
  },
  {
    label: <NumberedList />,
    value: "ordered-list-item",
  },
];

interface Props {
  placeholder: string;
  editorState: EditorState;
  setFieldValue: (value: EditorState) => void;
}

const RichTextEditor: FC<Props> = ({
  placeholder,
  editorState,
  setFieldValue,
}) => {
  const classes = useStyles();
  const editor = useRef<Editor>(null);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setFieldValue(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className={classes.container} onClick={() => editor?.current?.focus()}>
      {INLINE_BUTTONS.map((item) => (
        <IconButton
          onMouseDown={(e) => {
            e.preventDefault();
            setFieldValue(RichUtils.toggleInlineStyle(editorState, item.value));
          }}
          color="primary"
          size="small"
          key={uuidv4()}
          classes={{ root: classes.marginRight }}
        >
          {item.label}
        </IconButton>
      ))}
      {BLOCK_BUTTONS.map((item) => (
        <IconButton
          onMouseDown={(e) => {
            e.preventDefault();
            setFieldValue(RichUtils.toggleBlockType(editorState, item.value));
          }}
          color="primary"
          size="small"
          key={uuidv4()}
          classes={{ root: classes.marginRight }}
        >
          {item.label}
        </IconButton>
      ))}
      <Divider classes={{ root: classes.divider }} />
      <div>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={(editorState) => {
            setFieldValue(editorState);
          }}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
