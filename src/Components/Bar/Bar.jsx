import React, { useState } from "react";

import BarOpen from "./BarOpen";
import BarClosed from "./BarClosed";

const Bar = ({ isLast, isArchive, variant }) => {
  const [open, setOpen] = useState(false);
  return open ? (
    <BarOpen
      setOpen={setOpen}
      isLast={isLast}
      isArchive={isArchive}
      variant={variant}
    />
  ) : (
    <BarClosed setOpen={setOpen} isLast={isLast} />
  );
};

export default Bar;
