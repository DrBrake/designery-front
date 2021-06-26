import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
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
    fontFamily: "Roboto",
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

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const classes = useStyles();
  const editor = useRef(null);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className={classes.container} onClick={() => editor.current.focus()}>
      {INLINE_BUTTONS.map((item) => (
        <IconButton
          onMouseDown={(e) => {
            e.preventDefault();
            setEditorState(
              RichUtils.toggleInlineStyle(editorState, item.value)
            );
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
            setEditorState(RichUtils.toggleBlockType(editorState, item.value));
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
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default RichTextEditor;
