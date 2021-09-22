import React, { useEffect, useReducer, useState } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

import usePrevious from "../../Hooks/usePrevious";
import { readDataURLAsync } from "../../utils";
import { IMAGE_TYPE } from "../../constants";

import Image from "./Image";
import { Add } from "../Icons";
import useImageStyles from "./ImageStyles";

const ImageDragAndDrop = () => {
  const state = {
    inDropZone: false,
    fileList: [],
  };

  const imageFileReducer = (state, action) => {
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
  const [images, setImages] = useState([]);
  const classes = useImageStyles();
  const prevData = usePrevious(data);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];

    files.map((item, index) => {
      item[`image_${index}`] = URL.createObjectURL(item);
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
        const newImages = await Promise.all(
          latestImages.map((item) => {
            return readDataURLAsync(item);
          })
        );
        setImages(images.concat(newImages));
      };

      handleImages();
    }
  }, [data]);

  return (
    <>
      {images.map((item) => (
        <Image src={item.file} key={item.id} variant={IMAGE_TYPE.BAR} />
      ))}
      <div
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        className={classnames(classes.barImageRef, classes.dragAndDrop)}
      >
        <Add fontSize="large" />
        <Typography>Drag and drop</Typography>
      </div>
    </>
  );
};

export default ImageDragAndDrop;
