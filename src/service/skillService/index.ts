/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import {
  TSkills,
  TUpdateSkills,
} from "@/components/dashboardComponents/skills/skillsSchema";
import app_axios from "@/lib/axios";

// Creat Skills
export const createSkills = async (data: TSkills): Promise<any> => {
  try {
    const res = await app_axios.post("skills/create-skill", data);
    //     method: "POST",
    //     // body: data,
    //     body: JSON.stringify(data),
    //     headers: {
    //         Authorization: (await cookies()).get("accessToken")!.value,
    //         "Content-Type": "application/json",
    //     },
    // });
    // return res.json();
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Skill creation failed";
    throw new Error(message);
  }
};

// Get All Skills
export const getAllSkills = async ({
  page = 1,
  limit = 5,
  searchTerm,
  sort,
  skillCategory,
  sPinned,
  //   startDate,
  //   endDate,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  skillCategory?: string;
  sPinned?: boolean;
} = {}) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (sort) params.append("sort", sort);
    if (skillCategory) params.append("skillCategory", skillCategory);
    if (typeof sPinned === "boolean") {
      params.append("sPinned", String(sPinned));
    }

    const res = await app_axios.get(`/skills?${params.toString()}`);

    // console.log("main",res.data);
    return res.data?.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.details ||
      "Something went wrong while fetching skills!";
    throw new Error(message);
  }
};

// Get Single Skills
export const getSinglSkills = async (id: string): Promise<any> => {
  try {
    const res = await app_axios.get(`/skills/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Single skill get faield";
    throw new Error(message);
  }
};

// Updated Skills
export const updatSkills = async (id: string, data: TUpdateSkills) => {
  console.log("id", id);
  console.log("data", data);

  try {
    const res = await app_axios.patch(`/skills/update/${id}`, data);
    console.log(res);

    return res.data;
  } catch (error: any) {
    console.log("neweeee", error);

    const message = error?.response?.data?.details || "Skills updated failed";
    // console.log(message);

    throw new Error(message);
    // return new Error(message);
  }
};

// Delete Project
export const deleteSkill = async (id: string): Promise<any> => {
  try {
    const res = await app_axios.delete(`/skills/delete/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Skill delete failed";
    throw new Error(message);
  }
};
