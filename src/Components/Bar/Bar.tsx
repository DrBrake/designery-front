import React, { useState, FC } from "react";

import BarOpen from "./BarOpen";
import BarClosed from "./BarClosed";

import { Item } from "../../Types/dataTypes";

interface Props {
  itemData: Item;
  isLast: boolean;
  isFirst: boolean;
  isNewItem: boolean;
  index: number;
}

const Bar: FC<Props> = ({ itemData, isLast, isFirst, isNewItem, index }) => {
  const [open, setOpen] = useState(false);
  return open ? (
    <BarOpen
      itemData={itemData}
      setOpen={setOpen}
      isLast={isLast}
      isFirst={isFirst}
      isNewItem={isNewItem}
      index={index}
    />
  ) : (
    <BarClosed
      itemData={itemData}
      setOpen={setOpen}
      isLast={isLast}
      isFirst={isFirst}
      isNewItem={isNewItem}
    />
  );
};

export default Bar;
