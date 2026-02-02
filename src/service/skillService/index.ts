/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { TSkills } from "@/components/dashboardComponents/skills/skillsSchema";
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
  pPinned,
  //   startDate,
  //   endDate,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  skillCategory?: string;
  pPinned?: boolean;
} = {}) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (sort) params.append("sort", sort);
    if (skillCategory) params.append("skillCategory", skillCategory);
    if (typeof pPinned === "boolean") {
      params.append("pPinned", String(pPinned));
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
