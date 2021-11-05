import { RawDraftContentState } from "draft-js";

import { VARIANTS } from "../constants";

type AllVariants = typeof VARIANTS;

export interface BaseItem {
  _id?: string;
  Title: string;
  TempID?: string;
}

export interface Item extends BaseItem {
  Description: RawDraftContentState;
  DateCreated: string;
  Tags: Array<Tag>;
  Variant: AllVariants[keyof AllVariants];
}

export interface Idea extends Item {
  ImageRefs?: Array<string | ImageFile>;
  Drafts?: Array<string>;
  CompletedWorks?: Array<string>;
  Completed?: boolean;
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
  Completed?: boolean;
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
