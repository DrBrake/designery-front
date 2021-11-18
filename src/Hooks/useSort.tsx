import { useReducer } from "react";

const sortState = {
  Title: {
    direction: "desc",
    value: "Title",
    name: "Title",
  },
  Date: {
    direction: "asc",
    value: "DateCreated",
    name: "Date",
  },
  active: "Date",
};

const sortReducer = (state: any, action: any) => {
  switch (action.type) {
    case "Title":
      return {
        ...state,
        Title: Object.assign(state.Title, action),
        active: "Title",
      };
    case "DateCreated":
      return {
        ...state,
        Date: Object.assign(state.Date, action),
        active: "Date",
      };
    default:
      return state;
  }
};

const useSort = () => {
  const [sort, handleRequestSort] = useReducer(sortReducer, sortState);
  return {
    sort: sort[sort.active],
    allSortValues: [sort.Title, sort.Date],
    handleRequestSort,
  };
};

export default useSort;
