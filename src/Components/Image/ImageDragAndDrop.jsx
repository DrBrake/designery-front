import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classnames from "classnames";

import usePrevious from "../../Hooks/usePrevious";

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
      let tempImages = [];
      const latestImages = data.fileList.slice(
        prevData.fileList.length,
        data.fileList.length + 1
      );
      latestImages.map((item) => {
        let image = new Image();
        image.src = item.preview;

        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onloadend = () => {
          console.log("onloadend", item);
          tempImages.push({
            name: item.name,
            file: reader.result,
            width: image.width,
            height: image.height,
            id: uuidv4(),
          });
        };
      });
      console.log("tempImages", tempImages);
      setImages(images.concat(tempImages));
    }
  }, [data]);

  return (
    <>
      {images.map((item) => (
        <img src={item.file} key={item.id} />
      ))}
      <div
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        className={classnames(classes.barImageRef, classes.dragAndDrop)}
      >
        DRAG AND DROP
      </div>
    </>
  );
};

export default ImageDragAndDrop;
