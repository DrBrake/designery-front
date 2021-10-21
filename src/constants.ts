export const VARIANTS = {
  IDEA: "idea",
  INSPIRATION: "inspiration",
  PROJECT: "project",
} as const;

export const IMAGE_TYPE = {
  BAR: "bar",
  COMPLETED_WORK: "completedWork",
  GRID: "grid",
  RANDOM_POPUP: "randomPopup",
  DRAFT: "draft",
} as const;

export const ROUTES = {
  ROOT: "/",
  GRID: "/grid",
} as const;

export const DIALOG_VARIANT = {
  IMAGE_REF: "imageReference",
  TAG: "tag",
  INSPIRATION: "inspiration",
  COMPLETED_WORK: "completedWork",
  DRAFT: "draft",
} as const;

export const RANDOM_DIALOG_TYPE = {
  INSPIRATIONS: "inspirations",
  IDEAS: "ideas",
  BOTH: "both",
} as const;