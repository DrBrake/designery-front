import React, { useRef, useReducer, FC } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { IconButton, Divider } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { v4 as uuidv4 } from "uuid";
import "draft-js/dist/Draft.css";

import { NumberedList, BulletList, Bold, Italic, Strikethrough } from "./Icons";

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
    margin: `${theme.spacing(1)} 0`,
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const INLINE_BUTTONS = [
  {
    label: <Bold />,
    value: "BOLD",
    id: uuidv4(),
  },
  {
    label: <Italic />,
    value: "ITALIC",
    id: uuidv4(),
  },
  {
    label: <Strikethrough />,
    value: "STRIKETHROUGH",
    id: uuidv4(),
  },
];

const BLOCK_BUTTONS = [
  {
    label: <BulletList />,
    value: "unordered-list-item",
    id: uuidv4(),
  },
  {
    label: <NumberedList />,
    value: "ordered-list-item",
    id: uuidv4(),
  },
];

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

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
  const localEditorState = {
    editor: editorState,
  };

  const editorStateReducer = (state: any, action: any) => {
    switch (action.type) {
      case "EditorState":
        return { ...state, editor: action.editor };
      default:
        return state;
    }
  };

  const [localEditor, setLocalEditor] = useReducer(
    editorStateReducer,
    localEditorState
  );
  const classes = useStyles();
  const editor = useRef<Editor>(null);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setLocalEditor({ type: "EditorState", editor: newState });
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div
      className={classes.container}
      onClick={() => editor?.current?.focus()}
      onBlur={() => setFieldValue(localEditor.editor)}
    >
      {INLINE_BUTTONS.map((item) => (
        <IconButton
          onMouseDown={(e) => {
            e.preventDefault();
            setLocalEditor({
              type: "EditorState",
              editor: RichUtils.toggleInlineStyle(
                localEditor.editor,
                item.value
              ),
            });
          }}
          size="small"
          key={item.id}
          classes={{ root: classes.marginRight }}
        >
          {item.label}
        </IconButton>
      ))}
      {BLOCK_BUTTONS.map((item) => (
        <IconButton
          onMouseDown={(e) => {
            e.preventDefault();
            setLocalEditor({
              type: "EditorState",
              editor: RichUtils.toggleBlockType(localEditor.editor, item.value),
            });
          }}
          size="small"
          key={item.id}
          classes={{ root: classes.marginRight }}
        >
          {item.label}
        </IconButton>
      ))}
      <Divider classes={{ root: classes.divider }} />
      <div>
        <Editor
          ref={editor}
          editorState={localEditor.editor}
          onChange={(editorState) =>
            setLocalEditor({ type: "EditorState", editor: editorState })
          }
          onTab={(e) => {
            e.preventDefault();
            const newState = RichUtils.onTab(e, localEditor.editor, 2);
            if (newState)
              setLocalEditor({ type: "EditorState", editor: newState });
          }}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          customStyleMap={styleMap}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
