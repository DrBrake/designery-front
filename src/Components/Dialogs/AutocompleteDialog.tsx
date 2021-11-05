import React, { useState, FC } from "react";
import classnames from "classnames";
import { Typography, TextField, Button } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

import Dialog from "./Dialog";
import Chip from "../Chip";
import { BaseItem } from "../../Types/dataTypes";

const useStyles = makeStyles((theme) => ({
  textAlignCenter: {
    textAlign: "center",
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  button: {
    minWidth: theme.spacing(17),
    borderRadius: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
  flex: {
    display: "flex",
  },
}));

interface AutocompleteItem extends BaseItem {
  Variant?: string;
  inputValue?: string;
}

interface Props {
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  dialogVariant?: string;
  values?: Array<AutocompleteItem>;
  setFieldValue: (name: string, value: any) => void;
  name: string;
  itemValues?: Array<AutocompleteItem>;
  title: string;
}

const filter = createFilterOptions<AutocompleteItem>();

const AutocompleteDialog: FC<Props> = ({
  dialogOpen,
  setDialogOpen,
  dialogVariant,
  values,
  setFieldValue,
  name,
  itemValues,
  title,
}) => {
  const classes = useStyles();
  const [tempNewValues, setTempNewValues] = useState<AutocompleteItem[]>([]);

  return (
    <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
      <Typography
        className={classnames(
          classes.fontWeightBold,
          classes.marginBottom3,
          classes.textAlignCenter
        )}
      >
        {title}
      </Typography>
      <Autocomplete
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTempNewValues(
              tempNewValues.concat([
                { Title: newValue, Variant: dialogVariant, TempID: uuidv4() },
              ])
            );
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setTempNewValues(
              tempNewValues.concat([
                {
                  Title: newValue.inputValue,
                  Variant: dialogVariant,
                  TempID: uuidv4(),
                },
              ])
            );
          } else if (newValue) {
            setTempNewValues(tempNewValues.concat([newValue]));
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              Variant: dialogVariant,
              Title: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        options={[...(values || []), ...(itemValues || []), ...tempNewValues]}
        renderOption={(option) => option?.Title || ""}
        getOptionLabel={(option) => {
          if (option) {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.Title;
          }
          return "";
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            placeholder={`Type existing or new ${dialogVariant}`}
            className={classnames(classes.marginRight, classes.marginBottom2)}
            {...params}
          />
        )}
      />
      <div className={classnames(classes.flex, classes.marginBottom3)}>
        {tempNewValues.map(
          (item) =>
            item && (
              <Chip
                label={item.Title}
                key={item.TempID}
                onDelete={() =>
                  setTempNewValues(
                    tempNewValues.filter(
                      (newVal) => newVal.TempID !== item.TempID
                    )
                  )
                }
              />
            )
        )}
        {itemValues?.map(
          (item) =>
            item && (
              <Chip
                label={item.Title}
                key={item.TempID}
                onDelete={() =>
                  setFieldValue(
                    name,
                    itemValues?.filter(
                      (newVal) => newVal.TempID !== item.TempID
                    )
                  )
                }
              />
            )
        )}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            setFieldValue(name, itemValues?.concat(tempNewValues));
            setDialogOpen(false);
          }}
        >
          Add
        </Button>
      </div>
    </Dialog>
  );
};

export default AutocompleteDialog;
