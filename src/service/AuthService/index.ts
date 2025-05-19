/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import app_axios from "@/lib/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const sogIn = async (userData: FieldValues) => {
    try {
        const res = await app_axios.post("/auth/login", userData);
        const result = res.data;
        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
        }
        return result;
    } catch (error: any) {
        console.error(error);
        const message = error?.response?.data?.message || "Something went wrong!";
        return new Error(message);
    }
};



export const logout = async () => {
    (await cookies()).delete("accessToken");
};