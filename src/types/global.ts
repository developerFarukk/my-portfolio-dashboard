import { TProjects } from "./projectType";
import { TSkill } from "./skillsType";

export interface TGlobalMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  // startDate: string;
  // endDate: string
}

export interface TMetaProjectResponse {
  meta: TGlobalMeta;
  result?: TProjects[];
}

export interface TMetaSkillsResponse {
  meta: TGlobalMeta;
  result?: TSkill[];
}
