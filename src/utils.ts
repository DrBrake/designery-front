import { createBrowserHistory } from "history";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import {
  Idea,
  Inspiration,
  Project,
  ItemResponse,
  SortDir,
  SortValue,
} from "./Types/dataTypes";

export const browserHistory = createBrowserHistory();

export const handleDataForList = (
  data: ItemResponse | undefined,
  sortBy?: SortValue,
  sortDir?: SortDir
): Array<Inspiration | Idea | Project> => {
  if (data) {
    const combinedData = [
      ...data.ideas,
      ...data.inspirations,
      ...data.projects,
    ];
    return sortByKey(combinedData, sortBy || "DateCreated", sortDir || "asc");
  }
  return [];
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const sortByKey = (
  array: Array<Inspiration | Idea | Project>,
  key: SortValue,
  dir: SortDir
) => {
  if (key !== "Random") {
    return [...array].sort((a, b) => {
      const aVal = key === "DateCreated" ? dayjs(a[key]) : a[key];
      const bVal = key === "DateCreated" ? dayjs(b[key]) : b[key];
      if (dir === "asc") {
        if (bVal < aVal) return -1;
        else if (bVal > aVal) return 1;
        return 0;
      } else {
        if (bVal < aVal) return 1;
        else if (bVal > aVal) return -1;
        return 0;
      }
    });
  }
  return shuffleArray([...array]);
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
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
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
