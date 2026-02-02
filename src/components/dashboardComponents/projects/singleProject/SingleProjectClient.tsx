/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DynamicUrlInput } from "@/components/shared/DynamicUrlInput";
import { ImageUrlPreview } from "@/components/shared/ImageUrlPreview";
import { MotionButton } from "@/components/shared/MotionButton";
import { MultiImagePreviewGroup } from "@/components/shared/MultiImageUrlPreview";
import { MultiVideoPreviewGroup } from "@/components/shared/MultiVideoPreviewGroup";
import { WebsitePreviewUrl } from "@/components/shared/WebsitePreviewUrl";
import { Button } from "@/components/ui/button";
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
import {
  defaultUpdateProjectValues,
  PROJECT_CATEGORY,
  PROJECTPRICING,
  PROJECTVSISIVILITY,
  TProjects,
  UPDATEPROJECTCATEGORIES,
  WEBSITE_TYPE_OPTIONS,
} from "@/types/projectType";
import MultiSelector from "../inputeFild/MultiSelector";
import { SelectForm } from "@/components/shared/SelectForm";
import Divider from "@/components/ui/divider";
import { DynamicFeaturesInput } from "@/components/shared/DynamicFeaturesInpute";
import { DynamicContributorsInput } from "@/components/shared/DynamicContributorsInput";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { SubmitHandler, useForm } from "react-hook-form";
import { TUpdateProject, updateProjectSchema } from "../projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updatProject } from "@/service/projectService";

interface TSingleProjectProps {
  project: TProjects;
}

const SingleProjectClient = ({ project }: TSingleProjectProps) => {
  // console.log("new data", project?._id);

  const [mounted, setMounted] = useState(false);

  const form = useForm<TUpdateProject>({
    resolver: zodResolver(updateProjectSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: defaultUpdateProjectValues,
  });

  useEffect(() => {
    if (project) {
      form.reset({
        ...defaultUpdateProjectValues,
        ...project,
      });
    }
  }, [project, form]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    formState: { isSubmitting },
    setValue,
    watch,
    control,
    // reset,
  } = form;

  const pClientLiveLink = watch("pLiveClientLink");
  const pServerLiveLink = watch("pLiveServerLink");
  const pClientRepoLink = watch("pClientRepoLink");
  const pServerRepoLink = watch("pServerRepoLink");

  const onSubmit: SubmitHandler<TUpdateProject> = async (data) => {
    // console.log(data);
    if (!project?._id) return toast.error("Project ID missing");

    try {
      const res = await updatProject(project._id, data);

      toast.success(res?.message);
    } catch (error: any) {
      // console.log(error.message);

      toast.error(error.message);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 ">
      <Card className="max-w-7xl mx-auto  shadow-lg p-4 border-2 dark:border-yellow-950 border-blue-100">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">
            Update Project
          </CardTitle>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {/* Project Name */}

            <FormField
              control={control}
              name="pName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Name<span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Inpute Project Name"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Project Title */}

            <FormField
              control={control}
              name="pTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Title<span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Inpute Project Title"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Project Description */}
            <FormField
              control={control}
              name="pDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Description
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      // type="text"
                      {...field}
                      placeholder="Inpute Project Description"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0 h-28"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Project Logo Link */}
            <FormField
              control={control}
              name="pLogoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Logo URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input Project Logo URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <ImageUrlPreview
                    url={field.value}
                    onClear={() => field.onChange("")}
                    alt="Project Logo Preview"
                  />
                </FormItem>
              )}
            />

            {/* Project Live Link */}
            <FormField
              control={control}
              name="pLiveClientLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Live URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input Project Live URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <WebsitePreviewUrl
                    url={pClientLiveLink}
                    onClear={() => setValue("pLiveClientLink", "")}
                  />
                </FormItem>
              )}
            />

            {/* Project Live Server Link */}
            <FormField
              control={control}
              name="pLiveServerLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Live Server URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input Project Live Server URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <WebsitePreviewUrl
                    url={pServerLiveLink}
                    onClear={() => setValue("pLiveServerLink", "")}
                  />
                </FormItem>
              )}
            />

            {/* Project Client Repository Link */}
            <FormField
              control={control}
              name="pClientRepoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Client Repository URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input Project Client Repository URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <WebsitePreviewUrl
                    url={pClientRepoLink}
                    onClear={() => setValue("pClientRepoLink", "")}
                  />
                </FormItem>
              )}
            />

            {/* Project Server Repository Link */}
            <FormField
              control={control}
              name="pServerRepoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Server Repository URL
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Input Project Server Repository URL"
                      className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* Image Preview */}
                  <WebsitePreviewUrl
                    url={pServerRepoLink}
                    onClear={() => setValue("pServerRepoLink", "")}
                  />
                </FormItem>
              )}
            />

            {/* Project Video Overview Link */}
            <FormField
              control={control}
              name="pOverviewVideoLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Input field */}
                    <DynamicUrlInput
                      links={field.value || [""]}
                      onChange={(updatedLinks) => field.onChange(updatedLinks)}
                      urlTitle="Project Overview Video URL"
                      inputeHolder="Input Project Overview Video URL"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />

                  {/* ✅ Multi preview */}
                  <MultiVideoPreviewGroup
                    urls={field.value}
                    // alt="Project image preview"
                    onClear={(index) => {
                      if (!Array.isArray(field.value)) {
                        field.onChange([]);
                        return;
                      }

                      const updated = field.value.filter((_, i) => i !== index);
                      field.onChange(updated);
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Project Image Link */}
            <FormField
              control={control}
              name="pImageLink"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DynamicUrlInput
                      links={field.value?.length ? field.value : [""]}
                      onChange={field.onChange}
                      urlTitle="Project Image URL"
                      inputeHolder="Input Project Image URL"
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-right" />
                  <MultiImagePreviewGroup
                    urls={field.value?.filter(Boolean) || []}
                    alt="Project image preview"
                    onClear={(index) => {
                      // Use optional chaining and fallback to empty array
                      const current = field.value || [];
                      const updated = current.filter((_, i) => i !== index);
                      field.onChange(updated.length ? updated : [""]); // reset to [""] if empty
                    }}
                  />
                </FormItem>
              )}
            />

            {/* Project Tech Stack */}
            <FormField
              control={control}
              name="pTechStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Tech Stack
                    <span className="text-red-800 text-xs">(Optional)</span>
                  </FormLabel>

                  <FormControl>
                    <MultiSelector
                      // value={field.value ?? []}
                      // onChange={field.onChange}
                      options={PROJECT_CATEGORY}
                      value={field.value ?? []}
                      onChange={field.onChange}
                      placeholder="Select project categories..."
                    />
                  </FormControl>

                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:justify-start lg:items-center">
              {/* Project Category */}
              <FormField
                control={control}
                name="pCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="italic font-semibold text-md">
                      Project Category
                      <span className="text-red-800 text-xs">(Optional)</span>
                    </FormLabel>

                    <FormControl>
                      <SelectForm
                        value={field.value ?? ""}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Input Project Category"
                        label="Select Category"
                        options={UPDATEPROJECTCATEGORIES}
                      />
                    </FormControl>

                    <FormMessage className="text-xs text-right" />
                  </FormItem>
                )}
              />

              {/* Project Visibility */}
              <div className="mt-4 lg:mt-0">
                <FormField
                  control={control}
                  name="pVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="italic font-semibold text-md">
                        Project Visibility
                        <span className="text-red-800 text-xs">(Optional)</span>
                      </FormLabel>

                      <FormControl>
                        <SelectForm
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Input Project Visibility"
                          label="Select Visibility"
                          options={PROJECTVSISIVILITY}
                        />
                      </FormControl>

                      <FormMessage className="text-xs text-right" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Pricing */}
              <div className="mt-4 lg:mt-0">
                <FormField
                  control={control}
                  name="pPricingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="italic font-semibold text-md">
                        Project Pricing Type
                        <span className="text-red-800 text-xs">(Optional)</span>
                      </FormLabel>

                      <FormControl>
                        <SelectForm
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Input Project Pricing"
                          label="Select Pricing"
                          options={PROJECTPRICING}
                        />
                      </FormControl>

                      <FormMessage className="text-xs text-right" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Website type */}
              <div className="mt-4 lg:mt-0">
                <FormField
                  control={control}
                  name="pType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="italic font-semibold text-md">
                        Project Website Type
                        <span className="text-red-800 text-xs">(Optional)</span>
                      </FormLabel>

                      <FormControl>
                        <SelectForm
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Input project website type"
                          label="Select website type"
                          options={WEBSITE_TYPE_OPTIONS}
                        />
                      </FormControl>

                      <FormMessage className="text-xs text-right" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Divider Project Features */}
            <Divider variant="dashed" thickness={1} color="blue">
              Projects Features
            </Divider>

            {/* Project Features */}
            <FormField
              control={control}
              name="pFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DynamicFeaturesInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Divider Contibutors*/}
            <Divider variant="dashed" thickness={1} color="blue">
              Projects Contibutors
            </Divider>

            {/* Add contibutor fild */}
            <FormField
              control={control}
              name="pContributors"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DynamicContributorsInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-right" />
                </FormItem>
              )}
            />

            {/* Project Pin */}
            <FormField
              control={control}
              name="pPinned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="italic font-semibold text-md">
                    Project Pin
                  </FormLabel>

                  <FormControl>
                    <div className="border rounded-md p-4">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel>Pin this project</FieldLabel>
                          <FieldDescription>
                            Pinned projects remain fixed at the top of your
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

            {/* Submit button */}
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

export default SingleProjectClient;
