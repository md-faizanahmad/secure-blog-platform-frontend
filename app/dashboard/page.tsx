"use client";

import { useEffect, useState } from "react";
import BlogForm from "@/components/BlogForm";
import { getMyBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/api";
import { Blog } from "@/lib/types";
import { useAuth } from "@/hooks/AuthProvider";
import { useRouter } from "next/navigation";
import DashboardBlogList from "@/components/DashboardBlogList";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  console.log("user:", user);
  console.log("loading:", loading);
  return <DashboardContent />;
}

function DashboardContent() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    try {
      const data = await getMyBlogs();
      setBlogs(data);
    } catch {
      setError("Failed to load your blogs.");
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (data: {
    title: string;
    content: string;
    isPublished: boolean;
  }) => {
    const newBlog = await createBlog(data);
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleUpdate = async (data: {
    title: string;
    content: string;
    isPublished: boolean;
  }) => {
    if (!editingBlog) return;

    const updated = await updateBlog(editingBlog.id, data);

    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updated.id ? updated : blog)),
    );

    setEditingBlog(null);
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Blog Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          {editingBlog ? "Edit Blog" : "Create Blog"}
        </h2>

        <BlogForm
          {...(editingBlog ? { initialData: editingBlog } : {})}
          onSubmit={editingBlog ? handleUpdate : handleCreate}
        />
      </div>

      {/* Blog List */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Your Blogs</h2>

        {loadingBlogs && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            Loading your blogs...
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loadingBlogs && !error && (
          <DashboardBlogList
            blogs={blogs}
            onEdit={setEditingBlog}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
