/* eslint-disable @typescript-eslint/no-explicit-any */


"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const createBlog = async (data: FieldValues): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/create-blog`, {
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