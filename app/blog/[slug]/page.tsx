"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPublicBlogBySlug } from "@/lib/api";
import { PublicBlogDetail } from "@/lib/types";
import LikeButton from "@/components/LikeButton";
import CommentList from "@/components/CommentList";
import NotFound from "@/app/not-found";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [blog, setBlog] = useState<PublicBlogDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPublicBlogBySlug(slug);
        setBlog(data);
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "statusCode" in err &&
          (err as { statusCode: number }).statusCode === 404
        ) {
          router.replace("/feed");
          return;
        }

        const message =
          err instanceof Error ? err.message : "Failed to load blog";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
        Loading blog...
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  if (!blog) return null;

  const authorName = blog.author.name ?? blog.author.email.split("@")[0]; // fallback only

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900">{blog.title}</h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{authorName}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Like + Comment Section */}
      <div className="flex flex-wrap items-center gap-4 border-y border-gray-200 py-4">
        <LikeButton
          blogId={blog.id}
          initialCount={blog.likeCount}
          initialLiked={false}
        />
      </div>

      {/* Blog Content */}
      <article className="prose max-w-none text-gray-800">
        <p>{blog.content}</p>
      </article>

      {/* Comments */}
      <div className="pt-6">
        <CommentList blogId={blog.id} />
      </div>
    </div>
  );
}
