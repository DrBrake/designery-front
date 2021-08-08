import React, { useState } from "react";

import BarOpen from "./BarOpen";
import BarClosed from "./BarClosed";

const Bar = ({
  itemData,
  isLast,
  isFirst,
  isArchive,
  isNewItem,
  projects,
  index,
}) => {
  const [open, setOpen] = useState(false);
  return open ? (
    <BarOpen
      itemData={itemData}
      setOpen={setOpen}
      isLast={isLast}
      isFirst={isFirst}
      isArchive={isArchive}
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
    />
  );
};

export default Bar;
