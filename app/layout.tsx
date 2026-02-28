import { ReactNode } from "react";
import { AuthProvider } from "@/hooks/AuthProvider";
import Header from "@/components/Header";
import "./globals.css";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <AuthProvider>
          <Header />

          <main
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "2rem 1rem",
            }}
          >
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
