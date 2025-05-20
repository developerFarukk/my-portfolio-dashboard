

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion";
import { Form } from "../ui/form"
import { Lock, Mail } from "lucide-react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../homeComponents/Login/loginValidation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { sogIn } from "@/service/AuthService"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        // defaultValues: {
        //     email: "web.omarfaruk.dev@gmail.com",
        //     password: "F1474542",
        // },
    });

    const {
        formState: { isSubmitting },
        handleSubmit,
        register,
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);

        try {
            const res = await sogIn(data);
            if (res.success) {
                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                toast.error("Invalid Credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div>
            <motion.div
                className="flex flex-col justify-center p-6 md:p-8 lg:p-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Dashboard Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Input email"
                                                
                                                icon={<Mail size={20} />}
                                                required
                                                {...register("email")}
                                                {...{ fdprocessedid: "av252a" } as any}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                placeholder="Input password"
                                                icon={<Lock size={20} />}
                                                {...register("password")}
                                                {...{ fdprocessedid: "eltfvr" } as any}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            {...{ fdprocessedid: "v6g0xg" } as any}
                                            className="w-full cursor-auto"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    <span>Logging in...</span>
                                                </div>
                                            ) : (
                                                <span>Log in</span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}