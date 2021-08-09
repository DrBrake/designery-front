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

export const getRandomBetween = (min, max) => {
  if (min && max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  return 0;
};

export const getTwoRandomUniqueValuesFromArray = (array) => {
  if (array) {
    const firstRandom = getRandomBetween(0, array.length);
    const firstItem = array[firstRandom];
    const arrayWithoutFirstValue = array.filter(
      (item) => item._id !== firstItem._id
    );
    const secondRandom = getRandomBetween(0, arrayWithoutFirstValue.length);
    const secondItem = arrayWithoutFirstValue[secondRandom];
    return [firstItem, secondItem];
  }
  return [];
};
