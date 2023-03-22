import React, { useEffect, useReducer, DragEvent, FC } from "react";
import classnames from "classnames";
import { Typography } from "@mui/material";

import usePrevious from "../../Hooks/usePrevious";
import { readDataURLAsync } from "../../utils";

import { Add } from "../Icons";
import useImageStyles from "./ImageStyles";
import { ImageFile } from "../../Types/dataTypes";

interface State {
  inDropZone: boolean;
  fileList: Array<File>;
}

interface Props {
  setFieldValue: (name: string, value: any) => void;
  ImageRefs?: Array<string | ImageFile>;
}

const ImageDragAndDrop: FC<Props> = ({ setFieldValue, ImageRefs }) => {
  const state: State = {
    inDropZone: false,
    fileList: [],
  };

  const imageFileReducer = (state: State, action: any) => {
    switch (action.type) {
      case "AddToDropZone":
        return { ...state, inDropZone: action.inDropZone };
      case "AddToList":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(imageFileReducer, state);
  const classes = useImageStyles();
  const prevData = usePrevious(data);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // @ts-ignore
    let files = [...e.dataTransfer.files];

    files.map((item, index) => {
      item["image"] = URL.createObjectURL(item);
    });

    if (files) {
      dispatch({ type: "AddToList", files });
      dispatch({ type: "AddToDropZone", inDropZone: false });
    }
  };

  useEffect(() => {
    if (
      prevData?.fileList &&
      data?.fileList &&
      prevData?.fileList.length !== data?.fileList.length
    ) {
      const latestImages = data.fileList.slice(
        prevData.fileList.length,
        data.fileList.length + 1
      );

      const handleImages = async () => {
        try {
          const newImages = await Promise.all(
            latestImages.map((item) => {
              return readDataURLAsync(item);
            })
          );
          setFieldValue(
            "ImageRefs",
            ImageRefs?.concat(newImages as ImageFile[])
          );
        } catch (err) {}
      };

      handleImages();
    }
  }, [data]);

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      className={classnames(classes.barImageRef, classes.dragAndDrop)}
    >
      <Add fontSize="large" />
      <Typography>Drag and drop</Typography>
    </div>
  );
};

export default ImageDragAndDrop;
