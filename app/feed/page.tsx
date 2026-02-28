"use client";

import { useEffect, useState, useCallback } from "react";
import { getPublicFeed } from "@/lib/api";
import { FeedBlog } from "@/lib/types";
import BlogCard from "@/components/BlogCard";

const LIMIT = 10;

export default function FeedPage() {
  const [blogs, setBlogs] = useState<FeedBlog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const fetchFeed = useCallback(async (currentPage: number) => {
    setLoading(true);
    setError(null);
    setInfoMessage(null);

    try {
      const response = await getPublicFeed(currentPage, LIMIT);
      setBlogs(response.items);

      const calculatedTotalPages = Math.ceil(response.total / response.limit);

      setTotalPages(calculatedTotalPages || 1);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load feed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed(page);
  }, [page, fetchFeed]);

  const handlePrev = () => {
    if (page === 1) {
      setInfoMessage("You are already on the first page.");
      return;
    }

    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page === totalPages) {
      setInfoMessage("You have reached the last page.");
      return;
    }

    setPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Public Feed</h1>

      {loading && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Loading feed...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {infoMessage && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
          {infoMessage}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          No blogs available.
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-between">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
