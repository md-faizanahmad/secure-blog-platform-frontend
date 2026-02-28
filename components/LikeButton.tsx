"use client";

import { useState, useTransition } from "react";
import { likeBlog, unlikeBlog } from "@/lib/api";
import { useAuth } from "@/hooks/AuthProvider";

interface Props {
  blogId: string;
  initialCount: number;
  initialLiked: boolean;
}

export default function LikeButton({
  blogId,
  initialCount,
  initialLiked,
}: Props) {
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [count, setCount] = useState<number>(initialCount);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    if (!user) {
      setMessage("You must be logged in to like this post.");
      return;
    }

    if (isPending) return; // prevent spam clicks

    setMessage(null);

    const optimisticLiked = !liked;
    const optimisticCount = optimisticLiked ? count + 1 : count - 1;

    // Optimistic update
    setLiked(optimisticLiked);
    setCount(optimisticCount);

    startTransition(async () => {
      try {
        const response = optimisticLiked
          ? await likeBlog(blogId)
          : await unlikeBlog(blogId);

        // Sync with server truth
        setLiked(response.liked);
        setCount(response.likeCount);
      } catch (err: unknown) {
        // Revert on failure
        setLiked((prev) => !prev);
        setCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
        let message = "Unable to update like. Please try again.";

        if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as { message: unknown }).message === "string"
        ) {
          message = (err as { message: string }).message;
        }

        setMessage(message);
      }
    });
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition 
          ${
            liked
              ? "border-black bg-black text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }
          disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isPending
          ? "Updating..."
          : liked
            ? `Liked (${count})`
            : `Like (${count})`}
      </button>

      {message && <span className="text-xs text-red-600">{message}</span>}
    </div>
  );
}
