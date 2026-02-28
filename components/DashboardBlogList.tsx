"use client";

import { Blog } from "@/lib/types";

interface Props {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function DashboardBlogList({ blogs, onEdit, onDelete }: Props) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
        You haven&apos;t created any blogs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {blog.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {blog.isPublished ? "Published" : "Draft"}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Edit Icon */}
            <button
              onClick={() => onEdit(blog)}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm transition hover:bg-gray-100"
            >
              ✏️ Edit
            </button>

            {/* Delete Icon */}
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this blog?",
                );
                if (confirmed) onDelete(blog.id);
              }}
              className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
