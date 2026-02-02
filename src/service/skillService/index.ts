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
