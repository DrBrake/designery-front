import { createBrowserHistory } from "history";

export const browserHistory = createBrowserHistory();

export const handleDataForList = (data) => {
  if (data && data.ideas && data.projects && data.inspirations) {
    const combinedData = data.ideas
      .concat(data.projects)
      .concat(data.inspirations);
    return combinedData.sort((a, b) => {
      if (a.DateCreated < b.DateCreated) return 1;
      else if (a.DateCreated > b.DateCreated) return -1;
      return 0;
    });
  }
  return [];
};
