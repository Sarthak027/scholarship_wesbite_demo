"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image } from '@tiptap/extension-image';
import { Youtube } from '@tiptap/extension-youtube';
import {
    Bold, Italic, List, ListOrdered, Quote, Undo, Redo,
    Table as TableIcon, Image as ImageIcon, Youtube as YoutubeIcon,
    Heading1, Heading2, Strikethrough
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    const addYoutubeVideo = () => {
        const url = window.prompt('Enter YouTube URL');
        if (url) editor.commands.setYoutubeVideo({ src: url });
    };

    return (
        <div className="border-b border-slate-200 p-2 flex flex-wrap gap-1 bg-slate-50 sticky top-0 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-sky-100 text-sky-600' : 'text-slate-600'}`}
            >
                <ListOrdered size={18} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600"
                title="Insert Table"
            >
                <TableIcon size={18} />
            </button>
            <button
                onClick={addImage}
                className="p-2 rounded hover:bg-slate-200 text-slate-600"
                title="Insert Image"
            >
                <ImageIcon size={18} />
            </button>
            <button
                onClick={addYoutubeVideo}
                className="p-2 rounded hover:bg-slate-200 text-slate-600"
                title="Insert YouTube"
            >
                <YoutubeIcon size={18} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-slate-200 text-slate-600"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

export default function BlogEditor({ initialContent, onChange }: { initialContent: string, onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            Youtube.configure({ width: 480, height: 320 }),
        ],
        content: initialContent,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="p-6 min-h-[400px] prose prose-slate max-w-none focus:outline-none blog-editor-canvas" />
        </div>
    );
}
