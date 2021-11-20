import { useReducer } from "react";
import { DIALOG_VARIANT, VARIANTS } from "../constants";

const dialogState = {
  Add: {
    open: false,
    variant: null,
    dialogOptions: {
      title: "",
      name: "",
    },
  },
  Autocomplete: {
    open: false,
    variant: null,
    dialogOptions: {
      title: "",
      name: "",
    },
  },
  Remove: {
    open: false,
  },
  Complete: {
    open: false,
  },
  Image: {
    open: false,
    image: null,
    variant: null,
    dialogOptions: {
      title: "",
      name: "",
    },
  },
};

const dialogReducer = (state: any, action: any) => {
  if (action.variant) action.dialogOptions = getDialogOptions(action.variant);
  switch (action.type) {
    case "Add":
      return {
        ...state,
        Add: Object.assign(state.Add, action),
      };
    case "Autocomplete":
      return {
        ...state,
        Autocomplete: Object.assign(state.Autocomplete, action),
      };
    case "Remove":
      return {
        ...state,
        Remove: { open: action },
      };
    case "Complete":
      return {
        ...state,
        Complete: { open: action },
      };
    case "Image":
      return {
        ...state,
        Image: Object.assign(state.Image, action),
      };
    default:
      return state;
  }
};

const getDialogOptions = (dialogVariant: string) => {
  if (dialogVariant === DIALOG_VARIANT.TAG) {
    return {
      title: "Add a tag",
      name: "Tags",
      dialogVariant: dialogVariant,
    };
  } else if (dialogVariant === DIALOG_VARIANT.INSPIRATION) {
    return {
      title: "Add a inspiration",
      name: "Inspirations",
      dialogVariant: dialogVariant,
      dataVariant: VARIANTS.INSPIRATION,
    };
  }
  if (dialogVariant === DIALOG_VARIANT.IMAGE_REF) {
    return {
      title: "Add image reference",
      name: "ImageRefs",
    };
  } else if (dialogVariant === DIALOG_VARIANT.DRAFT) {
    return {
      title: "Add a draft",
      name: "Drafts",
    };
  } else if (dialogVariant === DIALOG_VARIANT.COMPLETED_WORK) {
    return {
      title: "Add a completed work",
      name: "CompletedWorks",
    };
  }
  return { title: "", name: "" };
};

const useDialogs = () => {
  const [dialogs, setDialogs] = useReducer(dialogReducer, dialogState);
  return {
    dialogs,
    setDialogs,
  };
};

export default useDialogs;
