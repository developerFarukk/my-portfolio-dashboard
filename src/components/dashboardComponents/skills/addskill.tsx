/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultSkillsValus, SKILLS_CATEGORY } from "@/types/skillsType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema, TSkills } from "./skillsSchema";
import { MotionButton } from "@/components/shared/MotionButton";
import { Textarea } from "@/components/ui/textarea";
import { ImageUrlPreview } from "@/components/shared/ImageUrlPreview";
import { createSkills } from "@/service/skillService";
import { toast } from "sonner";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import MultiSelector from "../projects/inputeFild/MultiSelector";

const AddSkill = () => {
  const form = useForm<TSkills>({
    resolver: zodResolver(skillsSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: defaultSkillsValus,
  });

  const {
    formState: { isSubmitting },
    // setValue,
    // watch,
    control,
    reset,
  } = form;

  const onSubmit: SubmitHandler<TSkills> = async (data) => {
    // console.log(data);

    try {
      const res = await createSkills(data);

      toast.success(res?.message);

      reset({
        image: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-7xl mx-auto  shadow-lg p-4 border-2 dark:border-yellow-950 border-blue-100">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">
            Create Skill
          </CardTitle>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {/* Skills name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Name<span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Inpute Skill Name"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Skills Title */}

            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Title
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Inpute Skill Title"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Skills Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Description
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Inpute Skill Description"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0 h-28"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Skills image Link */}
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Image URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input skill image URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <ImageUrlPreview
                    url={field.value}
                    onClear={() => field.onChange("")}
                    alt="Skill Image Preview"
                  />
                </FormItem>
              )}
            />

            {/* Skills category */}
            {/* <div className="">
              <FormField
                control={control}
                name="skillCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="italic font-semibold text-md">
                      Skill Category
                      <span className="text-red-800 text-xs">(Optional)</span>
                    </FormLabel>

                    <FormControl>
                      <SelectForm
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder="Input skill category"
                        label="Select skill category"
                        options={SKILLS_CATEGORY_OPTIONS}
                      />
                    </FormControl>

                    <FormMessage className="text-xs text-right" />
                  </FormItem>
                )}
              />
            </div> */}

            <FormField
              control={control}
              name="skillCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Category
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>

                  <FormControl>
                    <MultiSelector
                      // value={field.value ?? []}
                      // onChange={field.onChange}
                      options={SKILLS_CATEGORY}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Select skill categories..."
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Project Pin */}
            <FormField
              control={control}
              name="sPinned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Skill Pineed
                  </FormLabel>

                  <FormControl>
                    <div className="border rounded-md p-4">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel>Pin this skill</FieldLabel>
                          <FieldDescription>
                            Pinned skill remain fixed at the top of your
                            workspace.
                          </FieldDescription>
                        </FieldContent>

                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </Field>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skill Title */}
            {/* <div>
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div> */}

            {/* Skill Description */}
            {/* <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </Label>
              <Textarea
                {...register("description")}
                rows={3}
                placeholder="Enter skill description"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div> */}

            {/* Skill Image URL */}
            {/* <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </Label>
                            <Input
                                type="file"
                                placeholder="Enter image URL"
                                className="w-full"
                                {...register("image")}
                            />
                        </div> */}

            {/* Blog Image */}
            {/* <div className="space-y-2">
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
                          <span className="font-semibold text-blue-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, JPEG (Max. 5MB)
                        </p>
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
                <p className="text-sm text-red-600 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div> */}

            {/* Skill Category */}
            {/* <div>
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
            </div> */}

            {/* Submit Button */}
            {/* <div className="pt-2">
              <Button
                type="submit"
                {...({ fdprocessedid: "v6g0xg" } as any)}
                className="w-full cursor-auto"
                disabled={isSubmitting}
                {...({ fdprocessedid: "l8cjrh" } as any)}
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
            </div> */}

            <MotionButton as="div">
              <Button
                type="submit"
                className="w-full dark:bg-slate-700 bg-gray-400/30 hover:bg-slate-400/50 hover:dark:bg-slate-700/80 text-black dark:text-white text-md font-semibold mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </Button>
            </MotionButton>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddSkill;
