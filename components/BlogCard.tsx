"use client";

import Link from "next/link";
import { memo } from "react";
import { FeedBlog } from "@/lib/types";

interface Props {
  blog: FeedBlog;
}

function BlogCardComponent({ blog }: Props) {
  const authorName = blog.author.name ?? blog.author.email.split("@")[0]; // fallback if no name

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        <Link href={`/blog/${blog.slug}`} className="hover:underline">
          {blog.title}
        </Link>
      </h2>

      {blog.summary && (
        <p className="mb-4 text-sm text-gray-600">{blog.summary}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{authorName}</span>

        <span>• {blog.likeCount} Likes</span>
        <span>• {blog.commentCount} Comments</span>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>
    </article>
  );
}

export default memo(BlogCardComponent);
