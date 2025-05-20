/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link } from "lucide-react";

export const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <Underline className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded ${editor.isActive('strike') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <Strikethrough className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    const previousUrl = editor.getAttributes('link').href;
                    const url = window.prompt('URL', previousUrl);
                    if (url === null) return;
                    if (url === '') {
                        editor.chain().focus().extendMarkRange('link').unsetLink().run();
                        return;
                    }
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                }}
                className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
                <Link className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    const url = window.prompt('Enter the URL of the image:');
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                className="p-2 rounded hover:bg-gray-100"
            >
            </button>
        </div>
    );
};