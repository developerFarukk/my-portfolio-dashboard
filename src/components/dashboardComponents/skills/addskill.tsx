/* eslint-disable @typescript-eslint/no-explicit-any */




"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TSkills, TSkillCategory } from "@/types/skillsType";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema } from "./skillsSchema";
import { toast } from "sonner";

const AddSkill = () => {

    const form = useForm({
        resolver: zodResolver(skillsSchema),
    });

    const {
        formState: { isSubmitting, errors },
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
    } = useForm<TSkills>({
        mode: "onBlur",
    });


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        toast.success("Skill add Successfuly")
        reset()
    };

    const skillCategories: TSkillCategory[] = [
        "Technical",
        "Soft",
        "Front-end",
        "Backend",
        "UI-Tools",
    ];

    return (
        <div className="p-10">
            <Card className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-6 text-center ">Add New Skill</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Skill Title */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Skill Title *
                            </Label>
                            <Input
                                type="text"
                                placeholder="Enter skill title"
                                className={`w-full ${errors.title ? "border-red-500" : ""}`}
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Skill Description */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </Label>
                            <Textarea
                                {...register("description")}
                                rows={3}
                                placeholder="Enter skill description"
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Skill Image URL */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </Label>
                            <Input
                                type="file"
                                placeholder="Enter image URL"
                                className="w-full"
                                {...register("image")}
                            />
                        </div>

                        {/* Skill Category */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Category *
                            </Label>
                            <Select
                                onValueChange={(value: TSkillCategory) =>
                                    setValue("skillCategory", value)
                                }
                                value={watch("skillCategory")}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {skillCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.skillCategory && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.skillCategory.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                {...{ fdprocessedid: "v6g0xg" } as any}
                                className="w-full cursor-auto"
                                disabled={isSubmitting}
                                {...{ fdprocessedid: "l8cjrh" } as any}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    <span>Add Skill</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default AddSkill;


