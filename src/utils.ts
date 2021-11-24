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
  Filters,
  Item,
} from "./Types/dataTypes";
import { VARIANTS } from "./constants";

export const browserHistory = createBrowserHistory();

export const combineData = (
  data: ItemResponse | undefined
): Array<Inspiration | Idea | Project> => {
  if (data) {
    const combinedData = [
      ...data.ideas,
      ...data.inspirations,
      ...data.projects,
    ];
    return combinedData;
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

export const sortData = (
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
  min = Math.ceil(min || 0);
  max = Math.floor(max || 0);
  return Math.floor(Math.random() * (max - min) + min);
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

export const filterData = (array: Item[], filters: Filters) => {
  if (
    filters.ideas ||
    filters.inspirations ||
    filters.projects ||
    filters.tags.length > 0 ||
    filters.search !== ""
  ) {
    return array.filter((item) => {
      if (
        (filters.ideas && item.Variant !== VARIANTS.IDEA) ||
        (filters.inspirations && item.Variant !== VARIANTS.INSPIRATION) ||
        (filters.projects && item.Variant !== VARIANTS.PROJECT) ||
        (filters.tags.length > 0 &&
          item.Tags.find((tag) => tag._id && filters.tags.includes(tag._id))) ||
        (filters.search !== "" && item.Title.includes(filters.search))
      ) {
        return item;
      }
    });
  }
  return array;
};

export const getAllImages = (array: Array<Inspiration | Idea | Project>) => {
  return array.reduce((acc: string[], cur) => {
    if (cur.Variant === VARIANTS.IDEA || cur.Variant === VARIANTS.INSPIRATION) {
      const images = cur.ImageRefs?.filter(
        (image) => typeof image === "string"
      ) as string[];
      if (images) acc.concat(images);
    }
    return acc;
  }, []);
};
