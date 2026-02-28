// lib/types.ts

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
// BLOG TYPES

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    email: string;
  };
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface UpdateBlogPayload {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export interface PaginatedBlogs {
  data: Blog[];
  page: number;
  totalPages: number;
}
// PUBLIC FEED TYPES

export interface FeedBlog {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

export interface FeedResponse {
  page: number;
  limit: number;
  total: number;
  items: FeedBlog[];
}
// PUBLIC BLOG DETAIL

export interface PublicBlogDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: {
    id: string;
    email: string;
    name: string;
  };
}
// LIKE RESPONSE

export interface LikeResponse {
  likeCount: number;
  liked: boolean;
}
// COMMENT TYPES

export interface BlogComment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

export interface CreateCommentPayload {
  content: string;
}
