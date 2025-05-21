/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


// export const createProject = async (data: FieldValues) => {
//     try {
//         const res = await app_axios.post("/projects/create-project", data);
//         return res.data;
//     } catch (error: any) {
//         const message =
//             error?.response?.data?.message ||
//             "Something went wrong while creating the project";
//         return new Error(message);
//     }
// };

export const createProject  = async (data: FieldValues): Promise<any> => {
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