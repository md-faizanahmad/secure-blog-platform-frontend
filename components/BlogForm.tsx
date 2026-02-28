"use client";

import { useState, useEffect, FormEvent } from "react";
import { Blog, CreateBlogPayload } from "@/lib/types";

interface Props {
  initialData?: Blog;
  onSubmit: (data: CreateBlogPayload) => Promise<void>;
  loading?: boolean;
}

export default function BlogForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setIsPublished(initialData.isPublished);
    } else {
      setTitle("");
      setContent("");
      setIsPublished(false);
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setError("Title and content are required.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }

    if (trimmedContent.length < 10) {
      setError("Content must be at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        title: trimmedTitle,
        content: trimmedContent,
        isPublished,
      });

      setSuccess(
        initialData
          ? "Blog updated successfully."
          : "Blog created successfully.",
      );

      if (!initialData) {
        setTitle("");
        setContent("");
        setIsPublished(false);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save blog.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled = loading || submitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {/* Title */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isDisabled}
          placeholder="Enter blog title"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          disabled={isDisabled}
          placeholder="Write your content..."
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
        />
      </div>

      {/* Publish Toggle */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          disabled={isDisabled}
          className="h-4 w-4 accent-black"
        />
        Publish immediately
      </label>

      {/* Button */}
      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDisabled ? "Saving..." : initialData ? "Update Blog" : "Create Blog"}
      </button>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}
    </form>
  );
}
