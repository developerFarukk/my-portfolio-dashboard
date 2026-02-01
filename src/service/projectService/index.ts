/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TProject } from "@/components/dashboardComponents/projects/projectSchema";
import app_axios from "@/lib/axios";

// Create Project
export const createProject = async (data: TProject): Promise<any> => {
  try {
    const res = await app_axios.post("projects/create-project", data);
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_API}/projects/create-project`,
    //   {
    //     method: "POST",
    //     // body: data,
    //     body: JSON.stringify(data),
    //     headers: {
    //       Authorization: (await cookies()).get("accessToken")!.value,
    //       "Content-Type": "application/json",
    //     },
    //   },
    // );
    // return res.json();

    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Project creation failed";
    throw new Error(message);
  }
};

// Get All Project
export const getAllprojects = async ({
  page = 1,
  limit = 5,
  searchTerm,
  sort,
  //   sortOrder,
  //   orderStatus,
  //   startDate,
  //   endDate,
}: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  //   sortOrder?: string;
  //   orderStatus?: string;
  //   startDate?: string;
  //   endDate?: string;
} = {}) => {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (sort) params.append("sort", sort);
    // if (sortOrder) params.append("sortOrder", sortOrder);
    // if (orderStatus) params.append("orderStatus", orderStatus);
    // if (startDate) params.append("startDate", startDate);
    // if (endDate) params.append("endDate", endDate);

    const res = await app_axios.get(`/projects?${params.toString()}`);

    // console.log("main",res.data);
    return res.data?.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.details ||
      "Something went wrong while fetching projects!";
    throw new Error(message);
  }
};

// Get Single Projects
export const getSinglProject = async (projectId: string): Promise<any> => {
  try {
    const res = await app_axios.get(`/projects/${projectId}`);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Single project get faield";
    throw new Error(message);
  }
};

// Updated Project
export const updatProject = async (projectId: string, data: any) => {
  try {
    const res = await app_axios.patch(`/projects/update/${projectId}`, data);
    return res.data;
  } catch (error: any) {
    // console.log(error);

    const message = error?.response?.data?.details || "Project updated failed";
    throw new Error(message);
    // return new Error(message);
  }
};

// Delete Project
export const deleteProject = async (projectId: string): Promise<any> => {
  try {
    const res = await app_axios.delete(`/projects/delete/${projectId}`);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.details || "Project delete failed";
    throw new Error(message);
  }
};
