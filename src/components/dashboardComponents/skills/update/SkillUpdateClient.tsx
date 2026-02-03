/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ImageUrlPreview } from "@/components/shared/ImageUrlPreview";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultiSelector from "../../projects/inputeFild/MultiSelector";
import {
  defaultUpdateSkillsValus,
  SKILLS_CATEGORY,
  TSkill,
} from "@/types/skillsType";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { MotionButton } from "@/components/shared/MotionButton";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUpdateSkills, updateSkillsSchema } from "../skillsSchema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updatSkills } from "@/service/skillService";

interface UpdateSkillProps {
  skillData: TSkill;
}

const SkillUpdateClient = ({ skillData: skill }: UpdateSkillProps) => {
  // console.log("client skills data", skill);

  const [mounted, setMounted] = useState(false);

  const form = useForm<TUpdateSkills>({
    resolver: zodResolver(updateSkillsSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: defaultUpdateSkillsValus,
  });

  useEffect(() => {
    if (skill) {
      form.reset({
        ...defaultUpdateSkillsValus,
        ...skill,
        skillCategory: Array.isArray(skill.skillCategory)
          ? skill.skillCategory
          : skill.skillCategory
            ? [skill.skillCategory]
            : [],
      });
    }
  }, [skill, form]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    formState: { isSubmitting },
    // setValue,
    // watch,
    control,
    // reset,
  } = form;

  const onSubmit: SubmitHandler<TUpdateSkills> = async (data) => {
    // console.log(data);

    if (!skill?._id) return toast.error("Skill ID missing");

    try {
      const res = await updatSkills(skill._id, data);

      toast.success(res?.message);
    } catch (error: any) {
      // console.log(error.message);

      toast.error(error.message);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6">
      <Card className="max-w-7xl mx-auto  shadow-lg p-4 border-2 dark:border-yellow-950 border-blue-100">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">
            Update Skill
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

            <MotionButton as="div">
              <Button
                type="submit"
                className="w-full dark:bg-slate-700 bg-gray-400/30 hover:bg-slate-400/50 hover:dark:bg-slate-700/80 text-black dark:text-white text-md font-semibold mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Submit"}
              </Button>
            </MotionButton>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SkillUpdateClient;
