
/* eslint-disable @typescript-eslint/no-explicit-any */


"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const createSkills = async (data: FieldValues): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills/create-skill`, {
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