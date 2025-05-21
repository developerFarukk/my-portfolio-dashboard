/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { projectSchema } from "./projectSchema";
import { TProject } from "@/types/projectType";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject } from "@/service/projectService";





const AddProject = () => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(projectSchema),
    });

    const { register, handleSubmit, reset, control, watch, setValue, formState: { errors, isSubmitting } } = useForm<TProject>({
        mode: "onBlur",
    });


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", e.target.files as unknown as string);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        try {
            const res = await createProject(data)
            if (res.success) {
                toast.success("Project created successfully");
                reset();
                setPreviewUrl(null);
            } else {
                toast.error(res.message || "Failed to create project");
            }
        } catch (error: any) {
            console.error("Project creation error:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred"
            );
        }

    };

    return (
        <div>
            <div className='p-6'>
                <Card className="max-w-5xl mx-auto border-0 shadow-lg p-4">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Create  Project
                        </CardTitle>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Project Title*</Label>
                                <Input
                                    id="title"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="descriptions">Description*</Label>
                                <Textarea
                                    id="descriptions"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("descriptions", { required: "Description is required" })}
                                />
                                {errors.descriptions && (
                                    <p className="text-red-500 text-sm">{errors.descriptions.message}</p>
                                )}
                            </div>

                            {/* Live Link */}
                            <div>
                                <Label htmlFor="liveLink">Live Link*</Label>
                                <Input
                                    id="liveLink"
                                    type="url"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("liveLink", { required: "Live link is required" })}
                                />
                                {errors.liveLink && (
                                    <p className="text-red-500 text-sm">{errors.liveLink.message}</p>
                                )}
                            </div>

                            {/* Upload Project Image */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Blog Cover Image
                                </Label>

                                {previewUrl && (
                                    <div className="mb-4">
                                        <Image
                                            src={previewUrl}
                                            alt="Selected cover"
                                            width={400}
                                            height={200}
                                            className="h-40 w-full object-cover rounded-lg border"
                                            onLoad={() => URL.revokeObjectURL(previewUrl)}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <Label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                                            {previewUrl ? (
                                                <p className="text-sm text-green-600 font-medium">
                                                    Image selected ✔
                                                </p>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-gray-500">
                                                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max. 5MB)</p>
                                                </>
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </Label>
                                </div>

                                {errors.image && (
                                    <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
                                )}
                            </div>

                            {/* GitHub Client */}
                            <div>
                                <Label htmlFor="githubClient">GitHub Client Link</Label>
                                <Input
                                    id="githubClient"
                                    type="url"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("githubClient")}
                                />
                            </div>

                            {/* GitHub Server */}
                            <div>
                                <Label htmlFor="githubServer">GitHub Server Link</Label>
                                <Input
                                    id="githubServer"
                                    type="url"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("githubServer")}
                                />
                            </div>

                            {/* Tech Stack */}
                            <div>
                                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                                <Input
                                    id="techStack"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("techStack")}
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>

                            {/* Features */}
                            <div>
                                <Label htmlFor="features">Features (comma separated)</Label>
                                <Textarea
                                    id="features"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("features")}
                                    placeholder="User authentication, CRUD operations, Responsive design"
                                />
                            </div>

                            {/* Category */}
                            <div className="w-full">
                                <Controller
                                    name="category"

                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="bg-white mt-2 dark:bg-zinc-800 w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="web">Web Application</SelectItem>
                                                <SelectItem value="mobile">Mobile Application</SelectItem>
                                                <SelectItem value="desktop">Desktop Application</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Is Team Project */}
                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="isTeamProject"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="isTeamProject"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                <Label htmlFor="isTeamProject">Team Project</Label>
                            </div>

                            {/* Conditionally show Contributors */}
                            {watch("isTeamProject") && (
                                <div className="animate-fade-in">
                                    <Label htmlFor="contributors">Contributors (comma separated)</Label>
                                    <Input
                                        id="contributors"
                                        className="bg-white mt-2 dark:bg-zinc-800"
                                        {...register("contributors")}
                                        placeholder="John Doe, Jane Smith"
                                    />
                                </div>
                            )}

                            {/* Video Demo */}
                            <div>
                                <Label htmlFor="videoDemo">Video Demo URL</Label>
                                <Input
                                    id="videoDemo"
                                    type="url"
                                    className="bg-white mt-2 dark:bg-zinc-800"
                                    {...register("videoDemo")}
                                />
                            </div>


                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.01]"
                                    disabled={isSubmitting}
                                    {...{ fdprocessedid: "l8cjrh" } as any}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            <span>Submitting...</span>
                                        </div>
                                    ) : (
                                        <span>Submit</span>
                                    )}
                                </Button>
                            </div>

                        </form>
                    </Form>

                </Card>
            </div>
        </div>
    );
};

export default AddProject;

