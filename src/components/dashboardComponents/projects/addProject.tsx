"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";

import { projectSchema, TProject } from "./projectSchema";
import { Input } from "@/components/ui/input";
import { MotionButton } from "@/components/shared/MotionButton";
import { defaultProjectValues } from "@/types/projectType";
import { Textarea } from "@/components/ui/textarea";
import { ImageUrlPreview } from "@/components/shared/ImageUrlPreview";
import { WebsitePreviewUrl } from "@/components/shared/WebsitePreviewUrl";
import { DynamicVideoLinkInput } from "@/components/shared/DynamicVideoLinkInput";

const AddProject = () => {
  const form = useForm<TProject>({
    // resolver: zodResolver(projectSchema),
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: defaultProjectValues,
  });

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
  // const pOverviewVideoLink = watch("pOverviewVideoLink");

  //   console.log(form.formState.errors);

  const onSubmit: SubmitHandler<TProject> = async (data) => {
    console.log("Project Data", data);
    // try {
    //   const res = await createProject(data);
    //   if (res.success) {
    //     toast.success("Project created successfully");
    //     reset();
    //     setPreviewUrl(null);
    //   } else {
    //     toast.error(res.message || "Failed to create project");
    //   }
    // } catch (error: any) {
    //   console.error("Project creation error:", error);
    //   toast.error(
    //     error.response?.data?.message ||
    //       error.message ||
    //       "An unexpected error occurred",
    //   );
    // }
  };

  return (
    <div>
      <div className="p-6 ">
        <Card className="max-w-7xl mx-auto  shadow-lg p-4 border-2 dark:border-yellow-950 border-blue-100">
          <CardHeader className="pb-0">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">
              Create Project
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
                      <DynamicVideoLinkInput
                        links={field.value || [""]}
                        onChange={(updatedLinks) =>
                          field.onChange(updatedLinks)
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-right" />
                  </FormItem>
                )}
              />

              {/* Live Link */}
              {/* <div>
                <Label htmlFor="liveLink">Live Link*</Label>
                <Input
                  id="liveLink"
                  type="url"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("liveLink", {
                    required: "Live link is required",
                  })}
                />
                {errors.liveLink && (
                  <p className="text-red-500 text-sm">
                    {errors.liveLink.message}
                  </p>
                )}
              </div> */}

              {/* Upload Project Image */}
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

              {/* GitHub Client */}
              {/* <div>
                <Label htmlFor="githubClient">GitHub Client Link</Label>
                <Input
                  id="githubClient"
                  type="url"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("githubClient")}
                />
              </div> */}

              {/* GitHub Server */}
              {/* <div>
                <Label htmlFor="githubServer">GitHub Server Link</Label>
                <Input
                  id="githubServer"
                  type="url"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("githubServer")}
                />
              </div> */}

              {/* Tech Stack */}
              {/* <div>
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input
                  id="techStack"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("techStack")}
                  placeholder="React, Node.js, MongoDB"
                />
              </div> */}

              {/* Features */}
              {/* <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Textarea
                  id="features"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("features")}
                  placeholder="User authentication, CRUD operations, Responsive design"
                />
              </div> */}

              {/* Category */}
              {/* <div className="w-full">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-white mt-2 dark:bg-zinc-800 w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Application</SelectItem>
                        <SelectItem value="mobile">
                          Mobile Application
                        </SelectItem>
                        <SelectItem value="desktop">
                          Desktop Application
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div> */}

              {/* Is Team Project */}
              {/* <div className="flex items-center space-x-2">
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
              </div> */}

              {/* Conditionally show Contributors */}
              {/* {watch("isTeamProject") && (
                <div className="animate-fade-in">
                  <Label htmlFor="contributors">
                    Contributors (comma separated)
                  </Label>
                  <Input
                    id="contributors"
                    className="bg-white mt-2 dark:bg-zinc-800"
                    {...register("contributors")}
                    placeholder="John Doe, Jane Smith"
                  />
                </div>
              )} */}

              {/* Video Demo */}
              {/* <div>
                <Label htmlFor="videoDemo">Video Demo URL</Label>
                <Input
                  id="videoDemo"
                  type="url"
                  className="bg-white mt-2 dark:bg-zinc-800"
                  {...register("videoDemo")}
                />
              </div> */}

              {/* <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-[1.01]"
                  disabled={isSubmitting}
                  {...({ fdprocessedid: "l8cjrh" } as any)}
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
    </div>
  );
};

export default AddProject;
