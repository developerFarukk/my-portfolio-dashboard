/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tblog } from '@/types/blogType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { blogSchema } from './blogSchema';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { Toolbar } from './toolbar';
import { createBlog } from '@/service/blogService';

const CreateBlog = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const form = useForm({
        resolver: zodResolver(blogSchema),
    });

    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<Tblog>({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            const res = await createBlog(data)
            if (res.success) {
                toast.success("Blog created successfully");
                reset();
                setPreviewUrl(null);
                editor?.commands.clearContent();
            } else {
                toast.error(res.message || "Failed to create Blog");
            }
        } catch (error: any) {
            console.error("Blog creation error:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred"
            );
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", e.target.files as unknown as string);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            ImageExtension,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setValue("content", html);
        },
    });

    // Prevent form submission when clicking toolbar buttons
    const handleToolbarClick = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='p-6'>
                <Card className="max-w-2xl mx-auto border-0 shadow-lg">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Create  Blog
                        </CardTitle>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            {/* Blog Title */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Blog Title *</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your blog title"
                                    className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${errors.title ? "border-red-500" : ""
                                        }`}
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                                )}
                            </div>

                            {/* Blog Image */}
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

                            {/* Blog category */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Blog Category</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your blog category"
                                    className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${errors.category ? "border-red-500" : ""
                                        }`}
                                    {...register("category")}
                                />
                                {errors.category && (
                                    <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Blog Content - Tiptap Editor */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">Content *</Label>
                                <div
                                    className={`rounded-lg border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all ${errors.content ? "border-red-500" : "border"}`}
                                    onClick={handleToolbarClick} // Add this to prevent form submission
                                >
                                    <Toolbar editor={editor} />
                                    <EditorContent
                                        editor={editor}
                                        className="min-h-[300px] p-4 bg-white rounded-b-lg"
                                    />
                                </div>
                                {errors.content && (
                                    <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
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
                                            <span>Publishing...</span>
                                        </div>
                                    ) : (
                                        <span>Publish Blog</span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default CreateBlog;