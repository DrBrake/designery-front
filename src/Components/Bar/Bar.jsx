import React, { useState } from "react";

import BarOpen from "./BarOpen";
import BarClosed from "./BarClosed";

const Bar = ({ itemData, isLast, isFirst, isNewItem, projects, index }) => {
  const [open, setOpen] = useState(false);
  return open ? (
    <BarOpen
      itemData={itemData}
      setOpen={setOpen}
      isLast={isLast}
      isFirst={isFirst}
      isNewItem={isNewItem}
      projects={projects}
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
