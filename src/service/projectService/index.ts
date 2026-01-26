/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { TProject } from "@/components/dashboardComponents/projects/projectSchema";
import { cookies } from "next/headers";


export const createProject  = async (data: TProject): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/create-project`, {
            method: "POST",
            // body: data,
            body: JSON.stringify(data),
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
                "Content-Type": "application/json",
            },
        });
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};