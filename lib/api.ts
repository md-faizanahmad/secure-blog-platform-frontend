// lib/api.ts

import {
  ApiError,
  BlogComment,
  CreateCommentPayload,
  FeedResponse,
  LikeResponse,
  PublicBlogDetail,
} from "./types";
import { Blog, CreateBlogPayload, UpdateBlogPayload } from "./types";
import { getToken } from "./auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    const error: ApiError = {
      message: errorBody?.message ?? "Something went wrong",
      statusCode: response.status,
    };

    throw error;
  }

  return response.json() as Promise<T>;
}

// BLOG API

export async function getMyBlogs(): Promise<Blog[]> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<Blog[]>("/blogs/my", { token });
}

export async function createBlog(payload: CreateBlogPayload): Promise<Blog> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<Blog>("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export async function updateBlog(
  id: string,
  payload: UpdateBlogPayload,
): Promise<Blog> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<Blog>(`/blogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    token,
  });
}

export async function deleteBlog(id: string): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  await apiFetch<void>(`/blogs/${id}`, {
    method: "DELETE",
    token,
  });
}

// PUBLIC FEED

export async function getPublicFeed(
  page: number,
  limit: number,
): Promise<FeedResponse> {
  return apiFetch<FeedResponse>(`/public/feed?page=${page}&limit=${limit}`);
}

// PUBLIC BLOG DETAIL

export async function getPublicBlogBySlug(
  slug: string,
): Promise<PublicBlogDetail> {
  return apiFetch<PublicBlogDetail>(`/public/blogs/${slug}`);
}

// LIKE SYSTEM

export async function likeBlog(blogId: string): Promise<LikeResponse> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<LikeResponse>(`/blogs/${blogId}/like`, {
    method: "POST",
    token,
  });
}

export async function unlikeBlog(blogId: string): Promise<LikeResponse> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<LikeResponse>(`/blogs/${blogId}/like`, {
    method: "DELETE",
    token,
  });
}
// COMMENTS

export async function getComments(blogId: string): Promise<BlogComment[]> {
  return apiFetch<BlogComment[]>(`/blogs/${blogId}/comments`);
}

export async function createComment(
  blogId: string,
  payload: CreateCommentPayload,
): Promise<BlogComment> {
  const token = getToken();
  if (!token) throw new Error("Unauthorized");

  return apiFetch<BlogComment>(`/blogs/${blogId}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}
