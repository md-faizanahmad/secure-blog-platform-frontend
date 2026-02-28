"use client";

import { BlogComment } from "@/lib/types";
import { memo } from "react";

interface Props {
  comment: BlogComment;
}

function CommentItemComponent({ comment }: Props) {
  const authorName = comment.author.name ?? comment.author.email.split("@")[0];

  const date = new Date(comment.createdAt);

  const formattedDateTime = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const initials = authorName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
          {initials}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-800">
              {authorName}
            </span>

            <span className="text-xs text-gray-500">{formattedDateTime}</span>
          </div>

          {/* Content */}
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(CommentItemComponent);
