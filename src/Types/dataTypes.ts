import { RawDraftContentState } from "draft-js";

import { VARIANTS, SORT_VALUES } from "../constants";

type AllVariants = typeof VARIANTS;
type AllSortValues = typeof SORT_VALUES;

export interface BaseItem {
  _id?: string;
  Title: string;
  TempID?: string;
  Secret?: boolean;
}

export interface Item extends BaseItem {
  Description: RawDraftContentState;
  DateCreated: string;
  Completed?: boolean;
  Tags: Array<Tag>;
  Variant: AllVariants[keyof AllVariants];
}

export interface Idea extends Item {
  ImageRefs?: Array<string | ImageFile>;
  Drafts?: Array<string>;
  CompletedWorks?: Array<string>;
  Project?: Project;
  Inspirations?: Array<Inspiration>;
  Variant: AllVariants["IDEA"];
}

export interface Inspiration extends Item {
  ImageRefs?: Array<string | ImageFile>;
  Ideas?: Array<Idea>;
  Variant: AllVariants["INSPIRATION"];
}

export interface Project extends Item {
  Ideas?: Array<Idea>;
  Variant: AllVariants["PROJECT"];
}

export interface Tag extends BaseItem {}

export interface ItemResponse {
  ideas: Array<Idea>;
  projects: Array<Project>;
  inspirations: Array<Inspiration>;
  tags: Array<Tag>;
}

export interface ImageFile {
  file: string;
  name: string;
  id: string;
}

export type SortDir = "asc" | "desc";
export type SortValue = AllSortValues[keyof AllSortValues];

export interface Filters {
  ideas: boolean;
  inspirations: boolean;
  projects: boolean;
  tags: string[];
  search: string;
  archived: boolean;
  secret: boolean;
}
