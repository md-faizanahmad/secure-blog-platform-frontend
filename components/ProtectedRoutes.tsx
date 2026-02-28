"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthProvider";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div style={{ padding: "1rem 0" }}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
