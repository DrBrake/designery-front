import { createBrowserHistory } from "history";
import { v4 as uuidv4 } from "uuid";

import { Idea, Inspiration, Project, ItemResponse } from "./Types/dataTypes";

export const browserHistory = createBrowserHistory();

export const handleDataForList = (
  data: ItemResponse | undefined
): Array<Inspiration | Idea | Project> => {
  if (data) {
    const combinedData = [
      ...data.ideas,
      ...data.inspirations,
      ...data.projects,
    ];
    return sortByKey(combinedData, "DateCreated");
  }
  return [];
};

export const sortByKey = (
  array: Array<Inspiration | Idea | Project>,
  key: "Title" | "DateCreated"
) => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) return 1;
    else if (a[key] > b[key]) return -1;
    return 0;
  });
};

export const getRandomBetween = (min: number, max: number) => {
  if (min && max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  return 0;
};

export const getTwoRandomUniqueValuesFromArray = (
  array: Array<Idea | Inspiration>
) => {
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

export const isURL = (url: string) => {
  if (url) {
    const regex = new RegExp(
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
    );
    return url.match(regex);
  }
  return false;
};

export const readDataURLAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      return resolve({
        name: file.name,
        file: reader.result,
        id: uuidv4(),
      });
    };
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      return reject(err);
    }
  });
};
