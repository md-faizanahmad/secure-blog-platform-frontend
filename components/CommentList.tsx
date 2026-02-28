"use client";

import { useEffect, useState } from "react";
import { getComments, createComment } from "@/lib/api";
import CommentItem from "./CommentItem";
import { useAuth } from "@/hooks/AuthProvider";
import { BlogComment } from "@/lib/types";

interface Props {
  blogId: string;
}

const MIN_LENGTH = 3;
const MAX_LENGTH = 500;

export default function CommentList({ blogId }: Props) {
  const { user } = useAuth();

  const [comments, setComments] = useState<BlogComment[]>([]);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const data = await getComments(blogId);
      setComments(data);
    } catch {
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async () => {
    if (!user) {
      setInfoMessage("You must be logged in to post a comment.");
      return;
    }

    const trimmed = content.trim();

    if (trimmed.length < MIN_LENGTH) {
      setInfoMessage(`Comment must be at least ${MIN_LENGTH} characters.`);
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setInfoMessage(`Comment cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }

    if (submitting) return;

    setSubmitting(true);
    setError(null);
    setInfoMessage(null);

    try {
      const newComment = await createComment(blogId, {
        content: trimmed,
      });

      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } catch (err: unknown) {
      let message = "Failed to post comment.";

      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        message = (err as { message: string }).message;
      }

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
        Loading comments...
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      {/* Comment Form */}
      {user && (
        <div className="space-y-3 rounded-lg border border-gray-200 p-4">
          <textarea
            placeholder="Write your comment..."
            value={content}
            disabled={submitting}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_LENGTH}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
            rows={3}
          />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              {content.length}/{MAX_LENGTH}
            </span>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Login to join the discussion.
        </div>
      )}

      {infoMessage && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-600">
          {infoMessage}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {comments.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          No comments yet.
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
