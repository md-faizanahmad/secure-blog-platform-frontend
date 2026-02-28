"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const initial = user?.email?.charAt(0).toUpperCase() ?? "";
  return (
    <header
      style={{
        borderBottom: "1px solid #e5e5e5",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link
          href="/feed"
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            textDecoration: "none",
          }}
        >
          Secure Blog
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/feed">Feed</Link>

          {!loading && user && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                {initial}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "1px solid #ccc",
                  padding: "0.4rem 0.8rem",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}

          {!loading && !user && (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
