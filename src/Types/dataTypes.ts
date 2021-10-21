import { RawDraftContentState } from "draft-js";

import { VARIANTS } from "../constants";

type AllVariants = typeof VARIANTS;

export interface Item {
  _id?: string;
  Title: string;
  Description: RawDraftContentState;
  DateCreated: string;
  Tags: Array<Tag>;
  Variant: AllVariants[keyof AllVariants];
  TempID?: string;
}

export interface Idea extends Item {
  ImageRefs?: Array<string>;
  Drafts?: Array<string>;
  CompletedWorks?: Array<string>;
  Completed?: boolean;
  Project?: string;
  Inspirations?: Array<Inspiration>;
  Variant: AllVariants["IDEA"];
}

export interface Inspiration extends Item {
  ImageRefs?: Array<string>;
  Ideas?: Array<Idea>;
  Variant: AllVariants["INSPIRATION"];
}

export interface Project extends Item {
  Ideas?: Array<Idea>;
  Variant: AllVariants["PROJECT"];
}

export interface Tag {
  _id?: string;
  Title: string;
  TempID?: string;
}

export interface ItemResponse {
  ideas: Array<Idea>;
  projects: Array<Project>;
  inspirations: Array<Inspiration>;
  tags: Array<Tag>;
}
